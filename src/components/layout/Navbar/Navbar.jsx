import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { AnimatedLogo } from '@/components/common/AnimatedLogo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Programs', href: '#programs' },
  { label: 'Career Path', href: '#career-path' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Premium Floating Navbar with scroll-reactive glass styling and responsive mobile drawer.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const lenis = useLenis()

  const handleNavClick = useCallback(
    (e, href) => {
      if (!href || !href.startsWith('#')) return
      e.preventDefault()

      if (href === '#' || href === '#home') {
        if (lenis) {
          lenis.scrollTo(0, { offset: 0 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        window.history.pushState(null, '', ' ')
      } else {
        const target = document.querySelector(href)
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -90 })
          } else {
            target.scrollIntoView({ behavior: 'smooth' })
          }
          window.history.pushState(null, '', href)
        }
      }

      setMobileMenuOpen(false)
    },
    [lenis]
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
          {/* Brand Logo */}
          <a
            href="#"
            className="ui-navbar__brand"
            aria-label="ProVersion Home"
            onClick={(e) => handleNavClick(e, '#')}
          >
            <AnimatedLogo variant="navbar" size="small" />
            <span className="ui-navbar__brand-text">
              PRO<span className="ui-navbar__brand-highlight">VERSION</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="ui-navbar__nav" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="ui-navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions / CTA */}
          <div className="ui-navbar__actions">
            <MagneticButton strength={0.25}>
              <Button
                variant="primary"
                size="md"
                href="#contact"
                icon={<Sparkles size={15} />}
                iconPosition="right"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Start Your Journey
              </Button>
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
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                icon={<Sparkles size={16} />}
                iconPosition="right"
              >
                Start Your Journey
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
