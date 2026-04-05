'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Environment, OrbitControls } from '@react-three/drei';
import { getProject, val } from '@theatre/core';
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { Suspense, useEffect, useState } from 'react';
import { ArchModel } from './Model';

// Must initialize studio at module scope — Theatre.js detects the import
// immediately and warns if initialize() hasn't been called yet.
// The typeof window guard prevents this from running on the server.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    studio.extend(extension);
    studio.initialize();
}

const project = getProject('NP Design Studios Flythrough');
const mainSheet = project.sheet('Main Sheet');

function SceneAnimation() {
    const sheet = useCurrentSheet();
    const scroll = useScroll();

    useFrame(() => {
        if (sheet) {
            // Sync theatre.js animation to user scroll position inside ScrollControls
            const sequenceLength = val(sheet.sequence.pointer.length);
            if (sequenceLength > 0) {
                sheet.sequence.position = scroll.offset * sequenceLength;
            }
        }
    });

    return (
        <>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 5, 20]}
                fov={50}
            />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

            <Suspense fallback={null}>
                <ArchModel />
                <Environment preset="city" />
            </Suspense>

            {/* Mouse orbit works anytime (even during scroll) */}
            <OrbitControls makeDefault />
        </>
    );
}

export default function ThreeScene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) return null;

    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
            <Canvas shadows gl={{ preserveDrawingBuffer: true, antialias: true }}>
                <color attach="background" args={['#111111']} />
                <SheetProvider sheet={mainSheet}>
                    {/* ScrollControls creates an internal scrolling container for 6 lengths */}
                    <ScrollControls pages={6} damping={0.25} distance={1}>
                        <SceneAnimation />
                    </ScrollControls>
                </SheetProvider>
            </Canvas>

            {/* Sticky indicator over the canvas */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest uppercase pointer-events-none z-10 animate-pulse">
                Scroll over the 3D model to fly through
            </div>
        </div>
    );
}
