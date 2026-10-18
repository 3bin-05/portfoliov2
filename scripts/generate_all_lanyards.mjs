import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const width = 384;
const height = 1344; // 384 * 3.5, exact multiple of 24 and 8. Displays 2-3 logos along the hanging ribbon with equal spacing.

// SVG Base templates with realistic woven ribbon texture and stitched seams
// height (1344) is an exact multiple of 24 (dasharray 14+10 = 56 repeats) and 8 (weave = 168 repeats), ensuring seamless tiling
const offwhiteSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="weaveLight" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 4 L8 4 M4 0 L4 8" stroke="#dfdbd2" stroke-width="0.9"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="#f3f1ec"/>
  <rect width="${width}" height="${height}" fill="url(#weaveLight)" opacity="0.6"/>
  <line x1="22" y1="0" x2="22" y2="${height}" stroke="#c6c2b8" stroke-width="3" stroke-dasharray="14,10"/>
  <line x1="${width - 22}" y1="0" x2="${width - 22}" y2="${height}" stroke="#c6c2b8" stroke-width="3" stroke-dasharray="14,10"/>
</svg>`;

const darkSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="weaveDark" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 4 L8 4 M4 0 L4 8" stroke="#1f2126" stroke-width="0.9"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="#101114"/>
  <rect width="${width}" height="${height}" fill="url(#weaveDark)" opacity="0.5"/>
  <line x1="22" y1="0" x2="22" y2="${height}" stroke="#282a30" stroke-width="3" stroke-dasharray="14,10"/>
  <line x1="${width - 22}" y1="0" x2="${width - 22}" y2="${height}" stroke="#282a30" stroke-width="3" stroke-dasharray="14,10"/>
</svg>`;

// Helper to make dark text white on colorful logos (TinkerHub, KSUM)
function turnDarkTextWhite(rawBuffer, width, height) {
  const buf = Buffer.from(rawBuffer);
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i+1], b = buf[i+2], a = buf[i+3];
    if (a > 30) {
      // Near-grayscale dark text pixels
      if (Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r < 100) {
        buf[i] = 255;
        buf[i+1] = 255;
        buf[i+2] = 255;
      }
    }
  }
  return buf;
}

// Helper for Purple Movement logo (turn white text dark for offwhite strap)
function turnWhiteTextDark(rawBuffer, width, height) {
  const buf = Buffer.from(rawBuffer);
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i+1], b = buf[i+2], a = buf[i+3];
    if (a > 30) {
      // Near-grayscale white text pixels
      if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 180) {
        buf[i] = 24;
        buf[i+1] = 24;
        buf[i+2] = 28;
      }
    }
  }
  return buf;
}

