/**
 * Schematic illustrations used wherever approved photography is not yet
 * available. They are deliberately drawn as technical diagrams so they can
 * never be mistaken for photographs or renders of real Fidelity projects.
 */
import type { Visual } from "@/content/divisions";
import { cn } from "@/lib/cn";
import { DrawOnView } from "./DrawOnView";

type Props = {
  variant: Visual;
  accent?: string;
  tone?: "dark" | "light";
  className?: string;
  label?: string | false;
  title?: string;
};

export function Schematic({ variant, accent = "var(--color-champagne)", tone = "dark", className, label, title }: Props) {
  const Drawing = drawings[variant];
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden blueprint",
        tone === "dark" ? "bg-charcoal text-bone/80" : "bg-linen text-obsidian/75",
        className,
      )}
    >
      <DrawOnView className="absolute inset-0">
        <Drawing accent={accent} title={title} />
      </DrawOnView>
      {label !== false && (
        <figcaption
          className={cn(
            "absolute bottom-3 left-3 eyebrow !text-[0.68rem] !tracking-[0.18em] px-2 py-1",
            tone === "dark" ? "bg-obsidian/70 text-bone/70" : "bg-bone/80 text-obsidian/60",
          )}
        >
          {label ?? "Schematic illustration · photography pending"}
        </figcaption>
      )}
    </figure>
  );
}

type D = { accent: string; title?: string };
const common = {
  className: "absolute inset-0 h-full w-full",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
  preserveAspectRatio: "xMidYMid meet",
  role: "img",
} as const;

function Elevation({ accent, title }: D) {
  // Basement + ground + 7 floors
  const left = 140, right = 300, ground = 400;
  const floorH = 32, gH = 40;
  const levels = Array.from({ length: 7 }, (_, i) => ground - gH - floorH * (i + 1));
  return (
    <svg viewBox="0 0 440 500" {...common} aria-label={title ?? "Schematic elevation of a multi-storey building"}>
      <line x1="20" x2="420" y1={ground} y2={ground} strokeWidth={1.5} />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={20 + i * 14} x2={30 + i * 14} y1={ground + 2} y2={ground + 12} opacity={0.35} />
      ))}
      {/* basement */}
      <rect x={left} y={ground} width={right - left} height={floorH} strokeDasharray="4 4" opacity={0.6} />
      {/* tower body */}
      <rect x={left} y={levels[6]} width={right - left} height={ground - levels[6]} strokeWidth={1.4} />
      <rect x={left - 6} y={levels[6] - 10} width={right - left + 12} height={10} />
      {/* floor lines and glazing */}
      {levels.map((y, i) => (
        <g key={i}>
          <line x1={left} x2={right} y1={y + floorH} y2={y + floorH} opacity={0.6} />
          {Array.from({ length: 6 }, (_, j) => (
            <rect key={j} x={left + 10 + j * 24.5} y={y + 6} width={18} height={floorH - 12} opacity={0.55} />
          ))}
        </g>
      ))}
      {/* vertical fins */}
      {[left + 52, right - 52].map((x) => (
        <line key={x} x1={x} x2={x} y1={levels[6] - 10} y2={ground - gH} strokeWidth={2.2} stroke={accent} />
      ))}
      {/* ground floor: entrance + canopy */}
      <rect x={left + 54} y={ground - gH + 8} width={right - left - 108} height={gH - 8} />
      <line x1={left + 20} x2={right - 20} y1={ground - gH + 4} y2={ground - gH + 4} strokeWidth={2} />
      {/* level markers */}
      <g fontSize="9" fontFamily="var(--font-sans)" fill="currentColor" stroke="none" opacity={0.7}>
        {["B", "G", "1", "2", "3", "4", "5", "6", "7"].map((l, i) => {
          const y = i === 0 ? ground + floorH / 2 : i === 1 ? ground - gH / 2 : levels[i - 2] + floorH / 2;
          return (
            <text key={l} x={left - 34} y={y + 3} textAnchor="middle">
              {l}
            </text>
          );
        })}
      </g>
      <line x1={left - 20} x2={left - 20} y1={levels[6]} y2={ground + floorH} opacity={0.5} />
      {[levels[6], ground, ground + floorH].map((y) => (
        <line key={y} x1={left - 24} x2={left - 16} y1={y + 4} y2={y - 4} opacity={0.7} />
      ))}
      {/* datum */}
      <g opacity={0.6}>
        <circle cx={380} cy={ground} r={6} />
        <path d={`M380 ${ground - 6}v12M374 ${ground}h12`} />
      </g>
      <line x1={left} x2={right} y1={levels[3] + floorH} y2={levels[3] + floorH} stroke={accent} strokeWidth={1.4} />
    </svg>
  );
}

