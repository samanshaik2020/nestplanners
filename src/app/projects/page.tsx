'use client';

import { motion } from 'framer-motion';
import SiteHeader from '@/components/SiteHeader';

const LINE = '#D4BFA8';
const SOFT = 'rgba(212,191,168,0.35)';
const GHOST = 'rgba(212,191,168,0.12)';

function DrawPath({
  d,
  delay = 0,
  strokeWidth = 1.6,
  dashed = false,
}: {
  d: string;
  delay?: number;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={dashed ? SOFT : LINE}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '5 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.05, delay, ease: 'easeInOut' }}
    />
  );
}

function DrawLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  soft = false,
  width = 1.6,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  soft?: boolean;
  width?: number;
  dashed?: boolean;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={soft ? SOFT : LINE}
      strokeWidth={width}
      strokeDasharray={dashed ? '5 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
    />
  );
}

function DiagramFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-[#D4BFA8]/14 bg-[linear-gradient(180deg,#141414,#101010)] p-4">
      <motion.svg
        viewBox="0 0 320 220"
        className="mx-auto w-full max-w-[320px]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <rect x="16" y="20" width="288" height="170" rx="22" fill="rgba(255,255,255,0.015)" stroke={GHOST} />
        {children}
        <text x="160" y="206" textAnchor="middle" fill={LINE} fontSize="10" letterSpacing="4">
          {title}
        </text>
      </motion.svg>
    </div>
  );
}

function AlpineCourtyardDiagram() {
  return (
    <DiagramFrame title="COURTYARD PLAN">
      <DrawPath d="M58 54 H262 V152 H58 Z" strokeWidth={2.2} />
      <DrawPath d="M128 84 H192 V122 H128 Z" delay={0.2} dashed />
      <DrawLine x1={58} y1={102} x2={128} y2={102} delay={0.35} />
      <DrawLine x1={192} y1={102} x2={262} y2={102} delay={0.42} />
      <DrawLine x1={160} y1={54} x2={160} y2={84} delay={0.48} />
      <DrawLine x1={160} y1={122} x2={160} y2={152} delay={0.55} />
      <DrawLine x1={42} y1={172} x2={94} y2={172} delay={0.62} width={1.1} />
      <DrawLine x1={226} y1={172} x2={278} y2={172} delay={0.68} width={1.1} />
      <DrawLine x1={58} y1={40} x2={262} y2={40} delay={0.76} soft width={1.1} />
      <DrawLine x1={58} y1={40} x2={58} y2={54} delay={0.82} soft width={1.1} />
      <DrawLine x1={262} y1={40} x2={262} y2={54} delay={0.88} soft width={1.1} />
      <motion.text
        x="160"
        y="34"
        textAnchor="middle"
        fill={LINE}
        fontSize="9"
        letterSpacing="3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.95, duration: 0.35 }}
      >
        18.5M
      </motion.text>
      <motion.circle
        cx="160"
        cy="103"
        r="4"
        fill={LINE}
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </DiagramFrame>
  );
}

function DesertShadowDiagram() {
  return (
    <DiagramFrame title="DESERT SECTION">
      <DrawLine x1={48} y1={156} x2={272} y2={156} width={2} />
      <DrawPath d="M66 156 L112 70 L156 114 L220 52 L270 156" delay={0.16} strokeWidth={2.2} />
      <DrawPath d="M92 112 H246 V156 H92 Z" delay={0.3} dashed strokeWidth={1.2} />
      <DrawLine x1={120} y1={112} x2={120} y2={156} delay={0.4} soft width={1} />
      <DrawLine x1={212} y1={112} x2={212} y2={156} delay={0.48} soft width={1} />
      <DrawLine x1={76} y1={80} x2={96} y2={80} delay={0.58} width={1.1} />
      <DrawLine x1={86} y1={68} x2={86} y2={92} delay={0.64} width={1.1} />
      <motion.circle
        cx="250"
        cy="62"
        r="22"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.2"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.72 }}
      />
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={228 - i * 4}
          y1={40 + i * 9}
          x2={206 - i * 4}
          y2={48 + i * 9}
          stroke={SOFT}
          strokeWidth="1"
          animate={{ x1: [228 - i * 4, 222 - i * 4, 228 - i * 4], x2: [206 - i * 4, 200 - i * 4, 206 - i * 4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
    </DiagramFrame>
  );
}

function ClifflineHorizonDiagram() {
  return (
    <DiagramFrame title="CLIFF ELEVATION">
      <DrawLine x1={34} y1={164} x2={286} y2={164} width={2} />
      <DrawPath d="M64 146 H146 L192 82 H254" delay={0.18} strokeWidth={2.3} />
      <DrawLine x1={96} y1={128} x2={146} y2={128} delay={0.32} soft width={1.1} />
      <DrawLine x1={192} y1={108} x2={250} y2={108} delay={0.4} soft width={1.1} />
      <DrawLine x1={220} y1={82} x2={220} y2={164} delay={0.5} soft width={1.2} dashed />
      <DrawLine x1={242} y1={82} x2={242} y2={164} delay={0.58} soft width={1.2} dashed />
      <motion.path
        d="M22 186 Q160 132 298 186"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.66, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="182"
        cy="82"
        r="3.4"
        fill={LINE}
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </DiagramFrame>
  );
}

const PROJECTS = [
  {
    name: 'Alpine Courtyard House',
    type: 'Private Residence',
    year: '2026',
    area: '12,500 sqft',
    summary: 'A stepped home that opens to mountain light through a protected central court and two-storey glazing.',
    Diagram: AlpineCourtyardDiagram,
    drawing: 'Measured courtyard plan',
  },
  {
    name: 'Desert Shadow Villa',
    type: 'Weekend Retreat',
    year: '2025',
    area: '9,200 sqft',
    summary: 'Deep overhangs, rammed earth walls, and mirrored water planes shape a cooler desert microclimate.',
    Diagram: DesertShadowDiagram,
    drawing: 'Climate section sketch',
  },
  {
    name: 'Cliffline Horizon House',
    type: 'Luxury Residence',
    year: '2024',
    area: '10,800 sqft',
    summary: 'A long linear plan with cantilevered terraces framing uninterrupted valley and sea views.',
    Diagram: ClifflineHorizonDiagram,
    drawing: 'Cantilever elevation study',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <SiteHeader solid />

      <section className="px-6 pb-18 pt-34 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#D4BFA8]">Projects</p>
          <div className="mt-6 grid gap-10 border-t border-white/8 pt-10 lg:grid-cols-[1.15fr,0.85fr]">
            <h1 className="text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl">
              Homes Designed As Lasting Landmarks
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              Each project is developed as a measured response to place, climate, and the rhythm of everyday living.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.name}
              className="grid gap-7 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#171717,#121212)] p-6 lg:grid-cols-[1fr,360px] lg:items-start"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#D4BFA8]">{project.type}</p>
                <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight md:text-[2rem]">{project.name}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/58">{project.summary}</p>

                <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/8 bg-white/8 sm:max-w-[520px]">
                  {[
                    ['Year', project.year],
                    ['Area', project.area],
                    ['Status', 'In Progress'],
                    ['Drawing', project.drawing],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#111111] p-5">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">{label}</p>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-white md:text-base">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:pt-1">
                <project.Diagram />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