async function makeStrapTile({
  logoInput,
  targetWidth = 118,
  mode = 'invert', // 'invert' | 'tinkerhub' | 'ksum' | 'purple' | 'keep'
  idName,
  repeatCount = 1
}) {
  if (!fs.existsSync(logoInput)) {
    console.error('File not found:', logoInput);
    return;
  }

  const trimmed = await sharp(logoInput).trim().toBuffer({ resolveWithObject: true });
  
  // Rotate 90 degrees clockwise so text and emblem run lengthwise along ribbon
  let rotatedBufferLight;
  let rotatedBufferDark;

  if (mode === 'tinkerhub') {
    // Light strap: original colorful logo with black text
    rotatedBufferLight = await sharp(trimmed.data)
      .rotate(90)
      .resize({ width: targetWidth })
      .png()
      .toBuffer();
    
    // Dark strap: colorful blocks preserved, black text converted to white
    const rotMeta = await sharp(rotatedBufferLight).metadata();
    const rawLight = await sharp(rotatedBufferLight).raw().toBuffer();
    const rawDark = turnDarkTextWhite(rawLight, rotMeta.width, rotMeta.height);
    rotatedBufferDark = await sharp(rawDark, {
      raw: { width: rotMeta.width, height: rotMeta.height, channels: 4 }
    }).png().toBuffer();

  } else if (mode === 'ksum') {
    // Light strap: colorful isometric squares with dark text
    rotatedBufferLight = await sharp(trimmed.data)
      .rotate(90)
      .resize({ width: targetWidth })
      .png()
      .toBuffer();

    // Dark strap: colorful squares preserved, dark text converted to white
    const rotMeta = await sharp(rotatedBufferLight).metadata();
    const rawLight = await sharp(rotatedBufferLight).raw().toBuffer();
    const rawDark = turnDarkTextWhite(rawLight, rotMeta.width, rotMeta.height);
    rotatedBufferDark = await sharp(rawDark, {
      raw: { width: rotMeta.width, height: rotMeta.height, channels: 4 }
    }).png().toBuffer();

  } else if (mode === 'purple') {
    // Original logo has white text + purple emblem
    const baseRotated = await sharp(trimmed.data)
      .rotate(90)
      .resize({ width: targetWidth })
      .png()
      .toBuffer();
    const rotMeta = await sharp(baseRotated).metadata();
    const rawBase = await sharp(baseRotated).raw().toBuffer();

    // Light strap: purple emblem + dark charcoal text
    const rawLight = turnWhiteTextDark(rawBase, rotMeta.width, rotMeta.height);
    rotatedBufferLight = await sharp(rawLight, {
      raw: { width: rotMeta.width, height: rotMeta.height, channels: 4 }
    }).png().toBuffer();

    // Dark strap: purple emblem + white text
    rotatedBufferDark = baseRotated;

  } else if (mode === 'invert') {
    // Light strap: original dark logo
    rotatedBufferLight = await sharp(trimmed.data)
      .rotate(90)
      .resize({ width: targetWidth })
      .png()
      .toBuffer();

    // Dark strap: inverted to crisp white
    rotatedBufferDark = await sharp(rotatedBufferLight)
      .negate({ alpha: false })
      .png()
      .toBuffer();

  } else {
    // keep as is
    rotatedBufferLight = await sharp(trimmed.data)
      .rotate(90)
      .resize({ width: targetWidth })
      .png()
      .toBuffer();
    rotatedBufferDark = rotatedBufferLight;
  }

  const meta = await sharp(rotatedBufferLight).metadata();
  const left = Math.round((width - meta.width) / 2);
  const compositesLight = [];
  const compositesDark = [];

  if (repeatCount === 1) {
    const top = Math.round((height - meta.height) / 2);
    compositesLight.push({ input: rotatedBufferLight, left, top });
    compositesDark.push({ input: rotatedBufferDark, left, top });
    console.log(`[${idName}] logo height: ${meta.height}px, distance to next repeat: ${height - meta.height}px`);
  } else {
    const spacing = Math.round(height / repeatCount);
    for (let r = 0; r < repeatCount; r++) {
      const top = Math.round(r * spacing + (spacing - meta.height) / 2);
      compositesLight.push({ input: rotatedBufferLight, left, top });
      compositesDark.push({ input: rotatedBufferDark, left, top });
    }
    const gap = spacing - meta.height;
    console.log(`[${idName}] (${repeatCount} repeats) logo height: ${meta.height}px, distance between: ${gap}px`);
  }

  // Generate Offwhite strap (both webp and png)
  const offwhiteBuffer = await sharp(Buffer.from(offwhiteSvg))
    .composite(compositesLight)
    .webp({ quality: 95, effort: 6 })
    .toBuffer();
  await sharp(offwhiteBuffer).toFile(`public/badges/lanyard-${idName}-offwhite.webp`);

  // Generate Dark strap (both webp and png)
  const darkBuffer = await sharp(Buffer.from(darkSvg))
    .composite(compositesDark)
    .webp({ quality: 95, effort: 6 })
    .toBuffer();
  await sharp(darkBuffer).toFile(`public/badges/lanyard-${idName}-dark.webp`);

  // Also update standard lanyard-strap fallbacks if mulearn
  if (idName === 'mulearn') {
    await sharp(offwhiteBuffer).toFile('public/badges/lanyard-strap-offwhite.webp');
    await sharp(darkBuffer).toFile('public/badges/lanyard-strap.webp');
  }

  console.log(`✓ Generated lanyard-${idName} (offwhite & dark) successfully!`);
}

async function run() {
  console.log(`Generating high-resolution, properly distanced lanyard straps (384x${height})...`);

  // 1. IEEE SB SBCE (main card)
  await makeStrapTile({
    logoInput: 'public/Id/ieee_sb_sbce_logo.webp',
    targetWidth: 150,
    mode: 'invert',
    idName: 'ieee',
    repeatCount: 1
  });

  // 2. MuLearn SBC
  await makeStrapTile({
    logoInput: 'public/Id/mulearn_sbc_logo.webp',
    targetWidth: 150,
    mode: 'invert',
    idName: 'mulearn',
    repeatCount: 1
  });

  // 3. MuLearn Foundation
  await makeStrapTile({
    logoInput: 'public/Id/mulearnfoundation.webp',
    targetWidth: 150,
    mode: 'invert',
    idName: 'mulearn-foundation',
    repeatCount: 1
  });

  // 4. The Purple Movement
  await makeStrapTile({
    logoInput: 'public/Id/purple.webp',
    targetWidth: 145,
    mode: 'purple',
    idName: 'purple',
    repeatCount: 1
  });

  // 5. IEEE EMBS Pune Intern (Ieeelogo)
  await makeStrapTile({
    logoInput: 'public/Id/Ieeelogo.webp',
    targetWidth: 150,
    mode: 'invert',
    idName: 'ieee-embs',
    repeatCount: 1
  });

  // 6. TinkerHub SBCE
  await makeStrapTile({
    logoInput: 'public/Id/tinkerhub_logo.webp',
    targetWidth: 145,
    mode: 'tinkerhub',
    idName: 'tinkerhub',
    repeatCount: 1
  });

  // 7. KSUM / Huddle Global
  await makeStrapTile({
    logoInput: 'public/Id/ksum_logo.webp',
    targetWidth: 150,
    mode: 'ksum',
    idName: 'ksum',
    repeatCount: 1
  });

  // 8. HackBells 3.0
  await makeStrapTile({
    logoInput: 'public/Id/hackbells_logo.webp',
    targetWidth: 155,
    mode: 'invert',
    idName: 'hackbells',
    repeatCount: 1
  });

  console.log('\nAll lanyard straps updated with proper distance, size, and alignment!');
}

run().catch(console.error);
