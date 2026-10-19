# Student Portfolio - Practical 1

> **Subject:** Advanced Web Development Frameworks (ITUE301) | Semester: 5th  
> **Institution:** Charotar University of Science and Technology (CHARUSAT)  
> **Faculty:** Faculty of Technology and Engineering (CSPIT / DEPSTAR)  
> **Course Outcome:** CO1 / PO3, PO5  

---

## 🎯 Practical 1: Introduction to React and Component Architecture

### Objective
To set up a React development environment using Vite and build a static UI using independently structured, reusable components with unidirectional props data flow.

---

## 🏗️ Architecture & Component Tree

```
App.jsx
 ├── NavBar.jsx      (Supplementary: Active section indicator on scroll)
 ├── Header.jsx      (Required: Profile name, title, inline themeColor prop)
 ├── About.jsx       (Required: Academic & biographical bio)
 ├── Skills.jsx      (Required: Dynamic list receiving skillList array prop)
 ├── Projects.jsx    (Post-Lab: 3 curated project cards with tech tags)
 └── Footer.jsx      (Required: Lab metadata, contact info, copyright)
```

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

## ✨ Implemented Features

1. **4+ Reusable Components**:
   - `Header.jsx`: Hero showcase receiving `name`, `title`, and `themeColor`.
   - `About.jsx`: Biographical and university curriculum overview.
   - `Skills.jsx`: Renders `skillList` dynamically using `.map()` and unique keys.
   - `Projects.jsx`: 3 hardcoded projects with badges, tech stack, and category tags.
   - `Footer.jsx`: Institutional copyright and developer contacts.
   - `NavBar.jsx`: Sticky glassmorphic navigation with active section detection.

2. **Supplementary Problem Solved**:
   - **Active Navigation Highlighting**: Auto-updates active tab based on scroll position.
   - **Dynamic Skills Array Prop**: Passed from `App.jsx` and mapped cleanly.
   - **Inline Style via Theme Prop**: `themeColor` dynamically styles the Header accent and borders.

3. **Live Props Tester Toolbar**:
   - Built-in interactive test toolbar at the top of the viewport to instantly experiment with altering props passed to child components.

---

## 📝 Lab Viva & Key Analysis Questions

1. **What is the role of each component in the overall UI structure?**
   - Each component encapsulates a single responsibility: `App` manages state & orchestration, `Header` handles identity & greeting, `About` presents biography, `Skills` renders dynamic competencies, `Projects` displays achievements, and `Footer` provides metadata.
2. **How does React re-render when props change?**
   - Props change triggers React reconciliation. React generates a new Virtual DOM tree, performs a diffing comparison against the previous tree, and batches minimal Real DOM updates.
3. **Why is component reusability important in large-scale applications?**
   - Eliminates code duplication (DRY), enforces UI consistency, isolates bugs, and simplifies refactoring.
