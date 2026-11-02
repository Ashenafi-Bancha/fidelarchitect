/**
 * Fidelity marks — vector traces of the supplied logo images
 * (group mark + three division marks). They follow the originals closely,
 * but replace them with the official vector files when available.
 */
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DivisionSlug } from "@/content/divisions";

/** Left half of the group symbol (48×48 grid). The right half is its mirror. */
export const MARK_LEFT = "M0 3H20.5V31.5L0 45V40.5L13.5 27.5V10.5H0Z";
export const MARK_RIGHT = "M48 3H27.5V31.5L48 45V40.5L34.5 27.5V10.5H48Z";

/** Points of the left half, for the 3D hero extrusion (x right, y down). */
export const MARK_LEFT_POINTS: [number, number][] = [
  [0, 3], [20.5, 3], [20.5, 31.5], [0, 45], [0, 40.5], [13.5, 27.5], [13.5, 10.5], [0, 10.5],
];

export function FidelityMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d={MARK_LEFT} fill="currentColor" />
      <path d={MARK_RIGHT} fill="currentColor" />
    </svg>
  );
}

/* ---------------- Division marks ---------------- */

function sawTeeth() {
  // Half circular-saw blade on the right, centred on the stem.
  const cx = 27.5, cy = 24, r = 19, ri = 16.2, n = 11;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const a0 = -Math.PI / 2 + (Math.PI * i) / n;
    const a1 = a0 + Math.PI / n / 2;
    pts.push(`${(cx + ri * Math.cos(a0)).toFixed(2)} ${(cy + ri * Math.sin(a0)).toFixed(2)}`);
    if (i < n) pts.push(`${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy + r * Math.sin(a1)).toFixed(2)}`);
  }
  return `M${cx} ${cy - ri}L${pts.join("L")}Z`;
}
const SAW = sawTeeth();

export function DivisionMark({ division, className, mono }: { division: DivisionSlug; className?: string; /** single-colour version, e.g. on a coloured panel */ mono?: string }) {
  const color =
    mono ?? (division === "architecture" ? "var(--color-arch)" : division === "branding" ? "var(--color-print)" : "var(--color-interior)");
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d={MARK_LEFT} fill={color} />
      {division === "architecture" && (
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="miter">
          {/* tower with expressed floors, echoing the original building glyph */}
          <path d="M25 45V8l7-6v43" />
          <path d="M32 45V14h7v31M39 45V24h7v21" />
          {[18, 22, 26, 30, 34, 38, 42].map((y) => (
            <path key={y} d={`M32 ${y}h7M39 ${Math.max(y, 27)}h7`} strokeWidth="1.1" />
          ))}
          {[12, 17, 22, 27, 32, 37].map((y) => (
            <path key={`c${y}`} d={`M25 ${y}l7-2`} strokeWidth="1.1" />
          ))}
        </g>
      )}
      {division === "branding" && (
        <g>
          {/* roller + printed sheet with folded corner */}
          <rect x="23.5" y="1" width="3" height="46" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M27.5 5H45V36L37 44H27.5Z" fill={color} />
          <path d="M45 36H37V44Z" fill="currentColor" opacity="0.25" />
        </g>
      )}
      {division === "interiors" && <path d={SAW} fill={color} />}
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  compact = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Fidelity Business Group — home"
      className={cn("group inline-flex items-center gap-3", tone === "light" ? "text-bone" : "text-obsidian", className)}
    >
      <FidelityMark className="h-8 w-8 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.18em]">Fidelity</span>
          <span className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.28em] opacity-60">Business Group</span>
        </span>
      )}
    </Link>
  );
}
