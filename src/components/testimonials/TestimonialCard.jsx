import { Star, Quote } from 'lucide-react'

/**
 * TestimonialCard Component.
 * Presents an individual student story with authentic ProVersion content.
 * Supports active spotlight state, photo avatars, and verified LinkedIn profiles.
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
              fill="#FFD700"
              color="#FFD700"
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
        <div className="ui-testimonial-card__author-main">
          {/* Photo Avatar with Fallback to Initials */}
          <div
            className="ui-testimonial-card__avatar-wrap"
            style={{
              borderColor: `${testimonial.accentColor}66`,
              boxShadow: `0 0 16px ${testimonial.accentColor}25`,
            }}
          >
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="ui-testimonial-card__avatar-img"
                style={{ objectPosition: testimonial.imagePosition || 'center' }}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.parentElement?.querySelector(
                    '.ui-testimonial-card__avatar-fallback'
                  )
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
            ) : null}
            <div
              className="ui-testimonial-card__avatar-fallback"
              style={{
                display: testimonial.image ? 'none' : 'flex',
                background: `linear-gradient(135deg, ${testimonial.accentColor}33 0%, rgba(9, 5, 20, 0.95) 100%)`,
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              {testimonial.initials}
            </div>
          </div>

          <div className="ui-testimonial-card__author-info">
            <h4 className="ui-testimonial-card__author-name">{testimonial.name}</h4>
            <p className="ui-testimonial-card__author-role">{testimonial.role}</p>
          </div>
        </div>

        {/* Verified LinkedIn Badge / Link */}
        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-testimonial-card__linkedin-btn"
            title={`View ${testimonial.name}'s verified profile on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`${testimonial.name} on LinkedIn`}
          >
            <svg
              className="ui-testimonial-card__linkedin-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span className="ui-testimonial-card__linkedin-text">LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default TestimonialCard
