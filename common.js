async function fetchProjects() {
  const response = await fetch("projects.json");
  if (!response.ok) {
    throw new Error(`Failed to load projects (${response.status})`);
  }
  return response.json();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function projectPageUrl(slug) {
  return `project.html?slug=${encodeURIComponent(slug)}`;
}

function getProjectCategoryMeta(category) {
  const t = window.portfolioI18n ? window.portfolioI18n.t : (k) => k;
  switch (category) {
    case "report":
      return {
        label: t("cat.report"),
        listLabel: t("cat.readReport"),
        listUrl: "reports.html",
        backLabel: t("cat.backReports"),
        backBtn: t("cat.backReportsBtn"),
        navKey: "reports",
      };
    case "mobile":
      return {
        label: t("cat.mobile"),
        listLabel: t("cat.viewApp"),
        listUrl: "mobile.html",
        backLabel: t("cat.backMobile"),
        backBtn: t("cat.backMobileBtn"),
        navKey: "mobile",
      };
    default:
      return {
        label: t("cat.coding"),
        listLabel: t("cat.viewProject"),
        listUrl: "coding.html",
        backLabel: t("cat.backSoftware"),
        backBtn: t("cat.backSoftwareBtn"),
        navKey: "coding",
      };
  }
}

function createProjectCard(project, index) {
  const localized = window.portfolioI18n
    ? window.portfolioI18n.localizeProject(project)
    : project;
  const detailUrl = projectPageUrl(localized.slug);
  const meta = getProjectCategoryMeta(localized.category);
  const delay = Math.min(index * 80, 400);
  const indexLabel = String(index + 1).padStart(2, "0");

  return `
    <article class="project-row reveal" style="transition-delay: ${delay}ms">
      <div class="project-row-accent" aria-hidden="true"></div>
      <span class="project-row-index" aria-hidden="true">${indexLabel}</span>
      <div class="project-row-main">
        <span class="project-badge">${meta.label}</span>
        <h4 class="project-row-title">
          <a href="${detailUrl}">${escapeHtml(localized.title)}</a>
        </h4>
        <p class="project-row-desc">${escapeHtml(localized.description)}</p>
        ${renderTags(localized.tags)}
      </div>
      <a href="${detailUrl}" class="project-row-go" aria-label="${meta.listLabel}: ${escapeHtml(localized.title)}">
        <span aria-hidden="true">${document.documentElement.getAttribute("dir") === "rtl" ? "←" : "→"}</span>
      </a>
    </article>
  `;
}

function renderTags(tags) {
  if (!tags || tags.length === 0) return "";
  return `
    <ul class="project-tags">
      ${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
    </ul>
  `;
}

function renderProjects(container, projects, emptyMessage) {
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p class="empty reveal">${emptyMessage}</p>`;
    observeRevealElements(container);
    return;
  }

  container.innerHTML = projects
    .map((project, index) => createProjectCard(project, index))
    .join("");

  observeRevealElements(container);
}

function showError(container, message) {
  if (container) {
    container.innerHTML = `<p class="error">${escapeHtml(message)}</p>`;
  }
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn || !window.portfolioTheme) return;

  function updateLabel() {
    const label = window.portfolioI18n
      ? window.portfolioI18n.t("theme.toggle")
      : "Switch theme";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  updateLabel();

  btn.addEventListener("click", () => {
    window.portfolioTheme.toggle();
    updateLabel();
  });

  window.addEventListener("themechange", updateLabel);
  window.addEventListener("langchange", updateLabel);
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links-wrap") || document.querySelector(".nav-links");
  if (!toggle || !navMenu) return;

  toggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const hash = href.substring(href.indexOf("#"));
      if (hash === "#") return;

      const onSamePage =
        href.startsWith("#") ||
        anchor.pathname === window.location.pathname;

      if (onSamePage) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initScrollReveal() {
  observeRevealElements(document);
}

function observeRevealElements(root) {
  const elements = root.querySelectorAll(".reveal:not(.visible)");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function setActiveNavLink() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
    link.classList.toggle("nav-active", link.dataset.nav === page);
  });
}

function animateCounter(element, target) {
  if (!element || target <= 0) {
    if (element) element.textContent = "0";
    return;
  }

  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
