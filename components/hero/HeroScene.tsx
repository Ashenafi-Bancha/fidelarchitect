"use client";

/**
 * Hero 3D composition: the two mirrored forms of the Fidelity symbol
 * extruded into a pair of architectural towers with expressed floor plates,
 * standing on a plinth. The towers rise into place on load.
 *
 * Interaction (desktop and phone): drag to rotate, with momentum. When left
 * alone the model turns slowly by itself; on desktop it also tilts with the
 * mouse. On touch screens only horizontal drags rotate it, so vertical swipes
 * still scroll the page. Rendering pauses while the hero is off-screen.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { MARK_LEFT_POINTS } from "@/components/brand/Logo";

const S = 0.1; // logo units -> world units
const BASE = 45; // lowest point of the mark (logo units)
const toWorld = (px: number, py: number) => new THREE.Vector2((px - 24) * S, (BASE - py) * S);

// Left half of the supplied Fidelity mark (logo coordinates, y down)
const LEFT_OUTLINE = MARK_LEFT_POINTS;

function useTowerGeometry(mirror: boolean) {
  return useMemo(() => {
    const pts = LEFT_OUTLINE.map(([x, y]) => toWorld(mirror ? 48 - x : x, y));
    if (mirror) pts.reverse();
    const shape = new THREE.Shape(pts);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.6, bevelEnabled: false });
    geo.translate(0, 0, -0.8);
    const edges = new THREE.EdgesGeometry(geo, 20);
    return { geo, edges };
  }, [mirror]);
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

function Tower({ mirror, delay, instant }: { mirror: boolean; delay: number; instant: boolean }) {
  const { geo, edges } = useTowerGeometry(mirror);
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const slabRefs = useRef<THREE.Mesh[]>([]);

  // Floor plates expressed on the vertical stem, plus one under the cantilevered top bar.
  const slabs = useMemo(() => {
    const list: { x: number; y: number; w: number }[] = [];
    const flip = (x: number) => (mirror ? 48 - x : x);
    const stem = [flip(13.5), flip(20.5)].sort((a, b) => a - b);
    const bar = [flip(0), flip(20.5)].sort((a, b) => a - b);
    for (let py = 28; py >= 13; py -= 3) {
      list.push({ x: ((stem[0] + stem[1]) / 2 - 24) * S, y: (BASE - py) * S, w: (stem[1] - stem[0]) * S + 0.08 });
    }
    list.push({ x: ((bar[0] + bar[1]) / 2 - 24) * S, y: (BASE - 6.75) * S, w: (bar[1] - bar[0]) * S + 0.08 });
    return list;
  }, [mirror]);

  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = instant ? 99 : state.clock.elapsedTime - start.current - delay;
    if (group.current) group.current.position.y = -4.6 * (1 - ease(t / 2.2));
    slabRefs.current.forEach((m, i) => {
      if (!m) return;
      const k = ease((t - 1.2 - i * 0.05) / 0.8);
      m.scale.set(Math.max(k, 0.0001), 1, 1);
    });
  });

  return (
    <group ref={group}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial color="#dcdcda" roughness={0.42} metalness={0.28} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#0b0b0c" transparent opacity={0.35} />
      </lineSegments>
      {slabs.map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) slabRefs.current[i] = m;
          }}
          position={[s.x, s.y, 0]}
          castShadow
        >
          <boxGeometry args={[s.w, 0.04, 1.84]} />
          <meshStandardMaterial color="#1a1a1c" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Division marks in 3D — same geometry as the 2D logos (48×48 grid)   */
/* ------------------------------------------------------------------ */

const DIV_COLORS = { architecture: "#c8222a", interiors: "#2c7a52", branding: "#e5bf00" } as const;
type Div = keyof typeof DIV_COLORS;

