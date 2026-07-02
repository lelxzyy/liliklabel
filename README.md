# Lilik Label

Website Lilik Label menggunakan Vite React untuk frontend dan Express untuk API AI assistant.

## Menjalankan Lokal

1. Install dependencies:
   ```bash
   npm install
   ```
2. Buat `.env.local` dan isi API key:
   ```bash
   GROQ_API_KEY="isi_api_key_groq"
   GROQ_MODEL="llama-3.1-8b-instant"
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```

## Deploy Production

AI assistant membutuhkan server Node/Express. Jangan deploy hanya folder `dist` sebagai static site, karena endpoint `/api/ai-assistant` tidak akan tersedia.

Konfigurasi umum untuk hosting Node:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variable wajib: `GROQ_API_KEY`
- Environment variable opsional: `GROQ_MODEL`

Setelah deploy, cek endpoint ini:

```bash
curl https://liliklabel.web.id/api/health
```

Response yang benar:

```json
{"ok":true,"aiConfigured":true}
```

Jika `aiConfigured` bernilai `false`, berarti `GROQ_API_KEY` belum terpasang di environment server. Jika endpoint mengembalikan halaman HTML atau 404, berarti domain masih berjalan sebagai static hosting dan belum menjalankan `server.ts`.
