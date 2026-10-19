import React from 'react';

/**
 * ErrorMessage Component (Practical 3: Error State & Supplementary Retry Action)
 * Displayed when an API request fails, times out, or encounters network errors.
 */
function ErrorMessage({ message = "Failed to load GitHub repositories.", onRetry }) {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-heading">API Request Error</h3>
        <p className="error-desc">{message}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-secondary btn-sm retry-btn">
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
