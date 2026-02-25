// Shared JS for the portfolio
document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Animate skill bars when the skills section scrolls into view
  var skillChart = document.querySelector(".skill-chart");
  var fills = document.querySelectorAll(".skill-fill");
  if (skillChart && fills.length) {
    // Ensure fills start at 0 (in case inline styles remain)
    fills.forEach(function (f) {
      f.style.width = "0%";
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fills.forEach(function (el) {
              var p =
                el.getAttribute("data-percent") || el.dataset.percent || "0";
              // small timeout to allow repaint
              setTimeout(function () {
                el.style.width = p + "%";
              }, 50);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(skillChart);
  }

  // Mobile nav toggle
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("nav--open");
    });
    // close when a link is clicked
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
    // close when clicking outside
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && nav.classList.contains("nav--open")) {
        nav.classList.remove("nav--open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal animations for elements with .reveal
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    var revObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach(function (el) {
      revObs.observe(el);
    });
  }
});
