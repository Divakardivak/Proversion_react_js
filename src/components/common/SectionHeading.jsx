import { motion } from 'framer-motion'
import { fadeUp, staggerChildren } from '@/animations/variants'
import { viewportPresets } from '@/animations/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './SectionHeading.css'

/**
 * Reusable SectionHeading component with badge, title, and optional description.
 * @param {Object} props
 * @param {string} [props.tag] - Eyebrow badge text
 * @param {React.ReactNode} props.title - Main heading title
 * @param {React.ReactNode} [props.description] - Subheading/description text
 * @param {'left' | 'center' | 'right'} [props.align='center'] - Alignment
 * @param {string} [props.className='']
 */
export function SectionHeading({
  tag,
  title,
  description,
  align = 'center',
  className = '',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion ? {} : staggerChildren
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <motion.div
      className={`ui-section-heading ui-section-heading--${align} ${className}`.trim()}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportPresets.standard}
      {...rest}
    >
      {tag && (
        <motion.span className="ui-section-heading__tag" variants={itemVariants}>
          {tag}
        </motion.span>
      )}

      <motion.h2 className="ui-section-heading__title" variants={itemVariants}>
        {title}
      </motion.h2>

      {description && (
        <motion.p className="ui-section-heading__description" variants={itemVariants}>
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
