import { useEffect, useRef, useState } from 'react';

// WebGL port of the app's Foil.metal: a tight specular band whose energy
// scales with the artwork's own brightness (gold flares, engraving stays
// dark) plus a subtle iridescent channel wobble, both driven by a tilt
// vector. Inputs mirror MotionShimmer.swift: device tilt where the browser
// grants it, drag on the card everywhere, and a single rake of light when
// the card scrolls into view for the platforms that have neither.
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D tex;
uniform vec2 tilt;
uniform float intensity;
void main() {
  vec4 color = texture2D(tex, vUv);
  if (color.a < 0.01) { gl_FragColor = vec4(0.0); return; }
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  float band = (uv.x * 0.85 + uv.y * 0.55) - 0.7 - tilt.x * 1.4 - tilt.y * 0.35;
  float spec = exp(-band * band * 90.0);
  float glow = exp(-band * band * 12.0) * 0.35;
  float phase = (uv.x - uv.y) * 9.0 + tilt.x * 5.0 + tilt.y * 2.5;
  vec3 irid = vec3(1.0 + 0.10 * sin(phase), 1.0 + 0.06 * sin(phase + 2.09), 1.0 + 0.10 * sin(phase + 4.18));
  vec3 base = color.rgb;
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  float s = spec * intensity;
  float g = glow * intensity;
  vec3 lit = base * irid * (1.0 + g) + (base * 0.9 + 0.1) * s * (0.35 + lum);
  gl_FragColor = vec4(min(lit, vec3(1.0)) * color.a, color.a);
}`;

const VERT = `
attribute vec2 pos;
varying vec2 vUv;
void main() { vUv = pos * 0.5 + 0.5; gl_Position = vec4(pos, 0.0, 1.0); }`;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function setup(canvas, image) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(gl.getUniformLocation(prog, 'tex'), 0);
  gl.uniform1f(gl.getUniformLocation(prog, 'intensity'), 0.7);
  const tiltLoc = gl.getUniformLocation(prog, 'tilt');
  return {
    draw(tx, ty) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(tiltLoc, tx, ty);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

export default function FoilTicket({ src, alt, maxTiltDegrees = 6 }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    const cleanups = [];

    const image = new Image();
    image.src = src;
    image.decode().then(() => {
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(image.naturalWidth * dpr);
      canvas.height = Math.round(image.naturalHeight * dpr);
      const fx = setup(canvas, image);
      if (!fx) { setFallback(true); return; }

      // Tilt = motion + touch, clamped like the app; sweep is the rake.
      const motion = { x: 0, y: 0 };
      const touch = { x: 0, y: 0 };
      let sweep = 0;
      let sweepStart = 0;
      let visible = false;
      let raf = 0;
      let idleTimer = 0;
      let lastTx = NaN;
      let lastTy = NaN;

      const frame = () => {
        raf = 0;
        if (disposed) return;
        if (sweepStart) {
          // Smoothstep over 1.5s: the highlight eases in and out, a lamp
          // moving rather than a wipe.
          const p = Math.min(1, (performance.now() - sweepStart) / 1500);
          sweep = ((p * p * (3 - 2 * p)) * 2 - 1) * 1.1;
          if (p >= 1) sweepStart = 0;
        } else if (Math.abs(sweep) > 0.01) {
          sweep *= 0.85;
        } else {
          sweep = 0;
        }
        const tx = clamp(motion.x + touch.x + sweep, -1.2, 1.2);
        const ty = clamp(motion.y + touch.y + sweep * 0.35, -1.2, 1.2);
        if (tx !== lastTx || ty !== lastTy) {
          lastTx = tx; lastTy = ty;
          fx.draw(tx, ty);
          wrap.style.transform = `perspective(1000px) rotateY(${(tx * maxTiltDegrees).toFixed(2)}deg) rotateX(${(-ty * maxTiltDegrees).toFixed(2)}deg)`;
        }
        if (visible && (sweepStart || sweep !== 0 || touch.decaying || motion.live)) schedule();
      };
      const schedule = () => { if (!raf) raf = requestAnimationFrame(frame); };
      frame();

      const rake = () => {
        if (reduceMotion || sweepStart) return;
        sweepStart = performance.now();
        schedule();
      };
      const armIdle = () => {
        clearTimeout(idleTimer);
        if (reduceMotion || motion.live) return;
        idleTimer = setTimeout(() => { if (visible) { rake(); armIdle(); } }, 7000);
      };

      // One rake when the card comes into view, then an occasional one while
      // it sits there untouched.
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) { rake(); armIdle(); schedule(); } else { clearTimeout(idleTimer); }
      }, { threshold: 0.4 });
      io.observe(wrap);
      cleanups.push(() => { io.disconnect(); clearTimeout(idleTimer); });

      // Rubbing the foil: drag plays the light across it, springs back on release.
      let drag = null;
      let decay = 0;
      const onDown = (e) => {
        drag = { x: e.clientX, y: e.clientY };
        clearInterval(decay); touch.decaying = false;
        canvas.setPointerCapture(e.pointerId);
        askForMotion();
      };
      const onMove = (e) => {
        if (!drag) return;
        touch.x = clamp((e.clientX - drag.x) / 120, -1, 1);
        touch.y = clamp((e.clientY - drag.y) / 120, -1, 1);
        schedule();
      };
      const onUp = () => {
        drag = null;
        touch.decaying = true;
        clearInterval(decay);
        decay = setInterval(() => {
          touch.x *= 0.82; touch.y *= 0.82;
          if (Math.abs(touch.x) < 0.01 && Math.abs(touch.y) < 0.01) {
            touch.x = 0; touch.y = 0; touch.decaying = false; clearInterval(decay); armIdle();
          }
          schedule();
        }, 16);
      };
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);
      cleanups.push(() => {
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        clearInterval(decay);
      });

      // Device tilt: the first sample is the neutral pose, because people hold
      // phones at every angle. Safari wants a gesture before it will share the
      // gyro, so the first touch on the card asks; elsewhere attach outright.
      let ref = null;
      const onOrient = (e) => {
        if (e.gamma == null || e.beta == null) return;
        if (!ref) ref = { g: e.gamma, b: e.beta };
        const x = clamp((e.gamma - ref.g) / 45, -1, 1);
        const y = clamp((e.beta - ref.b) / 45, -1, 1);
        motion.x += (x - motion.x) * 0.25;
        motion.y += (y - motion.y) * 0.25;
        motion.live = true;
        clearTimeout(idleTimer);
        schedule();
      };
      const attachMotion = () => {
        window.addEventListener('deviceorientation', onOrient);
        cleanups.push(() => window.removeEventListener('deviceorientation', onOrient));
      };
      let asked = false;
      const askForMotion = () => {
        if (asked || reduceMotion || typeof DeviceOrientationEvent === 'undefined') return;
        asked = true;
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission().then((state) => { if (state === 'granted' && !disposed) attachMotion(); }).catch(() => {});
        }
      };
      if (!reduceMotion && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        attachMotion();
      }
    }).catch(() => setFallback(true));

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, [src, maxTiltDegrees]);

  return (
    <div className="foil" ref={wrapRef}>
      {fallback
        ? <img className="ticket" src={src} alt={alt} />
        : <canvas ref={canvasRef} className="ticket" role="img" aria-label={alt} />}
    </div>
  );
}
