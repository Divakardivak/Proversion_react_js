import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import { CentralCore } from './CentralCore'
import { TechnologyNode } from './TechnologyNode'
import { ConnectionLines } from './ConnectionLines'
import { ParticleField } from '@/components/three/ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Clean, symmetrical flagship technology nodes with zero overlap and ample breathing room
const DESKTOP_NODES = [
  { name: 'AI & ML', position: [0, 2.22, 0.15], color: '#38BDF8', phase: 0 },
  { name: 'Full Stack', position: [2.35, 1.05, -0.1], color: '#FFB81C', phase: 1 },
  { name: 'Data Analytics', position: [2.15, -1.25, 0.1], color: '#22D3EE', phase: 2 },
  { name: 'IoT & Edge AI', position: [0, -2.22, -0.15], color: '#FFC928', phase: 3 },
  { name: 'Cybersecurity', position: [-2.15, -1.25, 0.1], color: '#7C3AED', phase: 4 },
  { name: 'Cloud AWS', position: [-2.35, 1.05, -0.1], color: '#2563EB', phase: 5 },
]

// Mobile nodes with clean safe bounds
const MOBILE_NODES = [
  { name: 'AI & ML', position: [0, 1.85, 0.1], color: '#38BDF8', phase: 0 },
  { name: 'Full Stack', position: [1.45, 0.5, -0.1], color: '#FFB81C', phase: 1 },
  { name: 'Cybersecurity', position: [-1.45, -0.5, 0.1], color: '#7C3AED', phase: 2 },
  { name: 'Cloud AWS', position: [0, -1.85, -0.1], color: '#2563EB', phase: 3 },
]

/**
 * SceneRig handles subtle mouse parallax and scroll rotation directly inside RAF.
 * Zero React re-renders on scroll.
 */
function SceneRig({ isMobile }) {
  const groupRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion || !groupRef.current) return

    // Read scroll offset directly from window inside RAF loop (zero React re-renders)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const scrollProgress = Math.min(1, Math.max(0, scrollY / (window.innerHeight || 800)))

    // Cinematic, subtle mouse parallax
    const targetX = state.pointer.x * (isMobile ? 0.1 : 0.18)
    const targetY = state.pointer.y * (isMobile ? 0.08 : 0.14)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX + scrollProgress * 0.6,
      0.03
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.35,
      0.03
    )
  })

  const nodes = isMobile ? MOBILE_NODES : DESKTOP_NODES

  return (
    <group ref={groupRef}>
      {/* Central ProVersion Technological Core */}
      <CentralCore />

      {/* Floating Technology Nodes with 3D Depth Layering */}
      {nodes.map((node) => (
        <TechnologyNode
          key={node.name}
          name={node.name}
          position={node.position}
          color={node.color}
          phase={node.phase}
        />
      ))}

      {/* Subtle Network Connection Lines */}
      <ConnectionLines nodes={nodes} />
    </group>
  )
}

/**
 * HeroScene R3F Canvas component with safe camera framing and DPR capping.
 * @param {Object} props
 * @param {boolean} [props.isMobile=false]
 */
export function HeroScene({ isMobile = false }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '40px 0px' })
  const shouldReduceMotion = useReducedMotion()

  const cameraPosition = useMemo(
    () => (isMobile ? [0, 0, 8.4] : [0, 0, 7.8]),
    [isMobile]
  )

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: isMobile ? '380px' : '520px',
      }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: 42 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={shouldReduceMotion || !isInView ? 'demand' : 'always'}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.1} color="#FFD866" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#38BDF8" />

        <Suspense fallback={null}>
          <SceneRig isMobile={isMobile} />
          <ParticleField
            count={isMobile ? 30 : 65}
            color="#38BDF8"
            size={0.022}
            radius={6.5}
            speed={0.035}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene
