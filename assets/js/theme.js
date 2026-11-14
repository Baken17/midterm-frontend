"use strict";

(function () {
  const THEME_KEY = "jobly.theme";

  function getSavedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }

  applyTheme(getSavedTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const navList = document.querySelector("#primaryNav .navbar-nav");
    if (!navList || document.querySelector("#theme-toggle")) return;

    const li = document.createElement("li");
    li.className = "nav-item ms-lg-2 mt-2 mt-lg-0";

    const btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.type = "button";
    btn.className = "btn btn-secondary theme-toggle-btn";

    function updateButtonLabel(theme) {
      btn.textContent = theme === "dark" ? "Dark" : "Light";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    updateButtonLabel(getSavedTheme());

    btn.addEventListener("click", function () {
      const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
      updateButtonLabel(nextTheme);
    });

    li.append(btn);
    navList.append(li);
  });
})();