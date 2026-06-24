(function () {
  const STORAGE_KEY = "portfolio-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0b1120" : "#f4f7fb";
  }

  function flashThemeTransition() {
    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  }

  window.portfolioTheme = {
    get: getPreferredTheme,
    set(theme) {
      flashThemeTransition();
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
      window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    },
    toggle() {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      window.portfolioTheme.set(next);
      return next;
    },
  };

  applyTheme(getPreferredTheme());
})();
