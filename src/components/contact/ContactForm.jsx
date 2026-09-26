import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Check,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { programsData } from '@/data/programs'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'

/**
 * Validates email format.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validates phone format (min 7 digits).
 */
function isValidPhone(phone) {
  return /^[\d\s+\-()]{7,16}$/.test(phone.trim())
}

// Complete list of all selectable programs with durations
const PROGRAM_OPTIONS = [
  ...programsData.map((prog) => ({
    id: prog.id,
    title: prog.title,
    duration: prog.duration || '120 Days',
    badge: '120 Days',
  })),
  {
    id: 'entrepreneurship-dev',
    title: 'Free Entrepreneurship Development Program',
    duration: 'Free MSME Incubation',
    badge: 'Free MSME',
  },
]

/**
 * ContactForm Component.
 * - Custom glassmorphic Program Dropdown (neat, clean, dark-themed).
 * - Real-time field validation.
 * - Auto-dispatches all user-filled details directly to WhatsApp (+91 95853 40166).
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: PROGRAM_OPTIONS[0]?.title || 'Artificial Intelligence',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close custom dropdown on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false)
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen])

  // Pre-select program if specified in URL query or custom event
  useEffect(() => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)
    const paramProgram = searchParams.get('program') || searchParams.get('course')

    if (paramProgram) {
      const match = PROGRAM_OPTIONS.find(
        (p) =>
          p.id.toLowerCase() === paramProgram.toLowerCase() ||
          p.title.toLowerCase().includes(paramProgram.toLowerCase())
      )
      if (match) {
        setFormData((prev) => ({ ...prev, program: match.title }))
      }
    }

    const handleSelectProgram = (e) => {
      if (e.detail) {
        const match = PROGRAM_OPTIONS.find(
          (p) =>
            p.id.toLowerCase() === e.detail.toLowerCase() ||
            p.title.toLowerCase().includes(e.detail.toLowerCase()) ||
            e.detail.toLowerCase().includes(p.title.toLowerCase())
        )
        if (match) {
          setFormData((prev) => ({ ...prev, program: match.title }))
        } else {
          setFormData((prev) => ({ ...prev, program: e.detail }))
        }
      }
    }
    window.addEventListener('select-program', handleSelectProgram)

    return () => {
      window.removeEventListener('select-program', handleSelectProgram)
    }
  }, [])

  // Validate individual field
  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required.'
        if (value.trim().length < 2) return 'Name must be at least 2 characters.'
        return ''

      case 'email':
        if (!value.trim()) return 'Email address is required.'
        if (!isValidEmail(value)) return 'Please enter a valid email address.'
        return ''

      case 'phone':
        if (!value.trim()) return 'Phone number is required.'
        if (!isValidPhone(value)) return 'Please enter a valid phone number (min 7 digits).'
        return ''

      case 'message':
        if (!value.trim()) return 'Please describe your inquiry or career goals.'
        if (value.trim().length < 5) return 'Message must be at least 5 characters.'
        return ''

      default:
        return ''
    }
  }

  // Handle standard input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const err = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const err = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  // Handle selecting a program in the custom dropdown
  const handleSelectOption = (programTitle) => {
    setFormData((prev) => ({ ...prev, program: programTitle }))
    setIsDropdownOpen(false)
  }

  // Generate WhatsApp message & dispatch
  const getWhatsAppUrl = () => {
    const text = `*🎓 ProVersion Admission Application*
━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${formData.name.trim()}
📧 *Email Address:* ${formData.email.trim()}
📱 *Phone Number:* ${formData.phone.trim()}
🚀 *Program of Interest:* ${formData.program}
💬 *Message / Career Goals:* ${formData.message.trim()}
━━━━━━━━━━━━━━━━━━━━
Submitted via proversion.in portal`

    return `https://wa.me/919585340166?text=${encodeURIComponent(text)}`
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key])
      if (err) newErrors[key] = err
    })

    setTouched({
      name: true,
      email: true,
      phone: true,
      program: true,
      message: true,
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    const whatsappUrl = getWhatsAppUrl()

    setTimeout(() => {
      setStatus('success')
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank')
      }
    }, 350)
  }

  // Reset form to submit another message
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: PROGRAM_OPTIONS[0]?.title || 'Artificial Intelligence',
      message: '',
    })
    setTouched({})
    setErrors({})
    setStatus('idle')
  }

  // Success view with WhatsApp confirmation
  if (status === 'success') {
    const whatsappUrl = getWhatsAppUrl()

    return (
      <div className="ui-contact-form-card ui-contact-form-card--success" role="status">
        <div className="ui-contact-form-success__icon" aria-hidden="true">
          <CheckCircle2 size={40} color="#10b981" />
        </div>

        <h3 className="ui-contact-form-success__title">Application Ready on WhatsApp!</h3>

        <p className="ui-contact-form-success__text">
          Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>! Your application for{' '}
          <strong style={{ color: '#38bdf8' }}>{formData.program}</strong> has been prepared and opened in WhatsApp for our admissions team (+91 95853 40166).
        </p>

        {/* Details Summary Box */}
        <div className="ui-contact-summary-box">
          <div className="summary-item">
            <span className="summary-label">Name:</span>
            <span className="summary-value">{formData.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Program:</span>
            <span className="summary-value">{formData.program}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Phone:</span>
            <span className="summary-value">{formData.phone}</span>
          </div>
        </div>

        <div className="ui-contact-form-success__actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-launch-btn"
          >
            <MessageCircle size={16} />
            <span>Open in WhatsApp Again</span>
          </a>

          <Button variant="glass" size="md" onClick={handleReset}>
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    )
  }

  const selectedOption = PROGRAM_OPTIONS.find((p) => p.title === formData.program) || PROGRAM_OPTIONS[0]

  return (
    <div className="ui-contact-form-card">
      <form className="ui-contact-form" onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="ui-form-group">
          <label htmlFor="contact-name" className="ui-form-label">
            Full Name <span className="ui-form-required">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. John Doe"
            className={`ui-form-input ${errors.name ? 'ui-form-input--error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <span className="ui-form-error" role="alert">
              <AlertCircle size={12} />
              <span>{errors.name}</span>
            </span>
          )}
        </div>

        {/* Email Address & Phone Number (Row) */}
        <div className="ui-form-row">
          <div className="ui-form-group">
            <label htmlFor="contact-email" className="ui-form-label">
              Email Address <span className="ui-form-required">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. john@example.com"
              className={`ui-form-input ${errors.email ? 'ui-form-input--error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'submitting'}
            />
            {errors.email && (
              <span className="ui-form-error" role="alert">
                <AlertCircle size={12} />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          <div className="ui-form-group">
            <label htmlFor="contact-phone" className="ui-form-label">
              Phone Number <span className="ui-form-required">*</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. +91 98765 43210"
              className={`ui-form-input ${errors.phone ? 'ui-form-input--error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'submitting'}
            />
            {errors.phone && (
              <span className="ui-form-error" role="alert">
                <AlertCircle size={12} />
                <span>{errors.phone}</span>
              </span>
            )}
          </div>
        </div>

        {/* Custom Neat & Clean Program Dropdown */}
        <div className="ui-form-group" ref={dropdownRef}>
          <label className="ui-form-label" id="program-dropdown-label">
            Program of Interest <span className="ui-form-required">*</span>
          </label>

          <div className="ui-custom-dropdown-container">
            <button
              type="button"
              id="contact-program-trigger"
              className={`ui-custom-dropdown-trigger ${
                isDropdownOpen ? 'ui-custom-dropdown-trigger--open' : ''
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-labelledby="program-dropdown-label contact-program-trigger"
              disabled={status === 'submitting'}
            >
              <div className="dropdown-trigger-content">
                <span className="dropdown-selected-title">{selectedOption.title}</span>
                <span className="dropdown-selected-badge">{selectedOption.badge}</span>
              </div>
              <ChevronDown
                size={16}
                className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            {/* Custom Glassmorphic Options Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="ui-custom-dropdown-menu"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  role="listbox"
                  aria-labelledby="program-dropdown-label"
                >
                  <div className="dropdown-menu-header">
                    <Sparkles size={12} className="text-cyan" />
                    <span>SELECT YOUR CAREER TRACK ({PROGRAM_OPTIONS.length})</span>
                  </div>

                  <div className="dropdown-options-scroll">
                    {PROGRAM_OPTIONS.map((prog) => {
                      const isSelected = prog.title === formData.program
                      return (
                        <div
                          key={prog.id}
                          className={`ui-custom-dropdown-option ${
                            isSelected ? 'is-selected' : ''
                          }`}
                          onClick={() => handleSelectOption(prog.title)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="option-info">
                            <span className="option-title">{prog.title}</span>
                            <span className="option-badge">{prog.badge}</span>
                          </div>

                          {isSelected && (
                            <Check size={15} className="option-check-icon" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message / Career Goals */}
        <div className="ui-form-group">
          <label htmlFor="contact-message" className="ui-form-label">
            Your Message or Career Goals <span className="ui-form-required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Tell us about your background, career goals, or specific queries..."
            className={`ui-form-textarea ${errors.message ? 'ui-form-input--error' : ''}`}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <span className="ui-form-error" role="alert">
              <AlertCircle size={12} />
              <span>{errors.message}</span>
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="ui-form-actions">
          <MagneticButton strength={0.2}>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={status === 'submitting'}
              icon={
                status === 'submitting' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )
              }
              iconPosition="right"
            >
              {status === 'submitting' ? 'Opening WhatsApp...' : 'Send Application'}
            </Button>
          </MagneticButton>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
