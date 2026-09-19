import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Refined WhyUsNode component.
 * Interactive ecosystem node for ASCEND, EVOLVE, and PROPEL.
 * @param {Object} props
 * @param {Object} props.node - Pillar data
 * @param {boolean} props.isActive - Whether this node is currently active
 * @param {boolean} props.isAnyActive - Whether any node is currently active
 * @param {() => void} props.onSelect - Click/touch handler
 * @param {() => void} props.onHover - Hover handler
 */
export function WhyUsNode({
  node,
  isActive,
  isAnyActive,
  onSelect,
  onHover,
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${node.id}`}
      id={`tab-${node.id}`}
      className={`ui-why-us__node ui-why-us__node--${node.position} ${isActive ? 'ui-why-us__node--active' : ''
        } ${isAnyActive && !isActive ? 'ui-why-us__node--dimmed' : ''}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      style={{
        '--node-color': node.color,
      }}
    >
      <div className="ui-why-us__node-pulse" aria-hidden="true" />

      <div className="ui-why-us__node-inner">
        <div className="ui-why-us__node-top">
          <span
            className="ui-why-us__node-dot"
            style={{
              backgroundColor: node.color,
              boxShadow: `0 0 10px ${node.color}`,
            }}
          />
          <span className="ui-why-us__node-badge">Ecosystem Pillar</span>
        </div>

        <div className="ui-why-us__node-title-row">
          <span className="ui-why-us__node-name">{node.name}</span>
          <ArrowUpRight size={16} className="ui-why-us__node-arrow" />
        </div>

        <p className="ui-why-us__node-tagline">{node.tagline}</p>
      </div>
    </motion.button>
  )
}

export default WhyUsNode
