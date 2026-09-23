import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Clock,
  Briefcase,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  CreditCard,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { programsData, programCategories } from '@/data/programs'
import { CourseDetailsModal } from '@/components/courseDetails'
import './MobileSales.css'

// Enriched program pricing, badges, and placement stats
const PROGRAM_PRICING = {
  'ai-ml': {
    price: '₹28,999',
    originalPrice: '₹52,000',
    discount: '44% OFF',
    emi: '₹2,416/mo',
    rating: 4.9,
    students: '1,840+',
    badge: 'Bestseller',
  },
  'aws-cloud': {
    price: '₹26,999',
    originalPrice: '₹48,000',
    discount: '43% OFF',
    emi: '₹2,250/mo',
    rating: 4.9,
    students: '1,620+',
    badge: 'High Demand',
  },
  'full-stack': {
    price: '₹24,999',
    originalPrice: '₹45,000',
    discount: '45% OFF',
    emi: '₹2,083/mo',
    rating: 4.8,
    students: '2,100+',
    badge: 'Most Popular',
  },
  'cyber-security': {
    price: '₹27,999',
    originalPrice: '₹50,000',
    discount: '44% OFF',
    emi: '₹2,333/mo',
    rating: 4.9,
    students: '1,450+',
    badge: 'Trending',
  },
  'data-analytics': {
    price: '₹22,999',
    originalPrice: '₹42,000',
    discount: '45% OFF',
    emi: '₹1,916/mo',
    rating: 4.8,
    students: '1,780+',
    badge: 'Top Rated',
  },
  iot: {
    price: '₹23,999',
    originalPrice: '₹44,000',
    discount: '45% OFF',
    emi: '₹1,999/mo',
    rating: 4.7,
    students: '980+',
    badge: 'IoT & Edge',
  },
  vlsi: {
    price: '₹29,999',
    originalPrice: '₹55,000',
    discount: '45% OFF',
    emi: '₹2,499/mo',
    rating: 4.9,
    students: '820+',
    badge: 'Semiconductor',
  },
  embedded: {
    price: '₹24,999',
    originalPrice: '₹46,000',
    discount: '45% OFF',
    emi: '₹2,083/mo',
    rating: 4.8,
    students: '1,150+',
    badge: 'Hardware Core',
  },
  'ui-ux': {
    price: '₹19,999',
    originalPrice: '₹38,000',
    discount: '47% OFF',
    emi: '₹1,666/mo',
    rating: 4.9,
    students: '1,390+',
    badge: 'Creative Tech',
  },
  'hr-analytics': {
    price: '₹18,999',
    originalPrice: '₹36,000',
    discount: '47% OFF',
    emi: '₹1,583/mo',
    rating: 4.7,
    students: '760+',
    badge: 'Analytics',
  },
  autocad: {
    price: '₹19,999',
    originalPrice: '₹38,000',
    discount: '47% OFF',
    emi: '₹1,666/mo',
    rating: 4.8,
    students: '920+',
    badge: 'CAD & 3D',
  },
  'digital-marketing': {
    price: '₹17,999',
    originalPrice: '₹35,000',
    discount: '48% OFF',
    emi: '₹1,499/mo',
    rating: 4.8,
    students: '1,540+',
    badge: 'Growth Engine',
  },
}

