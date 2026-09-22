import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D LearningPathway component
 * Renders smooth quadratic bezier energy lines flowing from the foundational Codex
 * out to each knowledge crystal, and ascending up to the graduation cap and diploma.
 * Includes traveling glowing energy spark pulses along the pathways.
 *
 * @param {Object} props
 * @param {[number, number, number]} props.codexPosition
 * @param {[number, number, number]} props.capPosition
 * @param {Array<{ position: [number, number, number], color: string }>} props.nodes
 */
export function LearningPathway({
  codexPosition = [0, -0.5, 0],
  capPosition = [0, 1.85, 0],
  nodes = [],
}) {
  const pulsesRef = useRef([])
  const shouldReduceMotion = useReducedMotion()

  // Generate smooth curved geometries from Codex to each node and from Codex to Cap
  const { curves, lineGeometries } = useMemo(() => {
    const allTargets = [
      ...nodes.map((n) => ({ pos: n.position, color: n.color })),
      { pos: capPosition, color: '#fbbf24' },
    ]

    const cList = []
    const gList = []

    allTargets.forEach((target) => {
      const start = new THREE.Vector3(...codexPosition)
      const end = new THREE.Vector3(...target.pos)
      // Midpoint pulled outward/upward for an elegant organic arc
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
      mid.z += 0.25
      mid.x *= 0.8

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      cList.push({ curve, color: target.color })

      const points = curve.getPoints(32)
      const geom = new THREE.BufferGeometry().setFromPoints(points)
      gList.push({ geom, color: target.color })
    })

    return { curves: cList, lineGeometries: gList }
  }, [codexPosition, capPosition, nodes])

  // Spark pulses traveling along the curves
  useFrame((state) => {
    if (shouldReduceMotion) return
    const t = state.clock.getElapsedTime()

    pulsesRef.current.forEach((mesh, idx) => {
      if (!mesh || !curves[idx]) return
      // Calculate normalized progress along the curve
      const speed = 0.4 + (idx % 3) * 0.12
      const progress = (t * speed + idx * 0.22) % 1
      const pt = curves[idx].curve.getPointAt(progress)
      mesh.position.copy(pt)
    })
  })

  return (
    <group>
      {/* Curved Energy Filaments */}
      {lineGeometries.map((item, idx) => (
        <line key={idx} geometry={item.geom}>
          <lineBasicMaterial
            color={item.color}
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}

      {/* Traveling Data Pulses */}
      {curves.map((item, idx) => (
        <mesh
          key={`pulse-${idx}`}
          ref={(el) => (pulsesRef.current[idx] = el)}
        >
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={item.color}
            emissiveIntensity={2.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export default LearningPathway
