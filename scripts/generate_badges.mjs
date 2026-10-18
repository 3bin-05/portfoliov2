import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BADGES_DIR = 'public/badges';
if (!fs.existsSync(BADGES_DIR)) {
  fs.mkdirSync(BADGES_DIR, { recursive: true });
}

// Generate realistic QR code SVG
function generateQrSvg(size = 115) {
  const matrix = [
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1,1,0,0,1,0,1,1,0,1,1],
    [0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,0,0],
    [1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,0,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,1]
  ];
  const n = matrix.length;
  const cellSize = size / n;
  let rects = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === 1) {
        rects += `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="#121316"/>\n`;
      }
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#ffffff"/>
    ${rects}
  </svg>`;
}

// Generate strap pattern matching the reference image (bold centered atom emblem)
async function generateStrap() {
  const width = 192;
  const height = 480;
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 3 L6 3 M3 0 L3 6" stroke="#1f2126" stroke-width="0.8"/>
      </pattern>
    </defs>
    <!-- Dark fabric body -->
    <rect width="${width}" height="${height}" fill="#101114"/>
    <rect width="${width}" height="${height}" fill="url(#weave)" opacity="0.45"/>
    
    <!-- Edge stitched seams -->
    <line x1="12" y1="0" x2="12" y2="${height}" stroke="#282a30" stroke-width="2" stroke-dasharray="8,6"/>
    <line x1="${width - 12}" y1="0" x2="${width - 12}" y2="${height}" stroke="#282a30" stroke-width="2" stroke-dasharray="8,6"/>
    
    <!-- Clean white atomic / orbital loop emblem as in reference -->
    <g transform="translate(${width/2}, ${height * 0.42}) scale(1.65)">
      <!-- Central nucleus dot -->
      <circle cx="0" cy="0" r="3.2" fill="#ffffff"/>
      <!-- Orbit loop 1 -->
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#ffffff" stroke-width="2.6" transform="rotate(30)"/>
      <!-- Orbit loop 2 -->
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#ffffff" stroke-width="2.6" transform="rotate(-30)"/>
      <!-- Orbit loop 3 -->
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#ffffff" stroke-width="2.6" transform="rotate(90)"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(BADGES_DIR, 'lanyard-strap.png'));
  console.log('Generated lanyard-strap.png');
}

// Generate off-white strap pattern for dark mode
async function generateOffwhiteStrap() {
  const width = 192;
  const height = 480;
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="weaveLight" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 3 L6 3 M3 0 L3 6" stroke="#dedbd4" stroke-width="0.8"/>
      </pattern>
    </defs>
    <!-- Off-white fabric body -->
    <rect width="${width}" height="${height}" fill="#f3f1ec"/>
    <rect width="${width}" height="${height}" fill="url(#weaveLight)" opacity="0.6"/>
    
    <!-- Edge stitched seams -->
    <line x1="12" y1="0" x2="12" y2="${height}" stroke="#c6c2b8" stroke-width="2" stroke-dasharray="8,6"/>
    <line x1="${width - 12}" y1="0" x2="${width - 12}" y2="${height}" stroke="#c6c2b8" stroke-width="2" stroke-dasharray="8,6"/>
    
    <!-- Clean charcoal atomic / orbital loop emblem -->
    <g transform="translate(${width/2}, ${height * 0.42}) scale(1.65)">
      <circle cx="0" cy="0" r="3.2" fill="#181a1f"/>
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#181a1f" stroke-width="2.6" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#181a1f" stroke-width="2.6" transform="rotate(-30)"/>
      <ellipse cx="0" cy="0" rx="22" ry="7.5" fill="none" stroke="#181a1f" stroke-width="2.6" transform="rotate(90)"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(BADGES_DIR, 'lanyard-strap-offwhite.png'));
  console.log('Generated lanyard-strap-offwhite.png');
}

// Generate the cropped B&W portrait
async function generatePortrait() {
  const targetW = 540;
  const targetH = 590;

  const bgSvg = `<svg width="${targetW}" height="${targetH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="grad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#4a4e55"/>
        <stop offset="55%" stop-color="#2c2f34"/>
        <stop offset="100%" stop-color="#181a1d"/>
      </radialGradient>
    </defs>
    <rect width="${targetW}" height="${targetH}" fill="url(#grad)"/>
  </svg>`;
  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const person = await sharp('public/ebineb.webp')
    .extract({ left: 340, top: 15, width: 760, height: 830 })
    .resize(targetW, targetH, { fit: 'cover', position: 'top' })
    .grayscale()
    .modulate({ brightness: 1.05, contrast: 1.22 })
    .toBuffer();

  const portraitBuffer = await sharp(bgBuffer)
    .composite([{ input: person, blend: 'over' }])
    .png()
    .toBuffer();

  await sharp(portraitBuffer).toFile(path.join(BADGES_DIR, 'portrait_ebin.png'));
  console.log('Generated portrait_ebin.png');
  return portraitBuffer;
}

const BADGE_CONFIGS = [
  {
    id: 'ieee',
    orgName: 'IEEE',
    subLine1: 'STUDENT BRANCH',
    subLine2: 'SBCE',
    symbolType: 'ieee',
    role: 'Tech Team & UI/UX Designer',
    membership: 'IEEE STUDENT MEMBER',
    validity: '2025 - 2026',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'mulearn-foundation',
    orgName: 'µLEARN',
    subLine1: 'FOUNDATION',
    subLine2: 'GLOBAL COMMUNITY',
    symbolType: 'mulearn',
    role: 'UI/UX Core Team Member',
    membership: 'CORE TEAM MEMBER',
    validity: '2024 - PRESENT',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'mulearn-sbc',
    orgName: 'µLEARN',
    subLine1: 'SBC CHAPTER',
    subLine2: 'CAMPUS COMMUNITY',
    symbolType: 'mulearn',
    role: 'Technical Advisor & Former UI/UX IG Lead',
    membership: 'TECHNICAL ADVISOR',
    validity: '2024 - PRESENT',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'tinkerhub',
    orgName: 'TINKERHUB',
    subLine1: 'CAMPUS CHAPTER',
    subLine2: 'SBCE',
    symbolType: 'tinkerhub',
    role: 'Tech Team & UI/UX Designer',
    membership: 'CORE TEAM LEAD',
    validity: '2025',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'purple',
    orgName: 'THE PURPLE',
    subLine1: 'MOVEMENT INITIATIVE',
    subLine2: 'DESIGN & DEV',
    symbolType: 'purple',
    role: 'Designer & Developer',
    membership: 'CREATIVE FELLOW',
    validity: '2024 - 2025',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'ksum',
    orgName: 'KSUM x IEDC',
    subLine1: 'HUDDLE GLOBAL',
    subLine2: 'DEC 2025',
    symbolType: 'ksum',
    role: 'Event Volunteer & Coordinator',
    membership: 'DELEGATE / VOLUNTEER',
    validity: 'DEC 2025',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  },
  {
    id: 'sbce',
    orgName: 'HACKBELLS',
    subLine1: '3.0 HACKATHON',
    subLine2: 'SBCE',
    symbolType: 'sbce',
    role: 'Volunteer Coordinator',
    membership: 'ORGANIZING TEAM',
    validity: 'FEB 2026',
    accentColor: '#111215',
    watermarkColor: '#dcdfe5'
  }
];

function getSymbolSvg(type, color = '#111215', size = 36) {
  if (type === 'ieee') {
    return `<g transform="scale(${size/32})">
      <path d="M16 2 L29 16 L16 30 L3 16 Z" fill="none" stroke="${color}" stroke-width="2.6"/>
      <line x1="16" y1="5" x2="16" y2="27" stroke="${color}" stroke-width="2.2"/>
      <path d="M10 16 C10 11, 22 11, 22 16 C22 21, 10 21, 10 16" fill="none" stroke="${color}" stroke-width="2"/>
    </g>`;
  }
  if (type === 'mulearn') {
    return `<g transform="scale(${size/32})">
      <circle cx="16" cy="16" r="13" fill="none" stroke="${color}" stroke-width="2.6"/>
      <path d="M9 11 L9 20 C9 23, 14 23, 14 20 L14 11 L18 20 C18 23, 23 23, 23 20 L23 11" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>
    </g>`;
  }
  if (type === 'tinkerhub') {
    return `<g transform="scale(${size/32})">
      <rect x="5" y="5" width="22" height="22" rx="6" fill="none" stroke="${color}" stroke-width="2.6"/>
      <circle cx="16" cy="16" r="4.5" fill="${color}"/>
      <line x1="16" y1="4" x2="16" y2="9" stroke="${color}" stroke-width="2.2"/>
      <line x1="16" y1="23" x2="16" y2="28" stroke="${color}" stroke-width="2.2"/>
    </g>`;
  }
  if (type === 'purple') {
    return `<g transform="scale(${size/32})">
      <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="none" stroke="${color}" stroke-width="2.6"/>
      <circle cx="16" cy="16" r="5" fill="${color}"/>
    </g>`;
  }
  if (type === 'ksum') {
    return `<g transform="scale(${size/32})">
      <polygon points="16,4 28,26 4,26" fill="none" stroke="${color}" stroke-width="2.6"/>
      <circle cx="16" cy="18" r="3.5" fill="${color}"/>
    </g>`;
  }
  // sbce / hackbells
  return `<g transform="scale(${size/32})">
    <path d="M16 3 L19 12 L28 12 L21 18 L24 27 L16 22 L8 27 L11 18 L4 12 L13 12 Z" fill="none" stroke="${color}" stroke-width="2.4"/>
  </g>`;
}

function escapeXml(str) {
  return str ? String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}

async function generateBadgeFront(config, portraitBuffer) {
  const width = 1024;
  const height = 1440;
  const qrSvg = generateQrSvg(115);
  const symbolSvg = getSymbolSvg(config.symbolType, config.accentColor, 44);
  const watermarkSvg = getSymbolSvg(config.symbolType, config.watermarkColor, 140);

  const orgNameEsc = escapeXml(config.orgName);
  const subLine1Esc = escapeXml(config.subLine1);
  const subLine2Esc = escapeXml(config.subLine2);
  const roleEsc = escapeXml(config.role);
  const membershipEsc = escapeXml(config.membership);
  const validityEsc = escapeXml(config.validity);

  const svgOverlay = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="70%" stop-color="#fafbfe"/>
        <stop offset="100%" stop-color="#f2f4f8"/>
      </linearGradient>
    </defs>

    <!-- Card Base -->
    <rect width="${width}" height="${height}" fill="url(#cardBg)"/>

    <!-- Watermark emblem in upper left, soft and elegant as in reference -->
    <g transform="translate(130, 190)" opacity="0.45">
      ${watermarkSvg}
    </g>

    <!-- Header Organization Branding matching Reference Layout -->
    <!-- Centered Diamond Logo + Organization Text -->
    <g transform="translate(490, 240)">
      <!-- Logo icon -->
      <g transform="translate(-65, -26)">
        ${symbolSvg}
      </g>
      <!-- Title e.g. IEEE -->
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="${config.accentColor}" letter-spacing="0.04em">${orgNameEsc}</text>
      <!-- Subtitle line 1 e.g. STUDENT BRANCH -->
      <text x="2" y="26" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="14" font-weight="600" fill="#60646c" letter-spacing="0.22em">${subLine1Esc}</text>
      <!-- Subtitle line 2 e.g. SBCE -->
      <text x="2" y="44" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="14" font-weight="600" fill="#60646c" letter-spacing="0.22em">${subLine2Esc}</text>
    </g>

    <!-- Personal Identification Details below Portrait -->
    <!-- Name (Bold, clean, left-aligned with portrait at x=242) -->
    <text x="242" y="1055" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="900" fill="#121316" letter-spacing="0.03em">EBIN REJI</text>
    
    <!-- Designation / Role -->
    <text x="244" y="1092" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="500" fill="#4e525a" letter-spacing="0.01em">${roleEsc}</text>

    <!-- Bottom QR & Monospace Credentials Block -->
    <!-- Embed QR Code -->
    <g transform="translate(242, 1140)">
      ${qrSvg}
    </g>

    <!-- Monospace Membership text right beside QR -->
    <g transform="translate(390, 1190)">
      <text x="0" y="0" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="20" font-weight="700" fill="#202227" letter-spacing="0.1em">${membershipEsc}</text>
      <text x="0" y="30" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="18" font-weight="500" fill="#60646e" letter-spacing="0.14em">${validityEsc}</text>
    </g>

  </svg>`;

  const baseSvgBuffer = await sharp(Buffer.from(svgOverlay)).png().toBuffer();

  const resizedPortrait = await sharp(portraitBuffer)
    .resize(540, 590, { fit: 'cover' })
    .png()
    .toBuffer();

  // Composite portrait cleanly at (242, 385)
  await sharp(baseSvgBuffer)
    .composite([
      {
        input: resizedPortrait,
        top: 385,
        left: 242,
        blend: 'over'
      }
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(BADGES_DIR, `badge-${config.id}.png`));

  console.log(`Generated badge-${config.id}.png`);
}

