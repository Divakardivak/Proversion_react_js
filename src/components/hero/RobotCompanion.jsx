import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * PBR Materials tuned to match the reference images:
 * - Ultra-glossy white plastic armor with clearcoat
 * - Glossy black metallic mechanical arm joints & armature
 * - Deep obsidian black visor
 * - Radiant cyan emissive smile eyes
 * - Neon purple ear glow rings
 * - Dark volcanic craggy rock terrain
 */
function useRobotMaterials() {
  return useMemo(() => {
    const whiteArmor = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.08,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    })

    const darkJoint = new THREE.MeshStandardMaterial({
      color: '#0e0e16',
      roughness: 0.25,
      metalness: 0.88,
    })

    const visorGlass = new THREE.MeshPhysicalMaterial({
      color: '#030308',
      roughness: 0.02,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    })

    const glowingEye = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      toneMapped: false,
    })

    const glowingEyeCore = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      toneMapped: false,
    })

    const purpleNeon = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      toneMapped: false,
    })

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: '#0f172a',
      roughness: 0.75,
      metalness: 0.12,
      flatShading: false,
    })

    const rockAccent = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.7,
      metalness: 0.15,
      flatShading: false,
    })

    return {
      whiteArmor,
      darkJoint,
      visorGlass,
      glowingEye,
      glowingEyeCore,
      purpleNeon,
      rockMaterial,
      rockAccent,
    }
  }, [])
}

/**
 * Streamlined Futuristic Robot Ear Pod (Headphone Ear-Cup)
 */
function RobotEar({ side = 'left', materials }) {
  const isLeft = side === 'left'
  const sign = isLeft ? -1 : 1

  return (
    <group
      position={[sign * 0.72, 0.02, -0.02]}
      rotation={[0.08, sign * (Math.PI / 2), sign * -0.12]}
    >
      {/* 1. Base Mount Ring (Dark Metallic Bezel hugging helmet) */}
      <mesh material={materials.darkJoint} scale={[1.0, 1.28, 0.35]}>
        <cylinderGeometry args={[0.26, 0.28, 0.12, 36]} />
      </mesh>

      {/* 2. Sleek White Ear-Cup Outer Casing */}
      <mesh material={materials.whiteArmor} position={[0, 0.04, 0]} scale={[0.96, 1.24, 0.32]}>
        <cylinderGeometry args={[0.24, 0.26, 0.1, 36]} />
      </mesh>

      {/* 3. Dark Recessed Center Cavity */}
      <mesh material={materials.darkJoint} position={[0, 0.075, 0]} scale={[0.85, 1.15, 0.25]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 36]} />
      </mesh>

      {/* 4. Glowing Neon Purple/Violet Ring */}
      <mesh material={materials.purpleNeon} position={[0, 0.085, 0]} scale={[0.85, 1.15, 1.0]}>
        <torusGeometry args={[0.15, 0.024, 16, 36]} />
      </mesh>

      {/* 5. Central Glossy Metallic Hub / Disc */}
      <mesh material={materials.visorGlass} position={[0, 0.09, 0]} scale={[0.5, 0.7, 0.2]}>
        <sphereGeometry args={[0.16, 24, 24]} />
      </mesh>

      {/* 6. Glowing Sky Blue Point Light for authentic rim radiance */}
      <pointLight
        position={[0, 0.15, 0]}
        color="#38bdf8"
        intensity={2.2}
        distance={1.4}
      />
    </group>
  )
}

/**
 * Robot Head Assembly
 */
