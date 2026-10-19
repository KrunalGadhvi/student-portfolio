import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Projects Page Component - Practical 3: API Integration and Data Rendering
 * 
 * Features:
 * 1. Fetches public GitHub repositories using the fetch API inside useEffect.
 * 2. Manages 3 asynchronous states: repos (data), loading, and error.
 * 3. Conditional rendering: Spinner on loading, ErrorMessage on failure, RepoList on success.
 * 4. Supplementary 1: Retry button that re-triggers the fetch.
 * 5. Supplementary 2: Search input that filters repository list by name.
 * 6. Supplementary 3: Displays stargazers count alongside repository name.
 */
function ProjectsPage() {
  // Step 1: Set up 3 state variables for data, loading, and error
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supplementary states for enhanced functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [targetUser, setTargetUser] = useState('facebook'); // default popular user with public repos
  const [simulateError, setSimulateError] = useState(false);

  // Function to fetch repositories
  const fetchRepositories = () => {
    setLoading(true);
    setError(null);

    // If student simulates error, use an invalid URL endpoint
    const url = simulateError 
      ? 'https://api.github.com/non-existent-endpoint-404-test'
      : `https://api.github.com/users/${encodeURIComponent(targetUser)}/repos?per_page=12&sort=updated`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      })
      .catch((err) => {
        setError(err.message || 'An unexpected error occurred while fetching repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Step 2: useEffect triggers fetch on component mount and when targetUser or simulateError changes
  useEffect(() => {
    fetchRepositories();
  }, [targetUser, simulateError]);

  // Supplementary Problem 2: Filter repositories by name
  const filteredRepos = repos.filter((repo) => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-transition projects-page container section-block">
      <div className="section-header">
        <span className="section-eyebrow">Practical 3: REST API Integration</span>
        <h1 className="section-title">GitHub Repositories</h1>
        <p className="section-subtitle">
          Dynamic asynchronous data fetching using React <code>useEffect</code>, consuming GitHub's public REST API with loading spinners and error handling.
        </p>
      </div>

      {/* API Controls Bar */}
      <div className="api-controls-panel">
        <div className="search-filter-box">
          <label htmlFor="repo-search" className="control-label">Search Repositories:</label>
          <input
            id="repo-search"
            type="text"
            placeholder="Filter by repo name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input search-input"
          />
        </div>

        <div className="user-switch-box">
          <label htmlFor="user-select" className="control-label">GitHub Account:</label>
          <select 
            id="user-select"
            value={targetUser} 
            onChange={(e) => setTargetUser(e.target.value)}
            className="form-input user-select"
          >
            <option value="facebook">facebook</option>
            <option value="vercel">vercel</option>
            <option value="vitejs">vitejs</option>
            <option value="torvalds">torvalds</option>
          </select>
        </div>

        <div className="error-sim-box">
          <button
            type="button"
            className={`btn btn-sm ${simulateError ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => setSimulateError(!simulateError)}
            title="Break the API URL to test error boundary state"
          >
            {simulateError ? '⚠️ Revert to Normal API' : '🧪 Simulate API Error'}
          </button>
        </div>
      </div>

      {/* Step 3: Conditionally render based on state */}
      {loading && <Spinner message={`Connecting to GitHub API for @${targetUser}...`} />}

      {error && !loading && (
        <ErrorMessage 
          message={error} 
          onRetry={fetchRepositories} 
        />
      )}

      {/* Step 4: Map over repos and render on success */}
      {!loading && !error && (
        <div className="repos-container">
          <div className="repos-meta-header">
            <span className="meta-count">
              Showing <strong>{filteredRepos.length}</strong> of {repos.length} repositories
            </span>
            <span className="api-badge">Endpoint: <code>api.github.com/users/{targetUser}/repos</code></span>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="empty-state-card">
              <p>No repositories match your search filter "<strong>{searchTerm}</strong>".</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredRepos.map((repo) => (
                <article key={repo.id} className="project-card repo-card">
                  <div className="project-top">
                    <span className="project-category">{repo.language || 'Codebase'}</span>
                    {/* Supplementary Problem 3: Display Star Count */}
                    <span className="star-badge" title="GitHub Stars">
                      ⭐ {repo.stargazers_count.toLocaleString()}
                    </span>
                  </div>

                  <h2 className="project-title repo-title">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name} ↗
                    </a>
                  </h2>

                  <p className="project-description">
                    {repo.description || 'No description provided for this repository.'}
                  </p>

                  <div className="project-tags">
                    <span className="tech-tag">Forks: {repo.forks_count}</span>
                    <span className="tech-tag">Open Issues: {repo.open_issues_count}</span>
                    <span className="tech-tag">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>

                  <div className="project-footer">
                    <span className="project-id-badge">ID: {repo.id}</span>
                    {/* Step 4 Requirement: Render html_url for each repo */}
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-placeholder repo-url"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
