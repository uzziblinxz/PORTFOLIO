// Shared JS for the portfolio
document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Dark mode toggle
  var themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      var icon = themeToggle.querySelector(".theme-icon");
      if (document.body.classList.contains("dark-mode")) {
        icon.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      } else {
        icon.textContent = "🌙";
        localStorage.setItem("theme", "light");
      }
    });

    // Load saved theme
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.querySelector(".theme-icon").textContent = "☀️";
    }
  }

  // Surprise message
  window.showSurprise = function () {
    var message = document.createElement("div");
    message.className = "surprise-message";
    message.innerHTML =
      "<p>🎉 Surprise! You found the hidden message!</p><p>Keep exploring my portfolio! 🚀</p>";
    document.body.appendChild(message);
    message.style.display = "block";
    setTimeout(function () {
      message.style.display = "none";
      document.body.removeChild(message);
    }, 3000);
  };

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

  // Handle review submission with friendly client-side feedback
  var reviewForms = document.querySelectorAll(
    'form[action="/api/submit-review"]',
  );
  reviewForms.forEach(function (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      var button = form.querySelector("button[type='submit']");
      var messageNode = form.querySelector(".review-message");
      if (!messageNode) {
        messageNode = document.createElement("div");
        messageNode.className = "review-message";
        form.appendChild(messageNode);
      }

      messageNode.textContent = "Sending review...";
      messageNode.style.color = "#ffd54f";
      button.disabled = true;

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      try {
        var response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        var result = await response.json();
        if (response.ok && result.success) {
          form.reset();
          messageNode.textContent =
            "Thanks! Your review was submitted successfully.";
          messageNode.style.color = "#7cffb2";
        } else {
          messageNode.textContent =
            "Sorry, something went wrong. Please try again.";
          messageNode.style.color = "#ff6b6b";
          console.error("Review error:", result);
        }
      } catch (error) {
        messageNode.textContent =
          "Unable to submit review right now. Please try again later.";
        messageNode.style.color = "#ff6b6b";
        console.error("Review submission failed:", error);
      } finally {
        button.disabled = false;
      }
    });
  });
});
