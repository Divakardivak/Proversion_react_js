import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Button.css'

/**
 * Reusable Button component with multiple variants, sizes, and micro-interactions.
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon = null,
    iconPosition = 'left',
    isLoading = false,
    disabled = false,
    href = null,
    className = '',
    ...rest
  },
  ref
) {
  const shouldReduceMotion = useReducedMotion()

  const classes = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    disabled || isLoading ? 'ui-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: disabled || isLoading ? {} : { scale: 1.02 },
        whileTap: disabled || isLoading ? {} : { scale: 0.98 },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }

  const content = (
    <>
      {isLoading && <span className="ui-btn__spinner" aria-hidden="true" />}
      {!isLoading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className={classes}
      disabled={disabled || isLoading}
      {...motionProps}
      {...rest}
    >
      {content}
    </motion.button>
  )
})

export default Button
