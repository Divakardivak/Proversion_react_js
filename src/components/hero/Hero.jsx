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
            {/* Desktop Glowing Handwritten Script: Learn Build Grow */}
            <div className="ui-hero__handwritten-script" aria-hidden="true">
              <span className="script-word">Learn</span>
              <span className="script-word">Build</span>
              <span className="script-word">Grow</span>
              <div className="script-sparkles-row">
                <Sparkles size={16} className="script-sparkle gold" />
                <Sparkles size={11} className="script-sparkle cyan" />
              </div>
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
                <span>Learn • Build • Grow</span>
                <Sparkles size={13} className="script-sparkle gold" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Hiring Partner Logos Floating Dock ── */}
        <div className="ui-hero__partners-dock">
          {/* Google */}
          <div className="dock-logo-item">
            <span className="dock-brand-text google">Google</span>
          </div>

          <div className="dock-divider" />

          {/* Microsoft with 4-square icon */}
          <div className="dock-logo-item">
            <svg className="dock-icon ms-icon" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M0 0h7.2v7.2H0zm8.8 0H16v7.2H8.8zM0 8.8h7.2V16H0zm8.8 0H16V16H8.8z" />
            </svg>
            <span className="dock-brand-text ms">Microsoft</span>
          </div>

          <div className="dock-divider" />

          {/* Meta with infinity loop */}
          <div className="dock-logo-item">
            <svg className="dock-icon meta-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 15.5c-1.8 0-3.3-1.4-4-2.8-.7 1.4-2.2 2.8-4 2.8-2.6 0-4-2.1-4-4.8C0 7.7 2 5.5 5 5.5c2.3 0 4.1 1.6 5.5 3.5 1.4-1.9 3.2-3.5 5.5-3.5 3 0 5 2.2 5 5.2 0 2.7-1.4 4.8-4 4.8-1.8 0-3.3-1.4-4-2.8-.7 1.4-2.2 2.8-4 2.8zm-7-7.8C3.4 7.7 2.2 9 2.2 10.7c0 1.6 1 2.8 2.5 2.8 1.4 0 2.6-1.1 3.5-2.6-1-1.8-2-3.2-3.2-3.2zm14 0c-1.2 0-2.2 1.4-3.2 3.2.9 1.5 2.1 2.6 3.5 2.6 1.5 0 2.5-1.2 2.5-2.8 0-1.7-1.2-3-2.8-3z" />
            </svg>
            <span className="dock-brand-text meta">Meta</span>
          </div>

          <div className="dock-divider" />

          {/* Amazon with signature smile */}
          <div className="dock-logo-item amazon-item">
            <span className="dock-brand-text amazon">amazon</span>
            <svg className="amazon-smile-svg" viewBox="0 0 48 10" width="38" height="8" fill="none" aria-hidden="true">
              <path d="M2 3C15 9 32 9 46 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="dock-divider" />

          {/* TCS */}
          <div className="dock-logo-item">
            <span className="dock-brand-text tcs">tcs</span>
          </div>

          <div className="dock-divider" />

          {/* Adobe with A icon */}
          <div className="dock-logo-item">
            <svg className="dock-icon adobe-icon" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M13.96 0L24 24H16.4l-3.36-8.16h-4.32l3.48-8.28L8.64 0h5.32zM0 0h5.32L0 24V0z" />
            </svg>
            <span className="dock-brand-text adobe">Adobe</span>
          </div>

          <div className="dock-divider" />

          {/* IBM */}
          <div className="dock-logo-item">
            <span className="dock-brand-text ibm">IBM</span>
          </div>

          <div className="dock-divider" />

          {/* Intel */}
          <div className="dock-logo-item">
            <span className="dock-brand-text intel">intel.</span>
          </div>
        </div>

        {/* ── Bottom Trust Metrics Ribbon ── */}
        <div className="ui-hero__trust-ribbon">
          <div className="ribbon-pill-left">
            <span className="ribbon-pulsing-dot" />
            <span className="ribbon-slogan-text">Learn • Build • Succeed</span>
          </div>

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
