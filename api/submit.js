export default async function handler(req, res) {
    // --- 🛡️ 1. ANTI-CURL: CEK ASAL DOMAIN (ORIGIN/REFERER) ---
    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';
    // Ganti dengan domain asli kamu nanti pas udah rilis (misal: 'onetakestudio.vercel.app' atau 'domainkamu.com')
    const allowedDomain = 'localhost'; // SEMENTARA PAKAI LOCALHOST BUAT TES
  
    // Kalau asalnya bukan dari domain kamu, langsung tolak!
    if (!referer.includes(allowedDomain) && !origin.includes(allowedDomain)) {
      return res.status(403).json({ error: 'Akses Ditolak: Hanya bisa booking via Website Resmi.' });
    }
  
    // --- 🛡️ 2. ANTI-CURL: SECRET HANDSHAKE (CUSTOM HEADER) ---
    const secretKey = req.headers['x-onetake-sec'];
    // Password ini cuma Vercel dan kode JS kamu yang tahu
    if (secretKey !== 'OT-GACOR-2026') {
      return res.status(403).json({ error: 'Akses Ditolak: Invalid Security Token.' });
    }
  
    // --- LOGIKA NORMAL KE GOOGLE SHEETS ---
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxi7D5wrbFqee4ImOejPK7QfjLOgINyxW8shusNVWUQXKEg_E8orzvWXyF5Fg2JM42TMQ/exec';
  
    try {
      if (req.method === 'POST') {
        const response = await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
        });
        return res.status(200).json(await response.json());
  
      } else if (req.method === 'GET') {
        const queryString = new URLSearchParams(req.query).toString();
        const response = await fetch(`${GOOGLE_SHEET_URL}?${queryString}`);
        return res.status(200).json(await response.json());
  
      } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Server Error' });
    }
  }