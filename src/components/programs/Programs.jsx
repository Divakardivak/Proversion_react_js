import { useState, useMemo, useEffect, useCallback } from 'react'
import { Sparkles, Layers } from 'lucide-react'
import { programsData, programCategories } from '@/data/programs'
import { ProgramUniverse } from './ProgramUniverse'
import { ProgramDetails } from './ProgramDetails'
import { ProgramNavigation } from './ProgramNavigation'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import './Programs.css'

/**
 * Checks if WebGL is supported in the current browser environment.
 */
function isWebGLAvailable() {
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Main Programs Section Component.
 * Implements the immersive "Program Universe" 3D ecosystem
 * with React HTML details panel, category filters, and accessible stepper.
 */
export function Programs() {
  const [selectedId, setSelectedId] = useState('ai-ml')
  const [activeCategory, setActiveCategory] = useState('All Programs')
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Verify WebGL availability and screen size
  useEffect(() => {
    setHasWebGL(isWebGLAvailable())

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter programs based on active category
  const filteredPrograms = useMemo(() => {
    if (activeCategory === 'All Programs') {
      return programsData
    }
    return programsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Ensure selected program exists in filtered list
  useEffect(() => {
    const exists = filteredPrograms.some((p) => p.id === selectedId)
    if (!exists && filteredPrograms.length > 0) {
      setSelectedId(filteredPrograms[0].id)
    }
  }, [filteredPrograms, selectedId])

  // Active program object
  const activeProgram = useMemo(() => {
    return (
      filteredPrograms.find((p) => p.id === selectedId) ||
      filteredPrograms[0] ||
      programsData[0]
    )
  }, [filteredPrograms, selectedId])

  // Stepper calculations
  const currentIndex = useMemo(() => {
    const idx = filteredPrograms.findIndex((p) => p.id === selectedId)
    return idx >= 0 ? idx : 0
  }, [filteredPrograms, selectedId])

  const totalCount = filteredPrograms.length

  const handlePrev = useCallback(() => {
    if (totalCount === 0) return
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount
    setSelectedId(filteredPrograms[prevIndex].id)
  }, [currentIndex, totalCount, filteredPrograms])

  const handleNext = useCallback(() => {
    if (totalCount === 0) return
    const nextIndex = (currentIndex + 1) % totalCount
    setSelectedId(filteredPrograms[nextIndex].id)
  }, [currentIndex, totalCount, filteredPrograms])

  const handleCategorySelect = useCallback((category) => {
    setActiveCategory(category)
  }, [])

  return (
    <section id="programs" className="ui-programs" aria-label="ProVersion Academic & Career Programs">
      {/* Ambient background glows */}
      <div className="ui-programs__bg-glow" aria-hidden="true" />
      <div className="ui-programs__bg-glow-right" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <div className="ui-programs__header">
          <Reveal direction="down" distance={20} duration={0.6}>
            <span className="ui-programs__badge">
              <Sparkles size={13} />
              PROGRAM UNIVERSE
            </span>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.1}>
            <h2 className="ui-programs__title">
              Explore Cutting-Edge Technology Programs
            </h2>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.2}>
            <p className="ui-programs__tagline">
              Interactive 3D curriculum ecosystem designed to bridge academic
              foundations with high-impact industry careers.
            </p>
          </Reveal>
        </div>

        {/* 3D Universe + Details Grid */}
        <div className="ui-programs__grid">
          {/* Left: 3D Scene or Fallback */}
          <div className="ui-programs__universe-wrapper">
            {hasWebGL ? (
              <ProgramUniverse
                programs={filteredPrograms}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isMobile={isMobile}
              />
            ) : (
              <div className="ui-programs__fallback" role="list" aria-label="Program list fallback">
                <div className="ui-programs__fallback-grid">
                  {filteredPrograms.map((prog) => (
                    <button
                      key={prog.id}
                      type="button"
                      className={`ui-programs__fallback-card ${
                        prog.id === selectedId ? 'ui-programs__fallback-card--active' : ''
                      }`}
                      onClick={() => setSelectedId(prog.id)}
                    >
                      <h4 style={{ color: prog.accentColor, marginBottom: '0.25rem' }}>
                        {prog.title}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {prog.category} • {prog.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Category filters, Stepper & Detailed Panel */}
          <div className="ui-programs__details-column">
            <ProgramNavigation
              currentIndex={currentIndex}
              totalCount={totalCount}
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
              onPrev={handlePrev}
              onNext={handleNext}
            />

            <ProgramDetails program={activeProgram} />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Programs
