export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  aspectRatio: '4/3' | '3/4' | '4/5' | '2/3' | '1.2' | string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  videoUrl?: string;
  award?: string;
  awardUrl?: string;
  awardLabel?: string;
  isComingSoon?: boolean;
}

export const COMING_SOON_PROJECT: Project = {
  id: 'coming-soon',
  title: 'Coming Soon',
  category: 'Upcoming',
  description: "Currently developing new tools, web platforms, and interactive experiences. Stay tuned for what's next!",
  image: '',
  aspectRatio: '4/3',
  tags: [],
  isComingSoon: true
};

export const SHEET_ID = import.meta.env.VITE_PROJECTS_SHEET_ID || '';
export const SHEET_NAME = import.meta.env.VITE_PROJECTS_SHEET_NAME || 'Form responses 1';

/**
 * Generate a URL-safe slug from Project Title.
 * Handles micro/Greek letters (e.g. 'µLearn SBC' -> 'mulearn-sbc')
 */
export function slugify(text: string): string {
  return text
    .replace(/[µ\u00B5\u03BC]/g, 'mu')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface GVizColumn {
  id: string;
  label?: string;
  type?: string;
}

interface GVizCell {
  v?: unknown;
  f?: string;
}

interface GVizRow {
  c?: (GVizCell | null)[];
}

interface GVizResponse {
  status: string;
  table: {
    cols: GVizColumn[];
    rows: GVizRow[];
  };
}

/**
 * Parses Google Visualization Table structure into Project[]
 */
export function parseGVizData(parsed: GVizResponse): Project[] {
  if (!parsed.table || !Array.isArray(parsed.table.rows)) {
    return [];
  }

  const cols = parsed.table.cols.map((col) => (col.label || '').trim().toLowerCase());
  const getColIdx = (name: string): number => cols.indexOf(name.toLowerCase());

  const titleIdx = getColIdx('project title');
  const categoryIdx = getColIdx('category / sub-headline');
  const descIdx = getColIdx('project description');
  const tagsIdx = getColIdx('tech stack tags');
  const coverImgIdx = getColIdx('cover image');
  const aspectIdx = getColIdx('card aspect ratio');
  const liveUrlIdx = getColIdx('live website / demo url');
  const githubIdx = getColIdx('github repository url');
  const caseStudyIdx = getColIdx('case study url');
  const videoIdx = getColIdx('video demo url');
  const awardIdx = getColIdx('award / recognition text');
  const awardUrlIdx = getColIdx('award / hackathon url');
  const awardLabelIdx = getColIdx('award button short label');

  // Direct image columns: any column whose header is "directImageUrl" (e.g. columns O through W)
  const directImgIndices = cols
    .map((col, idx) => (col === 'directimageurl' ? idx : -1))
    .filter((idx) => idx !== -1);

  const getCellStr = (row: GVizRow, idx: number): string => {
    if (idx < 0 || !row.c || !row.c[idx]) return '';
    const cell = row.c[idx];
    if (cell.v === null || cell.v === undefined) return '';
    return String(cell.v).trim();
  };

  const projects: Project[] = [];

  for (const row of parsed.table.rows) {
    if (!row || !row.c) continue;

    const title = getCellStr(row, titleIdx);
    if (!title || title.toLowerCase() === 'project title') {
      continue; // Skip blank rows or duplicated header rows
    }

    // 1. Direct Image Resolution:
    // Look across any directImageUrl column and grab first non-empty URL.
    let imageUrl = '';
    for (const dIdx of directImgIndices) {
      const candidate = getCellStr(row, dIdx);
      if (candidate && candidate.startsWith('http')) {
        imageUrl = candidate;
        break;
      }
    }

    // Fallback: extract Google Drive file ID from Cover Image
    if (!imageUrl) {
      const coverVal = getCellStr(row, coverImgIdx);
      const driveMatch = coverVal.match(/[-\w]{25,}/);
      if (driveMatch) {
        imageUrl = `https://lh3.googleusercontent.com/d/${driveMatch[0]}=s1200`;
      } else {
        imageUrl = coverVal;
      }
    }

    // 2. Tech Stack Tags
    const rawTags = getCellStr(row, tagsIdx);
    const tags = rawTags
      ? rawTags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // 3. Aspect Ratio
    const rawAspect = getCellStr(row, aspectIdx);
    const validAspects = ['4/3', '3/4', '4/5', '2/3', '1.2'];
    const aspectRatio = validAspects.includes(rawAspect) ? rawAspect : '4/3';

    // 4. Action URLs
    const liveUrl = getCellStr(row, liveUrlIdx) || undefined;
    const githubUrl = getCellStr(row, githubIdx) || undefined;
    const caseStudyUrl = getCellStr(row, caseStudyIdx) || undefined;
    const videoUrl = getCellStr(row, videoIdx) || undefined;

    // 5. Awards
    const award = getCellStr(row, awardIdx) || undefined;
    const awardUrl = getCellStr(row, awardUrlIdx) || undefined;
    const rawAwardLabel = getCellStr(row, awardLabelIdx);
    const awardLabel = rawAwardLabel || award || (awardUrl ? 'Award' : undefined);

    projects.push({
      id: slugify(title),
      title,
      category: getCellStr(row, categoryIdx) || 'Featured Project',
      description: getCellStr(row, descIdx),
      tags,
      image: imageUrl,
      aspectRatio,
      liveUrl,
      githubUrl,
      caseStudyUrl,
      videoUrl,
      award,
      awardUrl,
      awardLabel
    });
  }

  return projects;
}

/**
 * Loads Google Visualization data via JSONP script tag.
 * Completely immune to browser CORS, preflight OPTIONS, and proxy blocks.
 */
function fetchWithJSONP(sheetId: string, sheetName: string): Promise<GVizResponse> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return reject(new Error('JSONP requires browser window/document environment'));
    }

    const callbackName = `__gviz_projects_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement('script');
    let timeoutId: number | undefined;

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      delete (window as unknown as Record<string, unknown>)[callbackName];
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    (window as unknown as Record<string, (data: GVizResponse) => void>)[callbackName] = (data: GVizResponse) => {
      cleanup();
      if (data && data.table) {
        resolve(data);
      } else {
        reject(new Error('Invalid response received from Google Sheets'));
      }
    };

    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:${callbackName}&sheet=${encodeURIComponent(sheetName)}&_t=${Date.now()}`;
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error('Network error loading Google Sheets script'));
    };

    timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('Google Sheets request timed out'));
    }, 8000);

    document.head.appendChild(script);
  });
}

