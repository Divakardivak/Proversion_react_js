import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { smoothScrollTo } from '@/components/common/SmoothScroll'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { AnimatedLogo } from '@/components/common/AnimatedLogo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#', active: true },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#programs' },
  { label: 'Mentors', href: '#why-us' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Blog', href: '#programs' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Premium Floating Navbar with scroll-reactive glass styling and responsive mobile drawer.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleNavClick = useCallback(
    (e, href) => {
      if (!href || !href.startsWith('#')) return
      e.preventDefault()

      if (href === '#' || href === '#home') {
        smoothScrollTo(0, { offset: 0 })
        window.history.pushState(null, '', ' ')
      } else {
        smoothScrollTo(href, { offset: -90 })
        window.history.pushState(null, '', href)
      }

      setMobileMenuOpen(false)
    },
    []
  )

  // High-performance threshold listener: ONLY re-renders when crossing 20px
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const menuVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
          opacity: 0,
          y: -20,
          transition: { duration: 0.25, ease: 'easeIn' },
        },
      }

  return (
    <header className={`ui-navbar ${isScrolled ? 'ui-navbar--scrolled' : ''}`}>
      <Container size="xl">
        <div className="ui-navbar__inner">
          {/* Brand Logo with Mockup-Exact Gradient 'P' Icon */}
          <a
            href="#"
            className="ui-navbar__brand"
            aria-label="ProVersion Home"
            onClick={(e) => handleNavClick(e, '#')}
          >
            <div className="ui-navbar__brand-badge">
              <span>P</span>
            </div>
            <span className="ui-navbar__brand-text">
              Pro<span className="ui-navbar__brand-highlight">Version</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="ui-navbar__nav" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`ui-navbar__link ${link.active ? 'ui-navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions / CTA ("Join Now →") */}
          <div className="ui-navbar__actions">
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                className="ui-navbar__btn-join"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                <span>Join Now</span>
                <ArrowRight size={15} />
              </a>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`ui-navbar__hamburger ${
                mobileMenuOpen ? 'ui-navbar__hamburger--active' : ''
              }`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="ui-navbar__hamburger-line" />
              <span className="ui-navbar__hamburger-line" />
              <span className="ui-navbar__hamburger-line" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="ui-navbar__mobile-overlay"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false)
            }}
          >
            <nav className="ui-navbar__mobile-nav">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="ui-navbar__mobile-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ui-navbar__mobile-actions">
              <a
                href="#contact"
                className="ui-navbar__btn-join mobile-join-btn"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                <span>Join Now</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
