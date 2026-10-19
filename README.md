# Student Portfolio - React Lab Practicals

> **Subject:** Advanced Web Development Frameworks (ITUE301) | Semester: 5th  
> **Institution:** Charotar University of Science and Technology (CHARUSAT)  
> **Faculty:** Faculty of Technology and Engineering (CSPIT / DEPSTAR)  
> **Course Outcomes:** CO1 / PO3, PO5  

---

## 🎯 Practical 1: Introduction to React & Component Architecture

### Objective
To set up a React development environment using Vite and build a static UI using independently structured, reusable components with unidirectional props data flow.

---

## 🎯 Practical 2: State Management & Routing in React

### Objective
To implement reactive state management using `useState` and multi-page navigation using React Router v6 in the portfolio application without full page reloads.

### 🗺️ Multi-Route Architecture

```
App.jsx (wrapped inside <BrowserRouter> in main.jsx)
 ├── NavBar.jsx          (Navigation links via <NavLink> + Dark/Light Mode toggle)
 ├── Routes
 │    ├── Route "/"          → <Home /> (Header, About, Skills)
 │    ├── Route "/projects"  → <ProjectsPage /> (Card-based project showcase)
 │    ├── Route "/contact"   → <Contact /> (Controlled inputs, live mirror, tooltip toggle)
 │    └── Route "*"          → <NotFound /> (Custom 404 handler)
 └── Footer.jsx          (Global copyright & institutional credentials)
```

### 🔑 State Management (`useState`) Highlights
1. **Dark/Light Mode Theme Toggle (`isDarkMode`)**:
   - Manages state at root container level and applies `.dark-theme` / `.light-theme` class dynamically.
2. **Controlled Form Inputs (`message`, `name`, `email`)**:
   - Tied directly to React state with real-time keystroke mirroring in an inspector panel.
   - Live character count below the input (`{message.length} / 250 characters`).
3. **Visibility Toggle State (`showTooltip`)**:
   - Toggles an interactive educational help card explaining controlled component principles.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended, verified on v24.18.0)
- npm (v9+ recommended, verified on 11.16.0)

### 2. Installation & Run
```bash
# Navigate to project directory
cd student-portfolio

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🌐 Routes Overview

| Route Path | Component | Purpose | Key Features |
| :--- | :--- | :--- | :--- |
| `/` | `Home.jsx` | Landing & Profile | Header (props-driven inline style), About bio, Skills list |
| `/projects` | `Projects.jsx` | Project Portfolio | 3 curated project cards with tech tags |
| `/contact` | `Contact.jsx` | Interactive Form | Controlled `useState` inputs, live mirror, character count, tooltip toggle |
| `*` | `NotFound.jsx` | 404 Error Page | Catches undefined paths with link back to Home |

---

## 📝 Viva Questions & Conceptual Answers

1. **Why use `<Link to="...">` or `<NavLink>` instead of `<a href="...">`?**
   - Standard `<a>` tags cause the browser to trigger a full HTTP GET request and full page reload, losing client state and destroying the Single Page Application (SPA) experience. React Router's `<Link>` intercepts navigation using the HTML5 History API (`pushState`), swapping out route components without reloading the browser.
2. **What does controlled component mean in React?**
   - A controlled component is an input element whose value is governed by React state (`value={state}`) and whose updates are channeled through an event handler (`onChange={(e) => setState(e.target.value)}`). This ensures a single source of truth.
3. **Why must `<BrowserRouter>` wrap `<App />`?**
   - React Router uses React's Context API internally to provide navigation state and URL listeners to descendant components. If components containing `useRoutes()`, `<Routes>`, or `<Link>` are rendered outside `<BrowserRouter>`, React throws a router context error.
