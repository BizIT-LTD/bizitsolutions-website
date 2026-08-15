(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var footerLinkContainer = document.querySelector(".footer-bottom, .site-footer .footer-inner");
  if (footerLinkContainer && !footerLinkContainer.querySelector('a[href="/privacy/"]')) {
    var privacyLink = document.createElement("a");
    privacyLink.href = "/privacy/";
    privacyLink.className = "footer-privacy-link";
    privacyLink.textContent = "Privacy Policy";
    footerLinkContainer.appendChild(privacyLink);
  }

  var footerSocialLink = document.querySelector(".site-footer .footer-social-link");
  var footerSocialContainer = footerSocialLink ? footerSocialLink.parentElement : document.querySelector(".site-footer .footer-grid > div");
  if (footerSocialContainer && !document.querySelector(".site-footer .footer-social-icons")) {
    var socialIcons = document.createElement("div");
    socialIcons.className = "footer-social-icons";
    socialIcons.innerHTML =
      '<a href="https://www.instagram.com/bizit.solutions/" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a>' +
      '<a href="https://www.youtube.com/@BizITSolutions" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg></a>' +
      '<a href="https://x.com/BizIT_Solution" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on X"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.2L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.8h1.7L8.4 4.1H6.6l11.2 15.7Z"/></svg></a>';
    footerSocialContainer.appendChild(socialIcons);
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
    "/contact": ["it-consulting.webp", "Business leaders discussing technology needs with an IT specialist"],
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
      image.width = imageDetails[0] === "cloud-collaboration.webp" ? 1600 : imageDetails[0] === "it-consulting.webp" ? 1600 : imageDetails[0] === "managed-it-services.webp" ? 1600 : imageDetails[0] === "network-infrastructure.webp" ? 1502 : 1500;
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
