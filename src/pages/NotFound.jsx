import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Component (Supplementary Problem: 404 Route)
 * Renders when no defined route matches the URL path (path="*").
 */
function NotFound() {
  return (
    <div className="page-transition not-found-page container">
      <div className="not-found-card">
        <span className="error-code">404</span>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The requested route does not exist in our React Router configuration.
        </p>
        <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#6366f1' }}>
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
