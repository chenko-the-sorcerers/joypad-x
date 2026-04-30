/**
 * JOYPAD X JOGJA - hero.js
 * Premium Gaming & Tech Edition (Fixed Layout & Animation)
 */

const HeroSection = (() => {
  function render() {
    const root = document.getElementById("hero-root");
    if (!root || !window.SiteData || !window.SiteData.hero) return;

    const { headline, subheadline, badge, cta, stats } = window.SiteData.hero;

    const ctaHTML = cta
      .map((c, i) => `<a href="${c.href}" class="btn ${i === 0 ? "btn-white" : "btn-outline"}">${c.label}</a>`)
      .join("");

    const statsHTML = stats.map((s, i) => `
      ${i > 0 ? '<div class="hero-divider"></div>' : ""}
      <div class="hero-stat">
        <span class="stat-num">${s.num}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join("");

    const html = `
      <style>
        /* ─── BASE HERO SETUP ─── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 0 4rem;
          overflow: hidden;
          background: #0b0c10; 
        }

        /* ─── BACKGROUND EFFECTS ─── */
        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(69, 243, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(69, 243, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
          mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          z-index: 1;
          pointer-events: none;
        }

        .hero-container {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 3rem);
          display: flex;
          align-items: center;
          gap: 2rem;
          width: 100%;
          position: relative;
          z-index: 5;
        }

        /* ─── LEFT COLUMN (TEXT CONTENT) ─── */
        .hero-content {
          flex: 1.2;
          max-width: 650px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(69, 243, 255, 0.3);
          border-radius: 100px;
          backdrop-filter: blur(10px); 
          -webkit-backdrop-filter: blur(10px);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--neon-blue);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(69, 243, 255, 0.05);
        }

        .hero-headline {
          font-family: var(--font-display);
          /* Ukuran font responsif, namun dibatasi agar tidak pecah */
          font-size: clamp(2.8rem, 5vw, 5rem); 
          line-height: 1.1;
          letter-spacing: 0.02em;
          color: var(--white);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          text-shadow: 0 20px 40px rgba(0,0,0,0.5);
          /* Memaksa teks sejajar satu baris */
          white-space: nowrap; 
        }

        .hero-line {
          display: inline-block; /* Pakai inline-block agar sejajar */
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .hero-line--accent {
          background: linear-gradient(90deg, #ffffff 0%, var(--neon-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(69, 243, 255, 0.3));
          margin-left: 10px; /* Jarak antara JoyPad X dan Jogja */
        }

        .hero-sub {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255, 255, 255, 0.7);
          max-width: 500px;
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--white);
          text-shadow: 0 0 15px rgba(255,255,255,0.2);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--neon-blue);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .hero-divider {
          width: 1px;
          height: 45px;
          background: linear-gradient(to bottom, transparent, rgba(69, 243, 255, 0.4), transparent);
        }

        /* ─── RIGHT COLUMN (PREMIUM GRAPHICS) ─── */
        .hero-media {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .graphic-scene {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .aurora-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 140%; height: 140%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(69, 243, 255, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(176, 38, 255, 0.3) 0%, transparent 50%);
          filter: blur(50px);
          z-index: 1;
          animation: breathe-aurora 8s alternate infinite ease-in-out;
        }

        .tech-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 2;
        }
        .tech-ring-1 {
          width: 70%; height: 70%;
          border: 1px solid rgba(255,255,255,0.05);
          border-top: 2px solid var(--neon-blue);
          animation: spin 12s linear infinite;
        }
        .tech-ring-2 {
          width: 95%; height: 95%;
          border: 1px dashed rgba(255,255,255,0.1);
          border-right: 2px solid #b026ff;
          animation: spin-reverse 18s linear infinite;
        }

        .premium-x {
          position: relative;
          z-index: 5;
          font-family: var(--font-display);
          font-size: clamp(10rem, 20vw, 16rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(180deg, #ffffff 0%, var(--neon-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 15px 35px rgba(69, 243, 255, 0.4));
          animation: float-core 4s ease-in-out infinite;
        }

        .glass-card {
          position: absolute;
          width: 75px; height: 75px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.4); 
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
          font-family: Arial, sans-serif;
          font-weight: bold;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(69, 243, 255, 0.05);
          z-index: 10;
        }

        .card-1 { top: 8%; left: 8%; color: #45f3ff; text-shadow: 0 0 15px #45f3ff; animation: float-obj 5s ease-in-out infinite; }
        .card-2 { top: 15%; right: 5%; color: #b026ff; text-shadow: 0 0 15px #b026ff; animation: float-obj 6s ease-in-out infinite 1s; }
        .card-3 { bottom: 12%; left: 12%; color: #45f3ff; text-shadow: 0 0 15px #45f3ff; animation: float-obj 4.5s ease-in-out infinite 0.5s; }
        .card-4 { bottom: 8%; right: 15%; color: #b026ff; text-shadow: 0 0 15px #b026ff; animation: float-obj 5.5s ease-in-out infinite 1.5s; }

        /* ─── ANIMATIONS ─── */
        @keyframes float-core {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-obj {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes breathe-aurora {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }

        /* Reveal Animation */
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* ─── MOBILE RESPONSIVE ─── */
        @media (max-width: 992px) {
          .hero-container {
            flex-direction: column-reverse; 
            text-align: center;
            gap: 1rem;
            padding-top: 6rem;
          }
          .hero-content { align-items: center; display: flex; flex-direction: column; }
          /* Di mobile biarkan normal kalau layarnya terlalu kecil, tapi diusahakan tetap sebaris */
          .hero-headline { justify-content: center; font-size: clamp(2rem, 8vw, 3.5rem); white-space: normal; } 
          .hero-cta { justify-content: center; }
          .hero-stats { justify-content: center; width: 100%; border-top: none; }
          .hero-divider { display: none; }
          
          .graphic-scene { max-width: 280px; margin-bottom: 2rem; }
          .glass-card { width: 50px; height: 50px; font-size: 1.5rem; }
          .premium-x { font-size: 8rem; }
        }
      </style>

      <section class="hero" id="home">
        <div class="hero-grid-lines"></div>
        <div class="hero-noise"></div>
        
        <div class="hero-container">
          <div class="hero-content">
            
            <div class="hero-badge" data-reveal="0">
              <span>${badge}</span>
            </div>
            
            <h1 class="hero-headline">
              <span class="hero-line" data-reveal="1">${headline[0]}</span>
              <span class="hero-line hero-line--accent" data-reveal="2">${headline[1]}</span>
            </h1>
            
            <p class="hero-sub" data-reveal="3">${subheadline}</p>
            
            <div class="hero-cta" data-reveal="4">${ctaHTML}</div>
            
            <div class="hero-stats" data-reveal="5">${statsHTML}</div>
          </div>

          <div class="hero-media" data-reveal="6">
            <div class="graphic-scene">
              <!-- Latar Belakang Cahaya Aurora -->
              <div class="aurora-glow"></div>
              
              <!-- Cincin Orbit -->
              <div class="tech-ring tech-ring-1"></div>
              <div class="tech-ring tech-ring-2"></div>
              
              <!-- Logo X Raksasa -->
              <div class="premium-x">X</div>
              
              <!-- Floating Glass Cards (Simbol PlayStation) -->
              <div class="glass-card card-1">△</div>
              <div class="glass-card card-2">○</div>
              <div class="glass-card card-3">✕</div>
              <div class="glass-card card-4">□</div>
            </div>
          </div>
        </div>

      </section>
    `;

    root.innerHTML = html;
    
    // Delay sedikit agar elemen HTML masuk ke DOM sebelum di query
    setTimeout(animateHero, 50);
  }

  function animateHero() {
    // Pastikan ambil elemen di dalam hero-root saja untuk lokalisasi
    const elements = document.getElementById("hero-root").querySelectorAll("[data-reveal]");
    if (elements.length === 0) return;
    
    elements.forEach(el => {
      const delay = 100 + (parseInt(el.dataset.reveal) || 0) * 150;
      setTimeout(() => {
        el.classList.add("revealed");
      }, delay);
    });
  }

  return { render };
})();