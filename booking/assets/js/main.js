(function () {
  var year = document.querySelector("[data-year]");
  var navLinks = document.querySelectorAll(".header-nav a");

  if (year) {
    year.textContent = new Date().getFullYear();
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
