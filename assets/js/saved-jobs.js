"use strict";

(function () {
  const storageKey = "jobly.savedJobIds";

  function getIds() {
    try {
      const ids = JSON.parse(localStorage.getItem(storageKey));
      if (!Array.isArray(ids)) return [];

      const uniqueIds = [];
      for (const id of ids) {
        if (findJobById(id) && !uniqueIds.includes(id)) {
          uniqueIds.push(id);
        }
      }
      return uniqueIds;
    } catch {
      return [];
    }
  }

  function saveIds(ids) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(ids));
      return true;
    } catch {
      return false;
    }
  }

  function add(id) {
    if (!findJobById(id)) return false;
    const ids = getIds();
    if (!ids.includes(id)) ids.push(id);
    return saveIds(ids);
  }

  function remove(id) {
    const ids = getIds().filter(function (savedId) {
      return savedId !== id;
    });
    return saveIds(ids);
  }

  window.JoblySavedJobs = { getIds, add, remove };
})();
