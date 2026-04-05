'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';
import HeroSVG from '@/components/HeroSVG';
import MeasuredBlueprint from '@/components/MeasuredBlueprint';
import SiteHeader from '@/components/SiteHeader';
import { CONTACT_DETAILS } from '@/lib/contactDetails';
import { HOME_GALLERY_IMAGES } from '@/lib/galleryImages';
import {
  ElevationSVG,
  FloorPlanSVG,
  InfinityPoolSVG,
  PanoramicSVG,
  ZeroCarbonSVG,
} from '@/components/SectionSVGs';

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

export default function Home() {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let id: number;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#111111] text-white">
      <SiteHeader solid={navSolid} />

      <section className="relative h-screen w-full">
        <HeroSVG />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.3 }}
        >
          <BrandLogo variant="mark" className="mb-8 h-16 w-16 text-[#D4BFA8]" />
          <p className="mb-6 text-xs uppercase tracking-[0.6em] text-[#D4BFA8]">Next Planners</p>
          <h1 className="text-[clamp(4rem,13vw,10rem)] font-bold uppercase leading-none tracking-tighter">NP</h1>
          <h2 className="mt-4 text-lg font-light uppercase tracking-[0.3em] text-[#D4BFA8] md:text-2xl">
            Design Studios
          </h2>
          <p className="mt-6 text-sm font-light uppercase tracking-[0.2em] text-white/40">
            Scroll to explore the building
          </p>
        </motion.div>
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-[#D4BFA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <MeasuredBlueprint />

      <div className="relative z-10">
        <section className="border-t border-white/5 bg-[#111111] py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeSection className="flex flex-col items-start gap-16 lg:flex-row">
              <div className="space-y-8 lg:w-1/2">
                <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]">
                  Project Overview
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-4xl font-bold uppercase leading-tight tracking-tight lg:text-5xl"
                >
                  Where Concrete
                  <br />
                  Meets Sky
                </motion.h2>
                <motion.p variants={fadeUp} className="max-w-md text-sm font-light leading-relaxed text-white/55">
                  A masterclass in modern brutalism blended with organic minimalism, sweeping concrete curves,
                  floor-to-ceiling glass, and seamless integration with the alpine terrain.
                </motion.p>

                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/8 bg-white/8">
                  {[
                    ['Year', '2026'],
                    ['Location', 'Swiss Alps'],
                    ['Total Area', '12,500 sqft'],
                    ['Materials', 'Concrete - Glass'],
                  ].map(([label, value]) => (
                    <motion.div key={label} variants={fadeUp} className="bg-[#111111] p-6">
                      <p className="mb-1 text-[9px] uppercase tracking-[0.4em] text-[#D4BFA8]">{label}</p>
                      <p className="text-lg font-bold">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-8 lg:w-1/2">
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

        <section className="border-t border-white/5 bg-[#0d0d0d] py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeSection>
              <motion.p
                variants={fadeUp}
                className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]"
              >
                Design
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-16 text-center text-4xl font-bold uppercase tracking-tight">
                Highlights
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    SvgIcon: PanoramicSVG,
                    title: 'Panoramic Views',
                    desc: 'Unobstructed 360-degree vistas through smart electrochromic glass walls that respond to sunlight.',
                  },
                  {
                    SvgIcon: ZeroCarbonSVG,
                    title: 'Zero-Carbon Core',
                    desc: 'Solar-integrated facades, green roof and geothermal heating for net-zero energy output.',
                  },
                  {
                    SvgIcon: InfinityPoolSVG,
                    title: 'Infinity Terrace',
                    desc: 'A suspended glass-edge pool merging with the horizon, 45m above the alpine valley.',
                  },
                ].map(({ SvgIcon, title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="group flex flex-col gap-6 border border-white/8 p-10 transition-all duration-500 hover:border-[#D4BFA8]/40"
                  >
                    <div className="opacity-50 transition-opacity duration-500 group-hover:opacity-100">
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

        <section className="border-t border-white/5 bg-[#111111] py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeSection>
              <motion.p
                variants={fadeUp}
                className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]"
              >
                Visual Story
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-16 text-center text-4xl font-bold uppercase tracking-tight">
                Gallery
              </motion.h2>
            </FadeSection>
            <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
              {HOME_GALLERY_IMAGES.map((image, idx) => (
                <motion.div
                  key={image.id}
                  className="group cursor-pointer overflow-hidden break-inside-avoid"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' as const }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: image.aspectRatio }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-black py-32 px-6">
          <div className="mx-auto max-w-xl">
            <FadeSection className="mb-16 text-center">
              <motion.p variants={fadeUp} className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]">
                Get In Touch
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold uppercase leading-none tracking-tight lg:text-6xl"
              >
                Discuss a
                <br />
                Project
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-sm font-light leading-relaxed text-white/40">
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
              {['Full Name', 'Email Address'].map((placeholder) => (
                <input
                  key={placeholder}
                  type={placeholder.includes('Email') ? 'email' : 'text'}
                  placeholder={placeholder}
                  className="w-full border-b border-white/15 bg-transparent pb-3 pt-1 text-sm text-white placeholder-white/25 transition focus:border-[#D4BFA8] focus:outline-none"
                />
              ))}
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                className="w-full resize-none border-b border-white/15 bg-transparent pb-3 pt-1 text-sm text-white placeholder-white/25 transition focus:border-[#D4BFA8] focus:outline-none"
              />
              <button
                type="button"
                className="w-full bg-[#D4BFA8] py-5 text-xs font-bold uppercase tracking-[0.4em] text-black transition-all duration-300 hover:bg-white"
              >
                Send Message
              </button>
            </motion.form>

            <div className="mt-8 text-center">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/35">
                {CONTACT_DETAILS.location}
              </p>
              <a
                href={CONTACT_DETAILS.website}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] uppercase tracking-[0.4em] text-[#D4BFA8] transition hover:text-white"
              >
                {CONTACT_DETAILS.website}
              </a>
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/contact"
                className="text-[10px] uppercase tracking-[0.4em] text-[#D4BFA8] transition hover:text-white"
              >
                Open full contact page
              </Link>
            </div>
          </div>
          <p className="mt-32 text-center text-[10px] font-light uppercase tracking-[0.4em] text-white/20">
            (c) 2026 NP Design Studios. Designed for the Future.
          </p>
        </footer>
      </div>
    </main>
  );
}



