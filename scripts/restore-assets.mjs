// favicon.ico, ikon di icons/, dan og-image.png disimpan base64 di assets-src/
// karena jalur unggah sumber yang dipakai untuk repo ini hanya menerima berkas
// teks. Jalankan skrip ini sekali setelah mengkloning repo untuk mengembalikan
// berkas aslinya ke tempatnya sebelum deploy:
//
//   node scripts/restore-assets.mjs
//
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const SRC = 'assets-src';
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

for (const file of walk(SRC).filter((f) => f.endsWith('.b64'))) {
  const target = relative(SRC, file).replace(/\.b64$/, '');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, Buffer.from(readFileSync(file, 'utf8'), 'base64'));
  console.log('restored', target);
}
