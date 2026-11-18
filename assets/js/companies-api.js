"use strict";

// This block is independent of the sample companies and their Jobs links.
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#remote-companies-grid");
  if (!grid) return;
  const status = document.querySelector("#remote-companies-status");
  const retry = document.querySelector("#retry-remote-companies");
  const apiUrl = "https://remotive.com/api/remote-jobs?limit=6";
  const cacheKey = "jobly-remote-employers";

  function showState(message, loading, canRetry = false) {
    status.textContent = message;
    grid.setAttribute("aria-busy", String(loading));
    retry.hidden = !canRetry;
    retry.disabled = loading;
  }

  function renderCompanies(jobs) {
    grid.replaceChildren();
    const names = new Set();
    for (const job of jobs) {
      if (!job || typeof job.company_name !== "string" || !job.company_name.trim()
          || typeof job.title !== "string" || typeof job.url !== "string") continue;
      // Only link to the original source, never inject API HTML into the page.
      if (!job.url.startsWith("https://remotive.com/remote-jobs/")) continue;
      const name = job.company_name.trim();
      if (names.has(name.toLowerCase())) continue;
      names.add(name.toLowerCase());

      const column = document.createElement("div");
      column.className = "col-xl-4 col-md-6";
      const card = document.createElement("article");
      card.className = "company-card h-100";
      const heading = document.createElement("h3");
      heading.textContent = name;
      const title = document.createElement("p");
      title.textContent = job.title;
      const location = document.createElement("p");
      location.textContent = "Location: " + (job.candidate_required_location || "Not specified");
      const footer = document.createElement("div");
      footer.className = "company-card-footer";
      const link = document.createElement("a");
      link.href = job.url;
      link.textContent = "View opening on Remotive";
      footer.append(link);
      card.append(heading, title, location, footer);
      column.append(card);
      grid.append(column);
      if (names.size === 6) break;
    }
    return names.size;
  }

  async function loadCompanies() {
    showState("Loading employers…", true);
    grid.replaceChildren();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      let jobs;
      let fetched = false;
      // Reuse data in this tab for six hours to avoid repeated API requests.
      // Storage may be unavailable; loading must still work in that case.
      try {
        const saved = JSON.parse(sessionStorage.getItem(cacheKey));
        if (saved && Date.now() - saved.time < 6 * 60 * 60 * 1000
            && Date.now() >= saved.time && Array.isArray(saved.jobs)) jobs = saved.jobs;
      } catch (_) { /* Ignore missing or invalid cache. */ }

      if (!jobs) {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        if (!data || !Array.isArray(data.jobs)) throw new Error("Invalid response");
        jobs = data.jobs;
        fetched = true;
      }
      const count = renderCompanies(jobs);
      if (jobs.length && !count) throw new Error("Invalid employer data");
      if (count && fetched) {
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), jobs }));
        } catch (_) { /* A cache failure must not hide valid results. */ }
      }
      showState(count ? `${count} employers shown from Remotive.` : "No remote employers found. Please try again later.", false, count === 0);
    } catch (error) {
      grid.replaceChildren();
      showState(error.name === "AbortError"
        ? "The request took too long. Please try again."
        : "Could not load remote employers. Check your connection or try again later.", false, true);
    } finally {
      clearTimeout(timeout);
    }
  }

  retry.addEventListener("click", loadCompanies);
  loadCompanies();
});