function Plan({ accent, title }: D) {
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic floor plan"}>
      {/* grid axes */}
      <g opacity={0.45} strokeDasharray="6 4">
        {[80, 180, 280, 360].map((x) => <line key={x} x1={x} x2={x} y1={30} y2={410} />)}
        {[80, 170, 270, 360].map((y) => <line key={y} x1={30} x2={410} y1={y} y2={y} />)}
      </g>
      <g fontSize="9" fill="currentColor" stroke="none" opacity={0.75} textAnchor="middle" fontFamily="var(--font-sans)">
        {["A", "B", "C", "D"].map((l, i) => <text key={l} x={[80, 180, 280, 360][i]} y={22}>{l}</text>)}
        {["1", "2", "3", "4"].map((l, i) => <text key={l} x={18} y={[80, 170, 270, 360][i] + 3}>{l}</text>)}
      </g>
      {/* walls */}
      <path d="M80 80H360V360H80Z" strokeWidth={4} />
      <path d="M180 80V230M180 270V360M80 170H150M200 170H360M280 170V360M180 270H280" strokeWidth={2.5} />
      {/* doors */}
      <path d="M150 170A30 30 0 0 1 180 200M180 230A40 40 0 0 0 220 270" opacity={0.7} />
      {/* columns */}
      {[80, 180, 280, 360].flatMap((x) => [80, 170, 270, 360].map((y) => (
        <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width={8} height={8} fill="currentColor" />
      )))}
      {/* furniture hints */}
      <rect x={300} y={200} width={40} height={60} opacity={0.5} />
      <circle cx={130} cy={300} r={22} opacity={0.5} />
      <rect x={100} y={100} width={60} height={40} opacity={0.5} />
      <path d="M200 100h140v50H200z" stroke={accent} strokeWidth={1.5} />
      {/* north arrow */}
      <g transform="translate(395 395)" opacity={0.75}>
        <circle r={12} />
        <path d="M0 -10L5 6L0 2L-5 6Z" fill="currentColor" />
      </g>
    </svg>
  );
}

function Section({ accent, title }: D) {
  const levels = [360, 300, 240, 180, 120];
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic structural section"}>
      <line x1={20} x2={420} y1={360} y2={360} strokeWidth={1.5} />
      {/* foundation */}
      {[90, 220, 350].map((x) => (
        <g key={x}>
          <rect x={x - 22} y={385} width={44} height={14} />
          <line x1={x} x2={x} y1={360} y2={385} strokeWidth={4} />
        </g>
      ))}
      <rect x={60} y={360} width={320} height={22} strokeDasharray="3 3" opacity={0.5} />
      {/* columns & slabs */}
      {levels.slice(0, -1).map((y, i) => (
        <g key={y}>
          {[90, 220, 350].map((x) => <line key={x} x1={x} x2={x} y1={y} y2={levels[i + 1]} strokeWidth={4} />)}
          <rect x={70} y={levels[i + 1] - 8} width={300} height={8} fill="currentColor" opacity={0.18} />
          <line x1={70} x2={370} y1={levels[i + 1]} y2={levels[i + 1]} strokeWidth={1.5} />
        </g>
      ))}
      {/* load arrows */}
      {[130, 180, 260, 310].map((x) => (
        <path key={x} d={`M${x} 70v30M${x - 4} 94l4 6l4-6`} stroke={accent} strokeWidth={1.4} />
      ))}
      {/* moment diagram */}
      <path d="M90 240 Q155 290 220 240 Q285 290 350 240" stroke={accent} strokeWidth={1.4} />
      <g fontSize="9" fill="currentColor" stroke="none" opacity={0.7} fontFamily="var(--font-sans)">
        {levels.map((y, i) => <text key={y} x={392} y={y + 3}>{`+${(i * 3.2).toFixed(1)}`}</text>)}
      </g>
    </svg>
  );
}

