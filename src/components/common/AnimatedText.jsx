import { motion } from 'framer-motion'
import { textReveal, staggerChildren } from '@/animations/variants'
import { viewportPresets } from '@/animations/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './AnimatedText.css'

/**
 * AnimatedText component
 * Reveals text word-by-word or character-by-character with staggered entrance.
 * @param {Object} props
 * @param {string} props.text - The text to animate
 * @param {'words' | 'chars'} [props.type='words'] - Reveal mode
 * @param {React.ElementType} [props.as='span'] - HTML element
 * @param {number} [props.stagger=0.04] - Delay between each unit
 * @param {number} [props.delay=0] - Initial delay
 * @param {string} [props.className='']
 */
export function AnimatedText({
  text,
  type = 'words',
  as: Component = 'span',
  stagger = 0.04,
  delay = 0,
  className = '',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <Component className={`ui-animated-text ${className}`.trim()} {...rest}>
        {text}
      </Component>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const MotionComponent = motion[Component] || motion.span

  if (type === 'chars') {
    const characters = Array.from(text)

    return (
      <MotionComponent
        className={`ui-animated-text ${className}`.trim()}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportPresets.standard}
        {...rest}
      >
        {characters.map((char, index) => (
          <span key={index} className="ui-animated-text__word">
            <motion.span
              className="ui-animated-text__char"
              variants={textReveal}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </MotionComponent>
    )
  }

  // Word-by-word animation
  const words = text.split(' ')

  return (
    <MotionComponent
      className={`ui-animated-text ${className}`.trim()}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportPresets.standard}
      {...rest}
    >
      {words.map((word, index) => (
        <span key={index} className="ui-animated-text__word">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={textReveal}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  )
}

export default AnimatedText
