(function () {
  var year = document.querySelector("[data-year]");
  var navLinks = document.querySelectorAll(".header-nav a");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var footerSocialLink = document.querySelector(".site-footer .footer-social-link");
  if (footerSocialLink && !document.querySelector(".site-footer .footer-social-icons")) {
    var socialIcons = document.createElement("div");
    socialIcons.className = "footer-social-icons";
    socialIcons.innerHTML =
      '<a href="https://www.instagram.com/bizit.solutions/" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a>' +
      '<a href="https://www.youtube.com/@BizITSolutions" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg></a>' +
      '<a href="https://x.com/BizIT_Solution" target="_blank" rel="noopener noreferrer" aria-label="BizIT Solutions on X"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.2L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.8h1.7L8.4 4.1H6.6l11.2 15.7Z"/></svg></a>';
    footerSocialLink.insertAdjacentElement("afterend", socialIcons);
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("is-active");
      });
      link.classList.add("is-active");
    });
  });
})();
