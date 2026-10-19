import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

/**
 * Practical 8: Performance Optimization and Lazy Loading in React
 * Converts route components to asynchronous dynamic imports using React.lazy()
 * Code splitting creates independent bundle chunks loaded only when routes are visited.
 */
const Home = lazy(() => import('./pages/Home'));
const TasksPage = lazy(() => import('./pages/Tasks'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [studentName, setStudentName] = useState('Kurnal Kidiya');
  const [themeColor, setThemeColor] = useState('#6366f1');

  const [skillList] = useState([
    'React 19 & Component Architecture',
    'React Router v6 Client-Side Routing',
    'useState State Management & Controlled Forms',
    'Full Stack Integration (React + Express + MongoDB)',
    'Performance Optimization & React.lazy() Code Splitting',
    'JavaScript (ES6+, Async/Await, Array Methods)',
    'Vite Build Tooling & Fast HMR',
    'Node.js & Express REST APIs',
    'MongoDB & Mongoose Schema'
  ]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themePresets = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Amber', color: '#f59e0b' }
  ];

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Interactive Props Experimenter Bar (Practical 1 & 2) */}
      <aside className="lab-prop-toolbar" aria-label="Lab Examiner Props Toolbar">
        <div className="container toolbar-inner">
          <div className="toolbar-title">
            <span className="live-badge">Practical 1 Props Tester</span>
            <span>Experiment with props passed to child components:</span>
          </div>

          <div className="toolbar-controls">
            <div className="control-item">
              <label htmlFor="student-name-input">Header <code>name</code> prop:</label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name..."
              />
            </div>

            <div className="control-item">
              <label>Header <code>themeColor</code> prop:</label>
              <div className="palette-swatches">
                {themePresets.map((preset) => (
                  <button
                    key={preset.color}
                    type="button"
                    title={preset.name}
                    className={`swatch-btn ${themeColor === preset.color ? 'active' : ''}`}
                    style={{ backgroundColor: preset.color }}
                    onClick={() => setThemeColor(preset.color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <NavBar 
        brandName={`${studentName.split(' ')[0] || 'Dev'}.io`} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/* Practical 8 Step 4: Wrap Routes block with Suspense and meaningful fallback */}
        <Suspense 
          fallback={
            <div className="route-suspense-loader container">
              <div className="spinner-ring"></div>
              <p className="loading-chunk-text">⚡ Dynamically loading route chunk via React.lazy()...</p>
            </div>
          }
        >
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  studentName={studentName} 
                  themeColor={themeColor} 
                  skillList={skillList} 
                />
              } 
            />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer 
        author={studentName}
        email={`${studentName.toLowerCase().replace(/\s+/g, '.')}@charusat.edu.in`}
        academicYear="2025-2026"
      />
    </div>
  );
}

export default App;
