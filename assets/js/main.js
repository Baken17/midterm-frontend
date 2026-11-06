"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector("#primaryNav");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      if (typeof bootstrap !== "undefined") return;
      const isOpen = navMenu.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const form = document.querySelector("#company-search-form");
  if (!form) return;
  const input = document.querySelector("#company-search");
  const industry = document.querySelector("#company-industry");
  const sort = document.querySelector("#company-sort");
  const grid = document.querySelector("#company-grid");
  const count = document.querySelector("#company-count");
  const empty = document.querySelector("#company-empty");
  const companies = window.JoblyCompanies || [];
  const industries = window.JoblyIndustries || [];

  industry.add(new Option("All industries", ""));
  for (const name of industries) industry.add(new Option(name, name));

  function filterCompanies(items, query, sector) {
    const text = query.trim().toLowerCase();
    return items.filter((company) => {
      const searchable = [company.name, company.industry, company.keywords].join(" ").toLowerCase();
      return searchable.includes(text) && (!sector || company.industry === sector);
    });
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createCompanyCard(company) {
    const column = createElement("div", "col-xl-4 col-md-6 company-item");
    const card = createElement("article", "company-card h-100");
    const head = createElement("div", "company-card-head");
    const logo = createElement("img", "");
    logo.src = "assets/images/company-logos/" + company.id + ".svg";
    logo.alt = company.name + " logo";
    head.append(logo, createElement("span", "verified-badge", "Sample employer"));
    const body = createElement("div", "");
    body.append(
      createElement("p", "company-industry", company.industry),
      createElement("h3", "", company.name),
      createElement("p", "", company.description)
    );
    const button = createElement("button", "btn btn-secondary company-details-toggle", "About company");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "details-" + company.id);
    const details = createElement("div", "company-details", company.details);
    details.id = "details-" + company.id;
    details.hidden = true;
    const footer = createElement("div", "company-card-footer");
    const link = createElement("a", "", "View jobs");
    link.href = "jobs.html?company=" + encodeURIComponent(company.id);
    link.setAttribute("aria-label", "View jobs at " + company.name);
    footer.append(link);
    card.append(head, body, button, details, footer);
    column.append(card);
    return column;
  }

  function renderCompanies(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((company) => fragment.append(createCompanyCard(company)));
    grid.replaceChildren(fragment);
    count.textContent = String(items.length);
    document.querySelector("#company-count-label").textContent =
      items.length === 1 ? "company found" : "companies found";
    empty.hidden = items.length !== 0;
  }

  function updateResults() {
    const results = filterCompanies(companies, input.value, industry.value);
    if (sort.value === "name") results.sort((a, b) => a.name.localeCompare(b.name));
    renderCompanies(results);
  }

  function resetFilters() {
    form.reset();
    updateResults();
    input.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResults();
  });
  input.addEventListener("input", updateResults);
  industry.addEventListener("change", updateResults);
  sort.addEventListener("change", updateResults);
  document.querySelector("#clear-company-search").addEventListener("click", resetFilters);
  document.querySelector("#reset-company-filters").addEventListener("click", resetFilters);

  function setDetails(button, open) {
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Hide details" : "About company";
    const details = button.closest(".company-card").querySelector(".company-details");
    if (!window.jQuery) {
      details.hidden = !open;
      return;
    }
    // Stop queued animations so rapid clicks keep visual and ARIA states aligned.
    const panel = window.jQuery(button).closest(".company-card").find(".company-details");
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    panel.stop(true, true);
    if (open) {
      panel.prop("hidden", false).hide().slideDown(duration);
    } else {
      panel.slideUp(duration, () => panel.prop("hidden", true));
    }
  }

  if (window.jQuery) {
    const $ = window.jQuery;
    // Delegation survives replacement of the dynamically generated cards.
    $("#company-grid").on("click", ".company-details-toggle", function () {
      setDetails(this, this.getAttribute("aria-expanded") !== "true");
    });
    $("#company-grid").on("keydown", ".company-details-toggle", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setDetails(this, false);
      }
    });
  } else {
    grid.addEventListener("click", (event) => {
      const button = event.target.closest(".company-details-toggle");
      if (button) setDetails(button, button.getAttribute("aria-expanded") !== "true");
    });
    grid.addEventListener("keydown", (event) => {
      const button = event.target.closest(".company-details-toggle");
      if (button && event.key === "Escape") setDetails(button, false);
    });
  }
  updateResults();
});
