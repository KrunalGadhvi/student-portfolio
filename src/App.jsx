import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * App Component - Practical 2: State Management and Routing in React
 * 
 * Features:
 * 1. React Router v6 setup with Routes and Route (Home, Projects, Contact, NotFound 404).
 * 2. Multi-page navigation without full page reloads via <Link> & <NavLink>.
 * 3. useState variable 1: Dark/Light Mode state applying CSS class to root container.
 * 4. useState variable 2 & 3: Controlled input & element toggle in Contact page.
 */
function App() {
  // Supplementary Problem: Dark/Light mode state managing root CSS class
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Student details & dynamic props preserved from Practical 1
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [themeColor, setThemeColor] = useState('#6366f1');

  const [skillList] = useState([
    'React 19 & Component Architecture',
    'React Router v6 Client-Side Routing',
    'useState State Management & Controlled Forms',
    'JavaScript (ES6+, Async/Await, Array Methods)',
    'Vite Build Tooling & Fast HMR',
    'Node.js & Express REST APIs',
    'MongoDB & Mongoose Schema'
  ]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Route Navigation Bar */}
      <NavBar 
        brandName={`${studentName.split(' ')[0] || 'Dev'}.io`} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/* Step 3: Define 3 routes inside App.jsx using Routes and Route (+ 404 handler) */}
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
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* Supplementary Problem: 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer Component */}
      <Footer 
        author={studentName}
        email={`${studentName.toLowerCase().replace(/\s+/g, '.')}@charusat.edu.in`}
        academicYear="2025-2026"
      />
    </div>
  );
}

export default App;
