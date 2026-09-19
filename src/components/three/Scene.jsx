import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Reusable 3D Scene container.
 * Wraps @react-three/fiber Canvas with optimal defaults, DPR clamping, and lighting.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Object} [props.camera={ position: [0, 0, 5], fov: 45 }]
 * @param {boolean} [props.ambientLight=true]
 * @param {string} [props.className='']
 * @param {Object} [props.style]
 */
export function Scene({
  children,
  camera = { position: [0, 0, 5], fov: 45 },
  ambientLight = true,
  className = '',
  style = {},
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={`ui-3d-scene ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '200px',
        ...style,
      }}
    >
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={shouldReduceMotion ? 'demand' : 'always'}
        {...rest}
      >
        <Suspense fallback={null}>
          {ambientLight && <ambientLight intensity={0.6} />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
