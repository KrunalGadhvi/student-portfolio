import React, { useState } from 'react';

/**
 * Contact Page Component (Route: "/contact")
 * Practical 2 Requirements:
 * 1. Controlled form input tied to `useState` that captures and displays user input in real time.
 * 2. Second `useState` variable to toggle visibility of an element (Help Tooltip / Info box).
 * 3. Live character count below the message input.
 */
function Contact() {
  // useState variable 1: Controlled input for user message & form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // useState variable 2: Toggle visibility of a UI element (Help Tooltip)
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmittedData({ name, email, message, timestamp: new Date().toLocaleTimeString() });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmittedData(null);
  };

  return (
    <div className="page-transition contact-page">
      <div className="container section-block">
        <div className="section-header">
          <span className="section-eyebrow">Interactive Form State</span>
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Demonstrating React <code>useState</code> controlled inputs, real-time input reflection, and visibility toggles.
          </p>
        </div>

        <div className="contact-layout">
          {/* Form Card */}
          <div className="contact-form-card">
            <div className="card-header-row">
              <h2 className="card-title">Send a Message</h2>
              {/* useState variable 2 toggle trigger */}
              <button
                type="button"
                className="tooltip-toggle-btn"
                onClick={() => setShowTooltip(!showTooltip)}
                title="Toggle Help Tooltip (useState variable 2)"
              >
                {showTooltip ? '✕ Hide Guide' : 'ℹ How State Works'}
              </button>
            </div>

            {/* useState variable 2: Conditionally toggled element */}
            {showTooltip && (
              <div className="tooltip-callout">
                <p>
                  <strong>State Rule:</strong> In React controlled components, input elements derive their value directly from React state (<code>value=&#123;message&#125;</code>) and update it on every keystroke via <code>onChange=&#123;(e) =&gt; setMessage(e.target.value)&#125;</code>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="user-name">Your Name</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">Email Address</label>
                <input
                  id="user-email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {/* Core required controlled input from Step 5 */}
              <div className="form-group">
                <div className="label-with-count">
                  <label htmlFor="message-input">Message (Controlled Input)</label>
                  {/* Supplementary requirement: Live character count */}
                  <span className="char-counter">
                    <code>{message.length}</code> / 250 characters
                  </span>
                </div>
                <textarea
                  id="message-input"
                  rows="4"
                  maxLength="250"
                  placeholder="Type your message here to observe real-time state synchronization..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-input form-textarea"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#6366f1' }}>
                  Submit Message
                </button>
                <button type="button" onClick={handleReset} className="btn btn-outline">
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* Live Real-time State Mirror (Fulfills: controlled input that captures and displays user input in real time) */}
          <div className="contact-preview-card">
            <div className="preview-top">
              <span className="live-pill">● Live State Mirror</span>
              <span className="state-badge">useState Active</span>
            </div>

            <h3 className="card-subtitle">Real-Time Prop & State Inspector</h3>
            <p className="mirror-desc">
              Any keystroke typed in the form on the left updates state immediately and triggers a Virtual DOM reconciliation re-render here:
            </p>

            <div className="state-display-box">
              <div className="state-row">
                <span className="state-key">name:</span>
                <span className="state-val">{name || <em className="empty-text">"empty"</em>}</span>
              </div>
              <div className="state-row">
                <span className="state-key">email:</span>
                <span className="state-val">{email || <em className="empty-text">"empty"</em>}</span>
              </div>
              <div className="state-row">
                <span className="state-key">message:</span>
                <span className="state-val highlight-val">{message || <em className="empty-text">"typing will mirror here live..."</em>}</span>
              </div>
              <div className="state-row">
                <span className="state-key">showTooltip (boolean):</span>
                <span className="state-val font-mono">{showTooltip ? 'true' : 'false'}</span>
              </div>
              <div className="state-row">
                <span className="state-key">characterCount:</span>
                <span className="state-val font-mono">{message.length}</span>
              </div>
            </div>

            {submittedData && (
              <div className="submission-success-banner">
                <span className="success-icon">✓</span>
                <div>
                  <strong>Form Successfully Submitted:</strong>
                  <p className="success-timestamp">Recorded at: {submittedData.timestamp}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
