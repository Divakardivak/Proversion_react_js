import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import { ProgramNode } from './ProgramNode'
import { ProgramCore } from './ProgramCore'
import { ProgramOrbitTrack } from './ProgramOrbitTrack'
import { ParticleField } from '@/components/three/ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D Carousel Universe Rig.
 * Smoothly rotates the orbital plane so the selected program sits in the front spotlight.
 * Provides subtle mouse parallax and camera depth dynamics.
 */
function CarouselRig({ programs, selectedId, onSelect, isMobile }) {
  const rotationRef = useRef(0)
  const groupRef = useRef()
  const activeLineRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const selectedIndex = useMemo(() => {
    const idx = programs.findIndex((p) => p.id === selectedId)
    return idx >= 0 ? idx : 0
  }, [programs, selectedId])

  const selectedProgram = programs[selectedIndex] || programs[0]
  const count = programs.length

  // Target angle to bring selected program to angle 0 (front)
  // Shortest path interpolation around circle
  const targetRotation = useMemo(() => {
    return (selectedIndex / count) * Math.PI * 2
  }, [selectedIndex, count])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Smooth rotational interpolation with shortest path handling
    let diff = targetRotation - rotationRef.current
    while (diff < -Math.PI) diff += Math.PI * 2
    while (diff > Math.PI) diff -= Math.PI * 2

    rotationRef.current += diff * (shouldReduceMotion ? 1 : 0.08)

    // Subtle mouse parallax on camera
    if (!shouldReduceMotion) {
      const targetCamX = (state.pointer.x * (isMobile ? 0.2 : 0.4))
      const targetCamY = (state.pointer.y * (isMobile ? 0.15 : 0.3))
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.05)
      state.camera.lookAt(0, 0.1, 0)
    }

    // Active beam pulse
    if (activeLineRef.current) {
      const t = state.clock.getElapsedTime()
      activeLineRef.current.material.opacity = 0.45 + Math.sin(t * 3) * 0.15
    }
  })

  // Compute beam endpoints: from central core to front spotlight
  const beamPoints = useMemo(() => {
    return [
      new THREE.Vector3(0, 0, -0.4),
      new THREE.Vector3(0, 0.15, isMobile ? 1.2 : 1.5),
    ]
  }, [isMobile])

  const beamGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(beamPoints)
  }, [beamPoints])

  return (
    <group ref={groupRef}>
      {/* Central Technological Core in the middle of the system */}
      <group position={[0, 0, -0.4]}>
        <ProgramCore />
      </group>

      {/* Orbital Elliptical Trajectory Track */}
      <ProgramOrbitTrack
        isMobile={isMobile}
        accentColor={selectedProgram?.accentColor || '#7c3aed'}
      />

      {/* Futuristic Focused Laser Energy Beam to Active Node */}
      {selectedProgram && (
        <line ref={activeLineRef} geometry={beamGeometry}>
          <lineBasicMaterial
            color={selectedProgram.accentColor}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      )}

      {/* Program Nodes in Clean 3D Carousel Orbit */}
      {programs.map((prog, idx) => {
        // Compute relative angle for this node given current rotation
        const baseAngle = (idx / count) * Math.PI * 2
        let relativeAngle = baseAngle - rotationRef.current
        while (relativeAngle < -Math.PI) relativeAngle += Math.PI * 2
        while (relativeAngle > Math.PI) relativeAngle -= Math.PI * 2

        const isSelected = prog.id === selectedId

        return (
          <ProgramNode
            key={prog.id}
            program={prog}
            angle={relativeAngle}
            isSelected={isSelected}
            onSelect={() => onSelect(prog.id)}
            isMobile={isMobile}
          />
        )
      })}
    </group>
  )
}

/**
 * ProgramUniverse Canvas wrapper component.
 * @param {Object} props
 * @param {Array<Object>} props.programs - Program list
 * @param {string} props.selectedId - Currently selected program ID
 * @param {(id: string) => void} props.onSelect - Callback on selection
 * @param {boolean} [props.isMobile=false]
 */
export function ProgramUniverse({
  programs,
  selectedId,
  onSelect,
  isMobile = false,
}) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '40px 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: isMobile ? '420px' : '640px',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.3, isMobile ? 7.5 : 6.8],
          fov: isMobile ? 52 : 48,
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={shouldReduceMotion || !isInView ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[8, 10, 8]} intensity={1.2} />
        <directionalLight position={[-8, -6, -4]} intensity={0.5} color="#7c3aed" />

        <Suspense fallback={null}>
          <CarouselRig
            programs={programs}
            selectedId={selectedId}
            onSelect={onSelect}
            isMobile={isMobile}
          />
          <ParticleField
            count={isMobile ? 30 : 65}
            color="#a78bfa"
            size={0.02}
            radius={5.5}
            speed={0.03}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ProgramUniverse
