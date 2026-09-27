import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Users, 
  GraduationCap, 
  X,
  Star
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { smoothScrollTo } from '@/components/common/SmoothScroll'
import heroScenicMaster from '@/assets/hero_scenic_master.jpg'
import heroMascotMobile from '@/assets/hero_mascot_mobile.jpg'
import './Hero.css'

const RECRUITER_COMPANIES = [
  { id: 'google', name: 'Google', className: 'google' },
  {
    id: 'microsoft',
    name: 'Microsoft',
    className: 'ms',
    icon: (
      <svg className="dock-icon ms-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
        <path d="M0 0h7.2v7.2H0zm8.8 0H16v7.2H8.8zM0 8.8h7.2V16H0zm8.8 0H16V16H8.8z" />
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    className: 'meta',
    icon: (
      <svg className="dock-icon meta-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 15.5c-1.8 0-3.3-1.4-4-2.8-.7 1.4-2.2 2.8-4 2.8-2.6 0-4-2.1-4-4.8C0 7.7 2 5.5 5 5.5c2.3 0 4.1 1.6 5.5 3.5 1.4-1.9 3.2-3.5 5.5-3.5 3 0 5 2.2 5 5.2 0 2.7-1.4 4.8-4 4.8-1.8 0-3.3-1.4-4-2.8-.7 1.4-2.2 2.8-4 2.8zm-7-7.8C3.4 7.7 2.2 9 2.2 10.7c0 1.6 1 2.8 2.5 2.8 1.4 0 2.6-1.1 3.5-2.6-1-1.8-2-3.2-3.2-3.2zm14 0c-1.2 0-2.2 1.4-3.2 3.2.9 1.5 2.1 2.6 3.5 2.6 1.5 0 2.5-1.2 2.5-2.8 0-1.7-1.2-3-2.8-3z" />
      </svg>
    ),
  },
  { id: 'amazon', name: 'amazon', className: 'amazon', isAmazon: true },
  {
    id: 'apple',
    name: 'Apple',
    className: 'apple',
    icon: (
      <svg className="dock-icon apple-icon" viewBox="0 0 170 170" width="13" height="13" fill="currentColor" aria-hidden="true">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.98-12.04-14.7-5.46-8.49-9.87-18.42-13.25-29.8-3.38-11.38-5.07-22.37-5.07-32.98 0-14.24 3.59-26.06 10.77-35.46 7.18-9.4 16.03-14.22 26.56-14.46 5.06 0 10.51 1.34 16.34 4.02 5.84 2.68 9.54 4.1 11.1 4.26 1.79-.24 5.75-1.79 11.89-4.65 6.13-2.86 11.66-4.14 16.59-3.85 12.39.85 22.37 5.76 29.93 14.73-10.88 6.64-16.19 15.65-15.93 27.05.28 9.07 3.82 16.71 10.63 22.92 6.81 6.21 15.01 9.77 24.6 10.69-2.24 6.84-5.06 14.15-8.46 21.93zM119.22 31.84c0-7.39 2.68-14.38 8.04-20.98 5.37-6.6 11.96-10.49 19.78-11.68.22 1.34.33 2.57.33 3.69 0 7.39-2.73 14.43-8.19 21.13-5.46 6.7-12.06 10.55-19.8 11.53-.08-1.23-.16-2.46-.16-3.69z"/>
      </svg>
    ),
  },
  { id: 'netflix', name: 'NETFLIX', className: 'netflix' },
  { id: 'tcs', name: 'tcs', className: 'tcs' },
  {
    id: 'adobe',
    name: 'Adobe',
    className: 'adobe',
    icon: (
      <svg className="dock-icon adobe-icon" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
        <path d="M13.96 0L24 24H16.4l-3.36-8.16h-4.32l3.48-8.28L8.64 0h5.32zM0 0h5.32L0 24V0z" />
      </svg>
    ),
  },
  { id: 'ibm', name: 'IBM', className: 'ibm' },
  { id: 'intel', name: 'intel.', className: 'intel' },
  { id: 'oracle', name: 'ORACLE', className: 'oracle' },
  { id: 'cisco', name: 'CISCO', className: 'cisco' },
  { id: 'infosys', name: 'Infosys', className: 'infosys' },
  { id: 'salesforce', name: 'salesforce', className: 'salesforce' },
  { id: 'wipro', name: 'wipro', className: 'wipro' },
]

function CompanyLogoItem({ company }) {
  if (company.isAmazon) {
    return (
      <div className="dock-logo-item amazon-item">
        <span className="dock-brand-text amazon">amazon</span>
        <svg className="amazon-smile-svg" viewBox="0 0 48 10" width="36" height="7" fill="none" aria-hidden="true">
          <path d="M2 3C15 9 32 9 46 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <div className="dock-logo-item">
      {company.icon}
      <span className={`dock-brand-text ${company.className}`}>{company.name}</span>
    </div>
  )
}

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleExploreClick = (e) => {
    e.preventDefault()
    smoothScrollTo('#programs', { offset: -80 })
  }

  return (
    <section id="home" className="ui-hero" aria-label="Introduction">
      {/* ── High-Fidelity Master Campus Scenic Backdrop ── */}
      <div 
        className="ui-hero__scenic-bg" 
        style={{ backgroundImage: `url(${heroScenicMaster})` }}
        aria-hidden="true"
      />

      {/* Atmospheric Contrast Overlays */}
      <div className="ui-hero__scenic-overlay" aria-hidden="true" />
      <div className="ui-hero__bg-glow-primary" aria-hidden="true" />
      <div className="ui-hero__bg-glow-secondary" aria-hidden="true" />

      <Container size="xl">
        <div className="ui-hero__grid">
          {/* ── Left Column: Typography & CTAs ── */}
          <div className="ui-hero__content">
            {/* Eyebrow Pill Badge */}
            <motion.div 
              className="ui-hero__badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>PREMIUM ONLINE TRAINING PROGRAM</span>
            </motion.div>

            {/* Main Headline matching reference mockup */}
            <motion.h1 
              className="ui-hero__headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="ui-hero__headline-top">We Create</span>
              <span className="ui-hero__headline-bottom">
                Digital{' '}
                <span className="ui-hero__futures-wrapper">
                  <span className="ui-hero__futures-gradient">Futures</span>
                  {/* Golden curved brush underline from reference mockup */}
                  <svg
                    className="ui-hero__brush-underline"
                    viewBox="0 0 168 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 14C38 5 125 4 165 11C132 16 65 15 3 14Z"
                      fill="url(#brush-gold-gradient)"
                    />
                    <defs>
                      <linearGradient id="brush-gold-gradient" x1="3" y1="9" x2="165" y2="9" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f59e0b" />
                        <stop offset="0.5" stopColor="#fbbf24" />
                        <stop offset="1" stopColor="#f43f5e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              className="ui-hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Build in-demand skills with expert mentors, real-time projects and
              career support. Your future, upgraded.
            </motion.p>

            {/* Action Buttons Matching Mockup */}
            <motion.div 
              className="ui-hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="#programs" 
                className="ui-hero__cta-primary"
                onClick={handleExploreClick}
              >
                <span>Explore Our Courses</span>
                <ArrowRight size={18} className="ui-hero__btn-arrow" />
              </a>

              <button 
                type="button" 
                className="ui-hero__cta-secondary"
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Watch video overview"
              >
                <span className="ui-hero__play-circle">
                  <Play size={13} fill="currentColor" />
                </span>
                <span>Watch Overview</span>
              </button>
            </motion.div>
          </div>

          {/* ── Right Column: Visual Stage (Desktop Script + Mobile Showcase) ── */}
          <div className="ui-hero__scene-container">
            {/* Desktop Stage Badge: Innovation at every stage */}
            <div className="ui-hero__stage-badge" aria-hidden="true">
              <span className="stage-badge-dot" />
              <span className="stage-badge-text">Innovation at every stage</span>
              <Sparkles size={14} className="script-sparkle gold" />
            </div>

            {/* Mobile Mascot Showcase (Active on screens <= 768px) */}
            <div className="ui-hero__mobile-mascot-card">
              <div className="mobile-mascot-img-wrap">
                <img 
                  src={heroMascotMobile} 
                  alt="ProVersion AI Robot Mascot with Textbooks and Laptop" 
                  className="mobile-mascot-img"
                  loading="eager"
                />
                <div className="mobile-mascot-glow-ring" aria-hidden="true" />
              </div>
              <div className="mobile-script-badge">
                <span className="mobile-script-dot" />
                <span>Innovation at every stage</span>
                <Sparkles size={13} className="script-sparkle gold" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Hiring Partner Logos Floating Dock with Infinite Auto-Scroll ── */}
        <div className="ui-hero__partners-dock" aria-label="Top hiring partners">
          <div className="dock-marquee-track">
            {/* Set 1 */}
            {RECRUITER_COMPANIES.map((company, idx) => (
              <div key={`recruiter-1-${company.id || idx}`} className="dock-item-wrapper">
                <CompanyLogoItem company={company} />
                <div className="dock-divider" aria-hidden="true" />
              </div>
            ))}
            {/* Set 2 for seamless infinite marquee */}
            {RECRUITER_COMPANIES.map((company, idx) => (
              <div key={`recruiter-2-${company.id || idx}`} className="dock-item-wrapper" aria-hidden="true">
                <CompanyLogoItem company={company} />
                <div className="dock-divider" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Trust Metrics Ribbon (Centered & Balanced) ── */}
        <div className="ui-hero__trust-ribbon">
          <div className="ribbon-metrics-group">
            <div className="ribbon-metric-item">
              <GraduationCap size={18} className="ribbon-icon purple" />
              <div className="metric-text-stack">
                <span className="metric-num">100+</span>
                <span className="metric-label">Courses & Programs</span>
              </div>
            </div>

            <div className="ribbon-metric-item">
              <Users size={18} className="ribbon-icon purple" />
              <div className="metric-text-stack">
                <span className="metric-num">50K+</span>
                <span className="metric-label">Learners Trained</span>
              </div>
            </div>

            <div className="ribbon-metric-item">
              <Star size={18} className="ribbon-icon purple" />
              <div className="metric-text-stack">
                <span className="metric-num">500+</span>
                <span className="metric-label">Top Recruiters</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Interactive Video Overview Modal ── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="ui-video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
            <motion.div 
              className="ui-video-modal-window"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button" 
                className="video-close-btn"
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close overview video"
              >
                <X size={20} />
              </button>
              <div className="video-player-container">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="ProVersion Platform Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
