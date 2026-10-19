import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * NavBar Component (Practical 2 Router Integration)
 * Uses React Router's `NavLink` and `Link` to enable single-page transitions without full page reloads.
 * Also includes Dark / Light mode toggle (Supplementary requirement).
 */
function NavBar({ brandName = "DevPortfolio", isDarkMode = true, onToggleTheme }) {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar container" aria-label="Main Navigation">
        <Link to="/" className="nav-brand">
          <span className="brand-dot"></span>
          <span className="brand-text">{brandName}</span>
          <span className="badge-tag">Router v6</span>
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          {/* Supplementary Problem: Dark/Light Mode toggle */}
          <button
            type="button"
            className="theme-mode-btn"
            onClick={onToggleTheme}
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <Link to="/contact" className="btn btn-primary btn-sm" style={{ backgroundColor: '#6366f1' }}>
            Hire / Connect
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
