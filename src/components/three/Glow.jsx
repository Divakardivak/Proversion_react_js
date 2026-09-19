import * as THREE from 'three'

/**
 * Reusable 3D Glow component.
 * Combines a point light with a soft additive sphere mesh for atmospheric illumination.
 * @param {Object} props
 * @param {string} [props.color='#6366f1']
 * @param {number} [props.intensity=2]
 * @param {number} [props.distance=8]
 * @param {number} [props.size=1.2]
 * @param {[number, number, number]} [props.position=[0, 0, 0]]
 */
export function Glow({
  color = '#6366f1',
  intensity = 2,
  distance = 8,
  size = 1.2,
  position = [0, 0, 0],
  ...rest
}) {
  return (
    <group position={position} {...rest}>
      <pointLight
        color={color}
        intensity={intensity}
        distance={distance}
        decay={2}
      />
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default Glow
