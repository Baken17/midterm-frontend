# Jobly - Skill-First Career & Learning Platform

Jobly is a responsive, multi-page job search website for early-career professionals. In addition to browsing vacancies and companies, users can compare their skills with a target role and follow a practical learning roadmap.

## Live Demo

[Open Jobly on GitHub Pages](https://baken17.github.io/midterm-frontend/)

## Endterm — participant 1 (Home and Companies)

Companies now renders cards from `assets/js/companies-data.js`. Two arrays
hold employer records and industry options. Existing company IDs and Home GET
parameters remain compatible with Jobs. Search, industry filtering, sorting,
reset and expandable details are implemented in `main.js`.

jQuery 3.7.1 is loaded on Companies. Delegated click/keydown handlers survive
card replacement; ID/class selectors, closest/find traversal and slideDown/
slideUp effects support the details interaction. Native fallback works if the CDN
is unavailable. Reduced-motion preferences are respected.

### Test participant 1

1. Open Companies: six cards and six results should appear.
2. Search DESIGN: Studio Blue appears; surrounding spaces do not affect matching.
3. Select Finance while DESIGN remains: no results. Clear search resets all controls.
4. Select Technology: Acme appears. Reset restores six companies.
5. Choose Name A–Z: cards sort alphabetically.
6. Open details, close them, and press Escape while the toggle is focused.
7. Repeat searches and then open details: delegated handlers must still work.
8. Follow a company link: Jobs receives the existing company ID.
9. Search from Home: Jobs receives q and location.
10. Check keyboard navigation and narrow screens; inspect the console for errors.

### Integration status

This increment covers participant 1 only. Participant 2 owns dynamic vacancies,
shared saved-job storage and substantial application-form validation. Participant
3 owns persistent profile, skills and the computed career map. The whole-project
endterm requirements are not yet claimed complete. Employer profiles are sample
data; existing skill percentages and platform statistics are demonstrations.
Add the actual group member names before final submission.

---

## Key Features

* **Skill Match & Analysis**: Shows readiness percentages by comparing candidate competencies with target job requirements.
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
│       ├── main.js             # Shared navigation and company search interactions
│       └── profile.js          # Profile editing interactions
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
2. Open `index.html` in any modern web browser, or launch it using a local server extension such as Live Server.

No build step, package manager, or backend is required.
