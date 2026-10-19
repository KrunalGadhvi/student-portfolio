import React from 'react';

/**
 * About Component (Required Component 2)
 * Renders student biography, academic background, and focus areas.
 * Demonstrates component-level encapsulation and prop-driven customization.
 */
function About({ 
  bio = "I am a 3rd-year computer engineering student passionate about building performant, reactive user interfaces and modern full-stack web applications. I focus on clean component architectures, state management, and modern developer tooling.",
  institution = "Charotar University of Science and Technology (CHARUSAT)",
  department = "Faculty of Technology and Engineering (CSPIT / DEPSTAR)",
  course = "Advanced Web Development Frameworks (ITUE301)",
  semester = "5th Semester - B.Tech"
}) {
  return (
    <section id="about" className="section-block about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Biography</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A glimpse into my academic journey, core technologies, and development philosophy.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card bio-card">
            <h3 className="card-title">Who I Am</h3>
            <p className="bio-paragraph">{bio}</p>
            <p className="bio-paragraph">
              Currently diving deep into component-based architectures with React, client-side routing, RESTful APIs with Express, and full-stack database modeling with MongoDB.
            </p>
            <div className="highlights-row">
              <div className="highlight-pill">
                <span className="pill-number">01</span>
                <span className="pill-text">Modular Architecture</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-number">02</span>
                <span className="pill-text">Reactive UI Flow</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-number">03</span>
                <span className="pill-text">Clean Props Contract</span>
              </div>
            </div>
          </div>

          <div className="about-card education-card">
            <h3 className="card-title">Academic Details</h3>
            <ul className="academic-list">
              <li className="academic-item">
                <span className="item-label">Institution:</span>
                <span className="item-value">{institution}</span>
              </li>
              <li className="academic-item">
                <span className="item-label">Department:</span>
                <span className="item-value">{department}</span>
              </li>
              <li className="academic-item">
                <span className="item-label">Subject:</span>
                <span className="item-value">{course}</span>
              </li>
              <li className="academic-item">
                <span className="item-label">Level:</span>
                <span className="item-value">{semester}</span>
              </li>
            </ul>

            <div className="card-callout">
              <span className="callout-icon">💡</span>
              <span className="callout-text">
                Designed to satisfy Course Outcome <strong>CO1</strong>: Setting up a React environment with Vite and composing modular functional components.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
