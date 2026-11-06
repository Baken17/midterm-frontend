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

const saveButton = document.querySelector("#save-job");
if (saveButton) {
  let isJobSaved = false;

  saveButton.addEventListener("click", function () {
    isJobSaved = !isJobSaved;
    saveButton.setAttribute("aria-pressed", String(isJobSaved));
    if (isJobSaved) {
      saveButton.textContent = "Job saved ✓";
    } else {
      saveButton.textContent = "Save job";
    }
  });
}

const applicationForm = document.querySelector("#application-form");
if (applicationForm) {
  const applicationMessage = document.querySelector("#application-message");

  applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    applicationMessage.hidden = false;
    applicationMessage.focus();
  });

  applicationForm.addEventListener("input", function () {
    applicationMessage.hidden = true;
  });
}
