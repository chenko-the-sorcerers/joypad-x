/**
 * JOYPAD X JOGJA - header.js
 */

const Header = (() => {
  function buildWhatsAppUrl(data = {}) {
    const { service = "", date = "" } = data;
    // Mengambil template pesan dari SiteData dan mereplace variabelnya
    const msg = SiteData.brand.whatsapp.messageTemplate
      .replace("{service}", service)
      .replace("{date}", date);
    return `https://wa.me/${SiteData.brand.whatsapp.phone}?text=${encodeURIComponent(msg)}`;
  }

  function render() {
    const { name } = SiteData.brand;
    const { links } = SiteData.nav;

    const navLinks = links
      .map(l => `<a href="${l.href}" class="nav-link">${l.label}</a>`)
      .join("");

      const html = `
      <header class="header" id="header">
          <div class="header-inner container">
          <a href="#" class="logo">
              <img src="logo.png" alt="${name}" class="logo-img" style="height: 38px; object-fit: contain;" />
          </a>
          <nav class="nav-desktop">${navLinks}</nav>
          <div class="header-actions">
              <a href="#booking" class="btn btn-sm btn-white hide-mobile">Booking Sekarang</a>
              <button class="hamburger" id="hamburger">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              </button>
          </div>
          </div>
      </header>
      
      <div class="nav-overlay" id="navOverlay"></div>
      <div class="nav-mobile" id="navMobile">
          <div style="margin-bottom: 30px; font-size: 0.8rem; color: #555; letter-spacing: 2px;">MENU UTAMA</div>
          ${navLinks}
          <a href="#booking" class="btn btn-white" style="margin-top: 20px;">Booking Sekarang</a>
      </div>
      `;

    const root = document.getElementById("header-root");
    if (root) {
      root.innerHTML = html;
      bindEvents();
    }
  }

  function bindEvents() {
    const hamburger = document.getElementById("hamburger");
    const navMobile = document.getElementById("navMobile");
    const navOverlay = document.getElementById("navOverlay");
    const header = document.getElementById("header");
    const body = document.body;

    function openMenu() {
      hamburger.classList.add("open");
      navMobile.classList.add("active");
      navOverlay.classList.add("show");
      body.style.overflow = "hidden";
    }

    function closeMenu() {
      hamburger.classList.remove("open");
      navMobile.classList.remove("active");
      navOverlay.classList.remove("show");
      body.style.overflow = "";
    }

    // Toggle Menu
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navMobile.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on overlay click
    navOverlay.addEventListener("click", () => {
      closeMenu();
    });

    // Close on link click & handle smooth scroll
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        
        // Tutup menu mobile jika sedang terbuka
        closeMenu();

        // Smooth Scroll manual untuk memastikan pas ke posisi
        if (targetId !== "#") {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const headerHeight = header.offsetHeight;
            const targetPos = targetEl.offsetTop - headerHeight;
            window.scrollTo({
              top: targetPos,
              behavior: "smooth"
            });
          }
        }
      });
    });

    // Close on clicking outside
    document.addEventListener("click", (e) => {
      if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Scroll effect (Glassmorphism trigger)
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Active nav on scroll (Intersection Observer)
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const observerOptions = {
      root: null,
      threshold: 0.5,
      rootMargin: "-10% 0px -70% 0px" // Fokus pada area atas layar
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const href = link.getAttribute("href").substring(1);
            link.classList.toggle("active", href === entry.target.id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
  }

  return { render, buildWhatsAppUrl };
})();