function RobotHead({ headRef, eyesRef, materials }) {
  const eyeOuterGeom = useMemo(() => {
    return new THREE.TorusGeometry(0.09, 0.024, 16, 32, Math.PI * 0.78)
  }, [])

  const eyeInnerGeom = useMemo(() => {
    return new THREE.TorusGeometry(0.09, 0.012, 16, 32, Math.PI * 0.78)
  }, [])

  return (
    <group ref={headRef} position={[0, 0.76, 0]}>
      {/* 1. Main Glossy White Helmet Shell (Capsule/Pebble) */}
      <mesh material={materials.whiteArmor} scale={[1.16, 0.94, 0.96]} castShadow receiveShadow>
        <sphereGeometry args={[0.68, 48, 36]} />
      </mesh>

      {/* 2. Visor Assembly - Positioned PROUDLY on front of helmet */}
      <group position={[0, -0.02, 0.2]}>
        {/* Recessed Visor Rim Bezel */}
        <mesh material={materials.darkJoint} scale={[1.22, 0.82, 0.92]}>
          <sphereGeometry args={[0.55, 36, 28]} />
        </mesh>

        {/* Black Glossy Curved Glass Faceplate */}
        <mesh
          material={materials.visorGlass}
          position={[0, 0, 0.04]}
          scale={[1.18, 0.78, 0.88]}
        >
          <sphereGeometry args={[0.55, 36, 28]} />
        </mesh>

        {/* 3. Glowing Smiling Eyes (^ ^) */}
        <group ref={eyesRef} position={[0, 0.04, 0.54]}>
          <group position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI * 0.11]}>
            <mesh geometry={eyeOuterGeom} material={materials.glowingEye} />
            <mesh geometry={eyeInnerGeom} material={materials.glowingEyeCore} />
          </group>

          <group position={[0.22, 0, 0]} rotation={[0, 0, Math.PI * 0.11]}>
            <mesh geometry={eyeOuterGeom} material={materials.glowingEye} />
            <mesh geometry={eyeInnerGeom} material={materials.glowingEyeCore} />
          </group>

          <pointLight
            position={[0, 0, 0.2]}
            color="#38bdf8"
            intensity={3.5}
            distance={1.6}
          />
        </group>
      </group>

      {/* 4. Streamlined Futuristic Ear Pods */}
      <RobotEar side="left" materials={materials} />
      <RobotEar side="right" materials={materials} />

      {/* 5. Dark Segmented Neck Collar Ring */}
      <mesh material={materials.darkJoint} position={[0, -0.66, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.16, 32]} />
      </mesh>
    </group>
  )
}

/**
 * EXACT Robot Arm & Double Thumbs-Up Hand (👍)
 * Meticulously modeled from the reference crops:
 * 1. Black mechanical ball shoulder
 * 2. Black mechanical upper arm cylinder
 * 3. Black mechanical elbow hinge disc with center rivet
 * 4. Flared white conical forearm armor sleeve
 * 5. Black mechanical wrist collar
 * 6. Pure white glossy glove fist with 3 distinct stacked horizontal fingers
 * 7. Upright white thumb pointing straight UP (👍)
 */
