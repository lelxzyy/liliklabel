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

## Deploy di Vercel

AI assistant di Vercel berjalan lewat Serverless Function di folder `api/`. Frontend tetap memanggil endpoint yang sama: `/api/ai-assistant`.

Konfigurasi Vercel:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable wajib: `GROQ_API_KEY`
- Environment variable opsional: `GROQ_MODEL`

Setelah menambahkan atau mengubah environment variable di Vercel, redeploy production.

Setelah deploy, cek endpoint ini:

```bash
curl https://liliklabel.web.id/api/health
```

Response yang benar:

```json
{"ok":true,"aiConfigured":true,"platform":"vercel"}
```

Jika `aiConfigured` bernilai `false`, berarti `GROQ_API_KEY` belum terpasang di Environment Variables Vercel untuk deployment production. Jika endpoint mengembalikan 404, pastikan folder `api/` ikut ter-push ke repository dan deploy terbaru sudah berhasil.
