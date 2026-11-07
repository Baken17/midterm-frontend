"use strict";

const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector("#primaryNav");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    if (typeof bootstrap !== "undefined") return;
    const isOpen = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const searchForm = document.querySelector("#jobs-search-form");
const filterForm = document.querySelector("#job-filters");

if (searchForm && filterForm) {
  const searchInput = document.querySelector("#job-search");
  const locationInput = document.querySelector("#location-search");
  const jobList = document.querySelector("#job-list");
  const template = document.querySelector("#job-card-template");

  for (const job of window.JoblyJobs) {
    const card = template.content.firstElementChild.cloneNode(true);

    const company = window.JoblyCompanies.find(function (item) {
      return item.id === job.companyId;
    });

    card.dataset.company = job.companyId;
    card.dataset.location = job.location.split(",")[0].trim().toLowerCase();
    card.dataset.type = job.type.toLowerCase();
    card.dataset.category = job.category;

    card.querySelector(".company-logo").src =
      "assets/images/company-logos/" + job.companyId + ".svg";

    const badge = card.querySelector(".match-badge");
    badge.textContent = job.exampleMatch + "% match";
    badge.classList.add(job.exampleMatch >= 80 ? "match-high" : "match-medium");

    card.querySelector(".company-name").textContent = company ? company.name : job.companyId;
    card.querySelector("h3").textContent = job.title;
    card.querySelector(".job-location").textContent = job.location;
    card.querySelector(".job-type").textContent = job.type;
    card.querySelector(".job-summary").textContent = job.description;
    card.querySelector(".job-salary").textContent = job.salary;

    for (const skill of job.skills) {
      const tag = document.createElement("span");
      tag.textContent = skill;
      card.querySelector(".card-skills").append(tag);
    }

    const link = card.querySelector(".job-link");
    link.href = jobDetailsUrl(job.id);
    link.textContent = "View details";
    link.setAttribute("aria-label", "View details for " + job.title);

    jobList.append(card);
  }
  const jobCards = document.querySelectorAll(".jobs-list .job-card");
  const resultCount = document.querySelector("#job-count");
  const emptyMessage = document.querySelector("#jobs-empty");
  const companyMessage = document.querySelector("#company-filter");
  const clearButton = document.querySelector("#clear-filters");

  const params = new URLSearchParams(window.location.search);
  searchInput.value = params.get("q") || "";
  locationInput.value = params.get("location") || "";
  let companyFilter = params.get("company") || "";

  function getSelectedValues(groupName) {
    const checkboxes = filterForm.querySelectorAll('input[name="' + groupName + '"]:checked');
    const values = [];

    for (const checkbox of checkboxes) {
      values.push(checkbox.value);
    }

    return values;
  }

  function filterJobs() {
    const searchText = searchInput.value.trim().toLowerCase();
    const locationText = locationInput.value.trim().toLowerCase();
    const locations = getSelectedValues("location");
    const categories = getSelectedValues("category");
    const jobTypes = getSelectedValues("type");
    let visibleCount = 0;
    let companyName = "";

    for (const card of jobCards) {
      const title = card.querySelector("h3").textContent;
      const company = card.querySelector(".company-name").textContent;
      const skills = card.querySelector(".card-skills").textContent;
      const searchableText = (title + " " + company + " " + skills).toLowerCase();
      const jobLocation = card.querySelector(".job-location").textContent.toLowerCase();

      const matchesSearch = searchableText.includes(searchText);
      const matchesLocationText = jobLocation.includes(locationText);
      const matchesLocation = locations.length === 0 || locations.includes(card.dataset.location);
      const matchesCategory = categories.length === 0 || categories.includes(card.dataset.category);
      const matchesType = jobTypes.length === 0 || jobTypes.includes(card.dataset.type);
      const matchesCompany = companyFilter === "" || companyFilter === card.dataset.company;

      const isVisible = matchesSearch && matchesLocationText && matchesLocation
        && matchesCategory && matchesType && matchesCompany;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
      if (card.dataset.company === companyFilter) {
        companyName = company;
      }
    }

    resultCount.textContent = visibleCount;
    emptyMessage.hidden = visibleCount !== 0;
    companyMessage.hidden = companyFilter === "";
    companyMessage.textContent = "Showing jobs at " + companyName + ".";
    if (companyFilter !== "" && companyName === "") {
      companyMessage.textContent = "No jobs found for this company.";
    }
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    filterJobs();
  });
  searchForm.addEventListener("input", filterJobs);
  filterForm.addEventListener("change", filterJobs);

  clearButton.addEventListener("click", function () {
    searchForm.reset();
    filterForm.reset();
    companyFilter = "";
    window.history.replaceState(null, "", window.location.pathname);
    filterJobs();
    searchInput.focus();
  });

  filterJobs();
}

if (window.jQuery) {
  const $ = window.jQuery;
  $("#toggle-filters, #toggle-requirements").prop("hidden", false).on("click", function () {
    const button = $(this);
    const panel = button.closest(".jobs-filters, .job-details-panel").find(".job-section");
    const open = button.attr("aria-expanded") !== "true";
    const label = this.id === "toggle-filters" ? "filters" : "requirements";
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;

    button.attr("aria-expanded", String(open));
    button.text((open ? "Hide " : "Show ") + label);
    panel.stop(true, true);
    if (open) {
      panel.slideDown(duration);
    } else {
      panel.slideUp(duration);
    }
  });

  $(".job-section").on("keydown", function (event) {
    if (event.key !== "Escape") return;
    const button = $(this).closest(".jobs-filters, .job-details-panel").find(".job-section-toggle");
    if (button.attr("aria-expanded") === "true") {
      button.trigger("click");
      button.trigger("focus");
    }
  });
}
