import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * TestimonialNavigation Component.
 * Provides accessible Prev / Next controls and dynamic counter (01 / 04).
 * @param {Object} props
 * @param {number} props.currentIndex - Current active index (0-based)
 * @param {number} props.totalCount - Total number of testimonials
 * @param {() => void} props.onPrev - Previous callback
 * @param {() => void} props.onNext - Next callback
 */
export function TestimonialNavigation({
  currentIndex,
  totalCount,
  onPrev,
  onNext,
}) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0')
  const formattedTotal = String(totalCount).padStart(2, '0')

  return (
    <div className="ui-testimonial-nav" aria-label="Testimonial navigation controls">
      <button
        type="button"
        className="ui-testimonial-nav__btn"
        onClick={onPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} />
        <span className="ui-testimonial-nav__btn-text">Previous</span>
      </button>

      <div className="ui-testimonial-nav__counter" aria-live="polite">
        <span className="ui-testimonial-nav__counter-current">{formattedIndex}</span>
        <span className="ui-testimonial-nav__counter-divider">/</span>
        <span className="ui-testimonial-nav__counter-total">{formattedTotal}</span>
      </div>

      <button
        type="button"
        className="ui-testimonial-nav__btn"
        onClick={onNext}
        aria-label="Next testimonial"
      >
        <span className="ui-testimonial-nav__btn-text">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default TestimonialNavigation
