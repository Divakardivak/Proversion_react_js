import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { AboutCard } from './AboutCard'
import { aboutData } from '@/data/company'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, staggerChildren } from '@/animations/variants'
import './About.css'

/**
 * About Section: ProVersion Philosophy
 * Two-column composition with left narrative and right 3D progressive floating panels.
 */
export function About() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion ? {} : staggerChildren
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section id="about" className="ui-about" aria-label="About ProVersion">
      {/* Background Ambient Glows */}
      <div className="ui-about__bg-glow" aria-hidden="true" />
      <div className="ui-about__bg-glow-right" aria-hidden="true" />

      <Container size="xl">
        <div className="ui-about__grid">
          {/* Left Column: Heading & Narrative */}
          <motion.div
            className="ui-about__content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="ui-about__badge" variants={itemVariants}>
              <Sparkles size={14} />
              <span>{aboutData.eyebrow}</span>
            </motion.div>

            <motion.h2 className="ui-about__title" variants={itemVariants}>
              Bridging the Gap Between{' '}
              <span className="text-gradient-brand">Academia & Industry</span>
            </motion.h2>

            <motion.p className="ui-about__description" variants={itemVariants}>
              {aboutData.description}
            </motion.p>

            <motion.blockquote className="ui-about__quote" variants={itemVariants}>
              &ldquo;We transform academic knowledge into real-world technological
              leadership through continuous mentor guidance and project execution.&rdquo;
            </motion.blockquote>
          </motion.div>

          {/* Right Column: 3D Floating Information Panels */}
          <div className="ui-about__cards-wrapper">
            <div className="ui-about__cards-container">
              {aboutData.pillars.map((pillar, index) => (
                <AboutCard key={pillar.id} pillar={pillar} index={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
