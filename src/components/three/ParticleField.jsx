import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Reusable ParticleField component.
 * Creates an ambient cloud of drifting 3D particles.
 * @param {Object} props
 * @param {number} [props.count=350] - Number of particles
 * @param {string} [props.color='#38bdf8'] - Particle color
 * @param {number} [props.size=0.035] - Particle point size
 * @param {number} [props.radius=6] - Spread radius
 * @param {number} [props.speed=0.08] - Drift speed
 */
export function ParticleField({
  count = 350,
  color = '#38bdf8',
  size = 0.035,
  radius = 6,
  speed = 0.08,
  ...rest
}) {
  const pointsRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute randomly inside a sphere/cylinder volume
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = Math.cbrt(Math.random()) * radius

      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count, radius])

  useFrame((state, delta) => {
    if (shouldReduceMotion || !pointsRef.current) return
    pointsRef.current.rotation.y += delta * speed * 0.5
    pointsRef.current.rotation.x += delta * speed * 0.2
  })

  return (
    <points ref={pointsRef} {...rest}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default ParticleField
