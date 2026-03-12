'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { ROOM_TO_WAYPOINT, WAYPOINTS } from '@/components/ThreeFlythrough';
import { useFlythroughStore } from '@/store/useFlythroughStore';
import HeroSVG from '@/components/HeroSVG';
import { FloorPlanSVG, ElevationSVG, PanoramicSVG, ZeroCarbonSVG, InfinityPoolSVG } from '@/components/SectionSVGs';

const ThreeFlythrough = dynamic(() => import('@/components/ThreeFlythrough'), { ssr: false });

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY = [
  { id: 1029, w: 800, h: 600 },
  { id: 1035, w: 800, h: 500 },
  { id: 1039, w: 800, h: 700 },
  { id: 1048, w: 800, h: 550 },
  { id: 1051, w: 800, h: 650 },
  { id: 1062, w: 800, h: 600 },
];

const ROOMS = ['Entrance Foyer', 'Great Room', 'Master Suite', 'Wine Cellar', 'Infinity Pool', 'Sky Terrace'];

// ─── Framer helpers ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [navSolid, setNavSolid] = useState(false);
  const flythroughRef = useRef<HTMLElement>(null);
  const setTargetTime = useFlythroughStore((s) => s.setTargetTime);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let id: number;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  // Navbar transparency
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleRoom(room: string) {
    const idx = ROOM_TO_WAYPOINT[room] ?? 0;
    const t = idx / (WAYPOINTS.length - 1);
    flythroughRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setTargetTime(t * (WAYPOINTS.length - 1)), 600);
  }

  return (
    <main className="relative w-full text-white bg-[#111111] overflow-x-hidden">

      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-5 transition-all duration-500
          ${navSolid ? 'bg-[#111111]/90 backdrop-blur-md border-b border-white/5' : ''}`}
      >
        <span className="text-2xl font-bold tracking-[0.25em] uppercase">OARCH</span>
        <ul className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium items-center">
          {['Home', 'Project', 'Gallery', 'Contact'].map((item) => (
            <li key={item} className="cursor-pointer hover:text-[#D4BFA8] transition-colors duration-300">{item}</li>
          ))}
          <li>
            <a
              href="/ArchitectHero.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[#D4BFA8]/30 text-[#D4BFA8] hover:bg-[#D4BFA8] hover:text-black transition-all duration-300 rounded-sm"
            >
              Design Test
            </a>
          </li>
        </ul>
      </nav>

      {/* ─── 1. HERO ────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen">
        <HeroSVG />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.3 }}
        >
          <p className="text-xs tracking-[0.6em] uppercase text-[#D4BFA8] mb-6">Architecture Studio</p>
          <h1 className="text-[clamp(4rem,13vw,10rem)] font-bold uppercase tracking-tighter leading-none">OARCH</h1>
          <h2 className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase text-[#D4BFA8] mt-4">Immersive Architecture</h2>
          <p className="text-sm font-light tracking-[0.2em] uppercase text-white/40 mt-6">Scroll to explore the building</p>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none">
          <svg className="w-6 h-6 text-[#D4BFA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─── 2. 3D FLYTHROUGH ───────────────────────────────────────────── */}
      <section ref={flythroughRef} className="relative w-full h-screen border-t border-white/5">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="text-[10px] tracking-[0.6em] uppercase text-[#D4BFA8]">3D Experience</p>
          <p className="text-[9px] tracking-widest uppercase text-white/25 mt-1">Scroll inside to fly through · Drag to orbit</p>
        </div>
        <div className="absolute inset-0">
          <ThreeFlythrough />
        </div>
      </section>

      {/* ─── 3. ROOM BY ROOM (immediately after 3D) ─────────────────────── */}
      <section className="bg-[#0d0d0d] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <FadeSection>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8] mb-3">Explore</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold uppercase tracking-tight mb-4">Room by Room</motion.h2>
            <motion.p variants={fadeUp} className="text-sm font-light text-white/40 mb-10 max-w-lg mx-auto leading-relaxed">
              Click any room to fly the 3D camera directly to that space above.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {ROOMS.map((room) => (
                <motion.button
                  key={room}
                  variants={fadeUp}
                  onClick={() => handleRoom(room)}
                  className="px-6 py-3 border border-white/15 rounded-full text-xs uppercase tracking-[0.2em]
                             hover:bg-[#D4BFA8] hover:text-black hover:border-[#D4BFA8] transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-[#D4BFA8]"
                >
                  {room}
                </motion.button>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── REST OF SITE ────────────────────────────────────────────────── */}
      <div className="relative z-10">

        {/* ─── 4. PROJECT OVERVIEW ──────────────────────────────────────── */}
        <section className="bg-[#111111] py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeSection className="flex flex-col lg:flex-row items-start gap-16">
              {/* Text + stats */}
              <div className="lg:w-1/2 space-y-8">
                <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]">Project Overview</motion.p>
                <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight">
                  Where Concrete<br />Meets Sky
                </motion.h2>
                <motion.p variants={fadeUp} className="text-sm font-light leading-relaxed text-white/55 max-w-md">
                  A masterclass in modern brutalism blended with organic minimalism —
                  sweeping concrete curves, floor-to-ceiling glass, and seamless integration
                  with the alpine terrain.
                </motion.p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-px bg-white/8 border border-white/8 rounded-sm overflow-hidden">
                  {[['Year', '2026'], ['Location', 'Swiss Alps'], ['Total Area', '12,500 sqft'], ['Materials', 'Concrete · Glass']].map(([label, val]) => (
                    <motion.div key={label} variants={fadeUp} className="bg-[#111111] p-6">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4BFA8] mb-1">{label}</p>
                      <p className="text-lg font-bold">{val}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated SVGs side-by-side */}
              <div className="lg:w-1/2 flex flex-col items-center gap-8">
                <motion.div variants={fadeUp} className="w-full">
                  <FloorPlanSVG />
                </motion.div>
                <motion.div variants={fadeUp} className="w-full">
                  <ElevationSVG />
                </motion.div>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ─── 5. DESIGN HIGHLIGHTS ─────────────────────────────────────── */}
        <section className="bg-[#0d0d0d] py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeSection>
              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8] text-center mb-3">Design</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold uppercase tracking-tight text-center mb-16">Highlights</motion.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    SvgIcon: PanoramicSVG,
                    title: 'Panoramic Views',
                    desc: 'Unobstructed 360° vistas through smart electrochromic glass walls that respond to sunlight.',
                  },
                  {
                    SvgIcon: ZeroCarbonSVG,
                    title: 'Zero-Carbon Core',
                    desc: 'Solar-integrated facades, green roof and geothermal heating for net-zero energy output.',
                  },
                  {
                    SvgIcon: InfinityPoolSVG,
                    title: 'Infinity Terrace',
                    desc: 'A suspended glass-edge pool merging with the horizon — 45m above the alpine valley.',
                  },
                ].map(({ SvgIcon, title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="group p-10 border border-white/8 hover:border-[#D4BFA8]/40 transition-all duration-500 flex flex-col gap-6"
                  >
                    <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                      <SvgIcon />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{title}</h3>
                    <p className="text-sm leading-relaxed text-white/45">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ─── 6. GALLERY ───────────────────────────────────────────────── */}
        <section className="bg-[#111111] py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeSection>
              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8] text-center mb-3">Visual Story</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold uppercase tracking-tight text-center mb-16">Gallery</motion.h2>
            </FadeSection>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {GALLERY.map((img, idx) => (
                <motion.div
                  key={img.id}
                  className="break-inside-avoid overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' as const }}
                >
                  <Image
                    src={`https://picsum.photos/id/${img.id}/${img.w}/${img.h}`}
                    alt={`Architecture ${idx + 1}`}
                    width={img.w}
                    height={img.h}
                    className="w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. CONTACT + FOOTER ──────────────────────────────────────── */}
        <footer className="bg-black py-32 px-6 border-t border-white/5">
          <div className="max-w-xl mx-auto">
            <FadeSection className="text-center mb-16">
              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8] mb-3">Get In Touch</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-bold uppercase tracking-tight leading-none">
                Discuss a<br />Project
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm font-light text-white/40 mt-6 leading-relaxed">
                Ready to bring your architectural vision to life? Let&apos;s build something extraordinary.
              </motion.p>
            </FadeSection>
            <motion.form
              className="space-y-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {['Full Name', 'Email Address'].map((ph) => (
                <input
                  key={ph}
                  type={ph.includes('Email') ? 'email' : 'text'}
                  placeholder={ph}
                  className="w-full bg-transparent border-b border-white/15 pb-3 pt-1 text-sm text-white
                             placeholder-white/25 focus:outline-none focus:border-[#D4BFA8] transition"
                />
              ))}
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                className="w-full bg-transparent border-b border-white/15 pb-3 pt-1 text-sm text-white
                           placeholder-white/25 focus:outline-none focus:border-[#D4BFA8] transition resize-none"
              />
              <button
                type="button"
                className="w-full py-5 bg-[#D4BFA8] text-black text-xs font-bold uppercase tracking-[0.4em]
                           hover:bg-white transition-all duration-300"
              >
                Send Message
              </button>
            </motion.form>
          </div>
          <p className="mt-32 text-center text-[10px] font-light text-white/20 uppercase tracking-[0.4em]">
            © 2026 OARCH. Designed for the Future.
          </p>
        </footer>
      </div>
    </main>
  );
}
