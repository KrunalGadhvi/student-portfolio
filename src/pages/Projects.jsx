import React from 'react';
import ProjectsComponent from '../components/Projects';

/**
 * Projects Page Component (Route: "/projects")
 * Practical 2 Route implementation, serving as the integration foundation for Practical 3.
 */
function ProjectsPage() {
  return (
    <div className="page-transition projects-page">
      <div className="page-intro-banner container">
        <span className="badge-tag">Route: /projects</span>
        <h1 className="page-title">Project Portfolio</h1>
        <p className="page-desc">
          Rendered via React Router v6 <code>&lt;Route path="/projects" element=&#123;&lt;Projects /&gt;&#125; /&gt;</code> without full page reload.
        </p>
      </div>
      
      <ProjectsComponent />
    </div>
  );
}

export default ProjectsPage;
