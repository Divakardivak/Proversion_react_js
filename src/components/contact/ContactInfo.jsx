import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'
import { contactDetails } from '@/data/contact'

/**
 * ContactInfo Component.
 * Presents authentic ProVersion contact methods with interactive links.
 */
export function ContactInfo() {
  const { headquarters, phone, email, whatsapp, socials } = contactDetails

  return (
    <div className="ui-contact-info">
      {/* Contact Cards Grid */}
      <div className="ui-contact-info__cards">
        {/* Phone Card */}
        <a
          href={`tel:${phone.value}`}
          className="ui-contact-card ui-contact-card--interactive"
          aria-label={`Call ProVersion at ${phone.display}`}
        >
          <div className="ui-contact-card__icon" style={{ color: 'var(--accent-cyan)' }}>
            <Phone size={20} />
          </div>
          <div className="ui-contact-card__content">
            <span className="ui-contact-card__label">Admissions Hotline</span>
            <span className="ui-contact-card__value">{phone.display}</span>
            <span className="ui-contact-card__hint">{phone.actionText} &rarr;</span>
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${email.value}`}
          className="ui-contact-card ui-contact-card--interactive"
          aria-label={`Email ProVersion at ${email.display}`}
        >
          <div className="ui-contact-card__icon" style={{ color: 'var(--accent-primary)' }}>
            <Mail size={20} />
          </div>
          <div className="ui-contact-card__content">
            <span className="ui-contact-card__label">Email Support</span>
            <span className="ui-contact-card__value">{email.display}</span>
            <span className="ui-contact-card__hint">{email.actionText} &rarr;</span>
          </div>
        </a>

        {/* WhatsApp Card */}
        <a
          href={whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ui-contact-card ui-contact-card--interactive"
          aria-label="Chat with ProVersion on WhatsApp"
        >
          <div className="ui-contact-card__icon" style={{ color: 'var(--accent-emerald)' }}>
            <MessageCircle size={20} />
          </div>
          <div className="ui-contact-card__content">
            <span className="ui-contact-card__label">Instant Messaging</span>
            <span className="ui-contact-card__value">{whatsapp.display}</span>
            <span className="ui-contact-card__hint">{whatsapp.actionText} &rarr;</span>
          </div>
        </a>

        {/* Headquarters Address Card */}
        <div className="ui-contact-card ui-contact-card--static">
          <div className="ui-contact-card__icon" style={{ color: 'var(--accent-amber)' }}>
            <MapPin size={20} />
          </div>
          <div className="ui-contact-card__content">
            <span className="ui-contact-card__label">{headquarters.title}</span>
            <address className="ui-contact-card__address">
              <p>{headquarters.addressLine1}</p>
              <p>{headquarters.addressLine2}</p>
              <p>{headquarters.addressLine3}</p>
            </address>
          </div>
        </div>
      </div>

      {/* Social Links Row */}
      <div className="ui-contact-info__socials">
        <span className="ui-contact-info__socials-label">Follow ProVersion:</span>
        <div className="ui-contact-info__socials-links">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-contact-social-btn"
              aria-label={social.ariaLabel}
            >
              <span>{social.name}</span>
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
