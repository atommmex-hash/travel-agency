import { describe, it, expect } from 'vitest';
import { rng, rings, pathOf, formatMetres, generatePlateSvg } from '../src/lib/contours';

describe('Contours & Topography Generator', () => {
  it('deterministic pseudo-random generator produces identical outputs for the same seed', () => {
    const r1 = rng(42);
    const r2 = rng(42);
    const values1 = [r1(), r1(), r1()];
    const values2 = [r2(), r2(), r2()];
    expect(values1).toEqual(values2);
  });

  it('generates expected number of contour rings', () => {
    const res = rings({
      seed: 7,
      cx: 100,
      cy: 100,
      n: 10,
      rMax: 80,
      pts: 32
    });
    expect(res).toHaveLength(10);
    expect(res[0]).toHaveLength(33); // 0 to 32 inclusive
  });

  it('pathOf converts points to SVG Path format', () => {
    const pts: [number, number][] = [
      [10, 20],
      [30, 40],
      [50, 60]
    ];
    expect(pathOf(pts)).toBe('M10.0,20.0L30.0,40.0L50.0,60.0Z');
  });

  it('formatMetres formats number with m suffix and locale', () => {
    expect(formatMetres(2590)).toBe('2,590 m');
    expect(formatMetres(8586)).toBe('8,586 m');
  });

  it('generates valid SVG string for card plate', () => {
    const svg = generatePlateSvg({
      id: 'test-plate',
      seed: 3,
      px: 0.5,
      py: 0.5,
      bg: ['#14324A', '#0E1A2B'],
      alt: 2590
    });
    expect(svg).toContain('<svg');
    expect(svg).toContain('linearGradient id="pg-test-plate"');
    expect(svg).toContain('2,590 m');
    expect(svg).toContain('</svg>');
  });
});
