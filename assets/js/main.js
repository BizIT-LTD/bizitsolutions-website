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

  var imageByPath = {
    "/managed-it-services-sydney": ["managed-it-services.webp", "IT specialists monitoring managed business technology systems"],
    "/managed-services": ["managed-it-services.webp", "IT specialists monitoring managed business technology systems"],
    "/business-it-support": ["managed-it-services.webp", "Professional IT support team helping a business"],
    "/it-support-sydney": ["managed-it-services.webp", "Sydney IT specialists providing responsive business support"],
    "/small-business-it-support-sydney": ["managed-it-services.webp", "IT specialists supporting a modern small business"],
    "/it-support-north-shore-sydney": ["managed-it-services.webp", "IT support specialists working with a Sydney business"],
    "/cyber-security-services-sydney": ["cybersecurity-services.webp", "Cybersecurity analyst reviewing business security monitoring"],
    "/it-security": ["cybersecurity-services.webp", "Cybersecurity professionals monitoring security systems"],
    "/essential-eight-consulting-sydney": ["cybersecurity-services.webp", "Security analyst assessing practical cyber controls"],
    "/microsoft-365-support-sydney": ["cloud-collaboration.webp", "Business team collaborating with cloud productivity tools"],
    "/microsoft-365": ["cloud-collaboration.webp", "Professionals collaborating with cloud business applications"],
    "/cloud-services-sydney": ["cloud-collaboration.webp", "Business team planning secure cloud collaboration"],
    "/microsoft-azure": ["network-infrastructure.webp", "Technology specialist managing modern cloud infrastructure"],
    "/it-consulting-sydney": ["it-consulting.webp", "Technology consultant leading a business strategy workshop"],
    "/it-company-sydney": ["managed-it-services.webp", "IT specialists monitoring and supporting business technology systems"],
    "/it-services-sydney": ["managed-it-services.webp", "IT specialists delivering a full range of business technology services"],
    "/managed-service-provider-sydney": ["managed-it-services.webp", "Managed service provider team monitoring a Sydney business network"],
    "/outsourced-it-support-sydney": ["managed-it-services.webp", "Outsourced IT specialists supporting a small business team"],
    "/remote-it-support-sydney": ["managed-it-services.webp", "IT specialist providing remote troubleshooting support to a business"],
    "/onsite-it-support-sydney": ["network-infrastructure.webp", "IT technician providing onsite support at a Sydney business"],
    "/it-helpdesk-sydney": ["managed-it-services.webp", "IT helpdesk specialist assisting a business user with a support request"],
    "/business-email-support-sydney": ["cloud-collaboration.webp", "Business professional managing email and collaboration tools"],
    "/network-support-sydney": ["network-infrastructure.webp", "Technology specialist managing business network infrastructure"],
    "/backup-disaster-recovery-sydney": ["cybersecurity-services.webp", "IT specialist reviewing business backup and recovery systems"],
    "/endpoint-management-sydney": ["cybersecurity-services.webp", "IT specialist managing and securing business laptops and devices"],
    "/it-project-management-sydney": ["it-consulting.webp", "Technology specialist coordinating an IT project rollout"],
    "/microsoft-365-migration-sydney": ["cloud-collaboration.webp", "Business team collaborating during a Microsoft 365 migration"],
    "/virtual-it-manager-sydney": ["it-consulting.webp", "Virtual IT manager presenting a practical technology roadmap"],
    "/about": ["it-consulting.webp", "Technology consultant collaborating with business leaders"],
    "/website-design-small-business-sydney": ["business-automation.webp", "Digital specialists planning a modern business solution"],
    "/web-design-services": ["business-automation.webp", "Digital team reviewing a connected business workflow"],
    "/seo-google-ads-sydney": ["business-automation.webp", "Business team reviewing a digital growth workflow"],
    "/seo-google-ads": ["business-automation.webp", "Business professionals reviewing digital performance"],
    "/services": ["network-infrastructure.webp", "IT specialist managing reliable business infrastructure"],
    "/contact": ["contact-managed-it-consulting.webp", "IT specialist helping a business team with workplace technology"],
    "/book": ["it-consulting.webp", "IT specialist meeting with business leaders"],
    "/booking": ["it-consulting.webp", "Technology consultation with business leaders"]
  };

  var pageHero = document.querySelector(".page-hero");
  var imageDetails = imageByPath[path];
  if (pageHero && imageDetails && !pageHero.querySelector(".page-hero-media")) {
    var heroContainer = pageHero.querySelector(".container");
    if (heroContainer) {
      pageHero.classList.add("page-hero-with-media");
      heroContainer.classList.add("page-hero-grid");
      var media = document.createElement("figure");
      media.className = "page-hero-media";
      var image = document.createElement("img");
      image.src = "/assets/images/technology/" + imageDetails[0];
      image.alt = imageDetails[1];
      image.width = imageDetails[0] === "cloud-collaboration.webp" ? 1600 : imageDetails[0] === "it-consulting.webp" ? 1600 : imageDetails[0] === "contact-managed-it-consulting.webp" ? 1600 : imageDetails[0] === "managed-it-services.webp" ? 1600 : imageDetails[0] === "network-infrastructure.webp" ? 1502 : 1500;
      image.height = imageDetails[0] === "cloud-collaboration.webp" ? 729 : imageDetails[0] === "it-consulting.webp" ? 843 : imageDetails[0] === "managed-it-services.webp" ? 777 : 1000;
      image.fetchPriority = "high";
      image.decoding = "async";
      media.appendChild(image);
      heroContainer.appendChild(media);
    }
  }

  var homePanel = document.querySelector(".hero .hero-panel");
  if (homePanel) {
    homePanel.classList.add("hero-visual");
    homePanel.insertAdjacentHTML(
      "afterbegin",
      '<img src="/assets/images/technology/homepage-managed-it-support.webp" alt="Managed IT specialists monitoring business infrastructure and assisting an employee with workplace technology" width="1586" height="992" fetchpriority="high" decoding="async">'
    );
  }

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
