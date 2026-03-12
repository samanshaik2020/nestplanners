'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFlythroughStore } from '@/store/useFlythroughStore';

// ─── Waypoints ────────────────────────────────────────────────────────────────
export const WAYPOINTS = [
    { position: new THREE.Vector3(0, 8, 28), target: new THREE.Vector3(0, 3, 0), label: 'Exterior' },
    { position: new THREE.Vector3(6, 4, 14), target: new THREE.Vector3(0, 2, 0), label: 'Entrance Foyer' },
    { position: new THREE.Vector3(-4, 3, 4), target: new THREE.Vector3(0, 2, 0), label: 'Great Room' },
    { position: new THREE.Vector3(8, 9, -4), target: new THREE.Vector3(0, 4, -2), label: 'Infinity Terrace' },
    { position: new THREE.Vector3(-2, 14, -8), target: new THREE.Vector3(0, 2, 0), label: 'Sky View' },
    { position: new THREE.Vector3(-12, 10, -14), target: new THREE.Vector3(0, 0, 0), label: 'Night View' },
];

export const ROOM_TO_WAYPOINT: Record<string, number> = {
    'Entrance Foyer': 1,
    'Great Room': 2,
    'Master Suite': 2,
    'Wine Cellar': 3,
    'Infinity Pool': 4,
    'Sky Terrace': 5,
};

// ─── Materials ────────────────────────────────────────────────────────────────
const CONCRETE = new THREE.MeshStandardMaterial({ color: '#2a2725', roughness: 0.85, metalness: 0.05 });
const GLASS = new THREE.MeshStandardMaterial({ color: '#8BAEBD', roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.45 });
const STEEL = new THREE.MeshStandardMaterial({ color: '#D4BFA8', roughness: 0.2, metalness: 0.8 });
const GROUND = new THREE.MeshStandardMaterial({ color: '#1a1916', roughness: 0.95 });

// ─── Procedural building ──────────────────────────────────────────────────────
function Building() {
    return (
        <group>
            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow material={GROUND}>
                <planeGeometry args={[120, 120]} />
            </mesh>

            {/* ── Main body ── */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow material={CONCRETE}>
                <boxGeometry args={[14, 10, 10]} />
            </mesh>

            {/* ── Glass facade (front) ── */}
            <mesh position={[0, 5, 5.05]} castShadow material={GLASS}>
                <boxGeometry args={[13.8, 9.8, 0.12]} />
            </mesh>

            {/* ── Glass facade (back) ── */}
            <mesh position={[0, 5, -5.05]} material={GLASS}>
                <boxGeometry args={[13.8, 9.8, 0.12]} />
            </mesh>

            {/* ── Upper floor / rooftop terrace ── */}
            <mesh position={[0, 11, 0]} castShadow receiveShadow material={CONCRETE}>
                <boxGeometry args={[16, 1.2, 12]} />
            </mesh>

            {/* ── Left tower ── */}
            <mesh position={[-9, 9, 0]} castShadow receiveShadow material={CONCRETE}>
                <boxGeometry args={[4, 18, 8]} />
            </mesh>
            <mesh position={[-9, 9, 4.06]} material={GLASS}>
                <boxGeometry args={[3.8, 17.8, 0.12]} />
            </mesh>

            {/* ── Right tower ── */}
            <mesh position={[9, 12, 0]} castShadow receiveShadow material={CONCRETE}>
                <boxGeometry args={[4, 24, 8]} />
            </mesh>
            <mesh position={[9, 12, 4.06]} material={GLASS}>
                <boxGeometry args={[3.8, 23.8, 0.12]} />
            </mesh>

            {/* ── Roof overhang fins ── */}
            {[-6, -3, 0, 3, 6].map((x) => (
                <mesh key={x} position={[x, 11.8, 7]} material={STEEL} castShadow>
                    <boxGeometry args={[0.2, 0.15, 4]} />
                </mesh>
            ))}

            {/* ── Entrance canopy ── */}
            <mesh position={[0, 3.2, 7]} castShadow material={STEEL}>
                <boxGeometry args={[5, 0.15, 4]} />
            </mesh>
            {/* Entrance pillars */}
            {[-2, 0, 2].map((x) => (
                <mesh key={x} position={[x, 1.5, 6]} castShadow material={STEEL}>
                    <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
                </mesh>
            ))}

            {/* ── Infinity pool (rooftop) ── */}
            <mesh position={[0, 12, 0]} receiveShadow material={GLASS}>
                <boxGeometry args={[10, 0.3, 5]} />
            </mesh>
            {/* Pool lip */}
            <mesh position={[0, 11.75, 2.5]} material={STEEL}>
                <boxGeometry args={[10.2, 0.15, 0.1]} />
            </mesh>

            {/* ── Horizontal screen fins (left tower) ── */}
            {[3, 5, 7, 9, 11, 13, 15].map((y) => (
                <mesh key={y} position={[-9, y, 4.3]} material={STEEL}>
                    <boxGeometry args={[3.6, 0.12, 0.4]} />
                </mesh>
            ))}

            {/* ── Terrace railing ── */}
            <mesh position={[0, 11.7, 6.1]} material={GLASS}>
                <boxGeometry args={[12, 1.2, 0.06]} />
            </mesh>

            {/* ── Side walkway ── */}
            <mesh position={[0, 0.05, 8]} receiveShadow material={GROUND}>
                <boxGeometry args={[8, 0.1, 6]} />
            </mesh>

            {/* ── Landscape slabs ── */}
            {[[-18, 1, 0], [18, 0.5, 4], [0, 0.3, -18]].map(([x, y, z], i) => (
                <mesh key={i} position={[x as number, y as number, z as number]} receiveShadow material={CONCRETE}>
                    <boxGeometry args={[6, 0.3, 3]} />
                </mesh>
            ))}
        </group>
    );
}

// ─── Animated lights ──────────────────────────────────────────────────────────
function DynamicLights() {
    const sunRef = useRef<THREE.DirectionalLight>(null!);
    useFrame(({ clock }) => {
        // Subtle light intensity oscillation (simulates time-of-day shift as you scroll)
        const t = clock.elapsedTime;
        sunRef.current.intensity = 1.8 + Math.sin(t * 0.15) * 0.4;
    });
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight ref={sunRef} position={[20, 30, 15]} intensity={2} castShadow
                shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                shadow-camera-far={100} shadow-camera-left={-25}
                shadow-camera-right={25} shadow-camera-top={25} shadow-camera-bottom={-25} />
            <directionalLight position={[-15, 10, -10]} intensity={0.3} color="#D4BFA8" />
            <pointLight position={[0, 4, 9]} intensity={1.2} color="#fff8f0" distance={20} />
        </>
    );
}

