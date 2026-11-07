# Jobly · Participant 2

This part covers Jobs, Job Details, the shared vacancy list, saved jobs, and the demo application form.

| File | Purpose |
| --- | --- |
| `jobs.html` | Search form, filters, and vacancy card template |
| `job-details.html` | Vacancy details, application form, and missing vacancy message |
| `assets/js/jobs-data.js` | Shared vacancy records and lookup functions |
| `assets/js/jobs.js` | Card rendering, filters, and jQuery controls |
| `assets/js/job-details.js` | Vacancy details, Save job button, and form validation |
| `assets/js/saved-jobs.js` | Reading, adding, and removing saved vacancy IDs |

## Integration with Profile and Career Map

Each record in `JoblyJobs` has a stable `id`, a `companyId` from `JoblyCompanies`, and fields for `title`, `location`, `type`, `category`, `description`, and `skills`. The cards also use `salary` and `exampleMatch`. The `about` and `responsibilities` fields are optional. Keep the ID when renaming a vacancy.

- `findJobById(id)` returns the matching vacancy or `null`.
- `getJobCompanyName(companyId)` returns the company name or an empty string.
- `jobDetailsUrl(id)` returns the link to a vacancy's details.

Load these scripts before the Profile script:

```html
<script src="assets/js/companies-data.js"></script>
<script src="assets/js/jobs-data.js"></script>
<script src="assets/js/saved-jobs.js"></script>
```

`JoblySavedJobs.getIds()` returns unique IDs for known vacancies. Use `findJobById(id)` to get the data for each saved card. Use `JoblySavedJobs.add(id)` and `JoblySavedJobs.remove(id)` to update the list. Both return `true` on success or `false` if the update fails. The storage key is `jobly.savedJobIds` and its value is a JSON array of strings.

Career Map needs the first two scripts. A details link passes the vacancy ID in the `job` parameter, such as `career-map.html?job=data-analyst`. Read it with `URLSearchParams`, look up the vacancy, and compare its skills with the profile. Use the default target when the user opens Career Map from the main navigation. The Profile and Career Map owner handles the integration.

## Manual checks

Run `python3 -m http.server 8765 --bind 127.0.0.1` from the project folder and open `http://127.0.0.1:8765/`.

1. Open Jobs and confirm that six cards appear. Select Remote and Development to see Junior Frontend Developer. Add Full-time to see the empty state. Clear all filters to restore the six cards.
2. Search for Data Analyst and Remote from Home. Then open View jobs for Acme from Companies. Each route should show one matching vacancy.
3. Open Data Analyst and UX Designer and compare the details. An unknown or empty ID should show Job not found. The legacy URL without an ID opens Acme.
4. Save Data Analyst, reload, and confirm that the button reads Remove saved job. Remove it and reload to confirm that it reads Save job.
5. Submit an empty application and verify the errors next to the fields. Try an invalid email and a short cover letter. Then enter valid test values, attach a nonempty PDF, DOC, or DOCX up to 5 MB, check the demo confirmation, and submit. The demo success message should appear and the form should clear.
6. Toggle Filters and Requirements. Press Escape while focused on a filter checkbox to close the panel and return focus to its button.

## Demo notes

Jobs creates its cards from one shared array. Each details link carries the vacancy ID. Saved Jobs stores only those IDs, so the vacancy data stays in one place. JavaScript validates the demo form and puts errors beside the relevant fields. jQuery uses ID and class selectors, `closest()` and `find()`, click and keyboard events, and `slideDown()` and `slideUp()`.

Saved jobs are specific to the current browser. Match percentages use the sample profile. The application form checks the file extension and size, and does not send information or files to an employer.
