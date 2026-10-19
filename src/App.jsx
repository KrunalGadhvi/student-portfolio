import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import Contact from './pages/Contact';
import TasksPage from './pages/Tasks';
import NotFound from './pages/NotFound';

/**
 * App Component - Multi-Route Full-Stack Application
 */
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [themeColor, setThemeColor] = useState('#6366f1');

  const [skillList] = useState([
    'React 19 & Component Architecture',
    'React Router v6 Client-Side Routing',
    'useState State Management & Controlled Forms',
    'Full Stack Integration (React + Express + MongoDB)',
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
      <NavBar 
        brandName={`${studentName.split(' ')[0] || 'Dev'}.io`} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
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
