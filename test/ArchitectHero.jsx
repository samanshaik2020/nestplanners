import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────── STYLES ────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white: #fafaf8;
    --off-white: #f2f0ec;
    --stone: #c8c4bc;
    --graphite: #5a5650;
    --ink: #1a1814;
    --accent: #8b7355;
  }

  body {
    background: var(--white);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
  }

  .hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    min-height: 600px;
    background: var(--white);
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .canvas-wrapper {
    position: absolute;
    inset: 0;
  }

  .overlay {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 8vw;
    pointer-events: none;
    max-width: 560px;
  }

  .tag {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.9s 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .headline {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(52px, 6vw, 88px);
    line-height: 1.04;
    color: var(--ink);
    opacity: 0;
    transform: translateY(24px);
    animation: fadeUp 1s 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .headline em {
    font-style: italic;
    color: var(--accent);
  }

  .sub {
    margin-top: 28px;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--graphite);
    line-height: 1.8;
    max-width: 340px;
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.9s 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .cta-row {
    margin-top: 48px;
    display: flex;
    gap: 20px;
    align-items: center;
    pointer-events: all;
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.9s 1.1s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .btn-primary {
    padding: 13px 32px;
    background: var(--ink);
    color: var(--white);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

  .btn-outline {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--graphite);
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid var(--stone);
    padding-bottom: 2px;
    transition: color 0.3s;
  }
  .btn-outline:hover { color: var(--ink); }

  /* corner marks */
  .corner {
    position: absolute;
    width: 28px;
    height: 28px;
    border-color: var(--stone);
    border-style: solid;
    opacity: 0;
    animation: fadeIn 1s 1.4s ease forwards;
  }
  .corner-tl { top: 32px; left: 32px; border-width: 1px 0 0 1px; }
  .corner-tr { top: 32px; right: 32px; border-width: 1px 1px 0 0; }
  .corner-bl { bottom: 32px; left: 32px; border-width: 0 0 1px 1px; }
  .corner-br { bottom: 32px; right: 32px; border-width: 0 1px 1px 0; }

  /* ruler ticks */
  .ruler-v {
    position: absolute;
    right: 52px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 6px;
    opacity: 0;
    animation: fadeIn 1.2s 1.6s ease forwards;
  }
  .tick {
    width: 14px;
    height: 1px;
    background: var(--stone);
  }
  .tick-l { width: 22px; }

  /* measurement label */
  .measure-label {
    position: absolute;
    bottom: 60px;
    right: 80px;
    font-size: 9px;
    letter-spacing: 0.15em;
    color: var(--stone);
    opacity: 0;
    animation: fadeIn 1s 1.8s ease forwards;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .measure-line {
    width: 60px;
    height: 1px;
    background: var(--stone);
    position: relative;
  }
  .measure-line::before, .measure-line::after {
    content: '';
    position: absolute;
    top: -3px;
    width: 1px;
    height: 7px;
    background: var(--stone);
  }
  .measure-line::before { left: 0; }
  .measure-line::after { right: 0; }

  /* scroll indicator */
  .scroll-hint {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 1s 2s ease forwards;
  }
  .scroll-hint span {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: var(--stone);
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px;
    height: 36px;
    background: linear-gradient(to bottom, var(--stone), transparent);
    animation: scrollAnim 2s 2.5s ease-in-out infinite;
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  @keyframes scrollAnim {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    51% { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }

  /* blueprint floating papers */
  .bp-paper {
    position: absolute;
    border: 1px solid rgba(139,115,85,0.12);
    background: rgba(250,250,248,0.6);
    opacity: 0;
    animation: bpFloat var(--dur) var(--delay) ease-in-out infinite;
  }
  @keyframes bpFloat {
    0%  { opacity: 0; transform: translateY(0) rotate(var(--rot)); }
    10% { opacity: 0.4; }
    90% { opacity: 0.4; }
    100%{ opacity: 0; transform: translateY(-40px) rotate(calc(var(--rot) + 4deg)); }
  }

  @media (max-width: 768px) {
    .overlay { padding: 0 6vw; max-width: 100%; }
    .headline { font-size: clamp(40px, 10vw, 60px); }
    .ruler-v { display: none; }
    .corner { width: 20px; height: 20px; }
    .corner-tl { top: 20px; left: 20px; }
    .corner-tr { top: 20px; right: 20px; }
    .corner-bl { bottom: 20px; left: 20px; }
    .corner-br { bottom: 20px; right: 20px; }
  }
`;

/* ─────────────────────── 3D HOUSE MODEL ────────────────────────── */
function HouseModel({ risen }) {
  const groupRef = useRef();
  const wireRef = useRef();

  // Clay material
  const clayMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8e4de",
        roughness: 0.88,
        metalness: 0.02,
      }),
    []
  );

  const glassMatFront = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8d4dc",
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bab6b0",
        roughness: 0.95,
        metalness: 0,
      }),
    []
  );

  // Auto-rotate & entrance
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.12;
    // wire fade based on risen state
    if (wireRef.current) {
      wireRef.current.children.forEach((c) => {
        c.material.opacity = THREE.MathUtils.lerp(
          c.material.opacity,
          risen ? 0.18 : 0.45,
          0.03
        );
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Main body ── */}
      <mesh castShadow receiveShadow material={clayMat}>
        <boxGeometry args={[2.4, 1.4, 1.6]} />
      </mesh>

      {/* ── Recessed entry volume ── */}
      <mesh position={[0, -0.18, 0.82]} castShadow material={darkMat}>
        <boxGeometry args={[0.7, 1.04, 0.04]} />
      </mesh>

      {/* ── Front facade panel lines (flat boxes) ── */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.81]} castShadow material={glassMatFront}>
          <boxGeometry args={[0.48, 0.9, 0.02]} />
        </mesh>
      ))}

      {/* ── Roof pitch ── */}
      <mesh position={[0, 0.95, 0]} castShadow material={clayMat}>
        <cylinderGeometry
          args={[0, 1.44, 0.78, 4, 1]}
          onUpdate={(g) => {
            g.rotateY(Math.PI / 4);
          }}
        />
      </mesh>

      {/* ── Roof overhang strip ── */}
      <mesh position={[0, 0.72, 0]} castShadow material={darkMat}>
        <boxGeometry args={[2.6, 0.06, 1.78]} />
      </mesh>

      {/* ── Chimney ── */}
      <mesh position={[0.7, 1.45, -0.25]} castShadow material={clayMat}>
        <boxGeometry args={[0.22, 0.52, 0.22]} />
      </mesh>
      <mesh position={[0.7, 1.73, -0.25]} material={darkMat}>
        <boxGeometry args={[0.27, 0.05, 0.27]} />
      </mesh>

      {/* ── Side window strip ── */}
      <mesh position={[1.21, 0.1, 0.2]} castShadow material={glassMatFront}>
        <boxGeometry args={[0.02, 0.55, 0.8]} />
      </mesh>
      <mesh position={[-1.21, 0.1, 0.2]} castShadow material={glassMatFront}>
        <boxGeometry args={[0.02, 0.55, 0.8]} />
      </mesh>

      {/* ── Base plinth ── */}
      <mesh position={[0, -0.76, 0]} receiveShadow material={darkMat}>
        <boxGeometry args={[2.6, 0.12, 1.78]} />
      </mesh>

      {/* ── Steps ── */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.68 - i * 0.08, 0.84 + i * 0.14]}
          material={darkMat}
          receiveShadow
        >
          <boxGeometry args={[0.78 + i * 0.12, 0.08, 0.13]} />
        </mesh>
      ))}

      {/* ── Wireframe overlay group ── */}
      <group ref={wireRef}>
        {[
          { geo: [2.4, 1.4, 1.6], pos: [0, 0, 0] },
          { geo: [2.6, 0.12, 1.78], pos: [0, -0.76, 0] },
        ].map((d, i) => (
          <mesh key={i} position={d.pos}>
            <boxGeometry args={d.geo} />
            <meshBasicMaterial
              color="#8b7355"
              wireframe
              transparent
              opacity={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ──────────────────── BLUEPRINT GRID ───────────────────────────── */
function BlueprintGrid({ visible }) {
  const meshRef = useRef();
  const linesRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.material.opacity = THREE.MathUtils.lerp(
      meshRef.current.material.opacity,
      visible ? 0.55 : 0,
      0.04
    );
    if (linesRef.current) {
      linesRef.current.children.forEach((c) => {
        c.material.opacity = THREE.MathUtils.lerp(
          c.material.opacity,
          visible ? 0.5 : 0,
          0.04
        );
      });
    }
  });

  // Generate radial + rectangular grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const mat = () =>
      new THREE.LineBasicMaterial({
        color: "#8b7355",
        transparent: true,
        opacity: 0,
      });

    // Orthogonal grid
    for (let i = -5; i <= 5; i++) {
      const pts1 = [new THREE.Vector3(i, 0, -5), new THREE.Vector3(i, 0, 5)];
      const pts2 = [new THREE.Vector3(-5, 0, i), new THREE.Vector3(5, 0, i)];
      lines.push(
        <line key={`gx${i}`} geometry={new THREE.BufferGeometry().setFromPoints(pts1)}>
          <lineBasicMaterial color="#8b7355" transparent opacity={0} />
        </line>
      );
      lines.push(
        <line key={`gz${i}`} geometry={new THREE.BufferGeometry().setFromPoints(pts2)}>
          <lineBasicMaterial color="#8b7355" transparent opacity={0} />
        </line>
      );
    }

    // Diagonal cross lines
    for (let r = 1; r <= 4; r++) {
      const pts = [];
      const segs = 64;
      for (let j = 0; j <= segs; j++) {
        const a = (j / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
      }
      lines.push(
        <line key={`circ${r}`} geometry={new THREE.BufferGeometry().setFromPoints(pts)}>
          <lineBasicMaterial color="#8b7355" transparent opacity={0} />
        </line>
      );
    }

    return lines;
  }, []);

  return (
    <group position={[0, -0.82, 0]}>
      {/* Base plane subtle tint */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#f5f0e8" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <group ref={linesRef}>{gridLines}</group>
    </group>
  );
}

/* ─────────────── MEASUREMENT LINES (floating) ──────────────────── */
function MeasureLines({ visible }) {
  const groupRef = useRef();

  const lines = useMemo(() => {
    const result = [];
    const mat = new THREE.LineBasicMaterial({
      color: "#8b7355",
      transparent: true,
      opacity: 0,
    });

    // Dimension arrows around house
    const specs = [
      { pts: [new THREE.Vector3(-1.4, 0.1, 1.1), new THREE.Vector3(1.4, 0.1, 1.1)] },
      { pts: [new THREE.Vector3(1.5, -0.7, -0.9), new THREE.Vector3(1.5, 0.7, -0.9)] },
    ];
    specs.forEach((s, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints(s.pts);
      result.push(
        <line key={i} geometry={geo}>
          <lineBasicMaterial color="#8b7355" transparent opacity={0} />
        </line>
      );
    });
    return result;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((c) => {
      if (c.material) {
        c.material.opacity = THREE.MathUtils.lerp(
          c.material.opacity,
          visible ? 0.4 : 0,
          0.05
        );
      }
    });
  });

  return <group ref={groupRef}>{lines}</group>;
}

/* ─────────────────── CAMERA RIG (parallax) ─────────────────────── */
function CameraRig({ mouseRef, scrollY }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(3.5, 3, 5));

  useFrame(() => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Parallax offset
    const px = mx * 0.6;
    const py = my * 0.4;

    // Scroll zoom
    const scrollFactor = 1 + scrollY.current * 0.0004;

    targetPos.current.set(
      3.5 + px,
      3 + py,
      5 * scrollFactor
    );

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0.3, 0);
  });

  return null;
}

/* ─────────────────── ENTRANCE ANIMATION ────────────────────────── */
function HouseEntrance({ children }) {
  const groupRef = useRef();
  const startY = useRef(-3);
  const targetY = useRef(0);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;
    const t = Math.min(elapsed.current / 2.2, 1); // 2.2s rise
    // Ease out quart
    const e = 1 - Math.pow(1 - t, 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(startY.current, targetY.current, e);
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ───────────────────── MAIN SCENE ──────────────────────────────── */
function Scene({ mouseRef, scrollY }) {
  const [risen, setRisen] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGridVisible(true), 400);
    const t2 = setTimeout(() => setRisen(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <CameraRig mouseRef={mouseRef} scrollY={scrollY} />

      {/* Lighting */}
      <ambientLight intensity={1.2} color="#f5f0ea" />
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        color="#fff8f0"
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#e0eaf5" />
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#fff5e8" />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Blueprint */}
      <BlueprintGrid visible={gridVisible} />
      <MeasureLines visible={risen} />

      {/* House */}
      <HouseEntrance>
        <Float speed={0.6} rotationIntensity={0} floatIntensity={0.3}>
          <HouseModel risen={risen} />
        </Float>
      </HouseEntrance>

      {/* Shadows */}
      <ContactShadows
        position={[0, -0.82, 0]}
        opacity={0.38}
        scale={9}
        blur={2.8}
        far={4}
        color="#1a1410"
      />
    </>
  );
}

/* ─────────────────── FLOATING PAPER ELEMENTS ────────────────────── */
function BlueprintPapers() {
  const papers = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        w: 80 + Math.random() * 60,
        h: 60 + Math.random() * 50,
        top: 15 + Math.random() * 60,
        left: 10 + Math.random() * 80,
        rot: -8 + Math.random() * 16,
        dur: 8 + Math.random() * 6,
        delay: i * 1.5,
      })),
    []
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {papers.map((p) => (
        <div
          key={p.id}
          className="bp-paper"
          style={{
            width: p.w,
            height: p.h,
            top: `${p.top}%`,
            left: `${p.left}%`,
            "--rot": `${p.rot}deg`,
            "--dur": `${p.dur}s`,
            "--delay": `${p.delay}s`,
          }}
        >
          {/* tiny blueprint lines inside paper */}
          <svg
            width="100%"
            height="100%"
            style={{ opacity: 0.4 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: Math.floor(p.h / 12) }).map((_, i) => (
              <line
                key={i}
                x1="8"
                y1={8 + i * 12}
                x2={p.w - 8}
                y2={8 + i * 12}
                stroke="#8b7355"
                strokeWidth="0.5"
              />
            ))}
            <rect
              x="4"
              y="4"
              width={p.w - 8}
              height={p.h - 8}
              fill="none"
              stroke="#8b7355"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── HERO SECTION ───────────────────────────────── */
export default function HeroSection() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const handleScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="hero">
        {/* 3D Canvas */}
        <div className="canvas-wrapper">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [3.5, 3, 5], fov: 38, near: 0.1, far: 100 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <Suspense fallback={null}>
              <Scene mouseRef={mouseRef} scrollY={scrollY} />
            </Suspense>
          </Canvas>
        </div>

        {/* Floating blueprint papers */}
        <BlueprintPapers />

        {/* Corner marks */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Ruler ticks */}
        <div className="ruler-v">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`tick${i % 4 === 0 ? " tick-l" : ""}`} />
          ))}
        </div>

        {/* Measurement label */}
        <div className="measure-label">
          <span>12.4 M</span>
          <div className="measure-line" />
        </div>

        {/* Text overlay */}
        <div className="overlay">
          <div className="tag">Studio Forma — 2025</div>
          <h1 className="headline">
            Where <em>Form</em>
            <br />
            Meets Vision
          </h1>
          <p className="sub">
            We translate architectural concepts into living spaces — precision-crafted,
            humanly scaled, and built to endure.
          </p>
          <div className="cta-row">
            <button className="btn-primary">View Projects</button>
            <button className="btn-outline">Our Process</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}
