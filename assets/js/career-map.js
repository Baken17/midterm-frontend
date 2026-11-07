"use strict";

const skillKnowledgeBase = {
  "html": {
    desc: "HTML5 Semantics, accessibility standards, and clean document structuring.",
    action: "Maintain current proficiency"
  },
  "css": {
    desc: "Modern CSS Grid & Flexbox, CSS variables, and responsive scaling.",
    action: "Practice advanced layout systems"
  },
  "javascript": {
    desc: "Master JavaScript syntax, Promises, Async/Await, and REST API integration.",
    action: "Complete Async JS module"
  },
  "react": {
    desc: "React Fundamentals, Component Architecture, State & Props management.",
    action: "Build portfolio projects"
  },
  "git": {
    desc: "Git CLI commands, branching strategies, and pull requests.",
    action: "Take Version Control course"
  },
  "github": {
    desc: "Collaborative workflows, code reviews, and remote repository management.",
    action: "Practice team project workflows"
  },
  "responsive design": {
    desc: "Mobile-first development, flexible grids, and media queries.",
    action: "Audit layout responsiveness"
  },
  "sql": {
    desc: "Database queries, table joins, and data aggregations.",
    action: "Practice SQL queries & joins"
  },
  "python": {
    desc: "Python syntax, data structures, and analysis libraries.",
    action: "Complete Python data track"
  },
  "tableau": {
    desc: "Data visualization and interactive business reporting.",
    action: "Build interactive dashboards"
  },
  "figma": {
    desc: "UI/UX design, components, auto-layout, and prototyping.",
    action: "Design an app prototype"
  },
  "research": {
    desc: "User interviews, surveys, and usability testing.",
    action: "Conduct user testing sessions"
  },
  "agile": {
    desc: "Scrum framework, sprint planning, and backlog management.",
    action: "Participate in agile simulation"
  },
  "excel": {
    desc: "Advanced formulas, pivot tables, and financial modeling.",
    action: "Complete modeling course"
  },
  "analysis": {
    desc: "Financial reporting and key performance indicator tracking.",
    action: "Practice financial analysis"
  },
  "communication": {
    desc: "Technical documentation and stakeholder presentations.",
    action: "Prepare case study presentations"
  },
  "reporting": {
    desc: "Data aggregation and structured metric reporting.",
    action: "Build automated templates"
  }
};

