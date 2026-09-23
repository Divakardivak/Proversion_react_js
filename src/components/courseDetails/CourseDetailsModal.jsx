import React, { useState, useEffect } from 'react'
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
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react'
import { courseCurriculumData } from '@/data/courseCurriculum'
import './CourseDetailsModal.css'

export function CourseDetailsModal({ course, isOpen, onClose, onEnroll }) {
  const [activeTab, setActiveTab] = useState('curriculum')
  const [expandedModules, setExpandedModules] = useState([0]) // First module open by default

  // Lock body scroll when modal is open
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

  const curriculum = courseCurriculumData[course.id] || {
    modules: [],
    projects: [],
    tools: course.technologies || [],
    careerRoles: [(course.shortTitle || course.title || 'Tech') + ' Specialist'],
    salaryRange: '₹7.0 LPA – ₹20.0 LPA',
    hiringPartners: ['Top MNCs & High-Growth Startups'],
  }

  const price = course.price || '₹24,999'
  const originalPrice = course.originalPrice || '₹45,000'
  const discount = course.discount || '45% OFF'
  const emi = course.emi || '₹2,083/mo'

  const toggleModule = (index) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
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
            className="course-modal-window"
            style={{ '--modal-accent': course.accentColor || '#8b5cf6' }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* Top Glow Highlight */}
          <div className="modal-glow-bar" />

          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Course Details">
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="modal-hero-header">
            <div className="modal-header-badges">
              <span className="modal-category-badge">{course.category}</span>
              <span className="modal-level-badge">{course.badge || 'Certified'}</span>
              <div className="modal-rating">
                <Star size={13} className="star-icon" />
                <span>{course.rating || '4.9'}</span>
                <span className="rating-count">({course.students || '1,500+'} enrolled)</span>
              </div>
            </div>

            <h2 className="modal-course-title">{course.title}</h2>
            <p className="modal-course-desc">{course.description}</p>

            {/* Quick Milestones Row */}
            <div className="modal-milestones-row">
              <div className="milestone-chip">
                <Clock size={14} className="milestone-icon cyan" />
                <div>
                  <span className="m-label">Program Duration</span>
                  <span className="m-val">{course.duration}</span>
                </div>
              </div>

              <div className="milestone-chip">
                <Briefcase size={14} className="milestone-icon emerald" />
                <div>
                  <span className="m-label">Guaranteed Internship</span>
                  <span className="m-val">Up to ₹22,000/mo Stipend</span>
                </div>
              </div>

              <div className="milestone-chip">
                <TrendingUp size={14} className="milestone-icon amber" />
                <div>
                  <span className="m-label">Avg Salary Package</span>
                  <span className="m-val">{curriculum.salaryRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="modal-nav-tabs">
            <button
              className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              <Layers size={15} />
              <span>Syllabus & Modules ({curriculum.modules.length})</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Sparkles size={15} />
              <span>Capstone Projects ({curriculum.projects.length})</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              <Cpu size={15} />
              <span>Tools & Tech Stack</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'career' ? 'active' : ''}`}
              onClick={() => setActiveTab('career')}
            >
              <Building2 size={15} />
              <span>Career & Hiring</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              <DollarSign size={15} />
              <span>Tuition & EMI</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="modal-body-content">
            {/* 1. CURRICULUM TAB */}
            {activeTab === 'curriculum' && (
              <div className="tab-pane curriculum-pane">
                <div className="pane-intro">
                  <h3>Comprehensive Curriculum Breakdown</h3>
                  <p>Designed in partnership with top MNC architects to bridge academic theory and production-grade software engineering.</p>
                </div>

                <div className="modules-accordion-list">
                  {curriculum.modules.map((mod, idx) => {
                    const isExpanded = expandedModules.includes(idx)
                    return (
                      <div key={idx} className={`module-accordion-card ${isExpanded ? 'expanded' : ''}`}>
                        <div className="module-header" onClick={() => toggleModule(idx)}>
                          <div className="module-header-left">
                            <span className="module-number">0{idx + 1}</span>
                            <div>
                              <h4 className="module-title">{mod.title}</h4>
                              <span className="module-duration">{mod.duration}</span>
                            </div>
                          </div>
                          <ChevronDown size={18} className={`chevron-icon ${isExpanded ? 'rotated' : ''}`} />
                        </div>

                        {isExpanded && (
                          <div className="module-body">
                            <ul className="topics-list">
                              {mod.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="topic-item">
                                  <CheckCircle2 size={14} className="topic-check" />
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
              <div className="tab-pane projects-pane">
                <div className="pane-intro">
                  <h3>Production-Grade Capstone Projects</h3>
                  <p>Build enterprise portfolio projects that hiring managers and tech leads actively look for during technical interviews.</p>
                </div>

                <div className="projects-grid">
                  {curriculum.projects.map((proj, idx) => (
                    <div key={idx} className="project-detail-card">
                      <div className="project-badge-pill">Project 0{idx + 1}</div>
                      <h4 className="project-name">{proj.name}</h4>
                      <p className="project-desc">{proj.description}</p>
                      <div className="project-tech-chips">
                        {proj.tech.map((t, tIdx) => (
                          <span key={tIdx} className="p-chip">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. TOOLS & TECH STACK TAB */}
            {activeTab === 'tools' && (
              <div className="tab-pane tools-pane">
                <div className="pane-intro">
                  <h3>Industry Toolchain & Frameworks Mastered</h3>
                  <p>Gain hands-on command over the exact developer tools used in modern tech companies.</p>
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
              <div className="tab-pane career-pane">
                <div className="career-metrics-row">
                  <div className="career-metric-card">
                    <span className="metric-title">Average Starting Package</span>
                    <span className="metric-val">{curriculum.salaryRange}</span>
                    <span className="metric-sub">Based on 2025–2026 placed cohorts</span>
                  </div>

                  <div className="career-metric-card">
                    <span className="metric-title">Placement Success Rate</span>
                    <span className="metric-val text-emerald">96.4%</span>
                    <span className="metric-sub">Within 120 days of course completion</span>
                  </div>
                </div>

                <div className="career-section-group">
                  <h4>Target Career Roles</h4>
                  <div className="roles-tags-list">
                    {curriculum.careerRoles.map((role, idx) => (
                      <span key={idx} className="role-tag">{role}</span>
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

            {/* 5. PRICING & TUITION TAB */}
            {activeTab === 'pricing' && (
              <div className="tab-pane pricing-pane">
                <div className="pricing-split-grid">
                  {/* Upfront Option */}
                  <div className="pricing-plan-card recommended">
                    <div className="plan-badge">Scholarship Special</div>
                    <h4>One-Time Upfront</h4>
                    <div className="plan-amount-box">
                      <span className="plan-price">{price}</span>
                      <span className="plan-original">{originalPrice}</span>
                    </div>
                    <span className="plan-savings-pill">Save {discount} Instantly</span>
                    <ul className="plan-perks">
                      <li><CheckCircle2 size={13} className="text-emerald" /> 100% Full Curriculum & Code Access</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> Paid Internship: Up to ₹22,000/mo</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> MNC Dual-Certification</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> Dedicated 1-on-1 Mentor Calls</li>
                    </ul>
                  </div>

                  {/* Monthly EMI Option */}
                  <div className="pricing-plan-card">
                    <div className="plan-badge emi">Zero Cost EMI</div>
                    <h4>Monthly Installment</h4>
                    <div className="plan-amount-box">
                      <span className="plan-price">{emi}</span>
                      <span className="plan-period">/month</span>
                    </div>
                    <span className="plan-savings-pill cyan">0% Interest · 12 Months</span>
                    <ul className="plan-perks">
                      <li><CheckCircle2 size={13} className="text-emerald" /> Instant Approval with Major Banks</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> Zero Down Payment Required</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> Same Mentorship & Internship Stipend</li>
                      <li><CheckCircle2 size={13} className="text-emerald" /> Flexible 3, 6, 9, or 12 Months tenure</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="modal-sticky-footer">
            <div className="footer-price-info">
              <span className="footer-label">Total Program Fee:</span>
              <div className="footer-price-row">
                <span className="footer-amount">{price}</span>
                <span className="footer-discount">{discount} Scholarship Applied</span>
              </div>
            </div>

            <div className="footer-actions">
              <button className="footer-enroll-btn" onClick={handleEnrollClick}>
                <span>Apply & Enroll with Scholarship</span>
                <ArrowRight size={15} />
              </button>
            </div>
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