/**
 * Fallback loader using native fetch without custom headers to avoid preflight issues.
 */
async function fetchWithFetch(sheetId: string, sheetName: string): Promise<GVizResponse> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_t=${Date.now()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Sheets responded with HTTP ${response.status}`);
  }

  const rawText = await response.text();
  const jsonStart = rawText.indexOf('{');
  const jsonEnd = rawText.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Invalid Google Visualization response format');
  }

  return JSON.parse(rawText.substring(jsonStart, jsonEnd + 1));
}

/**
 * Dynamically fetches 100% of portfolio projects from Google Sheets with JSONP + fetch fallback.
 */
export async function fetchProjectsFromSheet(
  sheetId: string = SHEET_ID,
  sheetName: string = SHEET_NAME
): Promise<Project[]> {
  if (!sheetId) {
    throw new Error('VITE_PROJECTS_SHEET_ID is not configured');
  }

  let gvizData: GVizResponse | null = null;

  // 1. Try JSONP (bypasses browser CORS preflight & restrictions)
  try {
    gvizData = await fetchWithJSONP(sheetId, sheetName);
  } catch (jsonpErr) {
    console.warn('JSONP fetch attempt failed, trying fetch API:', jsonpErr);
    // 2. Fallback to native fetch
    gvizData = await fetchWithFetch(sheetId, sheetName);
  }

  if (!gvizData) {
    throw new Error('Unable to retrieve data from Google Sheets');
  }

  return parseGVizData(gvizData);
}
