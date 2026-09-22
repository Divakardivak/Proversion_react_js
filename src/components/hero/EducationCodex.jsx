import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Creates a procedural canvas texture representing futuristic code and educational formulas.
 */
function createPageTexture(isLeft = true) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Dark obsidian-violet page background
  ctx.fillStyle = '#0f0826'
  ctx.fillRect(0, 0, 512, 512)

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.12)'
  ctx.lineWidth = 1
  for (let x = 32; x < 512; x += 32) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 512)
    ctx.stroke()
  }
  for (let y = 32; y < 512; y += 32) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }

  // Glowing educational header
  ctx.fillStyle = '#a78bfa'
  ctx.font = 'bold 22px monospace'
  ctx.fillText(isLeft ? 'MODULE: FOUNDATION' : 'ALGORITHM: MASTERY', 40, 56)

  ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(40, 68)
  ctx.lineTo(472, 68)
  ctx.stroke()

  // Code and educational lines
  const lines = isLeft
    ? [
        'import { Future, Career } from "proversion"',
        'async function elevateStudent(mind) {',
        '  const skills = await train({',
        '    tracks: ["AI", "Cloud", "FullStack"],',
        '    mentors: "MNC Veterans (10+ Yrs)",',
        '    realWorldProjects: true,',
        '  });',
        '  return mind.integrate(skills);',
        '}',
        '// 100% Practical Industry Immersion',
        'export default elevateStudent;',
      ]
    : [
        '∇L(θ) = E[ ∇ log P(Success | Effort) ]',
        'while (career.inProgress) {',
        '  const placement = await matchMNC({',
        '    portfolio: verifiedCapstones,',
        '    mockInterviews: passed,',
        '    placementAssurance: 1.0,',
        '  });',
        '  yield placement.celebrate();',
        '}',
        '// Bridging Academic Theory to MNCs',
        'status: "OFFER ACCEPTED ★"',
      ]

  lines.forEach((line, idx) => {
    const isHighlight = line.includes('★') || line.includes('proversion') || line.includes('100%')
    ctx.fillStyle = isHighlight ? '#38bdf8' : 'rgba(226, 232, 240, 0.75)'
    ctx.font = isHighlight ? 'bold 16px monospace' : '15px monospace'
    ctx.fillText(line, 40, 110 + idx * 34)
  })

  // Page bottom badge
  ctx.fillStyle = 'rgba(167, 139, 250, 0.4)'
  ctx.font = '12px monospace'
  ctx.fillText(isLeft ? 'PAGE 01 / 12 PROGRAMS' : 'PAGE 02 / PLACEMENT 100%', 40, 480)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * EducationCodex - A floating 3D holographic book of knowledge
 * Complete with beveled cover, illuminated pages, metallic spine,
 * and an ascending beam of wisdom.
 */
export function EducationCodex({ position = [0, -0.65, 0] }) {
  const groupRef = useRef()
  const beamRef = useRef()
  const scanRef = useRef()
  const particlesRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  const leftTexture = useMemo(() => createPageTexture(true), [])
  const rightTexture = useMemo(() => createPageTexture(false), [])

  // Floating particles rising from the open codex
  const particleCount = 28
  const { particlePos, particleSpeeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.6
      pos[i * 3 + 1] = Math.random() * 2.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2
      speeds[i] = 0.4 + Math.random() * 0.6
    }
    return { particlePos: pos, particleSpeeds: speeds }
  }, [])

  useFrame((state, delta) => {
    if (shouldReduceMotion) return
    const t = state.clock.getElapsedTime()

    // Majestic slow breathing and gentle tilt
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.1) * 0.06
      groupRef.current.rotation.x = 0.38 + Math.sin(t * 0.7) * 0.03
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05
    }

    // Ascending knowledge light beam pulsing
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.22 + Math.sin(t * 2.2) * 0.07
    }

    // Scanning laser across the book pages
    if (scanRef.current) {
      scanRef.current.position.z = Math.sin(t * 1.6) * 0.75
    }

    // Rising knowledge motes
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position
      const array = posAttr.array
      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += particleSpeeds[i] * delta
        if (array[i * 3 + 1] > 2.4) {
          array[i * 3 + 1] = 0.1
          array[i * 3] = (Math.random() - 0.5) * 1.4
          array[i * 3 + 2] = (Math.random() - 0.5) * 1.0
        }
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central Book Glow Point Light */}
      <pointLight color="#a855f7" intensity={2.8} distance={5} decay={2} position={[0, 0.4, 0.2]} />
      <pointLight color="#38bdf8" intensity={1.8} distance={4} decay={2} position={[0, 0.8, -0.2]} />

      {/* --- Spine & Central Binding --- */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.85, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial
          color="#1e113d"
          metalness={0.9}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* --- Left Wing (Cover + Pages) --- */}
      <group position={[-0.92, 0, 0]} rotation={[0, 0, 0.14]}>
        {/* Obsidian Hardcover Backing */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.72, 0.04, 1.88]} />
          <meshStandardMaterial
            color="#080318"
            metalness={0.88}
            roughness={0.2}
            emissive="#7c3aed"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Cover Neon Edge Trim */}
        <mesh position={[-0.84, -0.05, 0]}>
          <boxGeometry args={[0.03, 0.045, 1.88]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.8} />
        </mesh>
        {/* Stacked Pages Block */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.66, 0.035, 1.82]} />
          <meshStandardMaterial color="#1a103c" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Top Active Illuminated Page */}
        <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.65, 1.8]} />
          <meshBasicMaterial map={leftTexture} />
        </mesh>
      </group>

      {/* --- Right Wing (Cover + Pages) --- */}
      <group position={[0.92, 0, 0]} rotation={[0, 0, -0.14]}>
        {/* Obsidian Hardcover Backing */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.72, 0.04, 1.88]} />
          <meshStandardMaterial
            color="#080318"
            metalness={0.88}
            roughness={0.2}
            emissive="#38bdf8"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Cover Neon Edge Trim */}
        <mesh position={[0.84, -0.05, 0]}>
          <boxGeometry args={[0.03, 0.045, 1.88]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
        </mesh>
        {/* Stacked Pages Block */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.66, 0.035, 1.82]} />
          <meshStandardMaterial color="#1a103c" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Top Active Illuminated Page */}
        <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.65, 1.8]} />
          <meshBasicMaterial map={rightTexture} />
        </mesh>
      </group>

      {/* --- Scanning Laser Beam across Pages --- */}
      <mesh ref={scanRef} position={[0, 0.06, 0]}>
        <boxGeometry args={[3.2, 0.008, 0.02]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
      </mesh>

      {/* --- Ascending Knowledge Light Column --- */}
      <mesh ref={beamRef} position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.25, 0.08, 2.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* --- Rising Knowledge Motes (Sparks of Learning) --- */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          color="#38bdf8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default EducationCodex
