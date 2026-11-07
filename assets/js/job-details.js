"use strict";

const jobParams = new URLSearchParams(window.location.search);
const legacyLink = !jobParams.has("id");
const selectedJob = findJobById(legacyLink ? "frontend-developer" : jobParams.get("id"));

if (selectedJob) {
  showJob(selectedJob);
  setupSaveButton(selectedJob.id);
  setupApplicationForm();
} else {
  document.title = "Job not found | Jobly";
  document.querySelector("#job-not-found").hidden = false;
}

function showJob(job) {
  const company = getJobCompanyName(job.companyId) || job.companyId;
  document.title = job.title + " at " + company + " | Jobly";
  document.querySelector("#job-title").textContent = job.title;
  document.querySelector("#detail-company").textContent = company;
  document.querySelector("#detail-employer").textContent = company;
  document.querySelector("#detail-location").textContent = job.location;
  document.querySelector("#detail-type").textContent = job.type;
  document.querySelector("#detail-salary").textContent = job.salary;
  document.querySelector("#job-career-link").href = "career-map.html?job=" + encodeURIComponent(job.id);

  for (const badge of document.querySelectorAll("#detail-match, #detail-match-example")) {
    badge.textContent = job.exampleMatch + "% match";
    badge.classList.add(job.exampleMatch >= 80 ? "match-high" : "match-medium");
  }

  const description = document.querySelector("#detail-description");
  for (const text of job.about || [job.description]) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    description.append(paragraph);
  }

  addListItems("#detail-skills", job.skills);
  if (job.responsibilities) {
    addListItems("#detail-responsibilities", job.responsibilities);
    document.querySelector("#job-responsibilities").hidden = false;
  }

  document.querySelector("#acme-example-guidance").hidden = job.id !== "frontend-developer";
  document.querySelector("#legacy-job-link").hidden = !legacyLink;
  document.querySelector("#job-content").hidden = false;
}

function addListItems(selector, items) {
  const list = document.querySelector(selector);
  for (const text of items) {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  }
}

function setupSaveButton(jobId) {
  const button = document.querySelector("#save-job");
  const error = document.querySelector("#saved-job-error");

  function updateButton() {
    const saved = JoblySavedJobs.getIds().includes(jobId);
    button.textContent = saved ? "Remove saved job" : "Save job";
    button.setAttribute("aria-pressed", String(saved));
  }

  button.addEventListener("click", function () {
    const saved = JoblySavedJobs.getIds().includes(jobId);
    const success = saved ? JoblySavedJobs.remove(jobId) : JoblySavedJobs.add(jobId);
    error.hidden = success;
    updateButton();
  });

  window.addEventListener("storage", updateButton);
  window.addEventListener("pageshow", updateButton);
  updateButton();
}

function setupApplicationForm() {
  const form = document.querySelector("#application-form");
  const message = document.querySelector("#application-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    message.hidden = true;
    let firstInvalidField = null;

    for (const field of form.querySelectorAll("[required]")) {
      const error = getFieldError(field);
      showFieldError(field, error);
      if (error && !firstInvalidField) firstInvalidField = field;
    }

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    form.reset();
    message.hidden = false;
    message.focus();
  });

  form.addEventListener("input", function (event) {
    message.hidden = true;
    const field = event.target;
    if (field.classList.contains("is-invalid")) {
      showFieldError(field, getFieldError(field));
    }
  });

  form.querySelector('[type="submit"]').disabled = false;
}

function showFieldError(field, error) {
  document.getElementById(field.id + "-error").textContent = error;
  field.classList.toggle("is-invalid", error !== "");
  field.setAttribute("aria-invalid", String(error !== ""));
}

function getFieldError(field) {
  const value = field.value.trim();

  switch (field.id) {
    case "full-name":
      if (!value) return "Enter your full name.";
      if (value.length < 2 || value.length > 80) return "Use 2–80 characters for your name.";
      break;
    case "email":
      if (!value) return "Enter your email address.";
      if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter an email address like name@example.com.";
      }
      break;
    case "phone": {
      if (!value) return "Enter your phone number.";
      const digits = value.replace(/\D/g, "");
      if (!/^\+?[\d ()-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
        return "Enter a phone number with 7–15 digits.";
      }
      break;
    }
    case "cover-letter":
      if (!value) return "Write a short cover letter.";
      if (value.length < 20 || value.length > 1000) return "Write 20–1000 characters.";
      break;
    case "cv": {
      const file = field.files[0];
      if (!file) return "Choose a CV file.";
      if (!/\.(pdf|doc|docx)$/i.test(file.name)) return "Choose a PDF, DOC or DOCX file.";
      if (file.size === 0 || file.size > 5 * 1024 * 1024) return "Choose a non-empty file up to 5 MB.";
      break;
    }
    case "consent":
      if (!field.checked) return "Confirm that you understand this is a demo.";
      break;
  }

  return "";
}