function extrude(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(points.map(([x, y]) => toWorld(x, y)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

// Saw blade half-disc with teeth (matches DivisionMark in Logo.tsx)
function sawPoints(): [number, number][] {
  const cx = 27.5, cy = 24, r = 19, ri = 16.2, n = 11;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a0 = -Math.PI / 2 + (Math.PI * i) / n;
    const a1 = a0 + Math.PI / n / 2;
    pts.push([cx + ri * Math.cos(a0), cy + ri * Math.sin(a0)]);
    if (i < n) pts.push([cx + r * Math.cos(a1), cy + r * Math.sin(a1)]);
  }
  return pts;
}

function Solid({ geo, color, emissive = 0.08, metal = 0.2, rough = 0.45 }: { geo: THREE.BufferGeometry; color: string; emissive?: number; metal?: number; rough?: number }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 20), [geo]);
  return (
    <>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={rough} metalness={metal} emissive={color} emissiveIntensity={emissive} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#0b0b0c" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

function DivisionMark3D({ division }: { division: Div }) {
  const color = DIV_COLORS[division];
  const D = 0.7; // depth in world units
  const parts = useMemo(() => {
    const left = extrude(MARK_LEFT_POINTS, D);
    if (division === "architecture") {
      return {
        left,
        extra: [
          extrude([[25, 45], [25, 8], [32, 2], [32, 45]], D * 0.9),
          extrude([[32, 45], [32, 14], [39, 14], [39, 45]], D * 0.9),
          extrude([[39, 45], [39, 24], [46, 24], [46, 45]], D * 0.9),
        ],
      };
    }
    if (division === "interiors") return { left, extra: [extrude(sawPoints(), D * 0.6)] };
    return {
      left,
      extra: [extrude([[27.5, 5], [45, 5], [45, 36], [37, 44], [27.5, 44]], D * 0.5)],
      roller: extrude([[23.5, 1], [26.5, 1], [26.5, 47], [23.5, 47]], D * 1.1),
      fold: extrude([[45, 36], [37, 44], [37, 36]], D * 0.62),
    };
  }, [division]);

  return (
    <group>
      <Solid geo={parts.left} color={color} />
      {parts.extra.map((g, i) => (
        <Solid key={i} geo={g} color={color} emissive={division === "architecture" ? 0.05 : 0.08} />
      ))}
      {/* architecture: expressed floors on the building glyph */}
      {division === "architecture" &&
        [18, 22, 26, 30, 34, 38, 42].map((y) => (
          <group key={y}>
            <mesh position={[((35.5 - 24) * S), (BASE - y) * S, 0]}>
              <boxGeometry args={[0.68, 0.035, D * 0.95]} />
              <meshStandardMaterial color="#3a0d10" roughness={0.6} />
            </mesh>
            {y >= 27 && (
              <mesh position={[((42.5 - 24) * S), (BASE - y) * S, 0]}>
                <boxGeometry args={[0.68, 0.035, D * 0.95]} />
                <meshStandardMaterial color="#3a0d10" roughness={0.6} />
              </mesh>
            )}
          </group>
        ))}
      {"roller" in parts && parts.roller && <Solid geo={parts.roller} color="#2a2a2d" emissive={0} metal={0.6} rough={0.3} />}
      {"fold" in parts && parts.fold && <Solid geo={parts.fold} color="#b89400" emissive={0.04} />}
    </group>
  );
}

/** Turns a division mark part-way with the main mark (never edge-on), so it reads as 3D but stays legible. */
function FollowTurn({ root, children }: { root: MutableRefObject<THREE.Group | null>; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current && root.current) ref.current.rotation.y = Math.sin(root.current.rotation.y + 0.42) * 0.5;
  });
  return <group ref={ref}>{children}</group>;
}

