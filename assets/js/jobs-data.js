window.JoblyJobs = [
  {
    id: "frontend-developer",
    companyId: "acme",
    title: "Frontend Developer",
    location: "London, UK",
    type: "Full-time",
    category: "development",
    description: "Build accessible interfaces and learn alongside an experienced frontend team.",
    skills: ["React", "CSS", "JavaScript", "Git", "Responsive Design"],
    salary: "£35,000–£45,000 / year",
    exampleMatch: 82,
    about: ["Acme Corp builds accessible tools that help teams work together. We are looking for an early-career Frontend Developer to turn designs into clear, responsive interfaces.", "You will work with designers and developers, receive feedback through code reviews, and gradually take ownership of small features."],
    responsibilities: ["Build responsive pages and reusable UI components.", "Translate design mockups into accessible HTML and CSS.", "Use JavaScript and React to add interactive features.", "Test layouts across browsers and screen sizes.", "Collaborate with the team and participate in code reviews."]
  },
  {
    id: "data-analyst",
    companyId: "dataco",
    title: "Data Analyst",
    location: "Remote",
    type: "Part-time",
    category: "data",
    description: "Turn data into clear reports and support decisions with SQL and Python.",
    skills: ["SQL", "Python", "Tableau"],
    salary: "£22,000–£28,000 / year",
    exampleMatch: 74
  },
  {
    id: "ux-designer",
    companyId: "studio-blue",
    title: "UX Designer",
    location: "Manchester, UK",
    type: "Contract",
    category: "design",
    description: "Research user needs and create thoughtful experiences for digital products.",
    skills: ["Figma", "Research", "Agile"],
    salary: "£30,000–£40,000 / year",
    exampleMatch: 91
  },
  {
    id: "junior-frontend-developer",
    companyId: "buildit",
    title: "Junior Frontend Developer",
    location: "Remote",
    type: "Internship",
    category: "development",
    description: "Practice HTML, CSS and JavaScript while helping the team ship small features.",
    skills: ["HTML", "CSS", "Git"],
    salary: "£18,000–£24,000 / year",
    exampleMatch: 68
  },
  {
    id: "junior-finance-assistant",
    companyId: "finedge",
    title: "Junior Finance Assistant",
    location: "London, UK",
    type: "Full-time",
    category: "finance",
    description: "Support everyday reporting and develop your financial analysis skills.",
    skills: ["Excel", "Analysis", "Communication"],
    salary: "£25,000–£32,000 / year",
    exampleMatch: 62
  },
  {
    id: "sustainability-analyst",
    companyId: "greenpath",
    title: "Sustainability Analyst",
    location: "Manchester, UK",
    type: "Full-time",
    category: "data",
    description: "Organise environmental data and help teams understand their impact.",
    skills: ["Excel", "Research", "Reporting"],
    salary: "£28,000–£36,000 / year",
    exampleMatch: 71
  }
];

function findJobById(id) {
  for (const job of window.JoblyJobs) {
    if (job.id === id) {
      return job;
    }
  }

  return null;
}

window.jobDetailsUrl = function (id) {
  return "job-details.html?id=" + encodeURIComponent(id);
};

window.getJobCompanyName = function (id) {
  const companies = window.JoblyCompanies || [];
  const company = companies.find(function (item) {
    return item.id === id;
  });
  return company ? company.name : "";
};
