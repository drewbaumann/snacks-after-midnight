import { Link } from 'react-router-dom';
import FoilTicket from './FoilTicket';
import './Chroma.css';

const APP_STORE = 'https://apps.apple.com/us/app/chroma-spatial-cinema/id6478800800';
const base = process.env.PUBLIC_URL || '';

const whatsNew = [
  ['Jellyfin and Emby', 'They join Plex. Multiple servers, all in one sidebar.'],
  ['One library, every server', 'Search across everything you own. Genre chips, trailers, extras and cast on richer detail pages.'],
  ['AI 3D', 'Watch 2D titles with real depth, on device.'],
  ['VR180, VR360 and spatial video', 'Immersive formats play natively, alongside MV-HEVC spatial video.'],
  ['Transcribe', 'On-device live subtitles for videos that have none.'],
  ['Downloads that remember', 'Offline playback resumes where you stopped and reports back to your server when you’re online again.'],
];

// HashRouter owns the URL fragment, so a plain "#pass" link would navigate to
// a /pass route instead of scrolling. Scroll by id and leave the URL alone.
function jump(e) {
  const id = e.currentTarget.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F5F5F7" strokeLinecap="butt" aria-hidden="true">
      <path d="M25.12 6.78A13.26 13.26 0 1 0 25.12 21.22" stroke-width="1.48" />
      <path d="M23.26 7.99A11.04 11.04 0 1 0 23.26 20.01" stroke-width="1.52" />
      <path d="M21.42 9.18A8.85 8.85 0 1 0 21.42 18.82" stroke-width="1.52" />
      <path d="M19.58 10.38A6.65 6.65 0 1 0 19.58 17.62" stroke-width="1.52" />
    </svg>
  );
}

export default function Chroma() {
  return (
    <div className="chroma">
      <header className="nav">
        <div className="wrap">
          <a href="#top" onClick={jump} className="wordmark">Chroma</a>
          <nav className="nav-links">
            <a href="#new" onClick={jump} className="hide-sm">What&rsquo;s new</a>
            <a href="#cinema" onClick={jump} className="hide-sm">Cinema</a>
            <a href="#pass" onClick={jump}>Chroma Pass</a>
            <a href={APP_STORE} className="primary">Download</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="starburst" />
        <div className="iris-glow" />
        <div className="wrap hero-shot">
          <div className="frame">
            <img src={`${base}/chroma/hero-room.jpg`} alt="Chroma's episode page for Barry, floating in an immersive theater on Apple Vision Pro" />
          </div>
        </div>
        <div className="wrap">
          <div className="tag">Chroma 2.0 is out now on Apple Vision Pro</div>
          <h1>Your media, cinema-grade.</h1>
          <p className="lede">Plex, Jellyfin, Emby and local videos, played in all their glory. 4K, Dolby Vision and Atmos in a theater that goes wherever you do.</p>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma for Vision Pro</a>
            <a href="#next" onClick={jump} className="btn glass">iPhone and iPad are next</a>
          </div>
          <div className="fine">Free to try. Chroma Pass unlocks unlimited watching.</div>
        </div>
      </section>

      <section id="new" className="block first">
        <div className="wrap">
          <h2>What&rsquo;s new in 2.0</h2>
          <div className="grid3">
            {whatsNew.map(([title, text]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cinema" className="block">
        <div className="wrap">
          <div className="split">
            <div className="shot">
              <img src={`${base}/chroma/cinema.jpg`} alt="An immersive Chroma theater with a lit stage on screen, subtitles, and the transport bar" />
            </div>
            <div>
              <h2>A theater built around you.</h2>
              <p className="body">Pick your row, or float up to the balcony and tilt the whole room back for watching while lying down. Dolby Vision, Dolby Atmos, HDR and multichannel audio come through as the file was made.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="block">
        <div className="wrap">
          <div className="split flip">
            <div>
              <h2>The file, untouched.</h2>
              <p className="body">Direct play for the formats servers usually transcode, MKV included. Style your subtitles, choose audio tracks, nudge caption timing, and skip intros and credits. Home Screen widgets and deep links go straight into playback.</p>
              <div className="note">Skipping intros and credits requires Plex Pass on the library owner&rsquo;s server.</div>
            </div>
            <div className="shot">
              <img src={`${base}/chroma/library.jpg`} alt="Chroma's Home view on iPad, with a sidebar of libraries and a Continue Watching row" />
            </div>
          </div>
        </div>
      </section>

      <section id="next" className="block">
        <div className="wrap">
          <div className="panel next">
            <div className="split">
              <div>
                <h2>Next: iPhone and iPad.</h2>
                <p className="body">The same libraries and the same Chroma Pass, on the screen in your pocket. Picture in Picture, downloads, Transcribe, and playback that picks up right where your Vision Pro left off.</p>
              </div>
              <div className="phone-wrap">
                <img className="phone" src={`${base}/chroma/iphone.jpg`} alt="Chroma's Home screen on iPhone" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pass" className="block">
        <div className="wrap">
          <div className="panel pass">
            <FoilTicket src={`${base}/chroma/pass.png`} alt="The gold Chroma Pass ticket" />
            <h2>Chroma Pass</h2>
            <p className="body">Chroma plays five minutes of anything for free. Chroma Pass removes the limit and keeps your playback position in sync with your server.</p>
            <p className="body">Monthly or yearly with a free trial, or a one-time Lifetime purchase. Current pricing is in the app.</p>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <h2>Bring your own library.</h2>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma for Vision Pro</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div className="foot-brand">
            <CMark />
            <span>Chroma is made by Snacks After Midnight.</span>
          </div>
          <div className="foot-links">
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
