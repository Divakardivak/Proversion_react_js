import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  X,
  Home,
  Compass,
  Award,
  BookOpen,
  Rocket,
  TrendingUp,
  MessageSquareQuote,
  PhoneCall,
  Phone,
  MessageCircle,
  ChevronRight,
} from 'lucide-react'
import { smoothScrollTo } from '@/components/common/SmoothScroll'
import { Container } from '@/components/common/Container'
import { MagneticButton } from '@/components/common/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Navbar.css'

/**
 * Complete Platform Navigation for the Sidebar Drawer
 * Covers all sections matching platform structure and footer navigation.
 */
const ALL_NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home', num: '01', icon: Home, badge: 'Overview', desc: 'Hero & Mission Overview' },
  { id: 'about', label: 'About Us', href: '#about', num: '02', icon: Compass, badge: 'Vision', desc: 'Beyond Classrooms to Real Capability' },
  { id: 'why-us', label: 'Why Us', href: '#why-us', num: '03', icon: Award, badge: '3 Phases', desc: 'Ignite, Elevate & Accelerate Model' },
  { id: 'programs', label: 'Programs', href: '#programs', num: '04', icon: BookOpen, badge: '13 Courses', desc: 'IT, Core & Management Domains' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', href: '#entrepreneurship', num: '05', icon: Rocket, badge: 'Free MSME', desc: 'Founder Mentorship & Incubation' },
  { id: 'career-path', label: 'Career Path', href: '#career-path', num: '06', icon: TrendingUp, badge: '120 Days', desc: '12 Chapters Structured Growth' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials', num: '07', icon: MessageSquareQuote, badge: '4.9★ Rated', desc: 'Alumni Placements & Case Studies' },
  { id: 'contact', label: 'Contact', href: '#contact', num: '08', icon: PhoneCall, badge: 'Support', desc: 'Admissions & Career Counseling' },
]

/**
 * Premium Navbar with Animated Morphing Hamburger Icon & Sliding Sidebar Drawer.
 */
export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const shouldReduceMotion = useReducedMotion()
  const drawerRef = useRef(null)

  // Scroll Spy to detect currently active section
  useEffect(() => {
    // 1. Initial check from URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace(/^#/, '')
      if (ALL_NAV_LINKS.some((l) => l.id === hashId)) {
        setActiveSection(hashId)
      }
    }

    const sectionIds = ALL_NAV_LINKS.map((l) => l.id)

    const handleScrollSpy = () => {
      // Top boundary
      if (window.scrollY < 120) {
        setActiveSection('home')
        return
      }

      // Bottom boundary (if reached end of page, contact is active)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection('contact')
        return
      }

      const scrollTrigger = window.scrollY + 220

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollTrigger >= top) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    handleScrollSpy()
    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    window.addEventListener('hashchange', handleScrollSpy)

    return () => {
      window.removeEventListener('scroll', handleScrollSpy)
      window.removeEventListener('hashchange', handleScrollSpy)
    }
  }, [])

  const handleNavClick = useCallback(
    (e, href) => {
      if (!href || !href.startsWith('#')) return
      e.preventDefault()

      const targetId = href.replace(/^#/, '')
      setActiveSection(targetId || 'home')

      if (href === '#' || href === '#home') {
        smoothScrollTo(0, { offset: 0 })
        window.history.pushState(null, '', ' ')
      } else {
        smoothScrollTo(href, { offset: -80 })
        window.history.pushState(null, '', href)
      }

      setSidebarOpen(false)
    },
    []
  )

  // Scroll listener for navbar elevation blur
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close sidebar on Escape key & lock background body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }

    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  return (
    <>
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
              <div className="ui-navbar__brand-badge">
                <span>P</span>
              </div>
              <span className="ui-navbar__brand-text">
                Pro<span className="ui-navbar__brand-highlight">Version</span>
              </span>
            </a>

            {/* Actions: Join Now CTA + Animated Hamburger Menu Button */}
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

              {/* Hamburger Button with Custom Opening & Closing Animation */}
              <button
                type="button"
                className={`ui-navbar__hamburger ${
                  sidebarOpen ? 'ui-navbar__hamburger--active' : ''
                }`}
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label={sidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-navigation"
              >
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Slide-in Sidebar Navigation & Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              className="ui-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar Drawer Panel */}
            <motion.aside
              id="sidebar-navigation"
              ref={drawerRef}
              className="ui-sidebar-drawer"
              data-scroll-container="true"
              onWheel={(e) => e.stopPropagation()}
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.9 }}
              role="dialog"
              aria-modal="true"
              aria-label="Platform Navigation"
            >
              {/* Subtle Cosmic Ambient Glow Accents */}
              <div className="sidebar-ambient-glow purple" />
              <div className="sidebar-ambient-glow indigo" />

              {/* Sidebar Header */}
              <div className="ui-sidebar-header">
                <div className="ui-sidebar-brand">
                  <div className="ui-navbar__brand-badge">
                    <span>P</span>
                  </div>
                  <div className="sidebar-brand-info">
                    <span className="sidebar-brand-name">
                      Pro<span className="ui-navbar__brand-highlight">Version</span>
                    </span>
                    <span className="sidebar-brand-sub">Career Accelerator</span>
                  </div>
                </div>

                {/* Close Button with Micro-Animation */}
                <button
                  type="button"
                  className="ui-sidebar-close-btn"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close navigation sidebar"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Eyebrow Label */}
              <div className="ui-sidebar-section-title">
                <span className="section-title-dot" />
                <span>ALL PLATFORM NAVIGATION</span>
              </div>

              {/* Navigation Items List */}
              <nav className="ui-sidebar-nav" aria-label="Sidebar Platform Links">
                {ALL_NAV_LINKS.map((link, idx) => {
                  const Icon = link.icon
                  const isActive = activeSection === link.id
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className={`ui-sidebar-link ${isActive ? 'ui-sidebar-link--active' : ''}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 + idx * 0.025, duration: 0.22 }}
                    >
                      <div className={`sidebar-link-icon-wrap ${isActive ? 'active' : ''}`}>
                        <Icon size={17} className="sidebar-link-icon" />
                      </div>

                      <div className="sidebar-link-content">
                        <div className="sidebar-link-header">
                          <span className="sidebar-link-label">{link.label}</span>
                          {isActive ? (
                            <span className="sidebar-link-badge active">
                              <span className="active-dot" /> ACTIVE
                            </span>
                          ) : (
                            link.badge && (
                              <span className="sidebar-link-badge">{link.badge}</span>
                            )
                          )}
                        </div>
                        <span className="sidebar-link-desc">{link.desc}</span>
                      </div>

                      <div className="sidebar-link-trailing">
                        <span className={`sidebar-link-num ${isActive ? 'active' : ''}`}>
                          {link.num}
                        </span>
                        <ChevronRight size={14} className="sidebar-link-chevron" />
                      </div>
                    </motion.a>
                  )
                })}
              </nav>

              {/* Direct Connect Quick Help */}
              <div className="ui-sidebar-contact-card">
                <span className="sidebar-contact-eyebrow">Direct Connect & Admissions</span>
                <div className="sidebar-contact-links">
                  <a href="tel:+919585340166" className="sidebar-contact-pill">
                    <Phone size={13} className="contact-pill-icon" />
                    <span>+91 95853 40166</span>
                  </a>
                  <a
                    href="https://wa.me/919585340166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-contact-pill whatsapp"
                  >
                    <MessageCircle size={13} className="contact-pill-icon" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Sidebar Bottom CTA Button */}
              <div className="ui-sidebar-footer">
                <a
                  href="#contact"
                  className="sidebar-join-btn"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  <Sparkles size={16} />
                  <span>Join Next Cohort</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