function RobotArm({ side = 'left', materials }) {
  const isLeft = side === 'left'
  const sign = isLeft ? -1 : 1

  return (
    <group>
      {/* 1. Black Mechanical Shoulder Ball Joint */}
      <mesh
        material={materials.darkJoint}
        position={[sign * 0.52, 0.2, 0.04]}
      >
        <sphereGeometry args={[0.15, 24, 24]} />
      </mesh>

      {/* 2. Black Mechanical Upper Arm Armature */}
      <group
        position={[sign * 0.62, 0.08, 0.08]}
        rotation={[0.2, sign * 0.18, sign * -0.58]}
      >
        <mesh material={materials.darkJoint}>
          <cylinderGeometry args={[0.085, 0.085, 0.26, 24]} />
        </mesh>
      </group>

      {/* 3. Black Mechanical Elbow Joint Hinge Disc */}
      <group
        position={[sign * 0.72, -0.06, 0.12]}
        rotation={[0, 0, sign * Math.PI / 2]}
      >
        {/* Main Hinge Disc */}
        <mesh material={materials.darkJoint}>
          <cylinderGeometry args={[0.11, 0.11, 0.08, 28]} />
        </mesh>
        {/* Center Rivet Pin */}
        <mesh material={materials.whiteArmor} position={[0, sign * 0.045, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        </mesh>
      </group>

      {/* 4. Flared White Conical Forearm Armor Sleeve */}
      <group
        position={[sign * 0.68, 0.08, 0.25]}
        rotation={[-1.75, sign * 0.12, sign * 0.28]}
      >
        {/* Flared conical white sleeve: narrower at elbow (top 0.105), wider at wrist (bottom 0.135) */}
        <mesh material={materials.whiteArmor}>
          <cylinderGeometry args={[0.135, 0.105, 0.28, 32]} />
        </mesh>

        {/* 5. Black Mechanical Wrist Collar */}
        <mesh material={materials.darkJoint} position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        </mesh>
      </group>

      {/* 6. Pure White Glove Hand with 3 Horizontal Curled Fingers & Upright Thumb (👍) */}
      <group position={[sign * 0.66, 0.26, 0.38]}>
        {/* Smooth White Palm / Heel (Lateral Side) */}
        <mesh
          material={materials.whiteArmor}
          position={[sign * 0.04, -0.01, 0]}
          scale={[0.12, 0.15, 0.12]}
        >
          <sphereGeometry args={[1, 24, 24]} />
        </mesh>

        {/* 3 DISTINCT GLOSSY WHITE HORIZONTAL FINGERS (Stacked) */}
        {/* Finger 1: Top (Index Finger) */}
        <group position={[sign * -0.02, 0.06, 0.06]}>
          <mesh
            material={materials.whiteArmor}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.04, 0.08, 0.04]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>
        </group>

        {/* Finger 2: Middle Finger */}
        <group position={[sign * -0.02, -0.01, 0.06]}>
          <mesh
            material={materials.whiteArmor}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.04, 0.08, 0.04]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>
        </group>

        {/* Finger 3: Bottom Finger (Ring/Pinky) */}
        <group position={[sign * -0.02, -0.08, 0.06]}>
          <mesh
            material={materials.whiteArmor}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.038, 0.075, 0.038]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>
        </group>

        {/* 7. UPRIGHT GLOSSY WHITE THUMB (Pointing Straight UP! 👍) */}
        <group
          position={[sign * -0.05, 0.14, 0.03]}
          rotation={[-0.08, 0, sign * -0.1]}
        >
          {/* Main Thumb Column */}
          <mesh
            material={materials.whiteArmor}
            position={[0, 0.06, 0]}
            scale={[0.052, 0.11, 0.052]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>

          {/* Rounded Thumb Tip */}
          <mesh
            material={materials.whiteArmor}
            position={[0, 0.15, 0]}
            scale={[0.046, 0.055, 0.046]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>

          {/* Subtle Thumb Base Joint Ring */}
          <mesh
            material={materials.darkJoint}
            position={[0, -0.02, 0]}
          >
            <cylinderGeometry args={[0.048, 0.052, 0.02, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/**
 * Robot Leg & Chunky Tech Boot
 */
function RobotLeg({ side = 'left', materials }) {
  const isLeft = side === 'left'
  const sign = isLeft ? -1 : 1

  return (
    <group position={[sign * 0.28, -0.44, 0]}>
      {/* 1. Black Mechanical Hip Joint */}
      <mesh material={materials.darkJoint}>
        <sphereGeometry args={[0.14, 20, 20]} />
      </mesh>

      {/* 2. White Thigh */}
      <group
        position={[sign * 0.06, -0.18, 0.03]}
        rotation={[0.06, 0, sign * -0.06]}
      >
        <mesh material={materials.whiteArmor} scale={[0.14, 0.18, 0.14]}>
          <sphereGeometry args={[1, 20, 20]} />
        </mesh>

        {/* 3. Black Mechanical Knee Disc */}
        <group position={[0, -0.22, 0]}>
          <mesh material={materials.darkJoint}>
            <sphereGeometry args={[0.12, 18, 18]} />
          </mesh>

          {/* 4. White Shin */}
          <mesh
            material={materials.whiteArmor}
            position={[0, -0.16, 0]}
            scale={[0.15, 0.18, 0.15]}
          >
            <sphereGeometry args={[1, 20, 20]} />
          </mesh>

          {/* 5. Ankle Joint */}
          <group position={[0, -0.28, 0]}>
            <mesh material={materials.darkJoint}>
              <cylinderGeometry args={[0.13, 0.14, 0.06, 20]} />
            </mesh>

            {/* 6. Chunky Tech Boot */}
            <group position={[0, -0.08, 0.08]}>
              {/* White Upper Boot */}
              <mesh material={materials.whiteArmor} scale={[0.22, 0.13, 0.36]}>
                <sphereGeometry args={[1, 20, 20]} />
              </mesh>

              {/* Dark Sole Plate */}
              <mesh
                material={materials.darkJoint}
                position={[0, -0.09, 0]}
                scale={[0.24, 0.05, 0.38]}
              >
                <boxGeometry args={[1, 1, 1]} />
              </mesh>

              {/* Purple Neon Heel Trim */}
              <mesh
                material={materials.purpleNeon}
                position={[0, -0.05, -0.15]}
                scale={[0.18, 0.022, 0.022]}
              >
                <boxGeometry args={[1, 1, 1]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

/**
 * Smooth Natural Boulder under robot feet matching reference mockup
 */
function RockyTerrain({ materials }) {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Natural compact rock directly under the robot */}
      <mesh
        material={materials.rockMaterial}
        position={[0, -1.48, 0]}
        scale={[1.1, 0.28, 0.9]}
        receiveShadow
      >
        <cylinderGeometry args={[0.55, 0.68, 0.7, 18]} />
      </mesh>

      {/* Front natural rock lip */}
      <mesh
        material={materials.rockAccent}
        position={[-0.05, -1.54, 0.25]}
        scale={[0.95, 0.22, 0.5]}
        receiveShadow
      >
        <cylinderGeometry args={[0.5, 0.6, 0.5, 16]} />
      </mesh>

      {/* Subtle blue ground reflection */}
      <mesh position={[0, -1.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.3, 1.0]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/**
 * Main 3D Robot Companion Entity
 */
export function RobotCompanion({ isMobile = false }) {
  const rootRef = useRef()
  const torsoRef = useRef()
  const headRef = useRef()
  const eyesRef = useRef()
  const materials = useRobotMaterials()
  const shouldReduceMotion = useReducedMotion()

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.current.targetX = nx
      mouse.current.targetY = ny
    }

    const handleMouseLeave = () => {
      mouse.current.targetX = 0
      mouse.current.targetY = 0
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useFrame((state, delta) => {
    if (shouldReduceMotion) return

    const time = state.clock.elapsedTime

    // Smooth physics lerping
    const lerpFactor = THREE.MathUtils.clamp(delta * 5.5, 0.01, 0.25)
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, lerpFactor)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, lerpFactor)

    const mx = mouse.current.x
    const my = mouse.current.y

    // 1. Idle Breathing Bobbing Wave
    if (rootRef.current) {
      const breathe = Math.sin(time * 2.0) * 0.026
      rootRef.current.position.y = (isMobile ? -0.1 : 0) + breathe
    }

    // 2. Head Yaw & Pitch Gaze Tracking
    if (headRef.current) {
      const targetHeadYaw = mx * (isMobile ? 0.45 : 0.68)
      const targetHeadPitch = -my * 0.3
      const targetHeadRoll = -mx * 0.06

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetHeadYaw,
        0.09
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetHeadPitch,
        0.09
      )
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        targetHeadRoll,
        0.09
      )
    }

    // 3. Eye Gaze Shift inside Visor
    if (eyesRef.current) {
      const eyeShiftX = mx * 0.045
      const eyeShiftY = my * 0.03
      eyesRef.current.position.x = THREE.MathUtils.lerp(eyesRef.current.position.x, eyeShiftX, 0.1)
      eyesRef.current.position.y = THREE.MathUtils.lerp(
        eyesRef.current.position.y,
        0.04 + eyeShiftY,
        0.1
      )
    }

    // 4. Torso Subtle Follow
    if (torsoRef.current) {
      const targetTorsoYaw = mx * 0.16
      const targetTorsoPitch = -my * 0.05
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(
        torsoRef.current.rotation.y,
        targetTorsoYaw,
        0.05
      )
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(
        torsoRef.current.rotation.x,
        targetTorsoPitch,
        0.05
      )
    }
  })

  // Calibrated scale to ensure comfortable, elegant framing
  const scale = isMobile ? 1.0 : 1.18

  return (
    <group ref={rootRef} position={[isMobile ? 0 : 0.45, -0.06, 0]} scale={[scale, scale, scale]}>
      {/* Torso & Upper Body */}
      <group ref={torsoRef}>
        {/* Glossy White Round Torso / Belly */}
        <group position={[0, 0.05, 0]}>
          <mesh material={materials.whiteArmor} scale={[0.54, 0.62, 0.5]} castShadow receiveShadow>
            <sphereGeometry args={[1, 36, 32]} />
          </mesh>

          {/* ProVersion "P" Chest Emblem matching reference */}
          <group position={[0, 0.08, 0.49]}>
            {/* Soft luminous purple emblem disc */}
            <mesh scale={[0.13, 0.15, 0.02]}>
              <cylinderGeometry args={[1, 1, 1, 32]} />
              <meshBasicMaterial color="#9333ea" toneMapped={false} />
            </mesh>
            {/* Bold white 'P' core */}
            <mesh position={[-0.02, 0, 0.015]} scale={[0.024, 0.18, 0.02]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh position={[0.02, 0.045, 0.015]} rotation={[0, 0, -Math.PI / 2]} scale={[0.06, 0.06, 0.02]}>
              <torusGeometry args={[0.7, 0.28, 16, 24, Math.PI]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* Arms with EXACT Double Thumbs-Up Matching Reference */}
        <RobotArm side="left" materials={materials} />
        <RobotArm side="right" materials={materials} />

        {/* Head with Black Visor & Glowing Eyes */}
        <RobotHead headRef={headRef} eyesRef={eyesRef} materials={materials} />
      </group>

      {/* Legs & Boots */}
      <RobotLeg side="left" materials={materials} />
      <RobotLeg side="right" materials={materials} />

      {/* Rocky Ground Terrain Base */}
      <RockyTerrain materials={materials} />
    </group>
  )
}

export default RobotCompanion
