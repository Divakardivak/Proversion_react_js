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
      const nx = node.position[0]
      const ny = node.position[1]
      const nz = node.position[2]
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1
      const coreR = 0.85

      // Start cleanly at outer radius of the core
      pos[i] = (nx / len) * coreR
      pos[i + 1] = (ny / len) * coreR
      pos[i + 2] = (nz / len) * coreR

      // End cleanly near the node
      pos[i + 3] = nx * 0.94
      pos[i + 4] = ny * 0.94
      pos[i + 5] = nz * 0.94
    })

    return pos
  }, [nodes])

  useFrame((state) => {
    if (shouldReduceMotion || !matRef.current) return

    const t = state.clock.getElapsedTime()
    // Smooth gentle breathing
    matRef.current.opacity = 0.16 + Math.sin(t * 1.4) * 0.05
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
        color="#38BDF8"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

export default ConnectionLines
