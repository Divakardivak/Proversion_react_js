import { useMemo, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import { RobotCompanion } from './RobotCompanion'
import { ParticleField } from '@/components/three/ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * HeroScene Component
 * True 3D WebGL Canvas rendering the Robot Companion with cinematic purple rim lighting,
 * atmospheric particles, and real-time cursor tracking.
 */
export function HeroScene({ isMobile = false }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '40px 0px' })
  const shouldReduceMotion = useReducedMotion()

  const cameraPosition = useMemo(
    () => (isMobile ? [0, -0.08, 8.4] : [0, -0.06, 7.6]),
    [isMobile]
  )

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: isMobile ? '420px' : '560px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: isMobile ? 38 : 34 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true, // Transparent canvas background to blend seamlessly into website
          powerPreference: 'high-performance',
        }}
        frameloop={shouldReduceMotion || !isInView ? 'demand' : 'always'}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        {/* Deep Slate Atmospheric Ambient Light */}
        <ambientLight intensity={0.9} color="#0f172a" />

        {/* Primary Crisp Key Light (Front-Top-Right) for clean glossy white highlights */}
        <directionalLight
          position={[3.5, 6, 5]}
          intensity={2.2}
          color="#ffffff"
        />

        {/* Executive Sapphire Blue Rim Light (Back-Right-Top) */}
        <directionalLight
          position={[5.5, 4.5, -4]}
          intensity={3.8}
          color="#60a5fa"
        />

        {/* Secondary Sky Blue Rim Light (Back-Left) for symmetrical glowing silhouette */}
        <directionalLight
          position={[-5, 3.5, -3.5]}
          intensity={2.5}
          color="#38bdf8"
        />

        {/* Soft Cool Azure Fill Light (Front-Left-Bottom) */}
        <directionalLight
          position={[-5, -1.5, 4]}
          intensity={1.4}
          color="#0ea5e9"
        />

        {/* Ground Rim Glow Light beneath the rocky platform */}
        <pointLight
          position={[0, -2, 1.5]}
          intensity={2.8}
          distance={5}
          color="#2563eb"
        />

        <Suspense fallback={null}>
          {/* True 3D Robot Companion */}
          <RobotCompanion isMobile={isMobile} />

          {/* Floating Atmospheric Spark Particles */}
          <ParticleField
            count={isMobile ? 32 : 65}
            color="#38bdf8"
            size={0.026}
            radius={6.5}
            speed={0.03}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene
