import { readdir, stat, mkdir, copyFile, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/lookbook');
const BACKUP = path.resolve('public/lookbook/_originals');
const MAX_EDGE = 2400;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;

await mkdir(BACKUP, { recursive: true });

const entries = await readdir(ROOT);
const files = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const src = path.join(ROOT, file);
  const backup = path.join(BACKUP, file);
  const tmp = path.join(ROOT, `.${file}.tmp`);

  if (existsSync(backup)) {
    // already processed in a prior run — skip
    const { size } = await stat(src);
    totalAfter += size;
    const { size: origSize } = await stat(backup);
    totalBefore += origSize;
    console.log(`skip  ${file}  (already compressed)`);
    continue;
  }

  await copyFile(src, backup);
  const { size: before } = await stat(src);
  totalBefore += before;

  const ext = path.extname(file).toLowerCase();
  const pipeline = sharp(backup, { failOn: 'none' }).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (ext === '.png') {
    await pipeline
      .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
      .toFile(tmp);
  } else {
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmp);
  }

  await rename(tmp, src);
  const { size: after } = await stat(src);
  totalAfter += after;

  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${file.padEnd(10)}  ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB  (-${pct}%)`,
  );
}

console.log('---');
console.log(`total: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
console.log(`saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
console.log(`originals backed up to ${path.relative(process.cwd(), BACKUP)}`);
