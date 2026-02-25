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
});