export function MobileSales() {
  const [selectedCategory, setSelectedCategory] = useState('All Programs')
  const [billingMode, setBillingMode] = useState('upfront') // 'upfront' | 'emi'
  const [isPaused, setIsPaused] = useState(false)
  const [activeModalCourse, setActiveModalCourse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const trackRef = useRef(null)

  // Enrich all 12 programs
  const enrichedPrograms = programsData.map((prog) => {
    const details = PROGRAM_PRICING[prog.id] || {
      price: '₹24,999',
      originalPrice: '₹45,000',
      discount: '45% OFF',
      emi: '₹2,083/mo',
      rating: 4.8,
      students: '1,000+',
      badge: 'Certified',
    }
    return { ...prog, ...details }
  })

  const handleOpenModal = (course) => {
    setActiveModalCourse(course)
    setIsModalOpen(true)
    if (typeof window !== 'undefined' && course?.id) {
      window.history.pushState(null, '', `#course-${course.id}`)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#programs')
    }
  }

  // Handle direct hash navigation to a specific course (e.g. #course-ai-ml or #course-aws-cloud)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkHash = () => {
      const hash = window.location.hash
      if (hash && (hash.startsWith('#course-') || hash.startsWith('#course/'))) {
        const id = hash.replace(/^#(course-|course\/)/, '')
        const found = enrichedPrograms.find(
          (p) => p.id.toLowerCase() === id.toLowerCase()
        )
        if (found) {
          setActiveModalCourse(found)
          setIsModalOpen(true)
        }
      }
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [enrichedPrograms])

  // Filter programs based on selected tab
  const filteredPrograms =
    selectedCategory === 'All Programs'
      ? enrichedPrograms
      : enrichedPrograms.filter((p) => p.category === selectedCategory)

  const isAllPrograms = selectedCategory === 'All Programs'

  const scrollToContact = (courseName = '') => {
    if (courseName && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-program', { detail: courseName }))
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="course-store-section" id="programs">
      <div id="course-store" style={{ position: 'absolute', top: 0 }} />
      {/* Ambient Cosmic Radial Glows */}
      <div className="store-ambient-aurora purple" />
      <div className="store-ambient-aurora indigo" />
      <div className="store-ambient-grid" />

      <div className="course-store-container">
        {/* Section Header */}
        <div className="store-header">
          <div className="store-badge-eyebrow">
            <Sparkles size={14} className="sparkle-icon" />
            <span>PROVERSION CAREER LAUNCHPAD</span>
          </div>

          <h2 className="store-main-title">
            Industry-Recognized Programs & <span className="title-gradient">Transparent Pricing</span>
          </h2>

          <p className="store-subtitle">
            Master in-demand tech domains with production-grade MNC project simulations, guaranteed paid
            internships up to ₹22,000/month, and direct hiring pipelines with top enterprises.
          </p>

          {/* Interactive Billing Mode Switcher (Scholarship vs No-Cost EMI) */}
          <div className="billing-switcher-wrapper">
            <span className={`switcher-label ${billingMode === 'upfront' ? 'active' : ''}`}>
              Full Upfront (Up to 48% Scholarship)
            </span>

            <button
              className={`billing-toggle-btn ${billingMode === 'emi' ? 'is-emi' : ''}`}
              onClick={() => setBillingMode((prev) => (prev === 'upfront' ? 'emi' : 'upfront'))}
              aria-label="Toggle between upfront scholarship pricing and monthly EMI"
            >
              <span className="toggle-slider" />
            </button>

            <div className="emi-label-group">
              <span className={`switcher-label ${billingMode === 'emi' ? 'active' : ''}`}>
                Flexible No-Cost EMI
              </span>
              <span className="zero-interest-pill">0% Interest</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="store-category-bar">
            {programCategories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                {cat === 'All Programs' && <span className="cat-count">12</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Course Cards Showcase Area
            If "All Programs" -> Seamless Infinite Quantum Stream Marquee
            If Filtered -> Responsive Grid
            ------------------------------------------------------------------ */}
        {isAllPrograms ? (
          <div
            className="store-marquee-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`store-marquee-track ${isPaused ? 'paused' : ''}`}
              ref={trackRef}
            >
              {/* Primary Loop (12 cards) */}
              <div className="store-cards-set">
                {enrichedPrograms.map((course) => (
                  <CourseCard
                    key={`stream-1-${course.id}`}
                    course={course}
                    billingMode={billingMode}
                    onEnroll={scrollToContact}
                    onViewDetails={handleOpenModal}
                  />
                ))}
              </div>

              {/* Duplicate Loop for Seamless Infinite Scroll (12 cards) */}
              <div className="store-cards-set" aria-hidden="true">
                {enrichedPrograms.map((course) => (
                  <CourseCard
                    key={`stream-2-${course.id}`}
                    course={course}
                    billingMode={billingMode}
                    onEnroll={scrollToContact}
                    onViewDetails={handleOpenModal}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="store-filtered-grid">
            {filteredPrograms.map((course) => (
              <CourseCard
                key={`filtered-${course.id}`}
                course={course}
                billingMode={billingMode}
                onEnroll={scrollToContact}
                onViewDetails={handleOpenModal}
              />
            ))}
          </div>
        )}

        {/* Trust & Guarantee Banner */}
        <div className="store-trust-grid">
          <div className="trust-pillar-card">
            <div className="pillar-icon-box purple">
              <Award size={22} />
            </div>
            <div className="pillar-info">
              <h4>MNC Verified Certification</h4>
              <p>Dual-credential certificate recognized by top tech recruiters and Fortune 500 enterprises.</p>
            </div>
          </div>

          <div className="trust-pillar-card">
            <div className="pillar-icon-box emerald">
              <Briefcase size={22} />
            </div>
            <div className="pillar-info">
              <h4>Paid Internship Included</h4>
              <p>Earn up to ₹22,000/month stipend while building enterprise-grade portfolio projects.</p>
            </div>
          </div>

          <div className="trust-pillar-card">
            <div className="pillar-icon-box cyan">
              <Zap size={22} />
            </div>
            <div className="pillar-info">
              <h4>100% Placement Assurance</h4>
              <p>Dedicated resume reviews, 1-on-1 mock interviews, and direct referral pipeline.</p>
            </div>
          </div>

          <div className="trust-pillar-card">
            <div className="pillar-icon-box amber">
              <CreditCard size={22} />
            </div>
            <div className="pillar-info">
              <h4>Zero-Cost EMI Financing</h4>
              <p>Instant approvals, 0% interest, and flexible 3 to 12 months tenure with major banks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 5-Tab Course Deep-Dive Modal */}
      <CourseDetailsModal
        course={activeModalCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEnroll={scrollToContact}
      />
    </section>
  )
}

/**
 * High-Converting Glassmorphic Course Card Component
 */
function CourseCard({ course, billingMode, onEnroll, onViewDetails }) {
  return (
    <div
      className="quantum-course-card"
      style={{
        '--card-accent': course.accentColor,
      }}
    >
      {/* Top Card Glow Accent */}
      <div className="card-ambient-highlight" />

      {/* Header Row: Category Tag & Badge */}
      <div className="card-top-row">
        <span className="card-category-badge">{course.category}</span>
        <span className="card-level-badge">{course.badge}</span>
      </div>

      {/* Course Title (Clickable to open deep-dive) */}
      <h3
        className="card-course-title"
        onClick={() => onViewDetails?.(course)}
        title="Click to view full curriculum, projects & career paths"
        style={{ cursor: 'pointer' }}
      >
        {course.title}
      </h3>

      {/* Ratings & Social Proof */}
      <div className="card-rating-row">
        <div className="rating-stars">
          <Star size={13} className="star-filled" />
          <span>{course.rating}</span>
        </div>
        <span className="rating-divider">•</span>
        <span className="placed-count">{course.students} Enrolled</span>
      </div>

      {/* Program Milestones (Duration & Paid Internship) */}
      <div className="card-meta-chips">
        <div className="meta-chip duration">
          <Clock size={12} className="chip-icon" />
          <span>{course.duration}</span>
        </div>
        <div className="meta-chip stipend">
          <Briefcase size={12} className="chip-icon" />
          <span>Stipend Up to ₹22K/mo</span>
        </div>
      </div>

      {/* Curriculum Highlights (Clickable to open course plan) */}
      <div
        className="card-curriculum-container"
        onClick={() => onViewDetails?.(course)}
        title="Click to view full course plan, modules & capstone projects"
        style={{ cursor: 'pointer' }}
      >
        <span className="curriculum-header">Core Competencies (Click to View Plan):</span>
        <div className="curriculum-tags-grid">
          {course.technologies.slice(0, 4).map((tech, idx) => (
            <div key={idx} className="curriculum-chip">
              <CheckCircle2 size={11} className="chip-check" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Module (Upfront vs. EMI Mode) */}
      <div className="card-pricing-module">
        {billingMode === 'upfront' ? (
          <>
            <div className="price-display-row">
              <div className="price-main-amount">
                <span className="amount-val">{course.price}</span>
                <span className="amount-original">{course.originalPrice}</span>
              </div>
              <span className="scholarship-badge">{course.discount}</span>
            </div>
            <div className="price-sub-note">
              <span>Or pay <strong>{course.emi}</strong> with No-Cost EMI</span>
            </div>
          </>
        ) : (
          <>
            <div className="price-display-row">
              <div className="price-main-amount">
                <span className="amount-val">{course.emi}</span>
                <span className="emi-period">/month</span>
              </div>
              <span className="zero-cost-badge">0% EMI</span>
            </div>
            <div className="price-sub-note">
              <span>Total Course Fee: <strong>{course.price}</strong> (Save {course.discount})</span>
            </div>
          </>
        )}
      </div>

      {/* CTA Enrollment Buttons */}
      <div className="card-actions-row">
        <button
          className="enroll-primary-btn"
          onClick={() => onEnroll(course.title)}
          style={{
            background: `linear-gradient(135deg, ${course.accentColor}, #4338ca)`,
          }}
        >
          <span>Enroll Now</span>
          <ArrowRight size={14} className="action-arrow" />
        </button>

        <button
          className="syllabus-secondary-btn"
          onClick={() => onViewDetails?.(course)}
          title="Explore full syllabus, live projects, toolchains and salary metrics"
        >
          <span>Course Plan</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Footer Guarantee */}
      <div className="card-footer-strip">
        <ShieldCheck size={12} className="footer-shield" />
        <span>MNC Project Portfolio & Internship Guaranteed</span>
      </div>
    </div>
  )
}