function Interior({ accent, title }: D) {
  // one-point perspective room
  const vp = { x: 220, y: 200 };
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic interior perspective"}>
      <rect x={130} y={130} width={180} height={140} strokeWidth={1.4} />
      {[[0, 0, 130, 130], [440, 0, 310, 130], [0, 440, 130, 270], [440, 440, 310, 270]].map(([a, b, c, d], i) => (
        <line key={i} x1={a} y1={b} x2={c} y2={d} />
      ))}
      {/* floor boards */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 130 + i * 22.5;
        const xf = vp.x + (x - vp.x) * 3.3;
        return <line key={i} x1={x} y1={270} x2={xf} y2={440} opacity={0.3} />;
      })}
      {/* window */}
      <rect x={235} y={150} width={60} height={80} />
      <line x1={265} x2={265} y1={150} y2={230} />
      {/* sofa */}
      <path d="M150 300h120v-28h-120z" />
      <path d="M140 300v26h140v-26M150 286h120" />
      <path d="M140 326v8M280 326v8" />
      {/* pendant */}
      <line x1={200} x2={200} y1={0} y2={110} />
      <path d="M186 110h28l-6 14h-16z" stroke={accent} strokeWidth={1.5} />
      {/* rug */}
      <ellipse cx={210} cy={370} rx={120} ry={26} opacity={0.6} />
      {/* side table & plant */}
      <rect x={300} y={300} width={30} height={30} />
      <path d="M315 300c-10-20 0-40 0-40M315 300c10-18 18-24 18-24M315 300c-14-10-20-16-20-16" stroke={accent} />
      {/* artwork */}
      <rect x={150} y={155} width={60} height={42} stroke={accent} strokeWidth={1.4} />
    </svg>
  );
}

