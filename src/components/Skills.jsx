import React from 'react';

/**
 * Skills Component (Required Component 3)
 * Implements the exact structure from Lab Manual Step 4:
 * Accepts `skillList` as a prop array and dynamically renders each skill item using `.map()` with a unique key.
 */
function Skills({ skillList = [] }) {
  return (
    <section id="skills" className="section-block skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Technical Toolkit</span>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-subtitle">
            Dynamic skills list passed as an array prop from <code>App.jsx</code> and rendered using JavaScript expressions in JSX.
          </p>
        </div>

        <div className="skills-card">
          <div className="skills-meta">
            <span className="counter-pill">{skillList.length} Skills Configured via Props</span>
            <span className="code-hint">Dynamic Rendering: <code>{`{skillList.map((s) => <li key={s}>{s}</li>)}`}</code></span>
          </div>

          {/* Core compliant unordered list required by practical manual */}
          <ul className="skills-list">
            {skillList.map((s) => (
              <li key={s} className="skill-item">
                <span className="skill-bullet">◆</span>
                <span className="skill-name">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
