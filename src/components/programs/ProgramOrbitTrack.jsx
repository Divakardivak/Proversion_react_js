import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D Orbital Track Component.
 * Visualizes the celestial orbital trajectory for the program carousel.
 */
export function ProgramOrbitTrack({ isMobile = false, accentColor = '#38bdf8' }) {
  const ringRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const radiusX = isMobile ? 1.35 : 1.75
  const radiusZ = isMobile ? 0.95 : 1.25
  const tiltY = isMobile ? 0.25 : 0.35

  // Generate elliptical curve points
  const points = useMemo(() => {
    const pts = []
    const segments = 100
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = Math.sin(theta) * radiusX
      const z = Math.cos(theta) * radiusZ
      const y = -Math.sin(theta) * tiltY * 0.4
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [radiusX, radiusZ, tiltY])

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  useFrame((state, delta) => {
    if (shouldReduceMotion || !ringRef.current) return
    ringRef.current.material.opacity = 0.16 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.04
  })

  return (
    <group>
      {/* Subdued Dashed Orbital Track */}
      <line ref={ringRef} geometry={lineGeometry}>
        <lineDashedMaterial
          color={accentColor}
          dashSize={0.15}
          gapSize={0.12}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </line>

      {/* Subtle Ambient Ground Ring Reflection */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radiusX * 0.7, radiusX * 0.95, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default ProgramOrbitTrack
