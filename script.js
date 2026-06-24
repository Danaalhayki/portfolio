document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");
  initNavigation();
  initThemeToggle();
  initHeaderScroll();
  initScrollProgress();
  initScrollReveal();
  initFooterYear();
  setActiveNavLink();

  const page = document.body.dataset.page;
  if (page === "home") loadHomeProjects();
  if (page === "reports") loadCategoryProjects("report");
  if (page === "coding") loadCategoryProjects("coding");
  if (page === "project") loadProjectDetail();
});

async function loadHomeProjects() {
  const reportContainer = document.getElementById("report-projects");
  const codingContainer = document.getElementById("coding-projects");

  try {
    const projects = await fetchProjects();
    const reports = projects.filter((p) => p.category === "report");
    const coding = projects.filter((p) => p.category === "coding");

    animateCounter(document.getElementById("stat-reports"), reports.length);
    animateCounter(document.getElementById("stat-coding"), coding.length);
    animateCounter(document.getElementById("stat-total"), projects.length);

    const statsBar = document.getElementById("hero-stats-bar");
    if (statsBar && projects.length > 0) {
      statsBar.style.setProperty("--reports-pct", `${(reports.length / projects.length) * 100}%`);
      statsBar.style.setProperty("--coding-pct", `${(coding.length / projects.length) * 100}%`);
    }

    renderProjects(reportContainer, reports.slice(0, 3), "No tech reports yet.");
    renderProjects(codingContainer, coding.slice(0, 3), "No software projects yet.");
  } catch (error) {
    const message = "Unable to load projects. Please try again later.";
    showError(reportContainer, message);
    showError(codingContainer, message);
    console.error(error);
  }
}

async function loadCategoryProjects(category) {
  const container = document.getElementById("projects-list");
  const countEl = document.getElementById("page-project-count");
  const emptyMessage =
    category === "report"
      ? "No tech reports yet."
      : "No software projects yet.";

  try {
    const projects = await fetchProjects();
    const filtered = projects.filter((p) => p.category === category);

    if (countEl) {
      animateCounter(countEl, filtered.length);
    }

    renderProjects(container, filtered, emptyMessage);
  } catch (error) {
    showError(container, "Unable to load projects. Please try again later.");
    console.error(error);
  }
}

async function loadProjectDetail() {
  const container = document.getElementById("project-detail");
  const slug = new URLSearchParams(window.location.search).get("slug");

  if (!slug) {
    showError(container, "No project specified.");
    return;
  }

  try {
    const projects = await fetchProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      showError(container, "Project not found.");
      return;
    }

    document.title = `${project.title} — Dana Hussain AlHayki`;
    container.innerHTML = `<div class="project-detail-wrap reveal">${renderProjectDetail(project)}</div>`;
    observeRevealElements(container);

    document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
      const navKey = project.category === "report" ? "reports" : "coding";
      link.classList.toggle("nav-active", link.dataset.nav === navKey);
    });
  } catch (error) {
    showError(container, "Unable to load project. Please try again later.");
    console.error(error);
  }
}

function renderProjectDetail(project) {
  const isReport = project.category === "report";
  const backUrl = isReport ? "reports.html" : "coding.html";
  const backLabel = isReport ? "All Tech Reports" : "All Software Projects";
  const externalLabel = isReport ? "Read Full Report" : "View Repository";
  const contentHtml = (project.content || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const hasExternalLink = project.link && project.link !== "#";

  return `
    <a href="${backUrl}" class="back-link"><span aria-hidden="true">&larr;</span> ${backLabel}</a>
    <span class="project-badge">${isReport ? "Tech Report" : "Software"}</span>
    <h1 class="project-detail-title">${escapeHtml(project.title)}</h1>
    <p class="project-detail-summary">${escapeHtml(project.description)}</p>
    ${renderTags(project.tags)}
    <div class="project-detail-content">
      ${contentHtml}
    </div>
    <div class="project-detail-actions">
      ${hasExternalLink ? `<a href="${escapeHtml(project.link)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        ${externalLabel} <span class="link-arrow" aria-hidden="true">→</span>
      </a>` : ""}
      <a href="${backUrl}" class="btn btn-secondary">Back to ${isReport ? "Tech Reports" : "Software"}</a>
    </div>
  `;
}
