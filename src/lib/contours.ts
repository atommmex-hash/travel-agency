/**
 * Topographic Contour Generator
 * Pure math functions for generating elevation contour lines.
 * Source: design.md section 2 & sample.html
 */

export interface RingOptions {
  seed: number;
  cx: number;
  cy: number;
  n: number;
  rMax: number;
  sx?: number;
  sy?: number;
  pts?: number;
  pow?: number;
}

export interface PlateOptions {
  id: string;
  seed: number;
  px: number;
  py: number;
  bg: [string, string];
  alt: number;
  width?: number;
  height?: number;
  n?: number;
}

export function rng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function rings(opts: RingOptions): [number, number][][] {
  const {
    seed,
    cx,
    cy,
    n,
    rMax,
    sx = 1.25,
    sy = 1,
    pts = 72,
    pow = 1.15
  } = opts;

  const r = rng(seed);
  const p = [r() * Math.PI * 2, r() * Math.PI * 2, r() * Math.PI * 2];
  const a = [0.06 + r() * 0.03, 0.04 + r() * 0.02, 0.02 + r() * 0.01];
  const out: [number, number][][] = [];

  for (let i = 0; i < n; i++) {
    const base = rMax * Math.pow(1 - i / n, pow);
    const line: [number, number][] = [];
    for (let k = 0; k <= pts; k++) {
      const th = (k / pts) * Math.PI * 2;
      const w =
        1 +
        a[0] * Math.sin(2 * th + p[0] + i * 0.06) +
        a[1] * Math.sin(3 * th + p[1] - i * 0.05) +
        a[2] * Math.sin(5 * th + p[2] + i * 0.07);
      line.push([cx + Math.cos(th) * base * w * sx, cy + Math.sin(th) * base * w * sy]);
    }
    out.push(line);
  }
  return out;
}

export function pathOf(pts: [number, number][]): string {
  if (!pts.length) return '';
  return 'M' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L') + 'Z';
}

export function formatMetres(m: number): string {
  return m.toLocaleString('en-IN') + ' m';
}

/**
 * Generates an SVG plate string for trip cards or modal sheets.
 */
export function generatePlateSvg(opts: PlateOptions): string {
  const W = opts.width ?? 400;
  const H = opts.height ?? 260;
  const cx = W * opts.px;
  const cy = H * opts.py;
  const n = opts.n ?? 14;
  const gradId = `pg-${opts.id}`;

  const R = rings({
    seed: opts.seed,
    cx,
    cy,
    n,
    rMax: 230,
    pts: 64
  });

  let paths = '';
  R.forEach((line, i) => {
    const hi = i >= R.length - 3;
    const idx = i % 4 === 0;
    const stroke = hi ? '#F2B53A' : '#8FB8CC';
    const strokeOp = hi
      ? (0.55 + (i - (R.length - 3)) * 0.2).toFixed(2)
      : idx
      ? '0.42'
      : '0.20';
    const strokeWidth = hi ? 1.5 : idx ? 1.3 : 1;

    paths += `<path d="${pathOf(line)}" fill="none" stroke="${stroke}" stroke-opacity="${strokeOp}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>`;
  });

  const marker = `<path d="M${cx},${cy - 7}l6,11h-12z" fill="#F2B53A"/><text x="${cx + 12}" y="${cy + 4}" fill="#fff" font-size="13" font-weight="700" paint-order="stroke" stroke="#0E1A2B" stroke-width="5" stroke-linejoin="round">${formatMetres(opts.alt)}</text>`;

  return `<svg class="plate-canvas" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${opts.bg[0]}"/>
      <stop offset="1" stop-color="${opts.bg[1]}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#${gradId})"/>
  ${paths}
  ${marker}
</svg>`;
}
