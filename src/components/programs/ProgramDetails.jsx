import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Award, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { CourseDetailsModal } from '@/components/courseDetails'

/**
 * React HTML Details Panel for the currently selected program.
 * Streamlined visual hierarchy:
 * Category -> Program title -> Description -> Curriculum highlights -> CTA.
 * Kept compact and non-intrusive to ensure the 3D Program Universe is the primary visual anchor.
 * @param {Object} props
 * @param {Object} props.program - Active program data
 */
export function ProgramDetails({ program }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!program) return null

  const handleEnroll = (courseName) => {
    if (courseName && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-program', { detail: courseName }))
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="ui-program-details">
      <AnimatePresence mode="wait">
        <motion.div
          key={program.id}
          className="ui-program-details__card"
          style={{
            '--card-accent': program.accentColor,
          }}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* 1. Category Eyebrow & Authentic Metadata Badges */}
          <div className="ui-program-details__category-row">
            <span
              className="ui-program-details__category-badge"
              style={{
                color: program.accentColor,
                borderColor: `${program.accentColor}44`,
                background: `${program.accentColor}12`,
              }}
            >
              {program.category}
            </span>

            <span className="ui-program-details__meta-badge">
              <Clock size={12} color="var(--accent-cyan)" />
              <span>{program.duration}</span>
            </span>

            <span className="ui-program-details__meta-badge">
              <Award size={12} color="var(--accent-emerald)" />
              <span>{program.internship}</span>
            </span>
          </div>

          {/* 2. Dominant Program Title */}
          <h3 className="ui-program-details__title">{program.title}</h3>

          {/* 3. Description */}
          <p className="ui-program-details__description">
            {program.description}
          </p>

          {/* 4. Curriculum Highlights */}
          <div className="ui-program-details__tech-section">
            <h4 className="ui-program-details__tech-heading">Curriculum Highlights:</h4>
            <div className="ui-program-details__tech-grid">
              {program.technologies.map((tech, index) => (
                <div key={index} className="ui-program-details__tech-pill">
                  <CheckCircle2 size={13} color={program.accentColor} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Compact Action CTAs */}
          <div className="ui-program-details__actions">
            <MagneticButton strength={0.2}>
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                onClick={() => handleEnroll(program.title)}
                icon={<ArrowRight size={15} />}
                iconPosition="right"
              >
                Enroll Now
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                icon={<BookOpen size={14} />}
                iconPosition="left"
              >
                View Syllabus
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive 5-Tab Course Deep-Dive Modal */}
      <CourseDetailsModal
        course={program}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEnroll={handleEnroll}
      />
    </div>
  )
}

export default ProgramDetails
