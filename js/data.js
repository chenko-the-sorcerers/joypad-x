/**
 * JOYPAD X JOGJA - data.js
 * Master Data Configuration
 */

window.SiteData = {
  brand: {
    name: "JoyPad X Jogja",
    tagline: "JoyPad X", 
    subTagline: "Sewa PlayStation 3 & 4 Harian. Antar Sampai Rumah.",
    location: "Yogyakarta",
    locationShort: "Yogyakarta",
    mapsUrl: "https://maps.app.goo.gl/yvjQsWye3cEDie6W7",
    instagram: "https://instagram.com/sewaps.joypadx.jogja",
    tiktok: "#",
    whatsapp: {
      phone: "6285162627409", // Nomor WA Utama 1
      messageTemplate: "Halo JoyPad X Jogja, saya ingin menyewa {service} pada tanggal {date}. Mohon info ketersediaan unitnya ya. Alamat pengantaran: "
    },
    operationalHours: "09.00 – 20.59 WIB"
  },

  nav: {
    links: [
      { label: "Unit", href: "#services" },
      { label: "Harga Sewa", href: "#pricing" },
      { label: "Pelanggan", href: "#portfolio" },
      { label: "Lokasi", href: "#location" },
      { label: "Booking", href: "#booking" }
    ]
  },

  hero: {
    headline: ["JoyPad X", "Jogja"], 
    subheadline: "Penyewaan PlayStation harian di Yogyakarta. Pesan, santai, dan kami antar langsung unitnya ke rumah Anda!",
    badge: "Level Up Your Weekend",
    cta: [
      { label: "Booking Sekarang", href: "#booking", primary: true },
      { label: "Lihat Harga", href: "#pricing", primary: false }
    ],
    stats: [
      { num: "2", label: "Pilihan Konsol" },
      { num: "100%", label: "Layanan Antar" },
      { num: "20+", label: "Games Hits" }
    ]
  },

  services: [
    {
      id: "ps3-reguler",
      name: "PlayStation 3",
      desc: "Konsol legendaris dengan ratusan game seru",
      icon: "<i class='bx bx-joystick'></i>",
      tag: "Hemat",
      anchor: "pricing-ps3"
    },
    {
      id: "ps3-tv",
      name: "PS 3 + TV LED 32\"",
      desc: "Paket lengkap tinggal main",
      icon: "<i class='bx bx-desktop'></i>",
      tag: null,
      anchor: "pricing-ps3-tv"
    },
    {
      id: "ps4-reguler",
      name: "PlayStation 4",
      desc: "Grafik mantap, pengalaman gaming maksimal",
      icon: "<i class='bx bxs-joystick'></i>",
      tag: "Popular",
      anchor: "pricing-ps4"
    },
    {
      id: "ps4-tv",
      name: "PS 4 + TV LED 32\"",
      desc: "Sensasi gaming layar lebar di rumah",
      icon: "<i class='bx bxs-tv'></i>",
      tag: "Best Value",
      anchor: "pricing-ps4-tv"
    },
    {
      id: "sewa-tv",
      name: "Hanya TV LED 32\"",
      desc: "Sewa TV tambahan untuk nonton / ngegame",
      icon: "<i class='bx bx-tv'></i>",
      tag: null,
      anchor: "pricing-tv"
    }
  ],

  whyUs: [
    { title: "Antar ke Rumah", desc: "Tidak perlu repot keluar, unit kami antar jemput sampai depan pintu Anda.", icon: "<i class='bx bx-car'></i>" },
    { title: "Unit Terawat", desc: "Konsol dan stik selalu dibersihkan dan dicek sebelum disewakan.", icon: "<i class='bx bx-check-shield'></i>" },
    { title: "Game Terupdate", desc: "Pilihan game PES, FIFA, GTA V, dan game populer lainnya siap main.", icon: "<i class='bx bx-game'></i>" },
    { title: "Harga Terjangkau", desc: "Mulai dari 40 ribuan, Anda sudah bisa seru-seruan di rumah.", icon: "<i class='bx bx-wallet'></i>" }
  ],

  // Bisa diisi ID Reel/Post IG JoyPad X Jogja nantinya (ini format dummy dari template)
  featuredPosts: [
    { id: "DVIaTKTExj_", url: "https://www.instagram.com/p/DMLdft3hCxS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", type: "post" },
    { id: "DUQam4Zk0wZ", url: "https://www.instagram.com/p/DMLc-zCBt5D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", type: "post" },
    { id: "DTiDo-xE8CB", url: "https://www.instagram.com/reel/DPdePnqCTyU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", type: "reel" },
  ],

  pricing: [
    {
      id: "pricing-ps3",
      name: "PlayStation 3",
      icon: "<i class='bx bx-joystick'></i>",
      desc: "Konsol Reguler (Tanpa TV)",
      sections: [
        {
          title: "Harga Sewa Harian",
          items: [
            { label: "1 Hari", price: "Rp 40.000" },
            { label: "2 Hari", price: "Rp 70.000", badge: "Lebih Hemat" },
            { label: "3 Hari", price: "Rp 110.000" },
            { label: "7 Hari", price: "Rp 240.000", badge: "Best Deal" }
          ]
        }
      ],
      includes: [
        "1 Unit Konsol PS 3",
        "2 Buah Stik Wireless",
        "Kabel Power, HDMI, dan Kabel Cas Stik",
        "Puluhan Game Digital (PES, GTA V, dll)",
        "Layanan Antar Jemput"
      ],
      promo: "🎮 Cek List Game PS3 disini: bit.ly/4gw0idL"
    },
    {
      id: "pricing-ps3-tv",
      name: "PS 3 + TV 32\"",
      icon: "<i class='bx bx-desktop'></i>",
      desc: "Paket Komplit (Konsol + TV)",
      sections: [
        {
          title: "Harga Sewa Bundling",
          items: [
            { label: "1 Hari", price: "Rp 75.000" },
            { label: "2 Hari", price: "Rp 140.000" },
            { label: "3 Hari", price: "Rp 220.000" },
            { label: "7 Hari", price: "Rp 500.000" }
          ]
        }
      ],
      includes: [
        "1 Unit Konsol PS 3 + 2 Stik",
        "1 Unit TV LED 32 Inch",
        "Kabel Power, HDMI, dan Kabel Cas Stik",
        "Tinggal Colok & Main",
        "Layanan Antar Jemput"
      ]
    },
    {
      id: "pricing-ps4",
      name: "PlayStation 4",
      icon: "<i class='bx bxs-joystick'></i>",
      desc: "Konsol Reguler (Tanpa TV)",
      sections: [
        {
          title: "Harga Sewa Paket",
          items: [
            { label: "12 Jam", price: "Rp 50.000" },
            { label: "1 Hari", price: "Rp 70.000" },
            { label: "2 Hari", price: "Rp 130.000", badge: "Lebih Hemat" },
            { label: "4 Hari", price: "Rp 240.000", badge: "Best Deal" }
          ]
        }
      ],
      includes: [
        "1 Unit Konsol PS 4",
        "2 Buah Stik Wireless DualShock 4",
        "Kabel Power, HDMI, dan Kabel Cas Stik",
        "Game Populer Ter-install",
        "Layanan Antar Jemput"
      ],
      promo: "🎮 Cek List Game PS4 disini: bit.ly/4gw0idL"
    },
    {
      id: "pricing-ps4-tv",
      name: "PS 4 + TV 32\"",
      icon: "<i class='bx bxs-tv'></i>",
      desc: "Paket Komplit (Konsol + TV)",
      sections: [
        {
          title: "Harga Sewa Bundling",
          items: [
            { label: "12 Jam", price: "Rp 85.000" },
            { label: "1 Hari", price: "Rp 105.000" },
            { label: "2 Hari", price: "Rp 200.000" },
            { label: "4 Hari", price: "Rp 400.000" }
          ]
        }
      ],
      includes: [
        "1 Unit Konsol PS 4 + 2 Stik DS4",
        "1 Unit TV LED 32 Inch",
        "Kabel Power, HDMI, dan Kabel Cas Stik",
        "Tinggal Colok & Main",
        "Layanan Antar Jemput"
      ]
    },
    {
      id: "pricing-tv",
      name: "TV LED 32 Inch",
      icon: "<i class='bx bx-tv'></i>",
      desc: "Sewa Layar Tambahan",
      sections: [
        {
          title: "Harga Sewa TV Saja",
          items: [
            { label: "1 Hari", price: "Rp 40.000" }
          ]
        }
      ],
      includes: [
        "1 Unit TV LED 32 Inch",
        "Kabel Power",
        "Remote TV"
      ]
    }
  ],

  booking: {
    serviceOptions: [
      "PlayStation 3 (Konsol Saja)",
      "PlayStation 3 + TV 32 Inch",
      "PlayStation 4 (Konsol Saja)",
      "PlayStation 4 + TV 32 Inch",
      "Hanya TV LED 32 Inch"
    ]
  },

  footer: {
    socials: [
      { name: "Instagram", icon: "instagram", url: "https://instagram.com/sewaps.joypadx.jogja" },
      { name: "WhatsApp Admin 1", icon: "whatsapp", url: "https://wa.me/6285162627409" },
      { name: "WhatsApp Admin 2", icon: "whatsapp", url: "https://wa.me/6285701555610" }
    ],
    links: [
      { label: "Unit Layanan", href: "#services" },
      { label: "Pricelist", href: "#pricing" },
      { label: "List Games", href: "https://bit.ly/4gw0idL" },
      { label: "Lokasi Maps", href: "https://maps.app.goo.gl/yvjQsWye3cEDie6W7" },
      { label: "Booking Sekarang", href: "#booking" }
    ]
  }
};
