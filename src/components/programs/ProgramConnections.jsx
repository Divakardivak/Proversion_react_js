import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D ProgramConnections component.
 * Renders subdued network lines from the central core to all program nodes,
 * and a smoothly transitioning highlighted connection line for the selected program.
 * @param {Object} props
 * @param {Array<Object>} props.programs - List of active programs
 * @param {string} props.selectedId - Currently selected program ID
 */
export function ProgramConnections({ programs, selectedId }) {
  const subduedMatRef = useRef()
  const activeLineRef = useRef()
  const activeMatRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const selectedProgram = useMemo(
    () => programs.find((p) => p.id === selectedId) || programs[0],
    [programs, selectedId]
  )

  // Buffer geometry positions for subdued lines (all programs)
  const subduedPositions = useMemo(() => {
    const pos = new Float32Array(programs.length * 6)
    programs.forEach((prog, idx) => {
      const i = idx * 6
      pos[i] = 0
      pos[i + 1] = 0
      pos[i + 2] = 0
      pos[i + 3] = prog.orbitPosition[0]
      pos[i + 4] = prog.orbitPosition[1]
      pos[i + 5] = prog.orbitPosition[2]
    })
    return pos
  }, [programs])

  // Active line buffer: connects (0,0,0) to selected node
  const activePositions = useMemo(() => {
    const pos = new Float32Array(6)
    if (selectedProgram) {
      pos[0] = 0
      pos[1] = 0
      pos[2] = 0
      pos[3] = selectedProgram.orbitPosition[0]
      pos[4] = selectedProgram.orbitPosition[1]
      pos[5] = selectedProgram.orbitPosition[2] + 0.85 // Forward elevation of selected node
    }
    return pos
  }, [selectedProgram])

  useFrame((state) => {
    if (shouldReduceMotion) return
    const t = state.clock.getElapsedTime()

    // Smooth subtle pulse on active line
    if (activeMatRef.current) {
      activeMatRef.current.opacity = 0.42 + Math.sin(t * 2) * 0.08
    }

    // Gentle breathing on subdued lines
    if (subduedMatRef.current) {
      subduedMatRef.current.opacity = 0.08 + Math.sin(t * 1.2) * 0.02
    }
  })

  return (
    <group>
      {/* Subdued connections for all nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[subduedPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={subduedMatRef}
          color="#64748b"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Distinct, smooth active connection line for selected node */}
      {selectedProgram && (
        <line ref={activeLineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[activePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={activeMatRef}
            color={selectedProgram.accentColor}
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      )}
    </group>
  )
}

export default ProgramConnections
