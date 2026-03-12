'use client';

import { useRef, useEffect, useState, Suspense, useMemo, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Inline styles ───────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --white:#fafaf8; --off-white:#f2f0ec; --stone:#c8c4bc; --graphite:#5a5650; --ink:#1a1814; --accent:#8b7355; }
  body { background: var(--white); font-family: 'DM Mono', monospace; overflow-x: hidden; }
  .ah-hero { position:relative; width:100vw; height:100vh; min-height:600px; background:var(--white); overflow:hidden; display:flex; align-items:center; }
  .ah-canvas { position:absolute; inset:0; }
  .ah-overlay { position:relative; z-index:10; display:flex; flex-direction:column; justify-content:center; padding:0 8vw; pointer-events:none; max-width:560px; }
  .ah-tag { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:var(--accent); margin-bottom:28px; opacity:0; transform:translateY(16px); animation:ahFadeUp 0.9s 0.4s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ah-headline { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:clamp(52px,6vw,88px); line-height:1.04; color:var(--ink); opacity:0; transform:translateY(24px); animation:ahFadeUp 1s 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ah-headline em { font-style:italic; color:var(--accent); }
  .ah-sub { margin-top:28px; font-size:11px; letter-spacing:0.08em; color:var(--graphite); line-height:1.8; max-width:340px; opacity:0; transform:translateY(16px); animation:ahFadeUp 0.9s 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ah-cta { margin-top:48px; display:flex; gap:20px; align-items:center; pointer-events:all; opacity:0; transform:translateY(16px); animation:ahFadeUp 0.9s 1.1s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ah-btn-p { padding:13px 32px; background:var(--ink); color:var(--white); font-family:'DM Mono',monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; border:none; cursor:pointer; transition:background .3s,transform .2s; }
  .ah-btn-p:hover { background:var(--accent); transform:translateY(-1px); }
  .ah-btn-o { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:var(--graphite); background:none; border:none; cursor:pointer; border-bottom:1px solid var(--stone); padding-bottom:2px; transition:color .3s; }
  .ah-btn-o:hover { color:var(--ink); }
  .ah-corner { position:absolute; width:28px; height:28px; border-color:var(--stone); border-style:solid; opacity:0; animation:ahFadeIn 1s 1.4s ease forwards; }
  .ah-corner-tl { top:32px; left:32px; border-width:1px 0 0 1px; }
  .ah-corner-tr { top:32px; right:32px; border-width:1px 1px 0 0; }
  .ah-corner-bl { bottom:32px; left:32px; border-width:0 0 1px 1px; }
  .ah-corner-br { bottom:32px; right:32px; border-width:0 1px 1px 0; }
  .ah-ruler { position:absolute; right:52px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:6px; opacity:0; animation:ahFadeIn 1.2s 1.6s ease forwards; }
  .ah-tick { width:14px; height:1px; background:var(--stone); }
  .ah-tick-l { width:22px; }
  .ah-mlabel { position:absolute; bottom:60px; right:80px; font-size:9px; letter-spacing:0.15em; color:var(--stone); opacity:0; animation:ahFadeIn 1s 1.8s ease forwards; display:flex; align-items:center; gap:8px; }
  .ah-mline { width:60px; height:1px; background:var(--stone); position:relative; }
  .ah-mline::before, .ah-mline::after { content:''; position:absolute; top:-3px; width:1px; height:7px; background:var(--stone); }
  .ah-mline::before { left:0; } .ah-mline::after { right:0; }
  .ah-scroll { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0; animation:ahFadeIn 1s 2s ease forwards; }
  .ah-scroll span { font-size:9px; letter-spacing:0.2em; color:var(--stone); text-transform:uppercase; }
  .ah-sline { width:1px; height:36px; background:linear-gradient(to bottom,var(--stone),transparent); animation:ahScrollAnim 2s 2.5s ease-in-out infinite; }
  .ah-paper { position:absolute; border:1px solid rgba(139,115,85,0.12); background:rgba(250,250,248,0.6); opacity:0; animation:ahBpFloat var(--dur) var(--delay) ease-in-out infinite; }
  @keyframes ahFadeUp { to { opacity:1; transform:translateY(0); } }
  @keyframes ahFadeIn { to { opacity:1; } }
  @keyframes ahScrollAnim { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
  @keyframes ahBpFloat { 0%{opacity:0;transform:translateY(0) rotate(var(--rot))} 10%{opacity:0.4} 90%{opacity:0.4} 100%{opacity:0;transform:translateY(-40px) rotate(calc(var(--rot) + 4deg))} }
  @media (max-width:768px) { .ah-overlay{padding:0 6vw;max-width:100%} .ah-headline{font-size:clamp(40px,10vw,60px)} .ah-ruler{display:none} }
`;

/* ─── House Model ─────────────────────────────────────────────────── */
function HouseModel({ risen }: { risen: boolean }) {
    const groupRef = useRef<THREE.Group>(null!);
    const wireRef = useRef<THREE.Group>(null!);

    const clayMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e8e4de', roughness: 0.88, metalness: 0.02 }), []);
    const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#bab6b0', roughness: 0.95, metalness: 0 }), []);
    const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c8d4dc', roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.55 }), []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        wireRef.current?.children.forEach((c) => {
            (c as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.opacity =
                THREE.MathUtils.lerp((c as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.opacity, risen ? 0.25 : 0.6, 0.03);
        });
    });

    const elements = useMemo(() => {
        return [
            // Floor
            { size: [4.4, 0.1, 4.4], pos: [0, -0.05, 0], mat: clayMat, wire: true },
            // North Wall
            { size: [4.4, 1.2, 0.1], pos: [0, 0.6, -2.15], mat: clayMat, wire: true },
            // East Wall
            { size: [0.1, 1.2, 4.2], pos: [2.15, 0.6, -0.05], mat: clayMat, wire: true },
            // South Half-Wall
            { size: [4.4, 0.2, 0.1], pos: [0, 0.1, 2.15], mat: clayMat, wire: true },
            // West Half-Wall
            { size: [0.1, 0.2, 4.2], pos: [-2.15, 0.1, -0.05], mat: clayMat, wire: true },

            // Internal Walls
            // Between Bathroom and Living (Horizontal)
            { size: [1.7, 1.0, 0.1], pos: [-1.3, 0.5, 0], mat: clayMat, wire: true },
            // Between Bathroom and Bedroom (Vertical)
            { size: [0.1, 1.0, 2.1], pos: [-0.4, 0.5, 1.1], mat: clayMat, wire: true },

            // LIVING ROOM (Top Left)
            // Sofa Seat
            { size: [1.2, 0.15, 0.6], pos: [-1.3, 0.075, -1.6], mat: darkMat },
            // Sofa Back
            { size: [1.2, 0.35, 0.15], pos: [-1.3, 0.175, -1.9], mat: darkMat },
            // Sofa Armrests
            { size: [0.15, 0.25, 0.6], pos: [-1.825, 0.125, -1.6], mat: darkMat },
            { size: [0.15, 0.25, 0.6], pos: [-0.775, 0.125, -1.6], mat: darkMat },
            // Picture Frame
            { size: [0.8, 0.4, 0.05], pos: [-1.3, 0.7, -2.05], mat: glassMat },
            // Coffee Table
            { size: [0.7, 0.08, 0.4], pos: [-1.3, 0.04, -0.9], mat: glassMat },
            // Rug
            { size: [1.6, 0.02, 1.4], pos: [-1.3, 0.01, -1.1], mat: darkMat },

            // BATHROOM (Bottom Left)
            // Bath Tub
            { size: [0.8, 0.2, 1.6], pos: [-1.7, 0.1, 1.30], mat: darkMat },
            // Sink Counter
            { size: [0.5, 0.4, 0.8], pos: [-0.7, 0.2, 0.6], mat: darkMat },
            // Toilet
            { size: [0.3, 0.25, 0.4], pos: [-0.85, 0.125, 1.6], mat: clayMat },
            { size: [0.3, 0.4, 0.15], pos: [-0.65, 0.2, 1.6], mat: clayMat },

            // KITCHEN / DINING (Top Right)
            // Dining Table
            { size: [1.0, 0.05, 0.8], pos: [0.9, 0.35, -1.2], mat: darkMat },
            { size: [0.1, 0.35, 0.1], pos: [0.9, 0.175, -1.2], mat: darkMat },
            // Chairs
            { size: [0.25, 0.2, 0.25], pos: [0.9, 0.1, -1.75], mat: clayMat },
            { size: [0.25, 0.2, 0.25], pos: [0.9, 0.1, -0.65], mat: clayMat },
            { size: [0.25, 0.2, 0.25], pos: [0.25, 0.1, -1.2], mat: clayMat },
            { size: [0.25, 0.2, 0.25], pos: [1.55, 0.1, -1.2], mat: clayMat },
            // Kitchen Counter Island
            { size: [1.9, 0.4, 0.5], pos: [1.1, 0.2, -0.1], mat: darkMat },
            { size: [0.4, 0.02, 0.3], pos: [0.7, 0.41, -0.1], mat: glassMat }, // sink
            { size: [0.4, 0.02, 0.3], pos: [1.5, 0.41, -0.1], mat: clayMat }, // stove

            // BEDROOM (Bottom Right)
            // Bed
            { size: [1.4, 0.15, 1.6], pos: [1.0, 0.075, 1.1], mat: darkMat }, // frame
            { size: [1.3, 0.1, 1.1], pos: [1.0, 0.2, 1.3], mat: clayMat }, // mattress
            { size: [0.5, 0.05, 0.3], pos: [0.65, 0.18, 0.65], mat: clayMat }, // pillow 1
            { size: [0.5, 0.05, 0.3], pos: [1.35, 0.18, 0.65], mat: clayMat }, // pillow 2
            // Wardrobe
            { size: [1.6, 0.8, 0.4], pos: [1.0, 0.4, 1.95], mat: darkMat },

            // WINDOWS (Glass details in walls)
            { size: [0.8, 0.4, 0.12], pos: [-1.3, 0.6, -2.15], mat: glassMat },
            { size: [1.2, 0.4, 0.12], pos: [0.9, 0.6, -2.15], mat: glassMat },
            { size: [0.12, 0.4, 1.0], pos: [2.15, 0.6, -1.0], mat: glassMat },
        ];
    }, [clayMat, darkMat, glassMat]);

    return (
        <group ref={groupRef}>
            {elements.map((el, i) => (
                <mesh key={i} position={el.pos as [number, number, number]} castShadow receiveShadow material={el.mat}>
                    <boxGeometry args={el.size as [number, number, number]} />
                </mesh>
            ))}
            <group ref={wireRef}>
                {elements.filter(el => el.wire).map((el, i) => (
                    <mesh key={i} position={el.pos as [number, number, number]}>
                        <boxGeometry args={el.size as [number, number, number]} />
                        <meshBasicMaterial color="#8b7355" wireframe transparent opacity={0.2} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

/* ─── Blueprint Grid ──────────────────────────────────────────────── */
function BlueprintGrid({ visible }: { visible: boolean }) {
    const planeRef = useRef<THREE.Mesh>(null!);
    const linesRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (!planeRef.current) return;
        (planeRef.current.material as THREE.MeshBasicMaterial).opacity =
            THREE.MathUtils.lerp((planeRef.current.material as THREE.MeshBasicMaterial).opacity, visible ? 0.55 : 0, 0.04);
        linesRef.current?.children.forEach((c) => {
            (c as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>).material.opacity =
                THREE.MathUtils.lerp((c as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>).material.opacity, visible ? 0.5 : 0, 0.04);
        });
    });

    const gridLines = useMemo(() => {
        const objects: THREE.Line[] = [];
        const mat = () => new THREE.LineBasicMaterial({ color: '#8b7355', transparent: true, opacity: 0 });
        for (let i = -5; i <= 5; i++) {
            const l1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, 0, -5), new THREE.Vector3(i, 0, 5)]), mat());
            const l2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, 0, i), new THREE.Vector3(5, 0, i)]), mat());
            objects.push(l1, l2);
        }
        for (let r = 1; r <= 4; r++) {
            const pts = Array.from({ length: 65 }, (_, j) => new THREE.Vector3(Math.cos((j / 64) * Math.PI * 2) * r, 0, Math.sin((j / 64) * Math.PI * 2) * r));
            objects.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat()));
        }
        return objects;
    }, []);

    return (
        <group position={[0, -0.82, 0]}>
            <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color="#f5f0e8" transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>
            <group ref={linesRef}>
                {gridLines.map((obj, i) => <primitive key={i} object={obj} />)}
            </group>
        </group>
    );
}

/* ─── Measure Lines ───────────────────────────────────────────────── */
function MeasureLines({ visible }: { visible: boolean }) {
    const groupRef = useRef<THREE.Group>(null!);
    const lineObjects = useMemo(() => {
        const specs = [
            [new THREE.Vector3(-1.4, 0.1, 1.1), new THREE.Vector3(1.4, 0.1, 1.1)],
            [new THREE.Vector3(1.5, -0.7, -0.9), new THREE.Vector3(1.5, 0.7, -0.9)],
        ];
        return specs.map((pts) => new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: '#8b7355', transparent: true, opacity: 0 })
        ));
    }, []);

    useFrame(() => {
        groupRef.current?.children.forEach((c) => {
            (c as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>).material.opacity =
                THREE.MathUtils.lerp((c as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>).material.opacity, visible ? 0.4 : 0, 0.05);
        });
    });

    return <group ref={groupRef}>{lineObjects.map((obj, i) => <primitive key={i} object={obj} />)}</group>;
}

/* ─── Camera Rig ──────────────────────────────────────────────────── */
function CameraRig({ mouseRef, scrollY }: { mouseRef: MutableRefObject<{ x: number; y: number }>; scrollY: MutableRefObject<number> }) {
    const { camera } = useThree();
    const target = useRef(new THREE.Vector3(3.5, 3, 5));
    useFrame(() => {
        target.current.set(3.5 + mouseRef.current.x * 0.6, 3 + mouseRef.current.y * 0.4, 5 * (1 + scrollY.current * 0.0004));
        camera.position.lerp(target.current, 0.05);
        camera.lookAt(0, 0.3, 0);
    });
    return null;
}

/* ─── Entrance rise ───────────────────────────────────────────────── */
function HouseEntrance({ children }: { children: React.ReactNode }) {
    const ref = useRef<THREE.Group>(null!);
    const elapsed = useRef(0);
    useFrame((_, delta) => {
        if (!ref.current) return;
        elapsed.current += delta;
        const t = Math.min(elapsed.current / 2.2, 1);
        const e = 1 - Math.pow(1 - t, 4);
        ref.current.position.y = THREE.MathUtils.lerp(-3, 0, e);
    });
    return <group ref={ref}>{children}</group>;
}

/* ─── Full Scene ──────────────────────────────────────────────────── */
function Scene({ mouseRef, scrollY }: { mouseRef: MutableRefObject<{ x: number; y: number }>; scrollY: MutableRefObject<number> }) {
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
            <ambientLight intensity={1.2} color="#f5f0ea" />
            <directionalLight position={[6, 8, 4]} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-far={30} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} color="#fff8f0" />
            <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#e0eaf5" />
            <pointLight position={[0, 4, 0]} intensity={0.4} color="#fff5e8" />
            <Environment preset="studio" />
            <BlueprintGrid visible={gridVisible} />
            <MeasureLines visible={risen} />
            <HouseEntrance>
                <Float speed={0.6} rotationIntensity={0} floatIntensity={0.3}>
                    <HouseModel risen={risen} />
                </Float>
            </HouseEntrance>
            <ContactShadows position={[0, -0.82, 0]} opacity={0.38} scale={9} blur={2.8} far={4} color="#1a1410" />
        </>
    );
}

/* ─── Floating blueprint papers ───────────────────────────────────── */
const LABELS = ['PLAN VIEW A-A', 'ELEVATION 01', 'SECTION B-B', 'DETAIL 04', 'ROOF PLAN'];

function BlueprintPapers() {
    const papers = useMemo(() =>
        Array.from({ length: 5 }, (_, i) => ({
            id: i, w: 80 + Math.random() * 60, h: 60 + Math.random() * 50,
            top: 15 + Math.random() * 60, left: 10 + Math.random() * 80,
            rot: -8 + Math.random() * 16, dur: 8 + Math.random() * 6, delay: i * 1.5,
        })), []);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {papers.map((p) => (
                <div key={p.id} className="ah-paper" style={{ width: p.w, height: p.h, top: `${p.top}%`, left: `${p.left}%`, ['--rot' as string]: `${p.rot}deg`, ['--dur' as string]: `${p.dur}s`, ['--delay' as string]: `${p.delay}s` }}>
                    <svg width="100%" height="100%" style={{ opacity: 0.4 }}>
                        {Array.from({ length: Math.floor(p.h / 12) }).map((_, j) => (
                            <line key={j} x1="8" y1={8 + j * 12} x2={p.w - 8} y2={8 + j * 12} stroke="#8b7355" strokeWidth="0.5" />
                        ))}
                        <rect x="4" y="4" width={p.w - 8} height={p.h - 8} fill="none" stroke="#8b7355" strokeWidth="0.8" />
                        <text x="8" y={p.h - 10} fontFamily="DM Mono,monospace" fontSize="6" fill="#8b7355" opacity="0.6">{LABELS[p.id]}</text>
                    </svg>
                </div>
            ))}
        </div>
    );
}

/* ─── Main export ─────────────────────────────────────────────────── */
export default function ArchitectHero() {
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollY = useRef(0);

    useEffect(() => {
        const onMouse = (e: MouseEvent) => { mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2; mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2; };
        const onScroll = () => { scrollY.current = window.scrollY; };
        window.addEventListener('mousemove', onMouse);
        window.addEventListener('scroll', onScroll);
        return () => { window.removeEventListener('mousemove', onMouse); window.removeEventListener('scroll', onScroll); };
    }, []);

    return (
        <>
            <style>{css}</style>
            <section className="ah-hero">
                {/* 3D Canvas */}
                <div className="ah-canvas">
                    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [3.5, 3, 5], fov: 38, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true }}>
                        <Suspense fallback={null}>
                            <Scene mouseRef={mouseRef} scrollY={scrollY} />
                        </Suspense>
                    </Canvas>
                </div>

                <BlueprintPapers />

                {/* Corner marks */}
                <div className="ah-corner ah-corner-tl" />
                <div className="ah-corner ah-corner-tr" />
                <div className="ah-corner ah-corner-bl" />
                <div className="ah-corner ah-corner-br" />

                {/* Ruler ticks */}
                <div className="ah-ruler">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className={`ah-tick${i % 4 === 0 ? ' ah-tick-l' : ''}`} />
                    ))}
                </div>

                {/* Measurement label */}
                <div className="ah-mlabel">
                    <span>12.4 M</span>
                    <div className="ah-mline" />
                </div>

                {/* Text overlay */}
                <div className="ah-overlay">
                    <div className="ah-tag">Studio Forma — 2025</div>
                    <h1 className="ah-headline">Where <em>Form</em><br />Meets Vision</h1>
                    <p className="ah-sub">We translate architectural concepts into living spaces — precision-crafted, humanly scaled, and built to endure.</p>
                    <div className="ah-cta">
                        <button className="ah-btn-p">View Projects</button>
                        <button className="ah-btn-o">Our Process</button>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="ah-scroll">
                    <span>Scroll</span>
                    <div className="ah-sline" />
                </div>
            </section>
        </>
    );
}
