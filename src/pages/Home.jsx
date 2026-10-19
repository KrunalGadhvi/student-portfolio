import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

/**
 * Home Page Component (Route: "/")
 * Assembled for Practical 2 multi-route architecture.
 * Composes Header, About, and Skills components.
 */
function Home({ studentName, themeColor, skillList }) {
  return (
    <div className="page-transition home-page">
      <Header 
        name={studentName}
        title="B.Tech Computer Science & Web Engineering Student"
        tagline="Building modern, scalable web applications with React, Vite, and component-driven architecture."
        themeColor={themeColor}
      />

      <About 
        institution="Charotar University of Science and Technology (CHARUSAT)"
        department="CSPIT / DEPSTAR - B.Tech (IT/CE/CSE/AIML)"
        course="Advanced Web Development Frameworks (ITUE301)"
        semester="5th Semester"
      />

      <Skills skillList={skillList} />
    </div>
  );
}

export default Home;
