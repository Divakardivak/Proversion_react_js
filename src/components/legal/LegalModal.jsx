import React, { useState, useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  FileText,
  Lock,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { legalPolicies, copyrightNotice } from '@/data/legal'
import './LegalModal.css'

const POLICY_ICONS = {
  terms: FileText,
  privacy: Lock,
  refund: RotateCcw,
}

export function LegalModal({ isOpen, initialPolicyId = 'terms', onClose }) {
  const [activePolicyId, setActivePolicyId] = useState(initialPolicyId)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (initialPolicyId && legalPolicies[initialPolicyId]) {
      setActivePolicyId(initialPolicyId)
    }
  }, [initialPolicyId])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Scroll to top of modal content when tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activePolicyId])

  const currentPolicy = legalPolicies[activePolicyId] || legalPolicies.terms
  const ActiveIcon = POLICY_ICONS[currentPolicy.id] || ShieldCheck

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return
    const url = `${window.location.origin}${window.location.pathname}#${currentPolicy.id}`
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleSectionJump = (sectionNumber) => {
    const el = document.getElementById(`policy-section-${currentPolicy.id}-${sectionNumber}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="legal-modal-root" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          {/* Backdrop */}
          <motion.div
            className="legal-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="legal-modal-wrap">
            <motion.div
              className="legal-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="legal-modal-header">
                <div className="legal-modal-header-top">
                  <div className="legal-modal-badge-row">
                    <span className="legal-modal-badge">
                      <ShieldCheck size={13} className="legal-modal-badge-icon" />
                      <span>OFFICIAL LEGAL DOCUMENTATION</span>
                    </span>
                    <span className="legal-modal-effective">{currentPolicy.effectiveDate}</span>
                  </div>

                  <div className="legal-modal-actions">
                    <button
                      type="button"
                      className="legal-modal-btn-action"
                      onClick={handleCopyLink}
                      title="Copy link to this document"
                      aria-label="Copy document link"
                    >
                      {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                      <span className="action-text">{copied ? 'Copied' : 'Share'}</span>
                    </button>

                    <button
                      type="button"
                      className="legal-modal-btn-action"
                      onClick={handlePrint}
                      title="Print document"
                      aria-label="Print policy document"
                    >
                      <Printer size={15} />
                      <span className="action-text">Print</span>
                    </button>

                    <button
                      type="button"
                      className="legal-modal-close-btn"
                      onClick={onClose}
                      aria-label="Close dialog"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="legal-modal-title-row">
                  <div className="legal-modal-icon-bubble">
                    <ActiveIcon size={22} />
                  </div>
                  <div>
                    <h2 id={titleId} className="legal-modal-title">
                      {currentPolicy.documentTitle || currentPolicy.title}
                    </h2>
                    <p className="legal-modal-subtitle">
                      ProVersion Digital Platform & Student Services Compliance
                    </p>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="legal-modal-tabs" role="tablist" aria-label="Legal policies">
                  {Object.values(legalPolicies).map((policy) => {
                    const TabIcon = POLICY_ICONS[policy.id] || FileText
                    const isActive = activePolicyId === policy.id
                    return (
                      <button
                        key={policy.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`legal-modal-tab ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActivePolicyId(policy.id)}
                      >
                        <TabIcon size={14} className="tab-icon" />
                        <span>{policy.shortTitle}</span>
                        {isActive && (
                          <motion.div
                            layoutId="legalModalTabIndicator"
                            className="legal-modal-tab-indicator"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quick Section Table of Contents Pills */}
              {currentPolicy.sections && currentPolicy.sections.length > 0 && (
                <div className="legal-modal-toc-bar" aria-label="Quick jump to section">
                  <span className="toc-label">Jump to:</span>
                  <div className="toc-chips-scroll">
                    {currentPolicy.sections.map((sec) => (
                      <button
                        key={sec.number}
                        type="button"
                        className="toc-chip"
                        onClick={() => handleSectionJump(sec.number)}
                      >
                        {sec.number}. {sec.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Body / Scrollable Content */}
              <div className="legal-modal-body" ref={contentRef}>
                {/* Preamble / Intro Box */}
                {currentPolicy.preamble && (
                  <div className="legal-modal-preamble-box">
                    <p className="preamble-text">{currentPolicy.preamble}</p>
                  </div>
                )}

                {/* Numbered Sections */}
                <div className="legal-sections-list">
                  {currentPolicy.sections.map((section) => (
                    <article
                      key={section.number}
                      id={`policy-section-${currentPolicy.id}-${section.number}`}
                      className="legal-section-card"
                    >
                      <div className="legal-section-header">
                        <span className="legal-section-number">{section.number}</span>
                        <h3 className="legal-section-title">{section.title}</h3>
                      </div>

                      <div className="legal-section-content">
                        {/* Paragraphs */}
                        {section.paragraphs &&
                          section.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="legal-para">
                              {p}
                            </p>
                          ))}

                        {/* Intro before bullets */}
                        {section.intro && <p className="legal-para-intro">{section.intro}</p>}

                        {/* Bullets */}
                        {section.bullets && (
                          <ul className="legal-bullet-list">
                            {section.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="legal-bullet-item">
                                <span className="legal-bullet-dot" aria-hidden="true" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Subsections (like in Privacy Policy) */}
                        {section.subsections && (
                          <div className="legal-subsections-grid">
                            {section.subsections.map((sub, sIdx) => (
                              <div key={sIdx} className="legal-subsection-block">
                                <h4 className="legal-sub-title">{sub.title}</h4>
                                {sub.intro && <p className="legal-para-intro">{sub.intro}</p>}
                                {sub.paragraphs &&
                                  sub.paragraphs.map((sp, spIdx) => (
                                    <p key={spIdx} className="legal-para">
                                      {sp}
                                    </p>
                                  ))}
                                {sub.bullets && (
                                  <ul className="legal-bullet-list legal-bullet-list--compact">
                                    {sub.bullets.map((sb, sbIdx) => (
                                      <li key={sbIdx} className="legal-bullet-item">
                                        <span className="legal-bullet-dot" aria-hidden="true" />
                                        <span>{sb}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Closing */}
                        {section.closing && <p className="legal-para-closing">{section.closing}</p>}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Document Bottom Callout */}
                <div className="legal-modal-contact-callout">
                  <div className="callout-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="callout-body">
                    <h4>Questions or Compliance Requests?</h4>
                    <p>
                      If you have questions regarding these {currentPolicy.title} or need support
                      regarding personal data, please contact our legal desk at{' '}
                      <a href="mailto:support@proversion.in">support@proversion.in</a> or visit our
                      headquarters in Hyderabad, India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="legal-modal-footer">
                <div className="legal-modal-footer-copy">
                  <span>{copyrightNotice}</span>
                  <span className="dot-sep">•</span>
                  <span>Authentic Official Policies</span>
                </div>

                <div className="legal-modal-footer-actions">
                  <button type="button" className="legal-modal-btn-primary" onClick={onClose}>
                    <span>I Understand</span>
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default LegalModal
