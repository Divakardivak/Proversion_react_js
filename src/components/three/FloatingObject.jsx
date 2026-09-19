import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Reusable 3D FloatingObject component.
 * Applies subtle sine-wave floating and gentle rotation.
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - 3D mesh or group to float
 * @param {number} [props.floatSpeed=1]
 * @param {number} [props.rotationSpeed=0.5]
 * @param {number} [props.floatIntensity=0.2]
 * @param {[number, number, number]} [props.position=[0, 0, 0]]
 * @param {[number, number, number]} [props.rotation=[0, 0, 0]]
 */
export function FloatingObject({
  children,
  floatSpeed = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.2,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ...rest
}) {
  const groupRef = useRef()
  const initialY = position[1]
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion || !groupRef.current) return

    const t = state.clock.getElapsedTime()
    // Gentle sine wave floating
    groupRef.current.position.y = initialY + Math.sin(t * floatSpeed) * floatIntensity
    // Subtle rotation
    groupRef.current.rotation.x = rotation[0] + Math.sin(t * rotationSpeed * 0.5) * 0.1
    groupRef.current.rotation.y = rotation[1] + t * rotationSpeed * 0.2
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      {...rest}
    >
      {children || (
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      )}
    </group>
  )
}

export default FloatingObject
