import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D GraduationCap component
 * Symbolizes academic degree completion, career attainment, and high-prestige graduation.
 * Features a diamond mortarboard, skull cap, golden button, swaying tassel, and orbital halo.
 */
export function GraduationCap({ position = [0, 1.85, 0.15], scale = 0.82 }) {
  const capGroupRef = useRef()
  const tasselRef = useRef()
  const haloRef = useRef()
  const sparkRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (shouldReduceMotion) return
    const t = state.clock.getElapsedTime()

    // Smooth floating levitation
    if (capGroupRef.current) {
      capGroupRef.current.position.y = position[1] + Math.sin(t * 1.3) * 0.07
      capGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.12
      capGroupRef.current.rotation.x = -0.15 + Math.cos(t * 0.6) * 0.04
      capGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03
    }

    // Dynamic pendulum sway on the tassel
    if (tasselRef.current) {
      tasselRef.current.rotation.z = Math.sin(t * 2.4) * 0.18
      tasselRef.current.rotation.x = Math.cos(t * 1.8) * 0.12
    }

    // Golden halo orbital rotation
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.45
      haloRef.current.rotation.x = 0.4 + Math.sin(t * 0.6) * 0.1
    }
  })

  return (
    <group ref={capGroupRef} position={position} scale={scale}>
      {/* Prestige Warm Gold & Violet Accent Lights */}
      <pointLight color="#fbbf24" intensity={2.2} distance={4} decay={2} position={[0, 0.6, 0.5]} />
      <pointLight color="#c084fc" intensity={1.5} distance={3} decay={2} position={[0, -0.4, 0]} />

      {/* --- Skull Cap Base (Tapered Cylinder) --- */}
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.44, 0.38, 0.28, 32]} />
        <meshStandardMaterial
          color="#0d061f"
          metalness={0.8}
          roughness={0.3}
          emissive="#581c87"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Skull Cap Gold Trim Ring */}
      <mesh position={[0, -0.27, 0]}>
        <torusGeometry args={[0.39, 0.012, 16, 48]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* --- Diamond Mortarboard (Square Platter rotated 45 deg) --- */}
      <group rotation={[0, Math.PI / 4, 0]}>
        {/* Main Board */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.35, 0.045, 1.35]} />
          <meshStandardMaterial
            color="#12082b"
            metalness={0.88}
            roughness={0.2}
            emissive="#3b0764"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Beveled Golden Edge Border */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.38, 0.02, 1.38]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* --- Center Gold Button --- */}
      <mesh position={[0, 0.055, 0]}>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fbbf24"
          emissiveIntensity={1.8}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* --- Tassel Arm & Swaying Fringe --- */}
      <group position={[0, 0.055, 0]}>
        {/* Horizontal Cord lying across the board towards front-right corner */}
        <mesh position={[0.32, 0, 0.32]} rotation={[0, -Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.72, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.2} />
        </mesh>

        {/* Dynamic Hanging Tassel Group */}
        <group ref={tasselRef} position={[0.55, -0.02, 0.55]}>
          {/* Hanging Cord */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.0} />
          </mesh>

          {/* Tassel Cap Bead */}
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={1.8}
              metalness={0.9}
            />
          </mesh>

          {/* Tassel Fringe Brush */}
          <mesh position={[0, -0.48, 0]}>
            <cylinderGeometry args={[0.038, 0.065, 0.28, 16]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#fbbf24"
              emissiveIntensity={1.4}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* --- Golden Halo of Academic Excellence --- */}
      <group ref={haloRef} rotation={[0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.05, 0.012, 16, 64]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Orbiting Golden Star Spark */}
        <mesh ref={sparkRef} position={[1.05, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#fbbf24"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>
    </group>
  )
}

export default GraduationCap
