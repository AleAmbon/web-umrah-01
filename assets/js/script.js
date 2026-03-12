document.addEventListener("DOMContentLoaded", () => {
  // Function to load components
  const loadComponent = (id, path) => {
    return fetch(path)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(id).innerHTML = data;
      })
      .catch((error) => console.error("Error loading component:", error));
  };

  // Load All Components
  Promise.all([
    loadComponent("navbar-placeholder", "components/navbar.html"),
    loadComponent("header-placeholder", "components/header.html"),
    loadComponent("footer-placeholder", "components/footer.html"),
  ]).then(() => {
    // Run functions that depend on components being loaded
    initNavbarScroll();
    initSmoothScroll();
  });

  // Navbar Scroll Effect
  function initNavbarScroll() {
    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  // Smooth Scrolling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Animation on Scroll (Simple Observer)
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".package-card, .testimonial-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
});
