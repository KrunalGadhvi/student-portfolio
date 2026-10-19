import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

/**
 * App Component - Root Application
 * Practical 1: Introduction to React and Component Architecture
 * 
 * Demonstrates:
 * 1. Independent reusable functional components (Header, About, Skills, Projects, Footer, NavBar)
 * 2. Composition into a unified single-page layout
 * 3. Data flow via Props (passing 'name', 'themeColor' to Header, and 'skillList' to Skills)
 * 4. Interactive prop experimentation to observe reactive re-rendering
 */
function App() {
  // State variables enabling live testing of prop values (Page 3 Assignment requirement)
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [themeColor, setThemeColor] = useState('#6366f1'); // Indigo accent

  // Array of skills passed as a prop to <Skills /> (Step 4 & 6 requirement)
  const [skillList, setSkillList] = useState([
    'React 19 & Component Architecture',
    'JSX Syntax & Functional Components',
    'Props & Unidirectional Data Flow',
    'JavaScript (ES6+, Map, Promises)',
    'Vite Build Tooling & Fast HMR',
    'Modern CSS3 & Glassmorphic UI',
    'Node.js & Express REST APIs',
    'MongoDB & Mongoose Schema'
  ]);

  // Color options for testing the themeColor prop on Header
  const themePresets = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Amber', color: '#f59e0b' }
  ];

  return (
    <div className="app-container">
      {/* Interactive Props Experimenter Bar (Demonstrates viva concept: Props change triggers re-render) */}
      <aside className="lab-prop-toolbar" aria-label="Lab Examiner Props Toolbar">
        <div className="container toolbar-inner">
          <div className="toolbar-title">
            <span className="live-badge">Practical 1 Props Tester</span>
            <span>Experiment with props passed to child components:</span>
          </div>

          <div className="toolbar-controls">
            <div className="control-item">
              <label htmlFor="student-name-input">Header <code>name</code> prop:</label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name..."
              />
            </div>

            <div className="control-item">
              <label>Header <code>themeColor</code> prop:</label>
              <div className="palette-swatches">
                {themePresets.map((preset) => (
                  <button
                    key={preset.color}
                    type="button"
                    title={preset.name}
                    className={`swatch-btn ${themeColor === preset.color ? 'active' : ''}`}
                    style={{ backgroundColor: preset.color }}
                    onClick={() => setThemeColor(preset.color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Supplementary Problem 1: Sticky NavBar with active section highlight */}
      <NavBar brandName={`${studentName.split(' ')[0] || 'Dev'}.io`} />

      <main className="main-content">
        {/* Required Component 1: Header receiving name, title, and themeColor props */}
        <Header 
          name={studentName}
          title="B.Tech Computer Science & Web Engineering Student"
          tagline="Building modern, scalable web applications with React, Vite, and component-driven architecture."
          themeColor={themeColor}
        />

        {/* Required Component 2: About component */}
        <About 
          institution="Charotar University of Science and Technology (CHARUSAT)"
          department="CSPIT / DEPSTAR - B.Tech (IT/CE/CSE/AIML)"
          course="Advanced Web Development Frameworks (ITUE301)"
          semester="5th Semester"
        />

        {/* Required Component 3: Skills component receiving dynamic skillList array prop */}
        <Skills skillList={skillList} />

        {/* Student Assignment Component: Projects component rendering 3 hardcoded projects */}
        <Projects />
      </main>

      {/* Required Component 4: Footer component */}
      <Footer 
        author={studentName}
        email={`${studentName.toLowerCase().replace(/\s+/g, '.')}@charusat.edu.in`}
        academicYear="2025-2026"
      />
    </div>
  );
}

export default App;