async function generateBadgeBack() {
  const width = 1024;
  const height = 1440;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="backBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8f9fb"/>
        <stop offset="100%" stop-color="#eaedf2"/>
      </linearGradient>
      <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e0c3fc"/>
        <stop offset="25%" stop-color="#8ec5fc"/>
        <stop offset="50%" stop-color="#e0c3fc"/>
        <stop offset="75%" stop-color="#ffecd2"/>
        <stop offset="100%" stop-color="#fcb69f"/>
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#backBg)"/>
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="28" fill="none" stroke="#dbe0e8" stroke-width="1.5"/>

    <!-- Magnetic Strip across top -->
    <rect x="24" y="160" width="${width - 48}" height="140" fill="#1b1c20"/>

    <!-- Holographic security strip -->
    <rect x="100" y="350" width="824" height="60" rx="4" fill="url(#holo)" opacity="0.85"/>
    <text x="512" y="388" text-anchor="middle" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="16" font-weight="700" fill="#333740" letter-spacing="0.3em">★ OFFICIAL VERIFIED ACCESS CARD ★</text>

    <!-- Signature Strip -->
    <g transform="translate(100, 470)">
      <text x="0" y="-12" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="13" font-weight="600" fill="#757a85" letter-spacing="0.1em">AUTHORIZED SIGNATURE</text>
      <rect x="0" y="0" width="824" height="90" fill="#ffffff" stroke="#d5d9e0" stroke-width="1"/>
      <path d="M 40 55 C 100 25, 140 70, 220 35 C 270 15, 330 65, 420 45 C 470 30, 520 60, 600 40" fill="none" stroke="#1a2540" stroke-width="2.5" stroke-linecap="round"/>
      <text x="800" y="75" text-anchor="end" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="13" font-weight="700" fill="#888e99">SEC #9204</text>
    </g>

    <!-- Terms and Instructions -->
    <g transform="translate(100, 630)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" fill="#585c66" line-height="1.6">
      <text x="0" y="0" font-weight="700" font-size="19" fill="#1e2026">TERMS &amp; CONDITIONS OF PASS</text>
      <text x="0" y="35">• This card is issued for community events, hackathons, and technical meetups.</text>
      <text x="0" y="70">• Nontransferable. Must be displayed or presented upon venue check-in.</text>
      <text x="0" y="105">• Holder agrees to adhere to the code of conduct of the host community.</text>
      <text x="0" y="140">• Found badges please return to Sree Buddha College of Engineering.</text>
      <text x="0" y="175">• Portfolio &amp; verification portal: https://www.ebinreji.online</text>
    </g>

    <!-- Barcode Section -->
    <g transform="translate(180, 930)">
      <g fill="#1a1c20">
        ${Array.from({length: 64}).map((_, i) => {
          const w = (i % 3 === 0 ? 8 : (i % 2 === 0 ? 4 : 2));
          return `<rect x="${i * 10}" y="0" width="${w}" height="90"/>`;
        }).join('')}
      </g>
      <text x="320" y="125" text-anchor="middle" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="20" font-weight="700" fill="#202226" letter-spacing="0.3em">*ER-2025-SBCE-0924*</text>
    </g>

    <!-- Chip / Contactless Indicator -->
    <g transform="translate(512, 1220)" text-anchor="middle">
      <circle cx="0" cy="0" r="32" fill="none" stroke="#b0b5c0" stroke-width="2"/>
      <path d="M -12 -12 A 18 18 0 0 1 12 -12 M -18 -18 A 26 26 0 0 1 18 -18 M -6 -6 A 9 9 0 0 1 6 -6" fill="none" stroke="#707580" stroke-width="2.5" stroke-linecap="round"/>
      <text x="0" y="55" font-family="'SF Mono', Monaco, Menlo, Consolas, monospace" font-size="13" font-weight="600" fill="#808590" letter-spacing="0.2em">NFC ENABLED BADGE</text>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(path.join(BADGES_DIR, 'badge-back.png'));
  console.log('Generated badge-back.png');
}

async function run() {
  console.log('Regenerating ultra-refined badge assets...');
  await generateStrap();
  await generateOffwhiteStrap();
  const portrait = await generatePortrait();
  for (const config of BADGE_CONFIGS) {
    await generateBadgeFront(config, portrait);
  }
  await generateBadgeBack();
  console.log('All ultra-refined badge assets generated successfully!');
}

run().catch(err => {
  console.error('Error generating badges:', err);
  process.exit(1);
});
