import React from 'react';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import ContactVisual from './ContactVisual';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import './Contact.css';

/**
 * Contact Component
 *
 * Implements the "START YOUR JOURNEY" section for the ProVersion website.
 * Combines authentic ProVersion headquarters info, admissions hotline,
 * dynamic course dropdown, real-time client validation, and a lightweight
 * gyroscopic communication portal.
 */
export default function Contact() {
  return (
    <section id="contact" className="ui-contact" aria-labelledby="contact-heading">
      {/* Ambient background glows */}
      <div className="ui-contact__bg-glow ui-contact__bg-glow--cyan" aria-hidden="true" />
      <div className="ui-contact__bg-glow ui-contact__bg-glow--purple" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <div className="ui-contact__header">
          <Reveal animation="fadeUp" delay={0.1}>
            <div className="ui-contact__badge">
              <span className="ui-contact__badge-pulse" />
              <span>START YOUR JOURNEY</span>
            </div>
          </Reveal>

          <Reveal animation="fadeUp" delay={0.2}>
            <h2 id="contact-heading" className="ui-contact__title">
              Connect With Our <span className="ui-contact__title-gradient">Admissions &amp; Career Mentors</span>
            </h2>
          </Reveal>

          <Reveal animation="fadeUp" delay={0.3}>
            <p className="ui-contact__subtitle">
              Have questions about our industry-led curriculums, live enterprise projects, or incubation cohorts?
              Reach out directly via hotline or schedule a personalized counseling session below.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout: Info & Visual on left, Interactive Form on right */}
        <div className="ui-contact__grid">
          <div className="ui-contact__info-col">
            <ContactVisual />

            <Reveal animation="fadeUp" delay={0.35}>
              <ContactInfo />
            </Reveal>
          </div>

          <div className="ui-contact__form-col">
            <Reveal animation="fadeUp" delay={0.4}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
