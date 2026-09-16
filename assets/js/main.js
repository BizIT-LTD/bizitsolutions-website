(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  var path = window.location.pathname.replace(/\/index\.html$/i, "").replace(/\.html$/i, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".primary-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) {
      return;
    }

    var normalized = href.replace(/\/$/, "") || "/";
    if (normalized === path || (path.indexOf(normalized) === 0 && normalized !== "/")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  var revealTargets = document.querySelectorAll(
    ".section-heading, .service-card, .info-panel, .service-offering, .split > *, .feature-list > *, .faq-item, .cta-box, .article-content > *, .article-sidebar"
  );
  revealTargets.forEach(function (element) {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealTargets.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }
})();
