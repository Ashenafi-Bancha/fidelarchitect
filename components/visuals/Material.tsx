/**
 * Procedural material swatches drawn with SVG filters — no image downloads,
 * crisp at any size. Used for the interior "sample board".
 */

export type MaterialKey = "oak" | "walnut" | "travertine" | "terrazzo" | "linen" | "brass" | "steel" | "velvet";

export const materials: { key: MaterialKey; name: string; finish: string; use: string }[] = [
  { key: "oak", name: "White oak", finish: "Natural oil", use: "Joinery & flooring" },
  { key: "walnut", name: "Walnut", finish: "Satin lacquer", use: "Cabinetry & tables" },
  { key: "travertine", name: "Travertine", finish: "Honed", use: "Counters & cladding" },
  { key: "terrazzo", name: "Terrazzo", finish: "Polished", use: "Floors & surfaces" },
  { key: "linen", name: "Linen", finish: "Washed weave", use: "Upholstery & drapery" },
  { key: "brass", name: "Brass", finish: "Brushed", use: "Handles & lighting" },
  { key: "steel", name: "Steel", finish: "Blackened", use: "Frames & fittings" },
  { key: "velvet", name: "Velvet", finish: "Deep green", use: "Seating" },
];

// Small deterministic PRNG so server and client render identical terrazzo.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

export function MaterialSwatch({ material, id, className }: { material: MaterialKey; id: string; className?: string }) {
  const f = `${id}-${material}`;
  const common = { className, viewBox: "0 0 200 200", preserveAspectRatio: "xMidYMid slice", "aria-hidden": true } as const;

  switch (material) {
    case "oak":
    case "walnut": {
      const light = material === "oak";
      return (
        <svg {...common}>
          <filter id={f} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.16" numOctaves="4" seed={light ? 3 : 9} />
            <feColorMatrix
              type="matrix"
              values={
                light
                  ? "0 0 0 0.32 0.62  0 0 0 0.26 0.48  0 0 0 0.18 0.32  0 0 0 0 1"
                  : "0 0 0 0.26 0.24  0 0 0 0.18 0.14  0 0 0 0.12 0.09  0 0 0 0 1"
              }
            />
          </filter>
          <rect width="200" height="200" filter={`url(#${f})`} />
        </svg>
      );
    }
    case "travertine":
      return (
        <svg {...common}>
          <filter id={f} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="5" seed="4" />
            <feColorMatrix type="matrix" values="0 0 0 0.14 0.8  0 0 0 0.13 0.74  0 0 0 0.12 0.64  0 0 0 0 1" />
          </filter>
          <rect width="200" height="200" filter={`url(#${f})`} />
          {[38, 92, 151].map((y, i) => (
            <path key={y} d={`M0 ${y} Q 60 ${y + (i % 2 ? 4 : -3)} 120 ${y + 1} T 200 ${y + 2}`} stroke="#b9a98f" strokeWidth="0.8" fill="none" opacity="0.5" />
          ))}
        </svg>
      );
    case "terrazzo": {
      const r = rng(7);
      const colors = ["#2e2c29", "#8f8678", "#c8222a", "#1f5c3d", "#c9b89a", "#6f6a62"];
      const chips = Array.from({ length: 70 }, () => {
        const cx = r() * 200, cy = r() * 200, s = 2 + r() * 7, rot = r() * 360;
        // mostly neutral chips, with occasional brand-red / green / stone accents
        const c = r() > 0.82 ? colors[2 + Math.floor(r() * 4)] : colors[Math.floor(r() * 2)];
        return { cx, cy, s, rot, c };
      });
      return (
        <svg {...common}>
          <rect width="200" height="200" fill="#e9e5dd" />
          {chips.map((p, i) => (
            <polygon
              key={i}
              points={`${-p.s},${-p.s * 0.6} ${p.s * 0.8},${-p.s} ${p.s},${p.s * 0.7} ${-p.s * 0.5},${p.s}`}
              transform={`translate(${p.cx.toFixed(1)} ${p.cy.toFixed(1)}) rotate(${p.rot.toFixed(0)})`}
              fill={p.c}
            />
          ))}
        </svg>
      );
    }
    case "linen":
      return (
        <svg {...common}>
          <defs>
            <pattern id={`${f}-p`} width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="3" height="3" fill="#d9d1c3" />
              <path d="M0 1.5h3M1.5 0v3" stroke="#c7bdab" strokeWidth="0.7" />
            </pattern>
            <filter id={f}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9 0.05" numOctaves="2" seed="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0.25 0" />
            </filter>
          </defs>
          <rect width="200" height="200" fill={`url(#${f}-p)`} />
          <rect width="200" height="200" filter={`url(#${f})`} />
        </svg>
      );
    case "brass":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`${f}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8a6a32" />
              <stop offset="0.45" stopColor="#d8b46a" />
              <stop offset="0.6" stopColor="#b58d47" />
              <stop offset="1" stopColor="#6e5226" />
            </linearGradient>
            <filter id={f}>
              <feTurbulence type="fractalNoise" baseFrequency="0.002 0.9" numOctaves="2" seed="5" />
              <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.8  0 0 0 0.22 0" />
            </filter>
          </defs>
          <rect width="200" height="200" fill={`url(#${f}-g)`} />
          <rect width="200" height="200" filter={`url(#${f})`} />
        </svg>
      );
    case "steel":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`${f}-g`} x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0" stopColor="#1b1b1d" />
              <stop offset="0.5" stopColor="#38383b" />
              <stop offset="1" stopColor="#141415" />
            </linearGradient>
            <filter id={f}>
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="8" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.6  0 0 0 0 0.62  0 0 0 0.18 0" />
            </filter>
          </defs>
          <rect width="200" height="200" fill={`url(#${f}-g)`} />
          <rect width="200" height="200" filter={`url(#${f})`} />
        </svg>
      );
    case "velvet":
      return (
        <svg {...common}>
          <defs>
            <radialGradient id={`${f}-g`} cx="0.35" cy="0.3" r="0.9">
              <stop offset="0" stopColor="#3f8a63" />
              <stop offset="0.55" stopColor="#1f5c3d" />
              <stop offset="1" stopColor="#0f3322" />
            </radialGradient>
            <filter id={f}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 0.16 0" />
            </filter>
          </defs>
          <rect width="200" height="200" fill={`url(#${f}-g)`} />
          <rect width="200" height="200" filter={`url(#${f})`} />
        </svg>
      );
  }
}
