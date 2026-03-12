'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { ArchModel } from './Model';

function HeroAnimation() {
    const groupRef = useRef<THREE.Group>(null!);
    const camRef = useRef<THREE.PerspectiveCamera>(null!);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;

        // 0.3 rotation per second (approx 1.88 radians/sec)
        // User probably meant a slow cinematic rotation, 0.3 rad/s is a good pace.
        groupRef.current.rotation.y = t * 0.3;

        // Gentle floating
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;

        // Subtle auto-zoom (FOV oscillation)
        if (camRef.current) {
            camRef.current.fov = 45 + Math.sin(t * 0.2) * 2;
            camRef.current.updateProjectionMatrix();
        }
    });

    return (
        <>
            <PerspectiveCamera ref={camRef} makeDefault position={[0, 2, 10]} />
            <group ref={groupRef}>
                <ArchModel />
            </group>
        </>
    );
}

function Loader() {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        meshRef.current.rotation.y = clock.elapsedTime * 2;
    });
    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="#D4BFA8" wireframe />
        </mesh>
    );
}

export default function ThreeHero() {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]}>
                <color attach="background" args={['#111111']} />
                <fog attach="fog" args={['#111111', 10, 25]} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

                <Suspense fallback={<Loader />}>
                    <HeroAnimation />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