function getSkillInfo(skillName) {
  const key = skillName.toLowerCase().trim();
  if (skillKnowledgeBase[key]) {
    return skillKnowledgeBase[key];
  }
  return {
    desc: "Learn core concepts and hands-on implementation of " + skillName + ".",
    action: "Complete dedicated training module"
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("job") || "frontend-developer";
  const job = typeof findJobById === "function" ? findJobById(jobId) : null;

  const profile = (() => {
    try {
      return JSON.parse(localStorage.getItem("jobly.profile")) || {
        skills: ["HTML", "CSS", "Communication", "Responsive Design"]
      };
    } catch {
      return {
        skills: ["HTML", "CSS", "Communication", "Responsive Design"]
      };
    }
  })();

  if (!job) {
    const titleEl = document.querySelector("#career-map-title");
    if (titleEl) titleEl.textContent = "Selected Target: Role not found";
    return;
  }

  const companyName = typeof getJobCompanyName === "function" ? getJobCompanyName(job.companyId) : job.companyId;
  const titleEl = document.querySelector("#career-map-title");
  if (titleEl) titleEl.textContent = "Selected Target: " + job.title + " (" + companyName + ")";

  const jobSkills = job.skills || [];
  const userSkills = profile.skills || [];

  let matchedCount = 0;
  const skillMatrixRows = [];

  for (const reqSkill of jobSkills) {
    const isMatched = userSkills.some(s => s.toLowerCase() === reqSkill.toLowerCase());
    if (isMatched) matchedCount++;

    const info = getSkillInfo(reqSkill);

    skillMatrixRows.push({
      skill: reqSkill,
      current: isMatched ? "Advanced" : "Beginner",
      required: "Advanced",
      gap: isMatched ? "None" : "Skill Gap",
      action: isMatched ? "Maintain current proficiency" : info.action,
      matched: isMatched
    });
  }

  const matchScore = jobSkills.length > 0 ? Math.round((matchedCount / jobSkills.length) * 100) : 0;

  const matchOverviewTitle = document.querySelector("#analysis-title");
  if (matchOverviewTitle) {
    const badge = matchOverviewTitle.closest(".card-title-group")?.querySelector(".match-badge");
    if (badge) {
      badge.textContent = matchScore + "% Overall Match";
      badge.className = "match-badge " + (matchScore >= 75 ? "match-high" : "match-medium");
    }
  }

  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-header span:last-child");
  if (progressFill) progressFill.style.width = matchScore + "%";
  if (progressText) progressText.textContent = matchScore + "%";

  const matchedTags = document.querySelector("#career-matched-skills");
  if (matchedTags) {
    matchedTags.innerHTML = "";
    const matchedRows = skillMatrixRows.filter(r => r.matched);
    if (matchedRows.length === 0) {
      matchedTags.innerHTML = '<span class="text-muted" style="font-size:0.85rem;">No matched skills yet.</span>';
    } else {
      for (const row of matchedRows) {
        const chip = document.createElement("span");
        chip.className = "skill-chip skill-matched";
        chip.textContent = row.skill;
        matchedTags.append(chip);
      }
    }
  }

  const improveTags = document.querySelector("#career-improve-skills");
  if (improveTags) {
    improveTags.innerHTML = "";
    const improveRows = skillMatrixRows.filter(r => !r.matched);
    if (improveRows.length === 0) {
      improveTags.innerHTML = '<span class="text-muted" style="font-size:0.85rem;">You meet all target skills for this role!</span>';
    } else {
      for (const row of improveRows) {
        const chip = document.createElement("span");
        chip.className = "skill-chip skill-gap";
        chip.textContent = row.skill;
        improveTags.append(chip);
      }
    }
  }

  const tbody = document.querySelector(".skill-matrix-table tbody");
  if (tbody) {
    tbody.innerHTML = "";
    for (const row of skillMatrixRows) {
      const tr = document.createElement("tr");

      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = row.skill;

      const tdCurr = document.createElement("td");
      tdCurr.textContent = row.current;

      const tdReq = document.createElement("td");
      tdReq.textContent = row.required;

      const tdGap = document.createElement("td");
      const gapBadge = document.createElement("span");
      gapBadge.className = "match-badge " + (row.matched ? "match-high" : "match-medium");
      gapBadge.textContent = row.gap;
      tdGap.append(gapBadge);

      const tdAct = document.createElement("td");
      tdAct.textContent = row.action;

      tr.append(th, tdCurr, tdReq, tdGap, tdAct);
      tbody.append(tr);
    }
  }

  const roadmapContainer = document.querySelector(".roadmap-grid");
  if (roadmapContainer) {
    roadmapContainer.innerHTML = "";
    
    const uncompletedSkills = jobSkills.filter(skill => {
      return !userSkills.some(s => s.toLowerCase() === skill.toLowerCase());
    });

    if (uncompletedSkills.length === 0) {
      roadmapContainer.innerHTML = '<div class="col-12"><p class="text-muted mb-0">All roadmap steps for this role are completed!</p></div>';
    } else {
      uncompletedSkills.forEach((skill, index) => {
        const info = getSkillInfo(skill);
        
        const card = document.createElement("article");
        card.className = "roadmap-card";
        card.style.cursor = "pointer";
        card.dataset.skill = skill;

        const stepBadge = document.createElement("span");
        stepBadge.className = "roadmap-step-badge";
        stepBadge.textContent = String(index + 1).padStart(2, "0");

        const contentDiv = document.createElement("div");
        contentDiv.className = "roadmap-content";
        
        const h3 = document.createElement("h3");
        h3.textContent = skill;
        
        const p = document.createElement("p");
        p.textContent = info.desc;
        
        contentDiv.append(h3, p);

        const badge = document.createElement("span");
        badge.className = "match-badge match-medium";
        badge.textContent = "In Progress";

        card.append(stepBadge, contentDiv, badge);
        roadmapContainer.append(card);
      });
    }
  }

  if (window.jQuery) {
    const $ = window.jQuery;
    $(".roadmap-grid").on("click", ".roadmap-card", function () {
      const card = $(this);
      const skillName = card.data("skill");
      const currentProfile = JSON.parse(localStorage.getItem("jobly.profile")) || { skills: [] };

      const exists = currentProfile.skills.some(s => s.toLowerCase() === skillName.toLowerCase());
      if (!exists) {
        currentProfile.skills.push(skillName);
      }

      localStorage.setItem("jobly.profile", JSON.stringify(currentProfile));
      window.location.reload();
    });
  }
});