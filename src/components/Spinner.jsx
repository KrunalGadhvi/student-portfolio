import React from 'react';

/**
 * Spinner Component (Practical 3: Loading State)
 * Rendered conditionally when asynchronous fetch operations are in flight.
 */
function Spinner({ message = "Fetching repositories from GitHub API..." }) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner-ring"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
}

export default Spinner;
