import React from 'react';

/**
 * Footer Component (Required Component 4)
 * Renders contact details, lab accreditation, and copyright info.
 * Receives `author`, `email`, and `academicYear` as props.
 */
function Footer({ 
  author = "Alex Morgan", 
  email = "alex.morgan@charusat.edu.in",
  academicYear = "2025-2026",
  course = "ITUE301: Advanced Web Development Frameworks"
}) {
  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <h3 className="footer-logo">
              <span className="logo-accent">⚡</span> {author}'s Portfolio
            </h3>
            <p className="footer-desc">
              Built as part of Practical 1: Introduction to React & Component Architecture.
              Demonstrates independent, modular functional components composed in a single layout.
            </p>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact & Inquiries</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">✉</span>
                <a href={`mailto:${email}`} className="contact-link">{email}</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>CHARUSAT Campus, Changa, Gujarat, India</span>
              </li>
              <li>
                <span className="contact-icon">🎓</span>
                <span>{course}</span>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Component Architecture</h4>
            <ul className="footer-links-list">
              <li><code>&lt;Header /&gt;</code> - Profile & Props styling</li>
              <li><code>&lt;About /&gt;</code> - Academic Bio</li>
              <li><code>&lt;Skills /&gt;</code> - Props Array Mapping</li>
              <li><code>&lt;Projects /&gt;</code> - 3 Curated Projects</li>
              <li><code>&lt;Footer /&gt;</code> - Metadata & Contact</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {academicYear} {author}. All rights reserved. Created with React & Vite.
          </p>
          <div className="footer-tags">
            <span className="badge-chip">CO1 Aligned</span>
            <span className="badge-chip">Vite Bundled</span>
            <span className="badge-chip">100% Component Reusability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