/** Rises from below the plinth once, after a delay. */
function Rise({ delay, instant, children }: { delay: number; instant: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  useFrame((state) => {
    if (!ref.current) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = instant ? 99 : state.clock.elapsedTime - start.current - delay;
    const k = ease(t / 1.6);
    ref.current.position.y = -3 * (1 - k);
    ref.current.scale.setScalar(0.001 + 0.999 * Math.min(1, k * 1.4));
  });
  return <group ref={ref}>{children}</group>;
}

/** Rotation state shared between the DOM pointer handlers and the render loop. */
interface Spin {
  yaw: number; // accumulated user + auto rotation (radians)
  pitch: number;
  velocity: number; // yaw velocity after a drag (rad/s)
  dragging: boolean;
  lastInput: number; // ms timestamp of the last user interaction
}

function Composition({ compact, reduce, spin }: { compact: boolean; reduce: boolean; spin: MutableRefObject<Spin> }) {
  const root = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    // Phone: model centred in its own stage. Desktop: model to the right of the headline.
    if (compact) camera.lookAt(0, 1.2, 0.3);
    else camera.lookAt(0.2, 1.45, 0);
  }, [camera, compact]);

  useFrame((state, delta) => {
    if (!root.current) return;
    const s = spin.current;
    const idle = performance.now() - s.lastInput > 2500;

    if (!s.dragging) {
      // momentum from the last drag, decaying smoothly
      s.yaw += s.velocity * delta;
      s.velocity = THREE.MathUtils.damp(s.velocity, 0, 2.2, delta);
      // slow self-rotation when nobody is touching it
      if (idle && !reduce) s.yaw += delta * 0.18;
      // pitch eases back to a natural eye level
      s.pitch = THREE.MathUtils.damp(s.pitch, 0, 1.5, delta);
    }

    // desktop: a little extra tilt following the mouse
    const hoverYaw = compact || s.dragging ? 0 : state.pointer.x * 0.12;
    const hoverPitch = compact || s.dragging ? 0 : state.pointer.y * 0.04;

    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.42 + s.yaw + hoverYaw, 6, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, s.pitch + hoverPitch, 6, delta);
  });

  const facing = compact ? 0.33 : 0.12; // turn the stage toward the camera
  return (
    <group rotation={[0, facing, 0]}>
      {/* main group mark on a turntable — this is what visitors drag */}
      <group position={[0, 0, -0.9]}>
        <group ref={root}>
          <Tower mirror={false} delay={0} instant={reduce} />
          <Tower mirror delay={0.15} instant={reduce} />
          <mesh position={[0, -0.005, 0]} receiveShadow>
            <cylinderGeometry args={[2.75, 2.75, 0.02, 64]} />
            <meshStandardMaterial color="#232325" roughness={0.6} metalness={0.2} />
          </mesh>
        </group>
      </group>
      {/* the three divisions, in their brand colours, standing along the front edge */}
      {(
        [
          ["architecture", -2.3],
          ["interiors", 0],
          ["branding", 2.3],
        ] as const
      ).map(([d, x], i) => (
        <group key={d} position={[x, 0, 1.75]} scale={0.44}>
          <FollowTurn root={root}>
            <Rise delay={1.6 + i * 0.25} instant={reduce}>
              <DivisionMark3D division={d} />
            </Rise>
          </FollowTurn>
        </group>
      ))}
      {/* plinth */}
      <mesh position={[0, -0.12, 0.35]} receiveShadow castShadow>
        <boxGeometry args={[7.4, 0.24, 4.6]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
      </mesh>
      {/* thin brand-colour inlays along the plinth front, one per division */}
      {(
        [
          ["#c8222a", -2.3],
          ["#2c7a52", 0],
          ["#e5bf00", 2.3],
        ] as const
      ).map(([c, x]) => (
        <mesh key={c} position={[x, -0.12, 2.66]}>
          <boxGeometry args={[1.6, 0.05, 0.02]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#121213" roughness={1} />
      </mesh>
      <gridHelper args={[40, 80, "#3a3936", "#242325"]} position={[0, -0.235, 0]} />
    </group>
  );
}

export default function HeroScene({
  onReady,
  compact = false,
  reduce = false,
}: {
  onReady?: () => void;
  compact?: boolean;
  reduce?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [grabbing, setGrabbing] = useState(false);
  const spin = useRef<Spin>({ yaw: 0, pitch: 0, velocity: 0, dragging: false, lastInput: 0 });
  const drag = useRef<{ id: number; x: number; y: number; t: number; locked: "x" | "y" | null } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), locked: e.pointerType === "mouse" ? "x" : null };
    if (e.pointerType === "mouse") {
      e.currentTarget.setPointerCapture(e.pointerId);
      spin.current.dragging = true;
      spin.current.velocity = 0;
      setGrabbing(true);
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    // Touch: decide once whether this gesture is a horizontal rotate or a vertical scroll.
    if (!d.locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      d.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.locked === "x") {
        e.currentTarget.setPointerCapture(e.pointerId);
        spin.current.dragging = true;
        spin.current.velocity = 0;
        setGrabbing(true);
      }
    }
    if (d.locked !== "x") return;
    const now = performance.now();
    const dt = Math.max((now - d.t) / 1000, 0.001);
    const width = e.currentTarget.clientWidth || 600;
    const dYaw = (dx / width) * Math.PI * 1.6;
    spin.current.yaw += dYaw;
    spin.current.pitch = THREE.MathUtils.clamp(spin.current.pitch + (dy / width) * 0.9, -0.3, 0.25);
    spin.current.velocity = THREE.MathUtils.clamp(dYaw / dt, -6, 6);
    spin.current.lastInput = now;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    drag.current = null;
    spin.current.dragging = false;
    spin.current.lastInput = performance.now();
    setGrabbing(false);
  }

  return (
    <div
      ref={wrap}
      className={`absolute inset-0 select-none ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label="Interactive 3D model of the Fidelity mark as two architectural towers. Drag to rotate."
    >
      <Canvas
        shadows={!compact}
        dpr={compact ? [1, 1.5] : [1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={
          compact
            ? { position: [4.6, 4.2, 13.5], fov: 32, near: 0.1, far: 80 }
            : { position: [4.6, 3.3, 13.8], fov: 30, near: 0.1, far: 80 }
        }
        gl={{ antialias: true, powerPreference: compact ? "default" : "high-performance", alpha: false }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color("#0b0b0c");
          scene.fog = compact ? new THREE.Fog("#0b0b0c", 14, 30) : new THREE.Fog("#0b0b0c", 11, 26);
          onReady?.();
        }}
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight args={["#f5f2ec", "#0b0b0c", 0.35]} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={2.4}
          color="#fff4e2"
          castShadow={!compact}
          shadow-mapSize={[1536, 1536]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={7}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-6, 3, -6]} intensity={0.9} color="#b89b6a" />
        <group position={compact ? [0, 0, 0] : [3.75, 0, -0.8]} scale={compact ? 0.86 : 0.6}>
          <Composition compact={compact} reduce={reduce} spin={spin} />
        </group>
      </Canvas>
    </div>
  );
}
