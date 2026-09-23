import { useState, useEffect } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
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
 * Validates phone format (7 to 16 digits/symbols).
 */
function isValidPhone(phone) {
  return /^[\d\s+\-()]{7,16}$/.test(phone.trim())
}

/**
 * ContactForm Component.
 * Interactive application/inquiry form with real-time validation,
 * dynamic program dropdown from programsData, and transparent status handling.
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: programsData[0]?.title || '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  // Pre-select program if specified in URL query/hash params
  useEffect(() => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)
    const paramProgram = searchParams.get('program') || searchParams.get('course')

    if (paramProgram) {
      const match = programsData.find(
        (p) =>
          p.id.toLowerCase() === paramProgram.toLowerCase() ||
          p.title.toLowerCase().includes(paramProgram.toLowerCase())
      )
      if (match) {
        setFormData((prev) => ({ ...prev, program: match.title }))
      }
    }

    // Listen for cross-component program selection (e.g. from Course Cards or Syllabus Modal)
    const handleSelectProgram = (e) => {
      if (e.detail) {
        const match = programsData.find(
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

  // Validate a single field
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

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const err = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const err = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
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

    // Simulate clean network request without falsely claiming remote SMTP dispatch
    setTimeout(() => {
      setStatus('success')
    }, 850)
  }

  // Reset form to submit another message
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: programsData[0]?.title || '',
      message: '',
    })
    setTouched({})
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="ui-contact-form-card ui-contact-form-card--success" role="status">
        <div className="ui-contact-form-success__icon" aria-hidden="true">
          <CheckCircle2 size={36} color="var(--accent-emerald)" />
        </div>

        <h3 className="ui-contact-form-success__title">Application Form Validated</h3>

        <p className="ui-contact-form-success__text">
          Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>! Your inquiry for{' '}
          <strong style={{ color: '#a78bfa' }}>{formData.program}</strong> has been successfully validated.
        </p>

        <p className="ui-contact-form-success__note">
          <span style={{ color: 'var(--text-muted)' }}>Note: </span>
          This is a client-side frontend demo. No remote backend API is currently configured to receive external emails. You can also connect directly via{' '}
          <a href="tel:+919585340166" style={{ color: '#a78bfa', textDecoration: 'underline' }}>
            +91 95853 40166
          </a>.
        </p>

        <div className="ui-contact-form-success__actions">
          <MagneticButton strength={0.2}>
            <Button variant="glass" size="md" onClick={handleReset}>
              Submit Another Inquiry
            </Button>
          </MagneticButton>
        </div>
      </div>
    )
  }

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

        {/* Program / Interest Dropdown */}
        <div className="ui-form-group">
          <label htmlFor="contact-program" className="ui-form-label">
            Program of Interest <span className="ui-form-required">*</span>
          </label>
          <div className="ui-form-select-wrapper">
            <select
              id="contact-program"
              name="program"
              className="ui-form-select"
              value={formData.program}
              onChange={handleChange}
              disabled={status === 'submitting'}
            >
              {programsData.map((prog) => (
                <option key={prog.id} value={prog.title} className="ui-form-option">
                  {prog.title} ({prog.duration})
                </option>
              ))}
              <option value="Free Entrepreneurship Development Program" className="ui-form-option">
                Free Entrepreneurship Development Program
              </option>
            </select>
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
              {status === 'submitting' ? 'Submitting...' : 'Send Application'}
            </Button>
          </MagneticButton>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
