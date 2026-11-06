# Congklak · Dakon Sembilan — paket deploy

Situs statis siap pakai untuk **Cloudflare Pages** di `https://congklak.dafenka.com`.

## Isi paket
- `index.html` — seluruh game (satu file).
- `manifest.webmanifest`, `icons/`, `favicon.ico` — bisa dipasang ke layar utama (PWA), di Android tampil layar penuh landscape.
- `sw.js` — service worker: HTML selalu dicek ke jaringan dulu, aset di-cache sehingga game bisa dimainkan offline setelah kunjungan pertama.
- `_headers` — header keamanan dan aturan cache untuk Cloudflare Pages.
- `og-image.png` — gambar pratinjau saat tautan dibagikan.
- `robots.txt`, `sitemap.xml`, `404.html`.

## Cara 1 — lewat dashboard (paling mudah)
1. Buka dash.cloudflare.com, lalu **Workers & Pages → Create → Pages → Upload assets**.
2. Beri nama proyek, misalnya `congklak`, lalu unggah **file zip ini** (atau isi foldernya). Klik **Deploy site**.
3. Setelah selesai, buka proyeknya → tab **Custom domains → Set up a custom domain** → isi `congklak.dafenka.com` → **Continue → Activate domain**.
   - Jika `dafenka.com` dikelola di akun Cloudflare yang sama, record DNS dibuat otomatis.
   - Jika DNS-nya di tempat lain, tambahkan record `CNAME congklak → <nama-proyek>.pages.dev`.
4. Tunggu status sertifikat SSL menjadi **Active** (biasanya beberapa menit), lalu buka `https://congklak.dafenka.com`.

## Cara 2 — lewat Wrangler (CLI)
```
npx wrangler login
npx wrangler pages project create congklak --production-branch=main
npx wrangler pages deploy . --project-name=congklak --branch=main
```
Jalankan perintah deploy dari dalam folder hasil ekstrak zip ini, lalu pasang custom domain seperti langkah 3 di atas.

## Merilis versi baru
Unggah ulang ke proyek yang sama. HTML diambil dari jaringan lebih dulu, jadi pengunjung langsung mendapat versi baru.
Jika ada aset lain yang berubah (ikon, gambar), naikkan nama cache di `sw.js` (misalnya `congklak-v2`).

## Catatan
- three.js r160 dimuat dari jsDelivr dan font Gaegu dari Google Fonts.
- Rekor, lencana, pengaturan, dan simpanan permainan tersimpan di localStorage perangkat masing-masing pemain.

## Aset biner di repo ini
`favicon.ico`, ikon di `icons/`, dan `og-image.png` tidak disimpan sebagai biner di repo ini, melainkan base64 di folder `assets-src/` — jalur unggah yang dipakai untuk mengisi repo hanya menerima berkas teks. Setelah mengkloning, kembalikan berkas aslinya sekali dengan `node scripts/restore-assets.mjs`. Situs yang live menyajikan berkas asli; penyimpanan base64 ini hanya soal repo.
