/**
 * JOYPAD X JOGJA - sections.js
 * Berisi komponen statis: Hero, Services, Why Us, dan Location.
 */

// ─── 1. Hero Section ──────────────────────────────────────────────────────────
window.HeroSection = (() => {
  function render() {
    const root = document.getElementById("hero-root");
    if (!root || !window.SiteData) return;

    const hero = SiteData.hero;
    
    const statsHTML = hero.stats.map(s => `
      <div class="stat-item">
        <span class="stat-num">${s.num}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join("");

    const ctaHTML = hero.cta.map(btn => `
      <a href="${btn.href}" class="btn ${btn.primary ? 'btn-white' : 'btn-outline'}">${btn.label}</a>
    `).join("");

    root.innerHTML = `
      <section class="hero-section" id="home">
        <div class="container hero-container">
          <span class="hero-badge reveal">${hero.badge}</span>
          <h1 class="hero-title reveal">${hero.headline[0]} <br> <span class="highlight" style="-webkit-text-stroke: 1px #45f3ff;">${hero.headline[1]}</span></h1>
          <p class="hero-subtitle reveal">${hero.subheadline}</p>
          <div class="hero-cta-group reveal">${ctaHTML}</div>
          <div class="hero-stats reveal">${statsHTML}</div>
        </div>
      </section>
    `;
  }
  return { render };
})();

// ─── 2. Services Section (FIXED NAVIGATION) ──────────────────────────────────
window.ServicesSection = (() => {
  function render() {
    const root = document.getElementById("services-root");
    if (!root || !window.SiteData) return;

    const cardsHTML = SiteData.services.map(s => {
      // 1. Tentukan filterId yang BENAR sesuai kategori di SiteData.pricing (data.js)
      let filterId = 'all';
      const name = s.name.toLowerCase();

      if (name.includes('ps 3') && name.includes('tv')) filterId = 'pricing-ps3-tv';
      else if (name.includes('ps 3')) filterId = 'pricing-ps3';
      else if (name.includes('ps 4') && name.includes('tv')) filterId = 'pricing-ps4-tv';
      else if (name.includes('ps 4')) filterId = 'pricing-ps4';
      else if (name.includes('tv')) filterId = 'pricing-tv';

      return `
        <div class="service-card reveal" 
             style="cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.05);" 
             onmouseover="this.style.borderColor='rgba(69, 243, 255, 0.4)'; this.style.transform='translateY(-5px)';"
             onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.transform='translateY(0)';"
             onclick="navigateToPricing('${filterId}')">
          ${s.tag ? `<span class="service-tag" style="background: rgba(69, 243, 255, 0.1); color: #45f3ff;">${s.tag}</span>` : ""}
          <div class="service-icon" style="color: #45f3ff;">${s.icon}</div>
          <h3 class="service-name">${s.name}</h3>
          <p class="service-desc">${s.desc}</p>
          <span class="service-link" style="color: #45f3ff; font-weight: bold; margin-top: 1.5rem; display: inline-block; font-size: 0.9rem;">Lihat Harga & Detail →</span>
        </div>
      `;
    }).join("");

    root.innerHTML = `
      <section class="services-section section-gap" id="services">
        <div class="container">
          <div class="section-header">
            <p class="section-eyebrow">Unit Sewa</p>
            <h2 class="section-title">Pilihan Konsol</h2>
          </div>
          <div class="services-grid">${cardsHTML}</div>
        </div>
      </section>
    `;
  }

  // Fungsi pembantu untuk navigasi agar tidak langsung loncat ke booking
  window.navigateToPricing = (fId) => {
    // Set filter di pricing section
    if(window.PricingSection && window.PricingSection.setFilter) {
      window.PricingSection.setFilter(fId);
    }
    
    // Scroll ke bagian pricing (bukan booking!)
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { render };
})();

// ─── 3. Why Choose Us Section ─────────────────────────────────────────────────
window.WhyUsSection = (() => {
  function render() {
    const root = document.getElementById("why-us-root");
    if (!root || !window.SiteData) return;

    const itemsHTML = SiteData.whyUs.map((item, i) => `
      <div class="why-item reveal" style="--i:${i}">
        <div class="why-icon" style="color: #45f3ff; font-size: 2.5rem; margin-bottom: 15px;">${item.icon}</div>
        <h3 class="why-title">${item.title}</h3>
        <p class="why-desc">${item.desc}</p>
      </div>
    `).join("");

    root.innerHTML = `
      <section class="why-section section-gap" id="why-us">
        <div class="container">
          <div class="section-header">
            <p class="section-eyebrow">The Advantage</p>
            <h2 class="section-title">Alasan Memilih Kami</h2>
          </div>
          <div class="why-grid">${itemsHTML}</div>
        </div>
      </section>
    `;
  }
  return { render };
})();


// ─── 4. Location Section ──────────────────────────────────────────────────────
window.LocationSection = (() => {
  function render() {
    const root = document.getElementById("location-root");
    if (!root || !window.SiteData) return;

    const { location, operationalHours, mapsUrl } = SiteData.brand;

    root.innerHTML = `
      <section class="location-section section-gap" id="location">
        <div class="container">
          <div class="location-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: center;">
            
            <div class="location-info reveal">
              <p class="section-eyebrow">Find Us</p>
              <h2 class="section-title">Basecamp JoyPad</h2>
              
              <div style="margin: 2rem 0; color: rgba(255,255,255,0.8);">
                <div style="display: flex; gap: 15px; margin-bottom: 1.5rem;">
                  <span style="font-size: 1.8rem; color: #45f3ff;"><i class='bx bx-map'></i></span>
                  <div>
                    <h4 style="color: #fff; margin: 0 0 5px 0;">Titik Pengiriman & Basecamp</h4>
                    <p style="margin: 0; line-height: 1.5;">${location}</p>
                    <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #888;">*Catatan: Kami fokus pada layanan antar-jemput ke rumah Anda.</p>
                  </div>
                </div>
                
                <div style="display: flex; gap: 15px;">
                  <span style="font-size: 1.8rem; color: #45f3ff;"><i class='bx bx-time'></i></span>
                  <div>
                    <h4 style="color: #fff; margin: 0 0 5px 0;">Jam Operasional Pengiriman</h4>
                    <p style="margin: 0;">${operationalHours}</p>
                  </div>
                </div>
              </div>
              
              <a href="${mapsUrl}" target="_blank" class="btn btn-outline" style="border-color: #45f3ff; color: #45f3ff;">Buka di Google Maps</a>
            </div>

            <div class="map-embed reveal" style="border-radius: 16px; overflow: hidden; height: 350px; border: 1px solid rgba(69, 243, 255, 0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <!-- URL Embed Maps JoyPad X Jogja -->
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.338788915833!2d110.36214194999998!3d-7.780104199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a58335029a1bd%3A0x6b74704052ab655f!2sJoyPad%20X%20-%20Sewa%20PS%20Jogja!5e0!3m2!1sen!2sid!4v1714467000000!5m2!1sen!2sid" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

          </div>
        </div>
      </section>
    `;
  }
  return { render };
})();