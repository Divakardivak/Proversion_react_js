import { ChevronLeft, ChevronRight } from 'lucide-react'
import { programCategories } from '@/data/programs'

/**
 * ProgramNavigation component.
 * Provides accessible Prev/Next controls, monospace counter (01 / 12),
 * and a compact, non-wrapping horizontal scrolling category filter bar.
 * @param {Object} props
 * @param {number} props.currentIndex - Current program index (0-based)
 * @param {number} props.totalCount - Total number of programs in current filter
 * @param {string} props.activeCategory - Selected category filter
 * @param {(cat: string) => void} props.onSelectCategory - Category selection handler
 * @param {() => void} props.onPrev - Previous program handler
 * @param {() => void} props.onNext - Next program handler
 */
export function ProgramNavigation({
  currentIndex,
  totalCount,
  activeCategory,
  onSelectCategory,
  onPrev,
  onNext,
}) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0')
  const formattedTotal = String(totalCount).padStart(2, '0')

  return (
    <div className="ui-program-nav">
      {/* Category Filter: Single horizontal row on desktop, touch scroll on mobile */}
      <div
        className="ui-program-nav__categories"
        role="tablist"
        aria-label="Program category filters"
      >
        {programCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`ui-program-nav__category-btn ${
              activeCategory === category ? 'ui-program-nav__category-btn--active' : ''
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stepper Controls: < 01 / 12 > */}
      <div className="ui-program-nav__stepper" aria-label="Program sequence navigation">
        <button
          type="button"
          className="ui-program-nav__step-btn"
          onClick={onPrev}
          aria-label="Previous program"
        >
          <ChevronLeft size={16} />
          <span className="ui-program-nav__step-btn-text">Prev</span>
        </button>

        <div className="ui-program-nav__counter" aria-live="polite">
          <span className="ui-program-nav__counter-current">{formattedIndex}</span>
          <span className="ui-program-nav__counter-divider">/</span>
          <span className="ui-program-nav__counter-total">{formattedTotal}</span>
        </div>

        <button
          type="button"
          className="ui-program-nav__step-btn"
          onClick={onNext}
          aria-label="Next program"
        >
          <span className="ui-program-nav__step-btn-text">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default ProgramNavigation
