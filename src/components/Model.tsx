'use client';

import { useGLTF } from '@react-three/drei';

/**
 * Shared model loader. useGLTF caches internally so loading this component
 * in both HeroScene and ThreeFlythrough does NOT double-fetch the file.
 */
export function ArchModel() {
    const { scene } = useGLTF('/models/model.glb');
    return <primitive object={scene} dispose={null} />;
}

if (typeof window !== 'undefined') {
    useGLTF.preload('/models/model.glb');
}
