import './Container.css'

/**
 * Reusable layout Container component.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'max' | 'fluid'} [props.size='xl']
 * @param {string} [props.className='']
 * @param {React.ElementType} [props.as='div']
 */
export function Container({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
  ...rest
}) {
  return (
    <Component
      className={`ui-container ui-container--${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Container
