import React from 'react';

/**
 * Projects Component (Post-Lab Assignment Requirement)
 * Renders a list of 3 featured projects with tags, descriptions, and links.
 * Accepts optional `projectList` prop with sensible defaults to allow experimenting with prop variations.
 */
function Projects({ 
  projectList = [
    {
      id: 1,
      title: "Task Management System",
      description: "A full-stack RESTful CRUD task management application with Express, MongoDB, and Mongoose schema validation.",
      techStack: ["Node.js", "Express", "MongoDB", "Mongoose"],
      status: "In Development",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "GitHub Repository Explorer",
      description: "Interactive single-page application consuming the public GitHub REST API with custom loading spinners and robust error states.",
      techStack: ["React 19", "Vite", "REST API", "Async/Await"],
      status: "Completed",
      category: "Frontend"
    },
    {
      id: 3,
      title: "AI-Powered Content Assistant",
      description: "Intelligent web platform integrating Gemini / OpenAI APIs with secure backend key handling and graceful degradation.",
      techStack: ["React", "Express", "Generative AI", "JWT Auth"],
      status: "Planned",
      category: "AI & Full Stack"
    }
  ]
}) {
  return (
    <section id="projects" className="section-block projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Academic & Personal Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of 3 project implementations designed to integrate with upcoming Practical milestones.
          </p>
        </div>

        <div className="projects-grid">
          {projectList.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-top">
                <span className="project-category">{project.category}</span>
                <span className={`project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-footer">
                <span className="project-id-badge">Project #{project.id}</span>
                <span className="project-link-placeholder">View Specs →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
