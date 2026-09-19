import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D ConnectionLines component.
 * Renders subtle, low-opacity network lines connecting the central core to technology nodes.
 * @param {Object} props
 * @param {Array<{ position: [number, number, number] }>} props.nodes
 */
export function ConnectionLines({ nodes }) {
  const matRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const positions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 6)

    nodes.forEach((node, idx) => {
      const i = idx * 6
      // Origin
      pos[i] = 0
      pos[i + 1] = 0
      pos[i + 2] = 0
      // Target
      pos[i + 3] = node.position[0]
      pos[i + 4] = node.position[1]
      pos[i + 5] = node.position[2]
    })

    return pos
  }, [nodes])

  useFrame((state) => {
    if (shouldReduceMotion || !matRef.current) return

    const t = state.clock.getElapsedTime()
    // Very subtle low-opacity breathing
    matRef.current.opacity = 0.11 + Math.sin(t * 1.2) * 0.04
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        color="#818cf8"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

export default ConnectionLines
