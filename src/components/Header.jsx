import React from 'react';

/**
 * Header Component (Required Component 1 & Supplementary Problem 3)
 * Receives `name`, `title`, and `themeColor` as props.
 * Applies `themeColor` as an inline style to key accent elements.
 */
function Header({ 
  name = "Alex Morgan", 
  title = "Frontend & React Engineer", 
  tagline = "Designing & Engineering Modern, Scalable Web Applications", 
  themeColor = "#6366f1" 
}) {
  // Inline style object utilizing the themeColor prop as specified in practical guidelines
  const dynamicHeaderStyle = {
    borderColor: themeColor,
    boxShadow: `0 0 25px ${themeColor}33`,
  };

  const dynamicTagStyle = {
    backgroundColor: `${themeColor}1a`,
    color: themeColor,
    borderColor: `${themeColor}40`
  };

  const dynamicAccentStyle = {
    color: themeColor
  };

  return (
    <section id="home" className="header-section">
      <div className="container header-content">
        <div className="header-badge-wrapper">
          <span className="status-pill" style={dynamicTagStyle}>
            <span className="pulsing-dot" style={{ backgroundColor: themeColor }}></span>
            Available for Semester Projects & Collaboration
          </span>
        </div>

        <h1 className="header-heading">
          Hi, I'm <span className="highlight-name" style={dynamicAccentStyle}>{name}</span>
        </h1>

        <p className="header-role" style={{ color: '#cbd5e1' }}>
          {title}
        </p>

        <p className="header-tagline">
          {tagline}
        </p>

        <div className="header-actions">
          <a 
            href="#projects" 
            className="btn btn-primary"
            style={{ 
              backgroundColor: themeColor, 
              borderColor: themeColor,
              boxShadow: `0 8px 20px ${themeColor}40`
            }}
          >
            Explore Projects →
          </a>
          <a href="#skills" className="btn btn-outline">
            View Skill Stack
          </a>
        </div>

        <div className="header-card-preview" style={dynamicHeaderStyle}>
          <div className="preview-indicator">
            <span className="preview-dot red"></span>
            <span className="preview-dot yellow"></span>
            <span className="preview-dot green"></span>
            <span className="preview-label">Active Theme Prop: <code>{themeColor}</code></span>
          </div>
          <div className="preview-body">
            <div className="code-snippet">
              <span className="token-keyword">const</span> student = &#123; name: <span className="token-string">"{name}"</span>, role: <span className="token-string">"{title}"</span>, ready: <span className="token-boolean">true</span> &#125;;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
