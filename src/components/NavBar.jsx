import React, { useState, useEffect } from 'react';

/**
 * NavBar Component (Supplementary Problem 1)
 * Features sticky glassmorphism and dynamically highlights the active section
 * based on the user's scroll position.
 */
function NavBar({ brandName = "DevPortfolio" }) {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container" aria-label="Main Navigation">
        <a href="#home" className="nav-brand" onClick={(e) => scrollToSection(e, 'home')}>
          <span className="brand-dot"></span>
          <span className="brand-text">{brandName}</span>
          <span className="badge-tag">React v19</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
                {activeSection === item.id && <span className="active-indicator" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            href="#contact"
            className="btn btn-secondary btn-sm"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Get In Touch
          </a>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
