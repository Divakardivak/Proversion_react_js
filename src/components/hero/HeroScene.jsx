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
        {/* Deep Atmospheric Sci-Fi Purple Ambient Light */}
        <ambientLight intensity={0.8} color="#2e1065" />

        {/* Primary Crisp Key Light (Front-Top-Right) for clean glossy white highlights */}
        <directionalLight
          position={[3.5, 6, 5]}
          intensity={2.0}
          color="#ffffff"
        />

        {/* Dramatic Vibrant Violet/Magenta Rim Light (Back-Right-Top) matching the reference */}
        <directionalLight
          position={[5.5, 4.5, -4]}
          intensity={4.2}
          color="#c084fc"
        />

        {/* Secondary Purple Rim Light (Back-Left) for symmetrical glowing silhouette */}
        <directionalLight
          position={[-5, 3.5, -3.5]}
          intensity={2.8}
          color="#a855f7"
        />

        {/* Soft Cool Cyan Fill Light (Front-Left-Bottom) */}
        <directionalLight
          position={[-5, -1.5, 4]}
          intensity={1.2}
          color="#38bdf8"
        />

        {/* Ground Rim Glow Light beneath the rocky platform */}
        <pointLight
          position={[0, -2, 1.5]}
          intensity={3.2}
          distance={5}
          color="#9333ea"
        />

        <Suspense fallback={null}>
          {/* True 3D Robot Companion */}
          <RobotCompanion isMobile={isMobile} />

          {/* Floating Atmospheric Spark Particles */}
          <ParticleField
            count={isMobile ? 32 : 65}
            color="#c084fc"
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
