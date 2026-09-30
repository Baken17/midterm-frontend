"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const companyForm = document.querySelector("#company-search-form");
  const companyInput = document.querySelector("#company-search");
  const companyItems = [...document.querySelectorAll(".company-item")];
  const companyCount = document.querySelector("#company-count");
  const emptyState = document.querySelector("#company-empty");
  const clearButton = document.querySelector("#clear-company-search");

  if (!companyForm || !companyInput || companyItems.length === 0) return;

  const filterCompanies = () => {
    const query = companyInput.value.trim().toLowerCase();
    let visibleCount = 0;

    companyItems.forEach((item) => {
      const matches = item.dataset.company.includes(query);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    companyCount.textContent = String(visibleCount);
    emptyState.hidden = visibleCount !== 0;
  };

  companyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCompanies();
  });

  companyInput.addEventListener("input", filterCompanies);

  clearButton?.addEventListener("click", () => {
    companyInput.value = "";
    filterCompanies();
    companyInput.focus();
  });
});
