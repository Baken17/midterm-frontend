# Jobly - Skill-First Career & Learning Platform

Jobly is a frontend web application designed for early-career software developers. The platform shifts job discovery from traditional experience-based filtering to skill-first matching, enabling users to evaluate competencies against job specifications and follow structured learning roadmaps.

---

## Key Features

* **Skill Match & Analysis**: Computes readiness percentages by comparing candidate competencies with target job requirements.
* **Detailed Skill Matrix**: Evaluates individual skills across proficiency levels, highlighting gaps and recommended actions.
* **Learning Roadmap**: Visualizes step-by-step skill acquisition sequences with status tracking (`Completed`, `In Progress`, `Next Up`).
* **Profile Management**: Displays verified competencies, target direction, personal details, and saved job postings.
* **Job & Company Exploration**: Provides structured interfaces for browsing available roles and participating organizations.

---

## Tech Stack

* **HTML**: Semantic document architecture adhering to WCAG accessibility standards.
* **CSS**: Custom CSS variables, CSS Grid, Flexbox layout systems, and Bootstrap framework.
* **JavaScript**: Client-side logic and DOM interactions.
* **Typography**: Integrated Google Fonts (`Inter` and `JetBrains Mono`).

---

## Project Structure

```text
.
├── assets/
│   ├── css/
│   │   ├── base.css            # Global styles, CSS variables, and typography
│   │   ├── home-companies.css  # Layouts for Home and Companies pages
│   │   ├── jobs.css            # Specific styles for job search and filtering
│   │   └── profile-career.css  # Layouts for Profile and Career Map pages
│   ├── images/                 # SVG icons and visual assets
│   └── js/
│       ├── jobs.js             # Client-side interactive logic for jobs listing
│       └── main.js             # Global client-side interactions
├── career-map.html             # Skill gap analysis and visual roadmap
├── companies.html              # Employer directory
├── index.html                  # Landing page
├── job-details.html            # Detailed job specification view
├── jobs.html                   # Job listings directory
├── profile.html                # User profile page
├── styles.css                  # Additional custom styles
├── TEAM-GUIDE.md               # Team guidelines and collaboration protocols
└── README.md                   # Technical project documentation
```

---

## Accessibility & Responsiveness

* **Accessibility**: Built with skip links, explicit ARIA attributes, focus states, and semantic HTML elements (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`).
* **Responsive Design**: Designed with mobile-first principles, ensuring layouts adjust seamlessly across mobile, tablet, and desktop viewports using CSS Grid, Flexbox, and Bootstrap utilities.

---

## Local Setup

This is a static client-side web application and requires no build tools or package managers.

1. Clone or download the repository.
2. Open `index.html` in any modern web browser, or launch it using a local server extension (e.g., Live Server for VS Code).