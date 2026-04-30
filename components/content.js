/**
 * JOYPAD X JOGJA - content.js
 * Integrated Booking, Smart Pricing, and Animated Receipt System
 */

// ─── 1. PORTFOLIO SECTION ───────────────────────────────────────────────────
window.PortfolioSection = (() => {
  function render() {
    const root = document.getElementById("portfolio-root");
    if (!root || !window.SiteData) return;
    const postsHTML = SiteData.featuredPosts.map(post => `
      <div class="ig-embed-wrap"><blockquote class="instagram-media" data-instgrm-permalink="${post.url}" data-instgrm-version="14" style="background:#000; border:0; border-radius:12px; margin:0; width:100%; min-width:100%; padding:0;"></blockquote></div>
    `).join("");
    root.innerHTML = `<section class="portfolio-section section-gap" id="portfolio"><div class="container"><div class="section-header-row" style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 2rem;"><div><p class="section-eyebrow">Galeri Pelanggan</p><h2 class="section-title">Keseruan Pelanggan</h2></div><a href="${SiteData.brand.instagram}" target="_blank" class="btn btn-outline btn-sm">@sewaps.joypadx.jogja</a></div><div class="ig-grid">${postsHTML}</div></div></section>`;
    setTimeout(() => { if (window.instgrm) window.instgrm.Embeds.process(); }, 500);
  }
  return { render };
})();


// ─── 2. PRICING SECTION ──────────────────────────────────────────────────────
window.PricingSection = (() => {
  let activeFilter = 'all';

  function render() {
    const root = document.getElementById("pricing-root");
    if (!root || !window.SiteData) return;

    const pricingData = SiteData.pricing;
    const categories = ['all', ...pricingData.map(item => item.id)];
    
    // Filter data berdasarkan tombol yang aktif
    const filtered = activeFilter === 'all' 
      ? pricingData 
      : pricingData.filter(item => item.id === activeFilter);

    let cardsHTML = "";
    filtered.forEach(cat => {
      cat.sections.forEach(sec => {
        sec.items.forEach(item => {
          cardsHTML += `
            <div class="pricing-card-v2 reveal in-view">
              <div class="p-card-header">
                <div class="p-card-icon">${cat.icon}</div>
                <div class="p-card-title"><p class="p-category-tag">${cat.name}</p><h3>${item.label}</h3></div>
              </div>
              <div class="p-card-body">
                <div class="p-main-info"><span class="p-price">${item.price}</span></div>
                ${item.note ? `<p class="p-note-box"><span>ℹ</span> ${item.note}</p>` : ""}
                ${item.badge ? `<span class="badge-hemat" style="display:inline-block; margin-top:8px; padding:4px 10px; background:rgba(69,243,255,0.1); color:#45f3ff; border: 1px solid rgba(69,243,255,0.3); border-radius:4px; font-size:0.75rem; font-weight:bold; letter-spacing:0.5px;">${item.badge}</span>` : ""}
              </div>
              <div class="p-card-action">
                <button onclick="window.BookingSection.selectPackage('${item.label.replace(/'/g, "\\'")}')" class="btn btn-white w-full" style="width: 100%;">Sewa Unit Ini</button>
              </div>
            </div>`;
        });
      });
    });

    root.innerHTML = `
      <section class="pricing-section section-gap" id="pricing">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-title">Pricelist Sewa</h2>
            <div class="filter-container">
              ${categories.map(c => {
                const label = c === 'all' ? 'Semua Unit' : c.replace('pricing-','').toUpperCase();
                return `<button class="filter-btn ${activeFilter === c ? 'active' : ''}" 
                        onclick="window.PricingSection.setFilter('${c}')">${label}</button>`;
              }).join("")}
            </div>
          </div>
          <div class="pricing-grid-v2">${cardsHTML}</div>
        </div>
      </section>
    `;
  }

  return { 
    render, 
    setFilter: (f) => { 
      activeFilter = f; 
      window.PricingSection.render(); 
    } 
  };
})();

