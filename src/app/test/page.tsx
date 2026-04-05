'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import with no SSR (Three.js requires browser)
const ArchitectHero = dynamic(() => import('@/components/ArchitectHero'), { ssr: false });

export default function TestPage() {
  return (
    <>
      {/* Back link */}
      <Link
        href="/"
        className="fixed top-5 left-6 z-[100] text-[10px] uppercase tracking-[0.3em] text-[#8b7355] transition-colors duration-300 hover:text-[#1a1814]"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Back to NP Design Studios
      </Link>

      <ArchitectHero />

      {/* Dummy scroll space */}
      <div
        style={{
          height: '100vh',
          background: '#fafaf8',
          display: 'flex',
          alignItems: 'flex-start',
          padding: '80px 8vw',
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          color: '#c8c4bc',
          letterSpacing: '0.1em',
        }}
      >
        SCROLL DOWN TO EXPERIENCE CAMERA ZOOM
      </div>
    </>
  );
}
