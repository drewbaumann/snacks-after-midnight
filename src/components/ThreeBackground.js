import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'

function Particles() {
  const ref = useRef()
  const count = 5000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color1 = new THREE.Color('#8A2BE2') // BlueViolet
    const color2 = new THREE.Color('#4B0082') // Indigo

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Interpolate between two colors
      const mix = Math.random()
      const mixedColor = new THREE.Color().lerpColors(color1, color2, mix)
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }
    return [positions, colors]
  }, [count])

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.05
    ref.current.rotation.y += delta * 0.05
    ref.current.rotation.z += delta * 0.05

    // Add subtle movement to particles
    const positionsArray = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
      positionsArray[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points positions={positions} colors={colors} stride={3} frustumCulled={false} ref={ref}>
      <PointMaterial
        transparent
        vertexColors={true}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Particles />
    </Canvas>
  )
}
