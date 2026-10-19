import React, { useEffect } from 'react';

/**
 * Toast Notification Component (Supplementary Problem 3)
 * Displays success and error feedback for API interactions.
 */
function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`} role="alert">
      <span className="toast-icon">
        {type === 'success' ? '✓' : '⚠️'}
      </span>
      <span className="toast-text">{message}</span>
      <button type="button" onClick={onClose} className="toast-close-btn" aria-label="Close notification">
        ✕
      </button>
    </div>
  );
}

export default Toast;