// ─── 3. BOOKING SECTION (SECURE & SMART URL) ────────────────
window.BookingSection = (() => {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
  
  const proxyURL = isLocal 
      ? 'https://script.google.com/macros/s/AKfycbxi7D5wrbFqee4ImOejPK7QfjLOgINyxW8shusNVWUQXKEg_E8orzvWXyF5Fg2JM42TMQ/exec'
      : '/api/submit';

  function getSecureHeaders(isPost = false) {
      const headers = {};
      if (isPost) headers['Content-Type'] = 'application/json';
      if (!isLocal) headers['x-onetake-sec'] = 'OT-GACOR-2026'; 
      return headers;
  }

  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    if (typeof priceStr === 'number') return priceStr;
    let cleanStr = priceStr.split('/')[0];
    const match = cleanStr.match(/\d+/g);
    return match ? parseInt(match.join(''), 10) : 0;
  }

  function showReceipt(bookingId, payload) {
    document.getElementById("booking-container-ui").style.display = "none";
    document.getElementById("success-ui").style.display = "block";
    
    document.getElementById("r-id").innerText = bookingId;
    document.getElementById("r-name").innerText = payload.name;
    document.getElementById("r-datetime").innerText = `${payload.date} | ${payload.time}`;
    document.getElementById("r-paket").innerHTML = payload.paket.map(p => "• " + p).join("<br>");
    document.getElementById("r-addons").innerHTML = payload.addons.length > 0 ? payload.addons.map(a => "• " + a).join("<br>") : "-";
    document.getElementById("r-total").innerText = payload.totalPrice;

    const line = "──────────────────";
    const waText = `*RESERVASI JOYPAD X JOGJA*%0A${line}%0A*ID Booking:* ${bookingId}%0A*Nama:* ${payload.name}%0A*Alamat Antar:* ${payload.alamat}%0A${line}%0A*Tgl Kirim:* ${payload.date}%0A*Jam Kirim:* ${payload.time}%0A${line}%0A*Layanan:*%0A${payload.paket.map(p => "• " + p).join("%0A")}%0A` + (payload.addons.length > 0 ? `*Add-ons:*%0A${payload.addons.map(a => "• " + a).join("%0A")}%0A` : "") + `${line}%0A*TOTAL ESTIMASI:* *${payload.totalPrice}*%0A${line}%0A%0AHalo Admin JoyPad X! Saya baru saja melakukan booking melalui website. Mohon dicek ketersediaan unitnya ya min!`;
    
    document.getElementById("wa-link").href = `https://wa.me/6285162627409?text=${waText}`;
    document.getElementById("success-ui").scrollIntoView({ behavior: 'smooth' });
  }

  function render() {
    const root = document.getElementById("booking-root");
    if (!root || !window.SiteData) return;

    const addOnsData = [
      { name: "Stik PS 3 Tambahan", price: 15000 }, 
      { name: "Stik PS 4 Tambahan", price: 25000 },
      { name: "TV LED 32 Inch (Ekstra)", price: 40000 }, 
      { name: "Kabel HDMI Ekstra Panjang", price: 10000 },
      { name: "Kabel Stop Kontak Roll", price: 10000 }
    ];

    const addOnHTML = addOnsData.map(item => `
      <label class="calc-label-item">
        <input type="checkbox" name="f-addons" value="${item.name}" data-price="${item.price}" class="calc-trigger"> 
        <span class="item-name">${item.name}</span>
        <strong class="item-price">+${(item.price/1000)}k</strong>
      </label>
    `).join("");

    let paketHTML = '';
    SiteData.pricing.forEach(cat => {
      paketHTML += `<div class="paket-group-header">${cat.name}</div>`;
      cat.sections.forEach(sec => {
        sec.items.forEach(item => {
          const numPrice = parsePrice(item.price);
          paketHTML += `
            <label class="calc-label-item paket-item">
              <input type="checkbox" name="f-paket" value="${item.label} (${cat.name})" data-price="${numPrice}" class="calc-trigger"> 
              <span class="item-name">${item.label}</span>
              <strong class="item-price">${item.price}</strong>
            </label>`;
        });
      });
    });

    root.innerHTML = `
      <style>
        * { box-sizing: border-box; }

        /* RESPONSIVE BASE */
        .booking-container-inner { display: flex; gap: 2.5rem; align-items: flex-start; }
        .ycb-left { flex: 0 0 320px; position: sticky; top: 100px; z-index: 10; }
        .ycb-right { flex: 1; background: rgba(255,255,255,0.02); padding: 2.5rem; border-radius: 24px; border: 1px solid rgba(69, 243, 255, 0.1); box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }

        /* FORM SPACING */
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; margin-bottom: 0.6rem; font-size: 0.85rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .form-input { width: 100%; box-sizing: border-box; font-family: inherit; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; padding: 12px; transition: 0.3s; }
        .form-input:focus { border-color: #45f3ff; outline: none; box-shadow: 0 0 10px rgba(69, 243, 255, 0.2); background: #000; }
        textarea.form-input { resize: vertical; min-height: 80px; }

        /* CHECKBOX & LAYANAN STYLE */
        .calc-trigger { width: 18px; height: 18px; accent-color: #45f3ff; cursor: pointer; flex-shrink: 0; margin: 0; }
        .calc-label-item { display: flex; gap: 12px; align-items: center; cursor: pointer; font-size: 0.9rem; color: #fff; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease; }
        .calc-label-item:hover { background: rgba(69, 243, 255, 0.08); border-color: rgba(69, 243, 255, 0.4); }
        .item-name { flex: 1; line-height: 1.4; }
        .item-price { color: #45f3ff; font-weight: 700; }
        .paket-group-header { font-size: 0.75rem; color: #45f3ff; text-transform: uppercase; letter-spacing: 1.5px; margin: 1.5rem 0 0.8rem; border-bottom: 1px dashed rgba(69,243,255,0.3); padding-bottom: 8px; }
        
        /* Custom Scrollbar */
        .service-scroll-box { max-height: 280px; overflow-y: auto; padding-right: 12px; }
        .service-scroll-box::-webkit-scrollbar { width: 6px; }
        .service-scroll-box::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .service-scroll-box::-webkit-scrollbar-thumb { background: rgba(69,243,255,0.3); border-radius: 10px; }

        /* SUMMARY CARD */
        .ycb-summary-card { background: #0b0c10; border-radius: 20px; padding: 24px 24px 0 24px; border: 1px solid rgba(69,243,255,0.15); box-shadow: 0 20px 60px rgba(0,0,0,0.8); overflow: hidden; position: relative; }
        /* Aksen Glow di Summary */
        .ycb-summary-card::before { content: ""; position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(176, 38, 255, 0.5); filter: blur(50px); pointer-events: none; }
        
        .ycb-avatar { width: 55px; height: 55px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 5px; box-shadow: 0 0 15px rgba(69, 243, 255, 0.3); }
        .ycb-summary-row { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05); word-break: break-word; }
        .ycb-total-row { background: linear-gradient(180deg, rgba(69, 243, 255, 0.05) 0%, rgba(69, 243, 255, 0.15) 100%); margin: 20px -24px 0 -24px; padding: 20px 24px; border-top: 1px dashed rgba(69, 243, 255, 0.4); display: flex; align-items: center; gap: 15px; }

        /* SECTION HEADER */
        .section-header-centered { text-align: center; margin-bottom: 3rem; }

        /* ─── TRACKING BOX: CARD MEMANJANG (WIDE FLEX) ─── */
        .track-premium-box {
          margin: 5rem auto 0;
          max-width: 800px; 
          width: 100%;
          background: #0b0c10;
          border: 1px solid rgba(69, 243, 255, 0.15);
          border-radius: 24px;
          padding: 3rem; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          box-sizing: border-box;
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .track-premium-box::after {
          content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #45f3ff, transparent);
        }
        .track-premium-box h3 { margin: 0 0 1.5rem; font-size: 1.8rem; color: #fff; font-weight: 800; text-transform: uppercase; font-family: 'Orbitron', sans-serif;}
        .track-input-group { display: flex; flex-direction: row; gap: 15px; width: 100%; max-width: 600px; margin: 0 auto; }
        .track-input-group .form-input { flex: 1; height: 55px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; padding: 0 20px; font-size: 1rem; transition: all 0.3s ease; }
        .track-input-group .form-input:focus { border-color: #45f3ff; outline: none; background: #000; box-shadow: 0 0 10px rgba(69, 243, 255, 0.2); }
        .track-input-group .btn-lacak { width: auto; padding: 0 35px; height: 55px; background: #45f3ff; color: #000; border-radius: 5px; font-weight: 800; font-size: 1rem; letter-spacing: 1px; border: none; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase;}
        .track-input-group .btn-lacak:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(69,243,255,0.4); }

        /* ANIMASI HASIL LACAK */
        .track-result-wrapper { margin: 1.5rem auto 0; max-width: 600px; animation: slideUpFade 0.4s ease forwards; width: 100%; }
        .track-result-card { background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; text-align: left; word-wrap: break-word; }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 992px) {
          .booking-container-inner { flex-direction: column; }
          .ycb-left { flex: 1; width: 100%; position: static; }
          .ycb-right { padding: 1.5rem; width: 100%; }
        }
        @media (max-width: 768px) {
          .track-premium-box { padding: 2rem 1.5rem; }
          .track-input-group { flex-direction: column; } 
          .track-input-group .btn-lacak { width: 100%; }
        }
      </style>

      <section class="booking-section section-gap" id="booking">
        <div class="container">
          <div class="section-header-centered">
            <p class="section-eyebrow">Rental Reservation</p>
            <h2 class="section-title">Booking Unit</h2>
            <p style="color:rgba(255,255,255,0.45); font-size:0.95rem; margin-top:0.75rem; max-width:480px; margin-left:auto; margin-right:auto;">Pilih konsol incaranmu, isi data diri beserta alamat, dan unit akan kami siapkan untuk diantar.</p>
          </div>

          <div id="booking-main-content">
            <div class="booking-container-inner" id="booking-container-ui">
                
                <div class="ycb-left">
                  <div class="ycb-summary-card">
                      <div style="display:flex; align-items:center; gap:14px; margin-bottom:20px; padding-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.07);">
                        <img src="logo.png" class="ycb-avatar" style="object-fit: contain;" alt="JoyPad X">
                        <div>
                          <h3 style="margin:0; font-size:1.2rem; font-weight:700; color:#fff; font-family: 'Orbitron', sans-serif;">JoyPad X</h3>
                          <p style="margin:2px 0 0; font-size:0.75rem; color:#888;">Yogyakarta</p>
                        </div>
                      </div>
                      <div class="ycb-summary-row"><span style="font-size:1.2rem; color: #45f3ff;"><i class='bx bx-calendar'></i></span><div><strong id="sum-date" style="font-size:1rem; color:#fff;">Pilih Tanggal Kirim</strong><br><span id="sum-time" style="color:#888; font-size:0.8rem;">Pilih Jam Kirim</span></div></div>
                      <div class="ycb-summary-row" style="border:none;"><span style="font-size:1.2rem; color: #45f3ff;"><i class='bx bx-package'></i></span><div><strong style="color:#45f3ff; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em;">Layanan & Unit:</strong><br><span id="sum-paket" style="color:#ccc; font-size:0.85rem; line-height:1.5;">Belum ada pilihan</span></div></div>
                      <div class="ycb-total-row">
                        <img src="data:image/svg+xml;utf8,<svg width='32' height='32' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4-4H6a4 4 0 0 1-4-4V10Z' fill='%2345f3ff' opacity='.2'/><path d='M16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' fill='%2345f3ff'/><path d='M4 11h2v2H4v-2Zm0 8h2v2H4v-2Zm22-8h2v2h-2v-2Zm0 8h2v2h-2v-2Z' fill='%2345f3ff'/></svg>" alt="Cash" style="width:32px; height:32px;">
                        <div>
                          <span style="color:#45f3ff; font-size:0.7rem; text-transform:uppercase; font-weight:700; letter-spacing:0.1em; display:block;">Total Estimasi</span>
                          <strong id="sum-price" style="color:#45f3ff; font-size:1.8rem; letter-spacing:-0.02em; font-family: 'Orbitron', sans-serif;">Rp 0</strong>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="ycb-right">
                  <form id="bookingForm">
                      <div class="form-row">
                        <div class="form-group"><label class="form-label">Tanggal Pengantaran</label><input type="date" id="f-date" class="form-input" required></div>
                        <div class="form-group"><label class="form-label">Jam Pengantaran</label><select id="f-time" class="form-input form-select" required><option value="">Pilih Tanggal Dulu...</option></select></div>
                      </div>
                      <div class="form-group"><label class="form-label">Nama Lengkap</label><input type="text" id="f-name" class="form-input" placeholder="Nama Anda" required></div>
                      <div class="form-group"><label class="form-label">Alamat Lengkap (Patokan/Detail)</label><textarea id="f-alamat" class="form-input" placeholder="Contoh: Jl. Kaliurang KM 5, Gang Melati No. 12 (Pagar Hitam)" required></textarea></div>
                      <div class="form-row">
                        <div class="form-group"><label class="form-label">Email</label><input type="email" id="f-email" class="form-input" placeholder="email@anda.com" required></div>
                        <div class="form-group"><label class="form-label">WhatsApp Aktif</label><input type="tel" id="f-wa" class="form-input" placeholder="0812..." required></div>
                      </div>
                      <div class="form-group"><label class="form-label">Instagram (Untuk Validasi)</label><input type="text" id="f-ig" class="form-input" placeholder="@username" required></div>
                      <div class="form-group" style="margin-top: 1rem;">
                        <label class="form-label" style="color:#45f3ff;">Pilih Unit & Durasi</label>
                        <div class="service-scroll-box">${paketHTML}</div>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Layanan Tambahan (Add-ons)</label>
                        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:10px;">${addOnHTML}</div>
                      </div>
                      <button type="submit" class="btn btn-white w-full" id="bookBtn" style="margin-top:1.5rem; padding:18px; font-weight:800; font-size: 1.1rem;">KONFIRMASI BOOKING</button>
                  </form>
                </div>
            </div>

            <div id="success-ui" style="display:none; text-align:center; padding: 1rem 0;">
                <div style="max-width: 450px; margin: 0 auto; background: #000; border: 1px solid #45f3ff; border-radius: 12px; padding: 2rem; box-shadow: 0 0 30px rgba(69, 243, 255, 0.2);">
                    <div style="font-size: 3.5rem; margin-bottom: 10px; color: #45f3ff;"><i class='bx bx-check-circle'></i></div>
                    <h2 style="margin:0; font-size:1.5rem; font-weight:900; color:#fff; font-family: 'Orbitron', sans-serif;">BOOKING BERHASIL!</h2>
                    <p style="margin:10px 0 20px; color:#aaa; font-size:0.85rem; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 15px;">Simpan ID Reservasi di bawah ini untuk melacak status pengantaran unit Anda.</p>
                    <div style="text-align:left; font-size:0.9rem; color:#fff; line-height:1.6;">
                        <p style="margin-bottom: 5px;"><strong>ID Booking :</strong> <span id="r-id" style="color: #45f3ff; font-weight: bold; font-family: 'Orbitron', sans-serif;"></span></p>
                        <p style="margin-bottom: 5px;"><strong>Nama :</strong> <span id="r-name"></span></p>
                        <p style="margin-bottom: 15px;"><strong>Jadwal Kirim :</strong> <span id="r-datetime"></span></p>
                        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                          <div style="color: #45f3ff; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 5px;">Unit Disewa:</div><div id="r-paket" style="margin-bottom: 10px;"></div>
                          <div style="color: #45f3ff; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 5px;">Tambahan:</div><div id="r-addons"></div>
                        </div>
                        <div style="margin-top:15px; padding-top:15px; font-size:1.2rem; font-weight:bold; text-align:center; border-top: 1px dashed rgba(255,255,255,0.2);">
                          Total: <span id="r-total" style="color: #45f3ff; font-family: 'Orbitron', sans-serif;"></span>
                        </div>
                    </div>
                </div>
                <a id="wa-link" href="#" target="_blank" class="btn btn-white" style="background:#25D366; color:#fff; box-shadow: none; border: none; width:100%; max-width:300px; margin-top:20px; display:inline-flex; align-items:center; justify-content:center; padding:15px; font-weight:bold; text-decoration:none;"><i class='bx bxl-whatsapp' style="font-size: 1.2rem;"></i> Kirim Struk ke WA Admin</a>
                <button onclick="location.reload()" class="btn btn-outline" style="margin: 20px auto; display:block;">Sewa Unit Lain</button>
            </div>

            <!-- TRACKING SEBAGAI CARD WIDE -->
            <div class="track-premium-box" id="track-box-ui">
              <h3>Lacak Pengiriman Unit</h3>
              <div class="track-input-group">
                <input type="text" id="track-id" class="form-input" placeholder="Masukkan ID Booking...">
                <button onclick="window.BookingSection.trackBooking()" class="btn-lacak">CEK STATUS</button>
              </div>
              <div id="track-result"></div>
            </div>

          </div>
        </div>
      </section>
    `;
    initFormLogics();
  }

  function initFormLogics() {
    const dateInput = document.getElementById("f-date");
    const timeInput = document.getElementById("f-time");
    const bookBtn = document.getElementById("bookBtn");
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000;
    dateInput.min = (new Date(today - tzOffset)).toISOString().split('T')[0];

    async function updateAvailableTimes(selectedDate) {
      timeInput.innerHTML = '<option value="">⏳ Mengecek armada...</option>';
      try {
        const resp = await fetch(`${proxyURL}?action=check_date&date=${selectedDate}&t=${new Date().getTime()}`);
        const data = await resp.json();
        const booked = data.booked || [];
        const currentHour = new Date().getHours();
        let options = '<option value="">Pilih Jam Pengantaran</option>';
        let count = 0;
        for(let i=9; i<=20; i++) { 
          let start = (i < 10 ? '0'+i : i) + ':00';
          if (selectedDate === dateInput.min && i <= currentHour) continue; 
          if (booked.includes(start)) continue; 
          options += `<option value="${start}">${start} - ${(i+1)}:00</option>`;
          count++;
        }
        timeInput.innerHTML = count === 0 ? '<option value="">⚠️ Armada Antar Penuh</option>' : options;
      } catch(e) { timeInput.innerHTML = '<option value="">Error memuat jam</option>'; }
    }

    function calculateTotal() {
      let total = 0; let names = [];
      document.querySelectorAll('.calc-trigger:checked').forEach(el => {
        total += parseInt(el.getAttribute('data-price')) || 0;
        names.push(el.value);
      });
      document.getElementById("sum-paket").innerText = names.length > 0 ? names.join(" • ") : "Belum ada pilihan";
      document.getElementById("sum-price").innerText = total > 0 ? "Rp " + total.toLocaleString('id-ID') : "Rp 0";
    }

    dateInput.addEventListener('change', (e) => { document.getElementById("sum-date").innerText = e.target.value; updateAvailableTimes(e.target.value); });
    timeInput.addEventListener('change', (e) => { if(e.target.selectedIndex > 0) document.getElementById("sum-time").innerText = e.target.options[e.target.selectedIndex].text; });
    document.querySelectorAll('.calc-trigger').forEach(cb => cb.addEventListener('change', calculateTotal));

    document.getElementById("bookingForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const pkts = Array.from(document.querySelectorAll('input[name="f-paket"]:checked')).map(el => el.value);
      const ads = Array.from(document.querySelectorAll('input[name="f-addons"]:checked')).map(el => el.value);
      if(pkts.length === 0 && ads.length === 0) return alert("Pilih minimal satu konsol/durasi sewa!");

      const payload = {
        name: document.getElementById("f-name").value, 
        alamat: document.getElementById("f-alamat").value || "-",
        email: document.getElementById("f-email").value, 
        instagram: document.getElementById("f-ig").value || "-",
        whatsapp: document.getElementById("f-wa").value, 
        date: document.getElementById("f-date").value,
        time: document.getElementById("f-time").value, 
        paket: pkts, 
        addons: ads,
        totalPrice: document.getElementById("sum-price").innerText, 
        source: "Website Booking" // Otomatis diset dari web
      };

      bookBtn.innerHTML = 'SEDANG MEMPROSES...'; bookBtn.disabled = true;
      try {
        const resp = await fetch(proxyURL, { method: 'POST', body: JSON.stringify(payload) });
        const result = await resp.json();
        if (result.result === "success") { showReceipt(result.bookingId, payload); }
        else { throw new Error(); }
      } catch (err) { alert("Cek koneksi internet Anda!"); bookBtn.innerText = "KONFIRMASI BOOKING"; bookBtn.disabled = false; }
    });
  }

  async function trackBooking() {
      const id = document.getElementById("track-id").value.trim().toUpperCase();
      const resDiv = document.getElementById("track-result");
      if (!id) return;
      
      resDiv.style.display = "block"; 
      resDiv.innerHTML = `
        <div class="track-result-wrapper">
          <div class="track-result-card" style="text-align:center; padding: 2rem;">
            <span style="color:#45f3ff; font-weight:bold; letter-spacing:2px; font-size:0.9rem;">MENCARI DATA PENGIRIMAN...</span>
          </div>
        </div>
      `;
      
      try {
        const resp = await fetch(`${proxyURL}?id=${id}&t=${new Date().getTime()}`);
        const data = await resp.json();
        
        if (data.status === "Not Found") { 
            resDiv.innerHTML = `
              <div class="track-result-wrapper">
                <div class="track-result-card" style="border-left: 4px solid #ff4d4d; color:#ff4d4d; text-align:center;">
                  <span style="font-size: 2rem; display:block; margin-bottom:10px;"><i class='bx bx-x-circle'></i></span>
                  <strong>ID Reservasi Tidak Ditemukan</strong>
                </div>
              </div>`; 
        } else {
          let color = "#00ff88"; 
          const s = data.status.toLowerCase();
          
          if (s.includes("pending") || s.includes("belum") || s.includes("proses")) {
            color = "#ffcc00"; 
          } else if (s.includes("cancel") || s.includes("batal")) {
            color = "#ff4d4d"; 
          } else if (s.includes("di jalan") || s.includes("otw")) {
            color = "#45f3ff"; 
          }
          
          resDiv.innerHTML = `
            <div class="track-result-wrapper">
              <div class="track-result-card" style="border-left: 4px solid ${color};">
                <p style="margin:0; font-size:0.75rem; color:#888; text-transform:uppercase; letter-spacing:1px;">Status Pengiriman</p>
                <h4 style="margin:10px 0 15px; color:${color}; font-size:1.8rem; font-family:'Orbitron', sans-serif; font-weight:900;">${data.status.toUpperCase()}</h4>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
                  <p style="margin:0; font-size:0.95rem; color:#ccc;"><i class='bx bx-user'></i> <strong style="color:#fff;">${data.name}</strong></p>
                  <p style="margin:8px 0 0; font-size:0.9rem; color:#aaa; line-height:1.5;"><i class='bx bx-joystick'></i> ${data.paket.replace(/,\n/g, '<br>• ')}</p>
                </div>
              </div>
            </div>`;
        }
      } catch (e) { 
        resDiv.innerHTML = `
          <div class="track-result-wrapper">
            <div class="track-result-card" style="border-left: 4px solid #ff4d4d; text-align:center; color:#ff4d4d;">
              <i class='bx bx-error'></i> Error Koneksi Database
            </div>
          </div>`; 
      }
    }

  function selectPackage(label) {
    const cleanLabel = label.split(" (")[0]; 
    const checkboxes = Array.from(document.querySelectorAll('input[name="f-paket"]'));
    const cb = checkboxes.find(el => el.value.includes(cleanLabel));
    
    if(cb) { cb.checked = true; cb.dispatchEvent(new Event('change')); }
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }

  return { render, trackBooking, selectPackage };
})();


