import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ArrowUp,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { AnimatedLogo } from '@/components/common/AnimatedLogo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { programsData } from '@/data/programs'
import { contactDetails } from '@/data/contact'
import './Footer.css'

const QUICK_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Programs', href: '#programs' },
  { label: 'Entrepreneurship', href: '#entrepreneurship' },
  { label: 'Career Path', href: '#career-path' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Final Footer Component
 *
 * Serves as the ultimate destination of the ProVersion website.
 * Features:
 * - Call to Action (Start Your Journey)
 * - Minimal decorative gradient arc and glowing orbit visual
 * - 4-column responsive grid (Brand, Navigation, Curriculums, Contact & Socials)
 * - Smooth "Back to top" control
 * - Dynamic copyright and platform active status
 */
export function Footer() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <footer className="ui-footer" role="contentinfo" aria-label="ProVersion Footer">
      {/* Dynamic Animated Cosmic Trajectory & Orbital Satellites */}
      <div className="ui-footer__visual-container" aria-hidden="true">
        <div className="ui-footer__glow-radial" />
        <div className="ui-footer__glow-pulse" />
        <div className="ui-footer__arc" />
        <div className="ui-footer__arc-shimmer" />

        <div className="ui-footer__orbit-ring ui-footer__orbit-ring--tilt">
          <div className="ui-footer__orbit-dot ui-footer__orbit-dot--gold" />
          <div className="ui-footer__orbit-dot ui-footer__orbit-dot--cyan" />
        </div>

        {/* Dynamic SVG Orbital Trajectory with Traveling Photons */}
        <svg className="ui-footer__orbit-svg" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="footerOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="25%" stopColor="#FFB81C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#FFB81C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <filter id="footerGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Elliptical Orbital Path */}
          <ellipse
            cx="600"
            cy="90"
            rx="540"
            ry="115"
            fill="none"
            stroke="url(#footerOrbitGrad)"
            strokeWidth="1.6"
            strokeDasharray="6 8"
            className="ui-footer__orbit-path"
          />

          {/* Traveling Energy Satellites */}
          <circle r="4.5" fill="#FFB81C" filter="url(#footerGlow)">
            <animateMotion
              path="M 60,90 a 540,115 0 1,0 1080,0 a 540,115 0 1,0 -1080,0"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.8" fill="#38BDF8" filter="url(#footerGlow)">
            <animateMotion
              path="M 60,90 a 540,115 0 1,0 1080,0 a 540,115 0 1,0 -1080,0"
              dur="16s"
              begin="-5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.2" fill="#A855F7" filter="url(#footerGlow)">
            <animateMotion
              path="M 60,90 a 540,115 0 1,0 1080,0 a 540,115 0 1,0 -1080,0"
              dur="20s"
              begin="-10s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <Container size="xl">
        {/* Footer Pre-CTA Banner */}
        <motion.div
          className="ui-footer__cta-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <div className="ui-footer__cta-content">
            <span className="ui-footer__cta-badge">
              <Sparkles size={14} className="ui-footer__badge-icon" />
              <span>TRANSFORM YOUR CAREER</span>
            </span>
            <h2 className="ui-footer__cta-title">
              Ready to Start Your <span className="ui-footer__cta-gradient">Tech Journey?</span>
            </h2>
            <p className="ui-footer__cta-desc">
              Bridge the gap between academic theory and high-growth industry careers.
              Join ProVersion&apos;s next cohort with hands-on enterprise projects and personalized mentorship.
            </p>
          </div>

          <div className="ui-footer__cta-action">
            <MagneticButton strength={0.25}>
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                icon={<ChevronRight size={18} />}
                iconPosition="right"
                className="ui-footer__btn"
              >
                Start Your Journey
              </Button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Main Footer Multi-Column Grid */}
        <motion.div
          className="ui-footer__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={containerVariants}
        >
          {/* Column 1: Brand & Overview */}
          <motion.div className="ui-footer__col ui-footer__col--brand" variants={itemVariants}>
            <p className="ui-footer__col-title">Platform</p>
            <a href="#" className="ui-footer__brand" aria-label="ProVersion Home">
              <AnimatedLogo variant="footer" size="small" />
              <span className="ui-footer__brand-text">
                PRO<span className="ui-footer__brand-highlight">VERSION</span>
              </span>
            </a>

            <p className="ui-footer__description">
              An experiential education and career acceleration platform dedicated to bridging
              academic foundations with industry-grade software engineering, AI, and cloud excellence.
            </p>

            <div className="ui-footer__hq">
              <MapPin size={16} className="ui-footer__hq-icon" aria-hidden="true" />
              <address className="ui-footer__hq-text">
                <span>{contactDetails.headquarters.addressLine1}</span>
                <span>{contactDetails.headquarters.addressLine2}</span>
                <span>{contactDetails.headquarters.addressLine3}</span>
              </address>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="ui-footer__col" variants={itemVariants}>
            <h3 className="ui-footer__col-title">Navigation</h3>
            <ul className="ui-footer__link-list" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="ui-footer__link">
                    <ChevronRight size={13} className="ui-footer__link-arrow" aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Academic & Career Programs */}
          <motion.div className="ui-footer__col" variants={itemVariants}>
            <h3 className="ui-footer__col-title">Programs</h3>
            <ul className="ui-footer__link-list" role="list">
              {programsData.map((program) => (
                <li key={program.id}>
                  <a
                    href={`#programs`}
                    className="ui-footer__link"
                    title={program.title}
                  >
                    <ChevronRight size={13} className="ui-footer__link-arrow" aria-hidden="true" />
                    <span>{program.shortTitle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Social Ecosystem */}
          <motion.div className="ui-footer__col" variants={itemVariants}>
            <h3 className="ui-footer__col-title">Direct Connect</h3>
            <div className="ui-footer__contact-items">
              <a
                href={`tel:${contactDetails.phone.value}`}
                className="ui-footer__contact-entry"
                aria-label={contactDetails.phone.actionText}
              >
                <div className="ui-footer__contact-icon">
                  <Phone size={15} />
                </div>
                <div className="ui-footer__contact-meta">
                  <span className="ui-footer__contact-label">Admissions Hotline</span>
                  <span className="ui-footer__contact-val">{contactDetails.phone.display}</span>
                </div>
              </a>

              <a
                href={`mailto:${contactDetails.email.value}`}
                className="ui-footer__contact-entry"
                aria-label={contactDetails.email.actionText}
              >
                <div className="ui-footer__contact-icon">
                  <Mail size={15} />
                </div>
                <div className="ui-footer__contact-meta">
                  <span className="ui-footer__contact-label">Inquiry Support</span>
                  <span className="ui-footer__contact-val">{contactDetails.email.display}</span>
                </div>
              </a>

              <a
                href={contactDetails.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-footer__contact-entry"
                aria-label={contactDetails.whatsapp.actionText}
              >
                <div className="ui-footer__contact-icon ui-footer__contact-icon--whatsapp">
                  <MessageCircle size={15} />
                </div>
                <div className="ui-footer__contact-meta">
                  <span className="ui-footer__contact-label">WhatsApp Connect</span>
                  <span className="ui-footer__contact-val">Direct Chat</span>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="ui-footer__socials">
              <span className="ui-footer__socials-label">Follow ProVersion</span>
              <div className="ui-footer__social-links">
                {contactDetails.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-footer__social-btn"
                    aria-label={social.ariaLabel}
                  >
                    <span>{social.name}</span>
                    <ExternalLink size={12} className="ui-footer__social-arrow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom Bar: Copyright, Status, Back To Top */}
        <div className="ui-footer__bottom">
          <p className="ui-footer__copyright">
            &copy; {new Date().getFullYear()} ProVersion Innovations Pvt. Ltd. All rights reserved.
          </p>

          <div className="ui-footer__status" aria-label="System status">
            <span className="ui-footer__status-dot" aria-hidden="true" />
            <span>Platform Active &bull; Admissions Open</span>
          </div>

          <button
            type="button"
            className="ui-footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} className="ui-footer__back-icon" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
