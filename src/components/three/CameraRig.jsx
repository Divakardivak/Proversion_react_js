import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Reusable CameraRig component.
 * Applies subtle mouse-following parallax tilt to the camera.
 * @param {Object} props
 * @param {number} [props.intensity=0.4] - Intensity of camera movement
 * @param {number} [props.speed=0.05] - Lerp damping speed
 */
export function CameraRig({ intensity = 0.4, speed = 0.05 }) {
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion) return

    // state.pointer holds normalized mouse coords (-1 to 1)
    const targetX = state.pointer.x * intensity
    const targetY = state.pointer.y * intensity

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      speed
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      speed
    )
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default CameraRig