// ─── 4. CTA SECTION (GAMING STYLE) ───────────────────────────────────────────
window.CTASection = (() => {
  function render() {
    const root = document.getElementById("cta-root");
    if (!root) return;
    root.innerHTML = `
    <style>
      .cta-wrapper-gaming {
        position: relative;
        text-align: center;
        padding: 6rem 2rem;
        border-radius: 20px;
        border: 1px solid rgba(69, 243, 255, 0.2);
        background: #0b0c10;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      }
      .cta-wrapper-gaming::before {
        content: ""; position: absolute; inset: 0;
        background: radial-gradient(circle at center, rgba(69, 243, 255, 0.15) 0%, transparent 60%);
        pointer-events: none;
      }
      .cta-headline-gaming {
        font-family: 'Orbitron', sans-serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        color: #fff;
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        position: relative;
        z-index: 2;
      }
      .cta-sub-gaming {
        font-size: 1.1rem;
        color: #aaa;
        max-width: 600px;
        margin: 0 auto 3rem;
        line-height: 1.6;
        position: relative;
        z-index: 2;
      }
    </style>
    <section class="cta-section section-gap">
      <div class="container">
        <div class="cta-wrapper-gaming">
          <h2 class="cta-headline-gaming">SIAP UNTUK MABAR AKHIR PEKAN INI?</h2>
          <p class="cta-sub-gaming">Sewa PlayStation sekarang! Bebas pilih durasi, konsol terawat, dan langsung kami antar ke depan rumah Anda.</p>
          <a href="https://wa.me/6285162627409" class="btn btn-white" target="_blank" style="position: relative; z-index: 2; font-size: 1.1rem; padding: 15px 30px;"><i class='bx bxl-whatsapp' style="font-size: 1.3rem;"></i> HUBUNGI ADMIN WA</a>
        </div>
      </div>
    </section>`;
  }
  return { render };
})();