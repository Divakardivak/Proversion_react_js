import React, { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Clock,
  Briefcase,
  Star,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Building2,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { courseCurriculumData } from '@/data/courseCurriculum'
import './CourseDetailsModal.css'

/**
 * Normalization lookup map ensuring any course slug or query resolves to comprehensive curriculum data
 */
const ID_ALIASES = {
  'cloud-computing': 'aws-cloud',
  cloud: 'aws-cloud',
  aws: 'aws-cloud',
  'aws-cloud': 'aws-cloud',
  'artificial-intelligence': 'ai-ml',
  ai: 'ai-ml',
  'ai-ml': 'ai-ml',
  'machine-learning': 'ai-ml',
  ml: 'ai-ml',
  'data-science': 'data-science',
  datascience: 'data-science',
  'data-analytics': 'data-analytics',
  analytics: 'data-analytics',
  'web-development': 'full-stack',
  'full-stack': 'full-stack',
  fullstack: 'full-stack',
  web: 'full-stack',
  'iot-robotics': 'iot',
  iot: 'iot',
  robotics: 'iot',
  'embedded-systems': 'embedded',
  embedded: 'embedded',
  vlsi: 'vlsi',
  'vlsi-design': 'vlsi',
  autocad: 'autocad',
  cad: 'autocad',
  'human-resource': 'hr-analytics',
  'hr-analytics': 'hr-analytics',
  hr: 'hr-analytics',
  'digital-marketing': 'digital-marketing',
  marketing: 'digital-marketing',
  'stock-marketing': 'stock-marketing',
  'stock-trading': 'stock-marketing',
  stocks: 'stock-marketing',
  'cyber-security': 'cyber-security',
  'ui-ux': 'ui-ux',
}

/**
 * Resilient curriculum retriever that guarantees non-empty modules and capstones
 */
function getSafeCurriculum(course) {
  if (!course) {
    return {
      modules: [],
      projects: [],
      tools: [],
      careerRoles: ['Tech Specialist'],
      salaryRange: '₹7.0 LPA – ₹20.0 LPA',
      hiringPartners: ['Top MNCs & High-Growth Startups'],
    }
  }

  // 1. Direct key match
  const rawId = (course.id || '').toLowerCase().trim()
  if (courseCurriculumData[rawId]) {
    return courseCurriculumData[rawId]
  }

  // 2. Slug alias map
  const targetKey = ID_ALIASES[rawId]
  if (targetKey && courseCurriculumData[targetKey]) {
    return courseCurriculumData[targetKey]
  }

  // 3. Keyword heuristic on title or shortTitle
  const title = (course.title || course.shortTitle || '').toLowerCase()
  if (title.includes('cloud')) return courseCurriculumData['aws-cloud'] || courseCurriculumData['cloud-computing']
  if (title.includes('intel') || title.includes('ai') || title.includes('learning')) return courseCurriculumData['ai-ml']
  if (title.includes('science')) return courseCurriculumData['data-science']
  if (title.includes('analytic')) return courseCurriculumData['data-analytics']
  if (title.includes('web') || title.includes('stack')) return courseCurriculumData['full-stack']
  if (title.includes('robot') || title.includes('iot')) return courseCurriculumData['iot']
  if (title.includes('embed')) return courseCurriculumData['embedded']
  if (title.includes('vlsi') || title.includes('semiconductor')) return courseCurriculumData['vlsi']
  if (title.includes('cad')) return courseCurriculumData['autocad']
  if (title.includes('resource') || title.includes('hr')) return courseCurriculumData['hr-analytics']
  if (title.includes('stock') || title.includes('trad')) return courseCurriculumData['stock-marketing']
  if (title.includes('medical') || title.includes('coding')) return courseCurriculumData['medical-coding']
  if (title.includes('psych') || title.includes('cyco')) return courseCurriculumData['psychology']

  // 4. Dynamic comprehensive fallback
  const techList = Array.isArray(course.technologies) && course.technologies.length > 0
    ? course.technologies
    : ['Foundations', 'Core Principles', 'Advanced Architecture', 'Production Deployment']

  return {
    modules: [
      {
        title: `Module 1: Foundations & ${techList[0] || 'Core Architecture'}`,
        duration: 'Weeks 1–3',
        topics: [
          `Fundamental concepts and toolchain setup for ${course.title || 'the program'}`,
          `Core principles of ${techList[0] || 'domain standards'}`,
          'Syntax, paradigms, and professional repository scaffolding',
          'Industry standard coding conventions, debugging, and linting practices',
        ],
      },
      {
        title: `Module 2: Advanced Design with ${techList[1] || 'Modern Frameworks'}`,
        duration: 'Weeks 4–6',
        topics: [
          `In-depth implementation of ${techList[1] || 'specialized toolsets'}`,
          'Data structures, architectural patterns, and performance benchmarking',
          'Integration with third-party APIs and enterprise services',
          'Automated testing workflows, unit testing, and test-driven development',
        ],
      },
      {
        title: `Module 3: Enterprise Workflows & ${techList[2] || 'Full Pipeline'}`,
        duration: 'Weeks 7–9',
        topics: [
          `Production engineering utilizing ${techList[2] || 'scalable technologies'}`,
          'CI/CD automated pipelines, containerization, and cloud deployment',
          'Security hardening, authentication, and vulnerability scanning',
          'Cross-functional team collaboration with Git flow and agile sprints',
        ],
      },
      {
        title: `Module 4: Capstone Execution & ${techList[3] || 'Industry Readiness'}`,
        duration: 'Weeks 10–12',
        topics: [
          `End-to-end production deployment using ${techList[3] || 'advanced tooling'}`,
          'System observability, real-time logging, and performance telemetry',
          'Portfolio presentation, technical case-study preparation',
          'Mock technical rounds with senior MNC architect mentors',
        ],
      },
    ],
    projects: [
      {
        name: `Production-Grade ${course.shortTitle || course.title || 'Enterprise'} Platform`,
        description: `Complete, full-scale portfolio implementation demonstrating real-world architecture, modern best practices, and production deployment with ${techList.slice(0, 2).join(' & ')}.`,
        tech: techList.slice(0, 4),
      },
      {
        name: `Automated Pipeline & Telemetry Suite`,
        description: `Scalable automated continuous delivery pipeline incorporating real-time telemetry, automated testing, and high-availability configuration.`,
        tech: ['Docker', 'CI/CD', ...techList.slice(0, 2)],
      },
    ],
    tools: techList,
    careerRoles: [
      `${course.shortTitle || course.title || 'Technical'} Specialist`,
      'Senior Associate Engineer',
      'System Solutions Architect',
    ],
    salaryRange: '₹7.0 LPA – ₹20.0 LPA',
    hiringPartners: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Capgemini'],
  }
}

export function CourseDetailsModal({ course, isOpen, onClose, onEnroll }) {
  const [activeTab, setActiveTab] = useState('curriculum')
  const [expandedModules, setExpandedModules] = useState([0]) // First module open by default

  // Resolve curriculum with 100% guarantee of rich content
  const curriculum = useMemo(() => getSafeCurriculum(course), [course])

  // Lock body scroll and handle escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!course) return null

  // Authentic ProVersion special offer pricing
  const price = course.price || '₹6,999'
  const originalPrice = course.originalPrice || '₹10,000'
  const discount = course.discount || '30% OFF'
  const emi = course.emi || '₹1,166/mo'

  const toggleModule = (index) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const areAllExpanded = expandedModules.length === curriculum.modules.length

  const handleToggleAll = () => {
    if (areAllExpanded) {
      setExpandedModules([])
    } else {
      setExpandedModules(curriculum.modules.map((_, i) => i))
    }
  }

  const handleEnrollClick = () => {
    onClose()
    if (onEnroll) {
      onEnroll(course.title)
    }
  }

  const modalElement = (
    <AnimatePresence>
      {isOpen && (
        <div className="course-modal-backdrop" onClick={onClose}>
          <motion.div
            key={course.id}
            className="course-modal-window"
            data-scroll-container
            style={{ '--modal-accent': course.accentColor || '#3b82f6' }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Accent Line */}
            <div className="modal-glow-bar" />

            {/* Dedicated Pinned Mobile Header Bar (Only visible <= 880px) */}
            <div className="modal-mobile-top-bar">
              <div className="mobile-top-badges">
                <span className="sidebar-cat-pill">{course.category}</span>
                <span className="sidebar-level-pill">{course.badge || 'Certified'}</span>
              </div>
              <button
                type="button"
                className="modal-mobile-top-close-btn"
                onClick={onClose}
                aria-label="Close Course Details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Modal Content Body (Unified single-scroll on mobile, 2-column on desktop) */}
            <div className="modal-body-scroll">
              {/* ── LEFT DOSSIER SIDEBAR (Desktop Overview & CTA) ── */}
              <aside className="modal-sidebar">
                <div className="sidebar-scroll-wrapper">
                  {/* Category & Badge + Desktop close btn row (mobile handled by top bar) */}
                  <div className="sidebar-badge-row">
                    <span className="sidebar-cat-pill">{course.category}</span>
                    <span className="sidebar-level-pill">{course.badge || 'Certified'}</span>
                    <button
                      type="button"
                      className="modal-mobile-close-btn"
                      onClick={onClose}
                      aria-label="Close Course Details"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Course Title */}
                  <h2 className="sidebar-title">{course.title}</h2>

                  {/* Rating & Social Proof */}
                  <div className="sidebar-rating-row">
                    <div className="sidebar-stars">
                      <Star size={13} fill="#facc15" color="#facc15" />
                      <span className="sidebar-score">{course.rating || '4.9'}</span>
                    </div>
                    <span className="sidebar-dot">•</span>
                    <span className="sidebar-enrolled">{course.students || '1,620+'} enrolled</span>
                  </div>

                  {/* Description */}
                  <p className="sidebar-desc">{course.description}</p>

                  {/* Key Program Pillars (Sleek Micro-Cards) */}
                  <div className="sidebar-pillars-list">
                    <div className="pillar-item">
                      <div className="pillar-icon-box cyan">
                        <Clock size={15} />
                      </div>
                      <div className="pillar-text">
                        <span className="pillar-label">Duration</span>
                        <span className="pillar-val">{course.duration || '120 Days'} Intensive</span>
                      </div>
                    </div>

                    <div className="pillar-item">
                      <div className="pillar-icon-box emerald">
                        <Briefcase size={15} />
                      </div>
                      <div className="pillar-text">
                        <span className="pillar-label">Internship</span>
                        <span className="pillar-val" title={course.internship || 'Performance Based'}>
                          {course.internship?.includes('Performance') ? 'Performance Based' : (course.internship || 'Included')}
                        </span>
                      </div>
                    </div>

                    <div className="pillar-item">
                      <div className="pillar-icon-box amber">
                        <TrendingUp size={15} />
                      </div>
                      <div className="pillar-text">
                        <span className="pillar-label">Avg Package</span>
                        <span className="pillar-val">{curriculum.salaryRange}</span>
                      </div>
                    </div>

                    <div className="pillar-item">
                      <div className="pillar-icon-box purple">
                        <Award size={15} />
                      </div>
                      <div className="pillar-text">
                        <span className="pillar-label">Credentials</span>
                        <span className="pillar-val" title="MNC Dual Accreditation">MNC Dual Accreditation</span>
                      </div>
                    </div>
                  </div>

                  {/* Pinned Pricing & Enrollment Block */}
                  <div className="sidebar-pricing-card">
                    <div className="pricing-top-row">
                      <span className="pricing-tag">Special Scholarship Offer</span>
                      <span className="pricing-discount-badge">{discount} Applied</span>
                    </div>
                    <div className="pricing-amount-row">
                      <span className="pricing-amount">{price}</span>
                      <span className="pricing-original">{originalPrice}</span>
                    </div>
                    <div className="pricing-emi-text">
                      Zero-Cost EMI from <strong>{emi}</strong> for 6 mos
                    </div>

                    <button
                      type="button"
                      className="sidebar-enroll-btn"
                      onClick={handleEnrollClick}
                    >
                      <span>Apply & Enroll with Scholarship</span>
                      <ArrowRight size={15} />
                    </button>

                    <div className="sidebar-trust-row">
                      <ShieldCheck size={14} className="text-emerald" />
                      <span>Instant Verification • Performance Internship</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* ── RIGHT CONTENT CANVAS (Expansive Full-Height Scroll) ── */}
              <main className="modal-main-panel">
                {/* Sticky Top Header with Tabs & Desktop Close Button */}
                <header className="modal-panel-header">
                <nav className="modal-panel-nav">
                  <button
                    type="button"
                    className={`panel-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('curriculum')}
                  >
                    <Layers size={15} />
                    <span>Syllabus & Modules</span>
                    <span className="panel-tab-count">{curriculum.modules.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`panel-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <Sparkles size={15} />
                    <span>Capstone Projects</span>
                    <span className="panel-tab-count">{curriculum.projects.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`panel-tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tools')}
                  >
                    <Cpu size={15} />
                    <span>Tools & Stack</span>
                    <span className="panel-tab-count">{curriculum.tools.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`panel-tab-btn ${activeTab === 'career' ? 'active' : ''}`}
                    onClick={() => setActiveTab('career')}
                  >
                    <Building2 size={15} />
                    <span>Career & Hiring</span>
                  </button>
                </nav>

                <div className="modal-header-actions">
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={onClose}
                    aria-label="Close Course Details"
                  >
                    <X size={17} />
                  </button>
                </div>
              </header>

              {/* Scrollable Canvas Body */}
              <div
                className="modal-panel-scroll"
                data-scroll-container
                onWheel={(e) => e.stopPropagation()}
              >
                {/* 1. CURRICULUM TAB */}
                {activeTab === 'curriculum' && (
                  <div className="panel-pane curriculum-pane">
                    <div className="pane-header-row">
                      <div className="pane-intro">
                        <h3>Comprehensive Curriculum Breakdown</h3>
                        <p>
                          Engineered in partnership with lead MNC architects to bridge academic
                          theory with production-grade engineering excellence.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="expand-all-btn"
                        onClick={handleToggleAll}
                      >
                        <ChevronDown
                          size={14}
                          className={`expand-all-icon ${areAllExpanded ? 'rotated' : ''}`}
                        />
                        <span>{areAllExpanded ? 'Collapse All' : 'Expand All'}</span>
                      </button>
                    </div>

                    <div className="modules-accordion-list">
                      {curriculum.modules.map((mod, idx) => {
                        const isExpanded = expandedModules.includes(idx)
                        return (
                          <div
                            key={idx}
                            className={`module-accordion-card ${isExpanded ? 'expanded' : ''}`}
                          >
                            <div
                              className="module-header"
                              onClick={() => toggleModule(idx)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  toggleModule(idx)
                                }
                              }}
                            >
                              <div className="module-header-left">
                                <span className="module-number">0{idx + 1}</span>
                                <div className="module-text-wrap">
                                  <h4 className="module-title">{mod.title}</h4>
                                  <span className="module-duration">{mod.duration}</span>
                                </div>
                              </div>
                              <ChevronDown
                                size={18}
                                className={`chevron-icon ${isExpanded ? 'rotated' : ''}`}
                              />
                            </div>

                            {isExpanded && (
                              <div className="module-body">
                                <ul className="topics-list">
                                  {mod.topics.map((topic, tIdx) => (
                                    <li key={tIdx} className="topic-item">
                                      <CheckCircle2 size={15} className="topic-check" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 2. CAPSTONE PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div className="panel-pane projects-pane">
                    <div className="pane-intro">
                      <h3>Production-Grade Capstone Projects</h3>
                      <p>
                        Build enterprise portfolio projects that hiring managers and tech leads
                        actively review during technical interviews.
                      </p>
                    </div>

                    <div className="projects-grid">
                      {curriculum.projects.map((proj, idx) => (
                        <div key={idx} className="project-detail-card">
                          <div className="project-badge-pill">Capstone 0{idx + 1}</div>
                          <h4 className="project-name">{proj.name}</h4>
                          <p className="project-desc">{proj.description}</p>
                          <div className="project-tech-chips">
                            {proj.tech.map((t, tIdx) => (
                              <span key={tIdx} className="p-chip">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. TOOLS & TECH STACK TAB */}
                {activeTab === 'tools' && (
                  <div className="panel-pane tools-pane">
                    <div className="pane-intro">
                      <h3>Industry Toolchain & Frameworks Mastered</h3>
                      <p>
                        Gain hands-on command over the exact developer toolchains, platforms, and
                        cloud utilities used across modern tech organizations.
                      </p>
                    </div>

                    <div className="tools-badges-cloud">
                      {curriculum.tools.map((tool, idx) => (
                        <div key={idx} className="tool-badge-item">
                          <Cpu size={16} className="tool-icon" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CAREER & HIRING TAB */}
                {activeTab === 'career' && (
                  <div className="panel-pane career-pane">
                    <div className="career-metrics-row">
                      <div className="career-metric-card">
                        <span className="metric-title">Average Starting Package</span>
                        <span className="metric-val">{curriculum.salaryRange}</span>
                        <span className="metric-sub">Based on 2025–2026 placed cohorts</span>
                      </div>

                      <div className="career-metric-card">
                        <span className="metric-title">Placement Success Rate</span>
                        <span className="metric-val text-emerald">96.4%</span>
                        <span className="metric-sub">Within 120 days of program completion</span>
                      </div>
                    </div>

                    <div className="career-section-group">
                      <h4>Target Career Roles</h4>
                      <div className="roles-tags-list">
                        {curriculum.careerRoles.map((role, idx) => (
                          <span key={idx} className="role-tag">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="career-section-group">
                      <h4>Top Hiring Partners</h4>
                      <div className="partners-chips-grid">
                        {curriculum.hiringPartners.map((partner, idx) => (
                          <div key={idx} className="partner-chip">
                            <Building2 size={14} className="partner-icon" />
                            <span>{partner}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>

          {/* Mobile-Only Sticky Bottom Bar (Visible only on screens <= 880px) */}
          <div className="modal-mobile-bottom-bar">
            <div className="mobile-price-meta">
              <span className="mobile-price-label">Program Fee</span>
              <div className="mobile-price-row">
                <span className="mobile-price-amount">{price}</span>
                <span className="mobile-price-orig">{originalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              className="mobile-enroll-btn"
              onClick={handleEnrollClick}
            >
              <span>Apply with Scholarship</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(modalElement, document.body)
}

export default CourseDetailsModal
