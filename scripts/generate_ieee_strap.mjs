import sharp from 'sharp';
import fs from 'fs';

async function generateIeeeStrap() {
  const logoPath = 'public/Id/ieee_logo.png';
  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found:', logoPath);
    return;
  }

  // 1. Trim transparency
  const trimmed = await sharp(logoPath).trim().toBuffer({ resolveWithObject: true });
  console.log('Trimmed IEEE logo:', trimmed.info.width, 'x', trimmed.info.height);

  // High-res ribbon tile: width = 384px across, height = 920px along ribbon
  const width = 384;
  const height = 920;

  // Rotate logo 90 degrees so it runs lengthwise down the lanyard ribbon
  // Scaled to width = 155px across ribbon, giving height = 155 * (1243 / 239) = ~806px along ribbon
  const logoRotatedDark = await sharp(trimmed.data)
    .rotate(90)
    .resize({ width: 155 })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoRotatedDark).metadata();
  console.log('Rotated IEEE logo dimensions:', logoMeta.width, 'x', logoMeta.height);

  // White inverted version for dark strap
  const logoRotatedWhite = await sharp(logoRotatedDark)
    .negate({ alpha: false })
    .png()
    .toBuffer();

  // SVG Base for Off-white strap (#f3f1ec)
  const offwhiteSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="weaveLight" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4 L8 4 M4 0 L4 8" stroke="#dfdbd2" stroke-width="0.9"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="#f3f1ec"/>
    <rect width="${width}" height="${height}" fill="url(#weaveLight)" opacity="0.6"/>
    <!-- Edge stitched seams -->
    <line x1="22" y1="0" x2="22" y2="${height}" stroke="#c6c2b8" stroke-width="3" stroke-dasharray="14,10"/>
    <line x1="${width - 22}" y1="0" x2="${width - 22}" y2="${height}" stroke="#c6c2b8" stroke-width="3" stroke-dasharray="14,10"/>
  </svg>`;

  // SVG Base for Dark strap (#101114)
  const darkSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="weaveDark" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4 L8 4 M4 0 L4 8" stroke="#1f2126" stroke-width="0.9"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="#101114"/>
    <rect width="${width}" height="${height}" fill="url(#weaveDark)" opacity="0.5"/>
    <!-- Edge stitched seams -->
    <line x1="22" y1="0" x2="22" y2="${height}" stroke="#282a30" stroke-width="3" stroke-dasharray="14,10"/>
    <line x1="${width - 22}" y1="0" x2="${width - 22}" y2="${height}" stroke="#282a30" stroke-width="3" stroke-dasharray="14,10"/>
  </svg>`;

  const topOffset = Math.round((height - logoMeta.height) / 2);
  const leftOffset = Math.round((width - logoMeta.width) / 2);

  // Composite Offwhite IEEE Lanyard
  const offwhiteStrap = await sharp(Buffer.from(offwhiteSvg))
    .composite([
      { input: logoRotatedDark, left: leftOffset, top: topOffset }
    ])
    .png()
    .toBuffer();

  await sharp(offwhiteStrap).toFile('public/badges/lanyard-ieee-offwhite.png');
  console.log('Saved lanyard-ieee-offwhite.png');

  // Composite Dark IEEE Lanyard
  const darkStrap = await sharp(Buffer.from(darkSvg))
    .composite([
      { input: logoRotatedWhite, left: leftOffset, top: topOffset }
    ])
    .png()
    .toBuffer();

  await sharp(darkStrap).toFile('public/badges/lanyard-ieee-dark.png');
  console.log('Saved lanyard-ieee-dark.png');
}

generateIeeeStrap().catch(console.error);
