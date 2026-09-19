import { Star, Quote } from 'lucide-react'

/**
 * TestimonialCard Component.
 * Presents an individual student story with authentic ProVersion content.
 * Supports active spotlight state and floating background states.
 * @param {Object} props
 * @param {Object} props.testimonial - Testimonial data
 * @param {boolean} props.isActive - Whether this card is currently active/spotlighted
 * @param {string} [props.position='center'] - 'center' | 'left' | 'right' | 'hidden'
 * @param {() => void} [props.onSelect] - Selection handler
 */
export function TestimonialCard({
  testimonial,
  isActive = false,
  position = 'center',
  onSelect,
}) {
  return (
    <div
      className={`ui-testimonial-card ui-testimonial-card--${position} ${
        isActive ? 'ui-testimonial-card--active' : 'ui-testimonial-card--floating'
      }`}
      style={{
        '--card-accent': testimonial.accentColor,
      }}
      onClick={!isActive && onSelect ? onSelect : undefined}
      role={!isActive ? 'button' : undefined}
      tabIndex={!isActive ? 0 : undefined}
      aria-label={!isActive ? `Switch to ${testimonial.name}'s testimonial` : undefined}
    >
      {/* Decorative Background Quote Watermark */}
      <div className="ui-testimonial-card__watermark" aria-hidden="true">
        "
      </div>

      {/* Top Row: Category Badge & 5-Star Rating */}
      <div className="ui-testimonial-card__top">
        <span
          className="ui-testimonial-card__badge"
          style={{
            color: testimonial.accentColor,
            borderColor: `${testimonial.accentColor}44`,
            background: `${testimonial.accentColor}12`,
          }}
        >
          {testimonial.badge}
        </span>

        <div className="ui-testimonial-card__rating" aria-label="5 out of 5 stars">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill="#FFB81C"
              color="#FFB81C"
              className="ui-testimonial-card__star"
            />
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      <blockquote className="ui-testimonial-card__quote">
        <Quote size={18} className="ui-testimonial-card__quote-icon" style={{ color: testimonial.accentColor }} />
        <span>"{testimonial.quote}"</span>
      </blockquote>

      {/* Student Author Identity */}
      <div className="ui-testimonial-card__author">
        {/* Geometric Initials Avatar */}
        <div
          className="ui-testimonial-card__avatar"
          style={{
            background: `linear-gradient(135deg, ${testimonial.accentColor}33 0%, rgba(15, 23, 42, 0.95) 100%)`,
            borderColor: `${testimonial.accentColor}66`,
            color: '#ffffff',
          }}
          aria-hidden="true"
        >
          {testimonial.initials}
        </div>

        <div className="ui-testimonial-card__author-info">
          <h4 className="ui-testimonial-card__author-name">{testimonial.name}</h4>
          <p className="ui-testimonial-card__author-role">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
