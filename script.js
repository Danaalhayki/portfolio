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
  if (page === "mobile") loadCategoryProjects("mobile");
  if (page === "project") loadProjectDetail();
});

async function loadHomeProjects() {
  const reportContainer = document.getElementById("report-projects");
  const codingContainer = document.getElementById("coding-projects");
  const mobileContainer = document.getElementById("mobile-projects");

  try {
    const projects = await fetchProjects();
    const reports = projects.filter((p) => p.category === "report");
    const coding = projects.filter((p) => p.category === "coding");
    const mobile = projects.filter((p) => p.category === "mobile");

    animateCounter(document.getElementById("stat-reports"), reports.length);
    animateCounter(document.getElementById("stat-coding"), coding.length);
    animateCounter(document.getElementById("stat-mobile"), mobile.length);
    animateCounter(document.getElementById("stat-total"), projects.length);

    const statsBar = document.getElementById("hero-stats-bar");
    if (statsBar && projects.length > 0) {
      statsBar.style.setProperty("--reports-pct", `${(reports.length / projects.length) * 100}%`);
      statsBar.style.setProperty("--coding-pct", `${(coding.length / projects.length) * 100}%`);
      statsBar.style.setProperty("--mobile-pct", `${(mobile.length / projects.length) * 100}%`);
    }

    renderProjects(reportContainer, reports.slice(0, 3), "No tech reports yet.");
    renderProjects(codingContainer, coding.slice(0, 3), "No software projects yet.");
    renderProjects(mobileContainer, mobile.slice(0, 3), "No mobile apps yet.");
  } catch (error) {
    const message = "Unable to load projects. Please try again later.";
    showError(reportContainer, message);
    showError(codingContainer, message);
    showError(mobileContainer, message);
    console.error(error);
  }
}

async function loadCategoryProjects(category) {
  const container = document.getElementById("projects-list");
  const countEl = document.getElementById("page-project-count");
  const emptyMessages = {
    report: "No tech reports yet.",
    coding: "No software projects yet.",
    mobile: "No mobile apps yet.",
  };

  try {
    const projects = await fetchProjects();
    const filtered = projects.filter((p) => p.category === category);

    if (countEl) {
      animateCounter(countEl, filtered.length);
    }

    renderProjects(container, filtered, emptyMessages[category] || "No projects yet.");
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

    const meta = getProjectCategoryMeta(project.category);
    document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
      link.classList.toggle("nav-active", link.dataset.nav === meta.navKey);
    });
  } catch (error) {
    showError(container, "Unable to load project. Please try again later.");
    console.error(error);
  }
}

function getDemoEmbedUrl(demoUrl) {
  if (!demoUrl) return null;

  const youtubeMatch = demoUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/
  );
  if (youtubeMatch) {
    return {
      url: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      type: "youtube",
      externalLabel: "Open on YouTube",
    };
  }

  const driveMatch = demoUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return {
      url: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      type: "drive",
      externalLabel: "Open in Google Drive",
    };
  }

  return null;
}

function renderProjectDemo(project) {
  if (!project.demo) return "";

  const embed = getDemoEmbedUrl(project.demo);
  const demoTitle = embed?.type === "youtube" ? "Demo Video" : "Screen Recording";
  const frameClass =
    embed?.type === "youtube"
      ? "project-demo-frame project-demo-frame--wide"
      : "project-demo-frame";

  if (embed) {
    return `
      <div class="project-demo">
        <h2 class="project-demo-title">${demoTitle}</h2>
        <div class="${frameClass}">
          <iframe
            src="${escapeHtml(embed.url)}"
            title="${escapeHtml(project.title)} demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        <a href="${escapeHtml(project.demo)}" class="project-demo-link" target="_blank" rel="noopener noreferrer">
          ${embed.externalLabel} <span class="link-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    `;
  }

  return `
    <div class="project-demo">
      <a href="${escapeHtml(project.demo)}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
        Watch Demo <span class="link-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `;
}

function renderProjectAttachments(project) {
  if (!project.attachments || project.attachments.length === 0) return "";

  const items = project.attachments
    .map(
      (file) => `
        <a href="${escapeHtml(encodeURI(file.url))}" class="project-attachment" target="_blank" rel="noopener noreferrer">
          <span class="project-attachment-icon" aria-hidden="true">PDF</span>
          <span class="project-attachment-title">${escapeHtml(file.title)}</span>
          <span class="link-arrow" aria-hidden="true">→</span>
        </a>
      `
    )
    .join("");

  return `
    <div class="project-attachments">
      <h2 class="project-attachments-title">Report Documents</h2>
      <div class="project-attachments-list">${items}</div>
    </div>
  `;
}

function renderProjectDetail(project) {
  const meta = getProjectCategoryMeta(project.category);
  const isReport = project.category === "report";
  const externalLabel = isReport ? "Read Full Report" : "View Repository";
  const contentHtml = (project.content || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const hasExternalLink = project.link && project.link !== "#";
  const hasDemo = Boolean(project.demo);
  const hasSite = Boolean(project.site);
  const hasAttachments = project.attachments && project.attachments.length > 0;

  return `
    <a href="${meta.listUrl}" class="back-link"><span aria-hidden="true">&larr;</span> ${meta.backLabel}</a>
    <span class="project-badge">${meta.label}</span>
    <h1 class="project-detail-title">${escapeHtml(project.title)}</h1>
    <p class="project-detail-summary">${escapeHtml(project.description)}</p>
    ${renderTags(project.tags)}
    ${renderProjectAttachments(project)}
    ${renderProjectDemo(project)}
    <div class="project-detail-content">
      ${contentHtml}
    </div>
    <div class="project-detail-actions">
      ${hasExternalLink ? `<a href="${escapeHtml(project.link)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        ${externalLabel} <span class="link-arrow" aria-hidden="true">→</span>
      </a>` : ""}
      ${hasSite ? `<a href="${escapeHtml(project.site)}" class="btn ${hasExternalLink ? "btn-secondary" : "btn-primary"}" target="_blank" rel="noopener noreferrer">
        Visit Live Site <span class="link-arrow" aria-hidden="true">→</span>
      </a>` : ""}
      ${!hasExternalLink && hasAttachments ? `<a href="${escapeHtml(encodeURI(project.attachments[0].url))}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        View Report <span class="link-arrow" aria-hidden="true">→</span>
      </a>` : ""}
      ${hasDemo ? `<a href="${escapeHtml(project.demo)}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
        Watch Demo <span class="link-arrow" aria-hidden="true">→</span>
      </a>` : ""}
      <a href="${meta.listUrl}" class="btn btn-secondary">Back to ${isReport ? "Tech Reports" : project.category === "mobile" ? "Mobile Apps" : "Software"}</a>
    </div>
  `;
}