// ─── Scroll-driven camera ─────────────────────────────────────────────────────
const _camPos = new THREE.Vector3();
const _camTarget = new THREE.Vector3();

function CinematicCamera() {
    const { camera } = useThree();
    const scroll = useScroll();
    const overrideRef = useRef<number | null>(null);
    const targetTime = useFlythroughStore((s) => s.targetTime);
    const setTarget = useFlythroughStore((s) => s.setTargetTime);

    const prevTarget = useRef<number | null>(null);
    if (prevTarget.current !== targetTime) {
        prevTarget.current = targetTime;
        if (targetTime !== null) overrideRef.current = targetTime;
    }

    useFrame(() => {
        const scrollT = scroll.offset * (WAYPOINTS.length - 1);

        if (overrideRef.current !== null) {
            overrideRef.current += (scrollT - overrideRef.current) * 0.04;
            if (Math.abs(overrideRef.current - scrollT) < 0.02) {
                overrideRef.current = null;
                setTarget(null);
            }
        }

        const t = overrideRef.current !== null ? overrideRef.current : scrollT;
        const i = Math.min(Math.floor(t), WAYPOINTS.length - 2);
        const alpha = t - i;

        _camPos.lerpVectors(WAYPOINTS[i].position, WAYPOINTS[i + 1].position, alpha);
        _camTarget.lerpVectors(WAYPOINTS[i].target, WAYPOINTS[i + 1].target, alpha);

        camera.position.lerp(_camPos, 0.05);
        camera.lookAt(_camTarget);
    });

    return null;
}

export default function ThreeFlythrough() {
    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 8, 28], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
        >
            <color attach="background" args={['#0c0b0a']} />
            <fog attach="fog" args={['#0c0b0a', 40, 100]} />

            <Suspense fallback={null}>
                <DynamicLights />
                <Building />
                <Environment preset="city" />
            </Suspense>

            <ScrollControls pages={5} damping={0.3}>
                <>
                    <CinematicCamera />
                    <OrbitControls enableDamping dampingFactor={0.05} />
                </>
            </ScrollControls>
        </Canvas>
    );
}
