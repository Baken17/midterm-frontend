# Jobly shared interface contract

This file documents the shared foundation for all six pages. Keep it aligned with `assets/css/base.css`.

## Required stylesheet order

1. Bootstrap 5.3.3 CSS
2. `assets/css/base.css`
3. The page stylesheet (`home-companies.css`, `jobs.css`, or `profile-career.css`)

Load Bootstrap Bundle and then the page JavaScript immediately before `</body>`.

## Shared navigation

The primary links and order are:

`Home | Jobs | Companies | Career Map | Profile`

Copy the complete `.site-header` markup from `index.html`. Only move the `active` class and `aria-current="page"` to the current page. Job Details uses Jobs as its active navigation item.

## Shared footer

Copy `.site-footer` from `index.html` without changing its structure or wording.

## Reusable classes

- `.site-container` — common 1200px content container.
- `.section-block` — standard vertical section spacing.
- `.eyebrow` — small mono section label.
- `.btn.btn-primary` and `.btn.btn-secondary` — shared actions.
- `.input-with-icon` — icon plus form input wrapper.
- `.match-badge`, `.match-high`, `.match-medium` — vacancy match labels.
- `.company-logo` — compact company mark.
- `.skill-chip`, `.skill-matched`, `.skill-gap`, `.skill-missing` — skill status labels.
- `.text-link` — important inline action.

## Breakpoints

- Desktop: 992px and wider.
- Tablet: 576px to 991px.
- Mobile: below 576px.

Do not change shared colors, typography, buttons, navbar, footer, radii, container width, or breakpoints inside a page stylesheet. If a shared change is necessary, coordinate it before editing `base.css`.

## File ownership

- Participant 1: `index.html`, `companies.html`, `base.css`, `home-companies.css`, `main.js`.
- Participant 2: `jobs.html`, `job-details.html`, `jobs.css`, `jobs.js`.
- Participant 3: `profile.html`, `career-map.html`, `profile-career.css`, `README.md`.
