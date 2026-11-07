"use strict";

const defaultProfile = {
  name: "Alex Johnson",
  role: "Computer Science Graduate",
  email: "alex.johnson@email.com",
  direction: "Frontend Development",
  location: "London, UK (Open to remote)",
  skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"]
};

function getStoredProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem("jobly.profile"));
    return stored || defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function saveStoredProfile(profile) {
  try {
    localStorage.setItem("jobly.profile", JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

function getInitials(fullName) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function removeUserSkill(skillName) {
  const profile = getStoredProfile();
  profile.skills = profile.skills.filter(s => s.toLowerCase() !== skillName.toLowerCase());
  saveStoredProfile(profile);
  renderProfile();
}

function renderProfile() {
  const profile = getStoredProfile();
  const shortLocation = profile.location.split("(")[0].trim();

  const title = document.querySelector("#profile-title");
  const avatar = document.querySelector("#profile-avatar");
  const summary = document.querySelector("#profile-summary");
  const email = document.querySelector("#profile-email");
  const direction = document.querySelector("#profile-direction");
  const location = document.querySelector("#profile-location");

  if (title) title.textContent = profile.name;
  if (avatar) avatar.textContent = getInitials(profile.name);
  if (summary) summary.textContent = profile.role + " • " + shortLocation;
  if (email) email.textContent = profile.email;
  if (direction) direction.textContent = profile.direction;
  if (location) location.textContent = profile.location;

  const matchedGroup = document.querySelector("#verified-skills-group");
  if (matchedGroup) {
    matchedGroup.innerHTML = "";
    if (!profile.skills || profile.skills.length === 0) {
      matchedGroup.innerHTML = '<span class="text-muted" style="font-size:0.85rem;">No skills verified yet. Complete steps in Career Map.</span>';
    } else {
      for (const skill of profile.skills) {
        const chip = document.createElement("span");
        chip.className = "skill-chip skill-matched d-inline-flex align-items-center gap-1";
        chip.textContent = skill;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn-close ms-1";
        removeBtn.style.fontSize = "0.45rem";
        removeBtn.setAttribute("aria-label", "Remove " + skill);
        removeBtn.addEventListener("click", () => removeUserSkill(skill));

        chip.append(removeBtn);
        matchedGroup.append(chip);
      }
    }
  }

  const gapGroup = document.querySelector("#gap-skills-group");
  if (gapGroup) {
    gapGroup.innerHTML = "";
  }

  renderSavedJobs();
}

function renderSavedJobs() {
  const container = document.querySelector("#saved-jobs-container");
  if (!container) return;

  const savedIds = window.JoblySavedJobs ? window.JoblySavedJobs.getIds() : [];
  container.innerHTML = "";

  if (savedIds.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-muted">No saved jobs yet. Browse jobs and click Save job.</p></div>';
    return;
  }

  for (const id of savedIds) {
    const job = typeof findJobById === "function" ? findJobById(id) : null;
    if (!job) continue;

    const companyName = typeof getJobCompanyName === "function" ? getJobCompanyName(job.companyId) : job.companyId;
    const col = document.createElement("div");
    col.className = "col-md-6";

    const article = document.createElement("article");
    article.className = "job-card h-100";

    const top = document.createElement("div");
    top.className = "job-card-top";

    const logo = document.createElement("span");
    logo.className = "company-logo logo-" + job.companyId;
    logo.setAttribute("aria-hidden", "true");
    logo.textContent = companyName.slice(0, 2).toUpperCase();

    const badge = document.createElement("span");
    badge.className = "match-badge " + (job.exampleMatch >= 80 ? "match-high" : "match-medium");
    badge.textContent = job.exampleMatch + "% match";

    top.append(logo, badge);

    const content = document.createElement("div");
    const compP = document.createElement("p");
    compP.className = "company-name";
    compP.textContent = companyName;

    const h3 = document.createElement("h3");
    const aTitle = document.createElement("a");
    aTitle.href = typeof jobDetailsUrl === "function" ? jobDetailsUrl(job.id) : "job-details.html?id=" + encodeURIComponent(job.id);
    aTitle.textContent = job.title;
    h3.append(aTitle);

    const meta = document.createElement("p");
    meta.className = "job-meta";
    const locSpan = document.createElement("span");
    locSpan.textContent = job.location;
    const typeSpan = document.createElement("span");
    typeSpan.textContent = job.type;
    meta.append(locSpan, typeSpan);

    content.append(compP, h3, meta);

    const skillsDiv = document.createElement("div");
    skillsDiv.className = "card-skills";
    for (const skill of job.skills.slice(0, 3)) {
      const span = document.createElement("span");
      span.textContent = skill;
      skillsDiv.append(span);
    }

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "d-flex justify-content-between align-items-center mt-auto pt-3 border-top";

    const viewLink = document.createElement("a");
    viewLink.className = "card-action";
    viewLink.href = aTitle.href;
    viewLink.textContent = "View role";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-sm btn-secondary";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      if (window.JoblySavedJobs) {
        window.JoblySavedJobs.remove(job.id);
        renderSavedJobs();
      }
    });

    actionsDiv.append(viewLink, removeBtn);
    article.append(top, content, skillsDiv, actionsDiv);
    col.append(article);
    container.append(col);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderProfile();

  const profileForm = document.querySelector("#edit-profile-form");
  const modalElement = document.querySelector("#editProfileModal");
  const editButton = document.querySelector("#edit-profile-button");
  const updateMessage = document.querySelector("#profile-update-message");

  if (profileForm && modalElement && editButton) {
    function openModal() {
      const profile = getStoredProfile();
      profileForm.elements.name.value = profile.name;
      profileForm.elements.role.value = profile.role;
      profileForm.elements.email.value = profile.email;
      profileForm.elements.direction.value = profile.direction;
      profileForm.elements.location.value = profile.location;

      modalElement.classList.add("show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      profileForm.elements.name.focus();
    }

    function closeModal() {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      editButton.focus();
    }

    editButton.addEventListener("click", openModal);

    for (const btn of modalElement.querySelectorAll("[data-profile-modal-close]")) {
      btn.addEventListener("click", closeModal);
    }

    modalElement.addEventListener("click", function (event) {
      if (event.target === modalElement) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modalElement.classList.contains("show")) {
        closeModal();
      }
    });

    profileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = profileForm.elements.name.value.trim();
      const role = profileForm.elements.role.value.trim();
      const email = profileForm.elements.email.value.trim();
      const direction = profileForm.elements.direction.value.trim();
      const location = profileForm.elements.location.value.trim();

      if (!name || !role || !email || !direction || !location) return;

      const updated = {
        ...getStoredProfile(),
        name,
        role,
        email,
        direction,
        location
      };

      saveStoredProfile(updated);
      renderProfile();
      closeModal();

      if (updateMessage) {
        updateMessage.hidden = false;
        updateMessage.focus();
      }
    });
  }
});