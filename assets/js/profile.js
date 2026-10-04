"use strict";

const profileForm = document.querySelector("#edit-profile-form");

if (profileForm) {
  const modalElement = document.querySelector("#editProfileModal");
  const editButton = document.querySelector("#edit-profile-button");
  const updateMessage = document.querySelector("#profile-update-message");

  function openModalFallback() {
    modalElement.classList.add("show");
    modalElement.style.display = "block";
    modalElement.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    profileForm.elements.name.focus();
  }

  function closeModalFallback() {
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    editButton.focus();
  }

  editButton.addEventListener("click", openModalFallback);

  for (const closeButton of modalElement.querySelectorAll("[data-profile-modal-close]")) {
    closeButton.addEventListener("click", closeModalFallback);
  }

  modalElement.addEventListener("click", function (event) {
    if (event.target === modalElement) {
      closeModalFallback();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalElement.classList.contains("show")) {
      closeModalFallback();
    }
  });

  function getInitials(fullName) {
    return fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = profileForm.elements.name.value.trim();
    const role = profileForm.elements.role.value.trim();
    const email = profileForm.elements.email.value.trim();
    const direction = profileForm.elements.direction.value.trim();
    const location = profileForm.elements.location.value.trim();
    const shortLocation = location.split("(")[0].trim();

    document.querySelector("#profile-title").textContent = name;
    document.querySelector("#profile-avatar").textContent = getInitials(name);
    document.querySelector("#profile-summary").textContent = role + " • " + shortLocation;
    document.querySelector("#profile-email").textContent = email;
    document.querySelector("#profile-direction").textContent = direction;
    document.querySelector("#profile-location").textContent = location;

    closeModalFallback();
    updateMessage.hidden = false;
    updateMessage.focus();
  });
}
