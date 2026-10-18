import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeIdCards() {
  console.log('--- Optimizing ID Cards ---');
  const cards = [
    { src: 'public/Id/ieee_id_card.png', dest: 'public/Id/ieee_id_card.webp', width: 960 },
    { src: 'public/Id/hackbells_card.png', dest: 'public/Id/hackbells_card.webp', width: 960 },
    { src: 'public/Id/tinkerhub_card.png', dest: 'public/Id/tinkerhub_card.webp', width: 960 },
    { src: 'public/Id/ksum_card.png', dest: 'public/Id/ksum_card.webp', width: 960 },
    { src: 'public/Id/mulearn_foundation_card.png', dest: 'public/Id/mulearn_foundation_card.webp', width: 960 },
    { src: 'public/Id/ieee_embs_card.png', dest: 'public/Id/ieee_embs_card.webp', width: 960 },
    { src: 'public/Id/purple_card.png', dest: 'public/Id/purple_card.webp', width: 960 },
    { src: 'public/Id/tcha.jpg', dest: 'public/Id/tcha.webp', width: 960 },
    { src: 'public/Id/tchb.jpg', dest: 'public/Id/tchb.webp', width: 960 },
    { src: 'public/badges/badge-back.png', dest: 'public/badges/badge-back.webp', width: 960 },
  ];

  for (const c of cards) {
    if (!fs.existsSync(c.src)) {
      console.warn('Source not found:', c.src);
      continue;
    }
    const origSize = fs.statSync(c.src).size;
    await sharp(c.src)
      .resize({ width: c.width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 })
      .toFile(c.dest);
    const optSize = fs.statSync(c.dest).size;
    console.log(
      `✓ ${c.src} (${(origSize / 1024).toFixed(1)} KB) -> ${c.dest} (${(optSize / 1024).toFixed(1)} KB) [${Math.round((1 - optSize / origSize) * 100)}% reduction]`
    );
  }
}

async function optimizeLanyards() {
  console.log('\n--- Generating WebP Lanyard Straps ---');
  const strapFiles = fs.readdirSync('public/badges').filter(f => f.startsWith('lanyard-') && f.endsWith('.png'));
  for (const file of strapFiles) {
    const src = path.join('public/badges', file);
    const dest = path.join('public/badges', file.replace('.png', '.webp'));
    const origSize = fs.statSync(src).size;
    await sharp(src)
      .webp({ quality: 88, effort: 6 })
      .toFile(dest);
    const optSize = fs.statSync(dest).size;
    console.log(
      `✓ ${src} (${(origSize / 1024).toFixed(1)} KB) -> ${dest} (${(optSize / 1024).toFixed(1)} KB) [${Math.round((1 - optSize / origSize) * 100)}% reduction]`
    );
  }
}

async function optimizeProjectAssets() {
  console.log('\n--- Optimizing Project Assets ---');
  // talentpilot
  if (fs.existsSync('src/assets/talentpilot.webp')) {
    const origSize = fs.statSync('src/assets/talentpilot.webp').size;
    await sharp('src/assets/talentpilot.webp')
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 84, effort: 6 })
      .toFile('src/assets/talentpilot_opt.webp');
    fs.renameSync('src/assets/talentpilot_opt.webp', 'src/assets/talentpilot.webp');

    await sharp('src/assets/talentpilot.webp')
      .resize({ width: 800, withoutEnlargement: true })
      .avif({ quality: 70, effort: 6 })
      .toFile('src/assets/talentpilot_opt.avif');
    fs.renameSync('src/assets/talentpilot_opt.avif', 'src/assets/talentpilot.avif');
    const optSize = fs.statSync('src/assets/talentpilot.webp').size;
    console.log(`✓ talentpilot (${(origSize / 1024).toFixed(1)} KB) -> ${(optSize / 1024).toFixed(1)} KB`);
  }
}

async function run() {
  await optimizeIdCards();
  await optimizeLanyards();
  await optimizeProjectAssets();
  console.log('\nAll optimizations complete!');
}

run().catch(console.error);
