const App = (() => {
    function init() {
      console.log("🚀 Initializing OneTake Studio App...");
      
      const components = [
        { name: 'Header', obj: Header, root: 'header-root' },
        { name: 'Hero', obj: HeroSection, root: 'hero-root' },
        { name: 'Services', obj: ServicesSection, root: 'services-root' },
        { name: 'WhyUs', obj: WhyUsSection, root: 'why-us-root' },
        { name: 'Portfolio', obj: PortfolioSection, root: 'portfolio-root' },
        { name: 'Pricing', obj: PricingSection, root: 'pricing-root' },
        { name: 'Location', obj: LocationSection, root: 'location-root' },
        { name: 'Booking', obj: BookingSection, root: 'booking-root' },
        { name: 'CTA', obj: CTASection, root: 'cta-root' },
        { name: 'Footer', obj: Footer, root: 'footer-root' }
      ];
  
      components.forEach(comp => {
        try {
          if (typeof comp.obj === 'undefined') {
            console.warn(`⚠️ Component ${comp.name} is not defined. Skipping.`);
            return;
          }
          const rootEl = document.getElementById(comp.root);
          if (!rootEl) return;
          if (comp.obj && typeof comp.obj.render === 'function') {
            comp.obj.render();
          }
        } catch (err) {
          console.error(`💥 Error rendering ${comp.name}:`, err);
        }
      });
  
      setTimeout(() => {
        initScrollReveal();
        initSmoothScroll();
        initCursorGlow();
        initHeaderScroll();
        initDigitalShutter(); // <--- PANGGIL DI SINI
        
        document.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('in-view');
        });
      }, 100);
    }

    // --- FITUR DIGITAL SHUTTER ---
    function initDigitalShutter() {
        const flashEl = document.getElementById('shutter-flash');
        const toastEl = document.getElementById('booking-toast');
        if (!flashEl) return;
      
        document.addEventListener('click', (e) => {
          const target = e.target.closest('.btn-primary, .cta-button, [href="#booking"], button[type="submit"]');
          
          if (target) {
            // 1. EFEK FLASH (Hanya visual, tidak nahan script lain)
            flashEl.classList.remove('flash-active');
            void flashEl.offsetWidth; 
            flashEl.classList.add('flash-active');
            
            // 2. Getar HP (Ringan)
            if (navigator.vibrate) navigator.vibrate(20);
      
            // 3. LOGIKA TOAST (Hanya muncul kalau tombol konfirmasi diklik)
            const btnText = target.innerText.toLowerCase();
            if (btnText.includes('konfirmasi') || btnText.includes('booking sekarang')) {
              
              // Langsung munculkan toast tanpa delay
              if (toastEl) {
                  toastEl.classList.add('show');
                  // Biarkan dia hilang sendiri nanti, tidak usah ditunggu
                  setTimeout(() => toastEl.classList.remove('show'), 2000);
              }
              
              // JANGAN ganti target.innerHTML
              // JANGAN pakai target.disabled
              // JANGAN pakai setTimeout untuk nahan redirect/print
              // Dengan begini, logic Sheets & Print kamu langsung jalan detik itu juga.
            }
          }
        }, true);
    }
  
    function initScrollReveal() {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
  
      const targets = document.querySelectorAll(
        ".service-card, .why-item, .port-item, .pricing-panel, .location-card, .booking-form-wrap, section"
      );
  
      targets.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    }
  
    function initHeaderScroll() {
      const header = document.querySelector('.header');
      if (!header) return;
      window.addEventListener('scroll', () => {
        window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
      }, { passive: true });
    }
  
    function initCursorGlow() {
      if (document.querySelector(".cursor-glow") || window.innerWidth < 768) return;
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
      let mx = 0, my = 0, gx = 0, gy = 0;
      document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
      function animate() {
        gx += (mx - gx) * 0.1;
        gy += (my - gy) * 0.1;
        glow.style.transform = `translate3d(${gx - 200}px, ${gy - 200}px, 0)`;
        requestAnimationFrame(animate);
      }
      animate();
    }
  
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
          const href = this.getAttribute("href");
          if (href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            const navMobile = document.querySelector('.nav-mobile');
            if (navMobile?.classList.contains('open')) {
              navMobile.classList.remove('open');
              document.querySelector('.hamburger')?.classList.remove('open');
            }
          }
        });
      });
    }
  
    return { init };
  })();
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => App.init());
  } else {
    App.init();
  }