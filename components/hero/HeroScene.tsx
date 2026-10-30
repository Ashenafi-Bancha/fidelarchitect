"use client";

/**
 * Hero 3D composition: the two mirrored forms of the Fidelity symbol
 * extruded into a pair of architectural towers with expressed floor plates,
 * standing on a plinth. The towers rise into place once on load, then the
 * composition responds gently to the pointer. Loaded only on large screens
 * without reduced-motion; rendering pauses when the hero is off-screen.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
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

function Tower({ mirror, delay }: { mirror: boolean; delay: number }) {
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
    const t = state.clock.elapsedTime - start.current - delay;
    if (group.current) group.current.position.y = -4.6 * (1 - ease(t / 2.2));
    slabRefs.current.forEach((m, i) => {
      if (!m) return;
      const k = ease((t - 1.2 - i * 0.05) / 0.8);
      m.scale.set(k, 1, 1);
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
          ref={(m) => { if (m) slabRefs.current[i] = m; }}
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

function Composition() {
  const root = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0.9, 1.6, 0);
  }, [camera]);

  useFrame((state, delta) => {
    if (!root.current) return;
    const tx = -0.42 + state.pointer.x * 0.18;
    const ty = state.pointer.y * 0.05;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, tx, 2.5, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, ty, 2.5, delta);
  });

  return (
    <group ref={root}>
      <Tower mirror={false} delay={0} />
      <Tower mirror delay={0.15} />
      {/* plinth */}
      <mesh position={[0, -0.12, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.2, 0.24, 2.6]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
      </mesh>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#121213" roughness={1} />
      </mesh>
      <gridHelper args={[40, 80, "#3a3936", "#242325"]} position={[0, -0.235, 0]} />
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [4.6, 2.8, 12.8], fov: 30, near: 0.1, far: 80 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color("#0b0b0c");
          scene.fog = new THREE.Fog("#0b0b0c", 9, 22);
          onReady?.();
        }}
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#f5f2ec", "#0b0b0c", 0.35]} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={2.4}
          color="#fff4e2"
          castShadow
          shadow-mapSize={[1536, 1536]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={7}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-6, 3, -6]} intensity={0.9} color="#b89b6a" />
        <group position={[3.1, 0, -0.8]} scale={0.82}>
          <Composition />
        </group>
      </Canvas>
    </div>
  );
}