function Joinery({ accent, title }: D) {
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic cabinet joinery drawing"}>
      {/* cabinet front elevation */}
      <rect x={90} y={90} width={260} height={240} strokeWidth={1.6} />
      <line x1={220} x2={220} y1={90} y2={330} />
      <line x1={90} x2={350} y1={180} y2={180} />
      {[110, 240].map((x) => <rect key={x} x={x} y={200} width={90} height={110} opacity={0.6} />)}
      {[204, 236].map((x) => <line key={x} x1={x} x2={x} y1={240} y2={270} strokeWidth={2.5} stroke={accent} />)}
      {/* shelves */}
      {[120, 150].map((y) => <line key={y} x1={95} x2={215} y1={y} y2={y} opacity={0.5} />)}
      {/* grain */}
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M230 ${100 + i * 12} q40 ${i % 2 ? 6 : -6} 115 0`} opacity={0.3} />
      ))}
      {/* dimension lines */}
      <g opacity={0.7}>
        <line x1={90} x2={350} y1={360} y2={360} />
        <line x1={90} x2={90} y1={352} y2={368} />
        <line x1={350} x2={350} y1={352} y2={368} />
        <line x1={380} x2={380} y1={90} y2={330} />
        <line x1={372} x2={388} y1={90} y2={90} />
        <line x1={372} x2={388} y1={330} y2={330} />
      </g>
      <g fontSize="9" fill="currentColor" stroke="none" opacity={0.75} fontFamily="var(--font-sans)" textAnchor="middle">
        <text x={220} y={378}>W</text>
        <text x={396} y={214}>H</text>
      </g>
      {/* section detail bubble */}
      <circle cx={90} cy={90} r={22} stroke={accent} strokeDasharray="3 3" />
    </svg>
  );
}

function Print({ accent, title }: D) {
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic print layout with registration marks"}>
      {/* stacked sheets */}
      <rect x={130} y={110} width={200} height={260} opacity={0.35} transform="rotate(-6 230 240)" />
      <rect x={120} y={90} width={200} height={260} fill="var(--color-bone)" fillOpacity={0.04} strokeWidth={1.4} />
      {/* type grid */}
      <rect x={140} y={115} width={90} height={12} fill="currentColor" opacity={0.8} />
      <rect x={140} y={133} width={60} height={12} fill="currentColor" opacity={0.8} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={140} x2={i % 3 === 2 ? 250 : 300} y1={170 + i * 10} y2={170 + i * 10} opacity={0.45} />
      ))}
      <rect x={140} y={270} width={160} height={60} stroke={accent} strokeWidth={1.4} />
      <path d="M140 330L195 285L230 310L265 280L300 330" stroke={accent} />
      {/* crop marks */}
      {[[120, 90], [320, 90], [120, 350], [320, 350]].map(([x, y], i) => (
        <g key={i} opacity={0.75}>
          <line x1={x - (x < 200 ? 18 : -6)} x2={x - (x < 200 ? 6 : -18)} y1={y} y2={y} />
          <line x1={x} x2={x} y1={y - (y < 200 ? 18 : -6)} y2={y - (y < 200 ? 6 : -18)} />
        </g>
      ))}
      {/* registration mark */}
      <g transform="translate(372 64)" opacity={0.8}>
        <circle r={10} />
        <circle r={4} />
        <path d="M-16 0h32M0 -16v32" />
      </g>
      {/* CMYK swatches */}
      {["#00a3d9", "#d6007e", "#f5d000", "#111"].map((c, i) => (
        <rect key={c} x={60 + i * 18} y={392} width={14} height={14} fill={c} stroke="none" opacity={0.85} />
      ))}
    </svg>
  );
}

function Signage({ accent, title }: D) {
  return (
    <svg viewBox="0 0 440 440" {...common} aria-label={title ?? "Schematic storefront signage elevation"}>
      <line x1={20} x2={420} y1={370} y2={370} strokeWidth={1.5} />
      <rect x={70} y={140} width={300} height={230} />
      {/* fascia sign */}
      <rect x={90} y={160} width={260} height={46} stroke={accent} strokeWidth={1.8} />
      <rect x={110} y={176} width={120} height={14} fill="currentColor" opacity={0.75} />
      <rect x={240} y={178} width={60} height={10} fill={accent} stroke="none" />
      {/* shopfront */}
      <rect x={100} y={230} width={110} height={140} opacity={0.6} />
      <rect x={230} y={230} width={110} height={140} opacity={0.6} />
      <line x1={155} x2={155} y1={230} y2={370} opacity={0.4} />
      {/* projecting blade sign */}
      <line x1={370} x2={398} y1={210} y2={210} />
      <rect x={384} y={214} width={28} height={64} stroke={accent} />
      {/* banner */}
      <rect x={40} y={50} width={160} height={60} strokeDasharray="5 4" opacity={0.7} />
      <g fontSize="9" fill="currentColor" stroke="none" opacity={0.75} fontFamily="var(--font-sans)">
        <text x={46} y={44}>LARGE FORMAT</text>
      </g>
    </svg>
  );
}

const drawings: Record<Visual, (p: D) => React.ReactElement> = {
  elevation: Elevation,
  plan: Plan,
  section: Section,
  interior: Interior,
  joinery: Joinery,
  print: Print,
  signage: Signage,
};
