'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Model } from './Model';

function AutoOrbitCamera() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle automatic orbit + slight up/down bobbing
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <Model />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas shadows camera={{ position: [0, 5, 20], fov: 50 }}>
                {/* Deep charcoal background */}
                <color attach="background" args={['#111111']} />

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

                <Suspense fallback={null}>
                    <AutoOrbitCamera />
                    <Environment preset="city" />
                </Suspense>

                {/* Orbit is enabled, but zoom disabled so scroll down isn't blocked */}
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
