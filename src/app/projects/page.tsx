'use client';

import { motion } from 'framer-motion';
import SiteHeader from '@/components/SiteHeader';

const LINE = '#D4BFA8';
const SOFT = 'rgba(212,191,168,0.38)';
const GHOST = 'rgba(212,191,168,0.12)';
const FILL = 'rgba(212,191,168,0.08)';

function DrawPath({
  d,
  delay = 0,
  strokeWidth = 1.6,
  dashed = false,
  soft = false,
  fill = 'none',
}: {
  d: string;
  delay?: number;
  strokeWidth?: number;
  dashed?: boolean;
  soft?: boolean;
  fill?: string;
}) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={soft ? SOFT : LINE}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '5 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
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
  width = 1.4,
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
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
    />
  );
}

function DrawRect({
  x,
  y,
  w,
  h,
  rx = 0,
  delay = 0,
  strokeWidth = 1.4,
  dashed = false,
  soft = false,
  fill = 'none',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  delay?: number;
  strokeWidth?: number;
  dashed?: boolean;
  soft?: boolean;
  fill?: string;
}) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill}
      stroke={soft ? SOFT : LINE}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '5 5' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
    />
  );
}

function FadeText({
  x,
  y,
  children,
  delay = 0,
  anchor = 'start',
  size = 8.5,
  letterSpacing = 3,
  tone = 'line',
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  delay?: number;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  letterSpacing?: number;
  tone?: 'line' | 'soft';
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={tone === 'soft' ? SOFT : LINE}
      fontSize={size}
      letterSpacing={letterSpacing}
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.text>
  );
}

function PulseNode({
  cx,
  cy,
  delay = 0,
}: {
  cx: number;
  cy: number;
  delay?: number;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="3.2"
      fill={LINE}
      animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.45, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

function DiagramFrame({
  title,
  subtitle,
  idSuffix,
  children,
}: {
  title: string;
  subtitle: string;
  idSuffix: string;
  children: React.ReactNode;
}) {
  const gridId = `project-grid-${idSuffix}`;
  const panelId = `project-panel-${idSuffix}`;
  const glowId = `project-glow-${idSuffix}`;

  return (
    <div className="rounded-[32px] border border-[#D4BFA8]/18 bg-[radial-gradient(circle_at_top,rgba(212,191,168,0.14),transparent_48%),linear-gradient(180deg,#1a1a1a,#101010)] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
      <motion.svg
        viewBox="0 0 360 248"
        className="mx-auto w-full max-w-none"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <defs>
          <pattern id={gridId} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="rgba(212,191,168,0.06)" strokeWidth="1" />
          </pattern>
          <linearGradient id={panelId} x1="0" y1="16" x2="0" y2="214" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="8%" r="88%">
            <stop offset="0%" stopColor="#D4BFA8" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#D4BFA8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#D4BFA8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="14" y="18" width="332" height="196" rx="28" fill={`url(#${panelId})`} stroke="rgba(212,191,168,0.14)" />
        <rect x="28" y="32" width="304" height="166" rx="20" fill={`url(#${glowId})`} />
        <rect x="28" y="32" width="304" height="166" rx="20" fill={`url(#${gridId})`} stroke={GHOST} />

        <DrawLine x1={44} y1={26} x2={102} y2={26} width={1.1} soft delay={0.08} />
        <DrawLine x1={258} y1={26} x2={316} y2={26} width={1.1} soft delay={0.14} />
        <DrawLine x1={44} y1={224} x2={116} y2={224} width={1.1} soft delay={0.2} />
        <DrawLine x1={244} y1={224} x2={316} y2={224} width={1.1} soft delay={0.26} />

        <FadeText x={46} y={24} size={8} letterSpacing={2.8} delay={0.32}>
          {subtitle}
        </FadeText>
        <FadeText x={314} y={24} anchor="end" size={8} letterSpacing={2.8} delay={0.38} tone="soft">
          NPDS DETAIL
        </FadeText>

        {children}

        <FadeText x={180} y={231} anchor="middle" size={10} letterSpacing={4.2} delay={0.9}>
          {title}
        </FadeText>
      </motion.svg>
    </div>
  );
}

function AlpineCourtyardDiagram() {
  return (
    <DiagramFrame title="ALPINE COURTYARD HOUSE" subtitle="MEASURED PLAN" idSuffix="alpine">
      <DrawPath
        d="M78 78 H136 V62 H226 V78 H286 V146 H250 V174 H108 V156 H78 Z"
        delay={0.08}
        strokeWidth={2.3}
      />
      <DrawRect x={146} y={90} w={68} h={50} rx={10} delay={0.18} dashed fill={FILL} />
      <DrawRect x={92} y={92} w={38} h={48} rx={8} delay={0.26} soft strokeWidth={1.1} />
      <DrawRect x={230} y={94} w={34} h={44} rx={8} delay={0.34} soft strokeWidth={1.1} />
      <DrawRect x={110} y={148} w={54} h={18} rx={6} delay={0.42} soft strokeWidth={1.1} />
      <DrawRect x={194} y={148} w={56} h={18} rx={6} delay={0.5} soft strokeWidth={1.1} />
      <DrawLine x1={78} y1={116} x2={146} y2={116} delay={0.58} />
      <DrawLine x1={214} y1={116} x2={286} y2={116} delay={0.66} />
      <DrawLine x1={180} y1={62} x2={180} y2={90} delay={0.74} />
      <DrawLine x1={180} y1={140} x2={180} y2={174} delay={0.82} />
      <DrawLine x1={64} y1={60} x2={300} y2={60} delay={0.9} width={1.1} soft />
      <DrawLine x1={78} y1={50} x2={78} y2={78} delay={0.96} width={1.1} soft />
      <DrawLine x1={286} y1={50} x2={286} y2={78} delay={1.02} width={1.1} soft />
      <DrawLine x1={64} y1={182} x2={300} y2={182} delay={1.08} width={1.1} soft />
      <DrawLine x1={108} y1={174} x2={108} y2={190} delay={1.14} width={1.1} soft />
      <DrawLine x1={250} y1={174} x2={250} y2={190} delay={1.2} width={1.1} soft />
      <DrawLine x1={58} y1={90} x2={58} y2={144} delay={1.26} width={1.1} soft />
      <DrawLine x1={58} y1={90} x2={78} y2={90} delay={1.32} width={1.1} soft />
      <DrawLine x1={58} y1={144} x2={78} y2={144} delay={1.38} width={1.1} soft />
      <FadeText x={180} y={120} anchor="middle" size={8} letterSpacing={2.8} delay={1.44}>
        LIGHT COURT
      </FadeText>
      <FadeText x={92} y={86} size={7.4} letterSpacing={2.2} delay={1.5} tone="soft">
        ENTRY
      </FadeText>
      <FadeText x={268} y={88} anchor="end" size={7.4} letterSpacing={2.2} delay={1.56} tone="soft">
        LIVING EDGE
      </FadeText>
      <FadeText x={182} y={53} anchor="middle" size={7.4} letterSpacing={2.4} delay={1.62}>
        24.0M FRONTAGE
      </FadeText>
      <FadeText x={50} y={118} anchor="middle" size={7.2} letterSpacing={2.2} delay={1.68}>
        11.2M
      </FadeText>
      <PulseNode cx={180} cy={116} delay={0.1} />
      <PulseNode cx={136} cy={78} delay={0.45} />
      <PulseNode cx={226} cy={78} delay={0.75} />
    </DiagramFrame>
  );
}

function DesertShadowDiagram() {
  return (
    <DiagramFrame title="DESERT SHADOW VILLA" subtitle="CLIMATE SECTION" idSuffix="desert">
      <DrawLine x1={48} y1={170} x2={308} y2={170} delay={0.08} width={2} />
      <motion.path
        d="M70 170 L94 126 H136 L156 100 H214 L236 118 H280 V170 Z"
        fill={FILL}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
      />
      <DrawPath d="M70 170 L94 126 H136 L156 100 H214 L236 118 H280 V170" delay={0.2} strokeWidth={2.3} />
      <DrawRect x={130} y={132} w={70} h={22} rx={7} delay={0.3} dashed fill="rgba(212,191,168,0.05)" />
      <DrawRect x={210} y={132} w={44} h={14} rx={5} delay={0.38} soft strokeWidth={1.1} />
      <DrawLine x1={96} y1={126} x2={96} y2={170} delay={0.46} soft dashed width={1.1} />
      <DrawLine x1={246} y1={118} x2={246} y2={170} delay={0.54} soft dashed width={1.1} />
      <DrawLine x1={174} y1={154} x2={174} y2={110} delay={0.62} width={1.2} />
      <DrawLine x1={170} y1={116} x2={174} y2={110} delay={0.7} width={1.2} />
      <DrawLine x1={178} y1={116} x2={174} y2={110} delay={0.76} width={1.2} />
      <DrawPath d="M46 186 Q96 176 144 184 T240 184 T316 186" delay={0.84} soft strokeWidth={1.1} />
      <motion.path
        d="M236 70 Q260 46 294 48"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.1"
        strokeDasharray="4 5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.9 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, delay: 0.92, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="290"
        cy="46"
        r="16"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.1"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 1.02, ease: 'easeOut' }}
      />
      {[0, 1, 2].map((index) => (
        <motion.line
          key={index}
          x1={280 - index * 5}
          y1={30 + index * 7}
          x2={258 - index * 5}
          y2={36 + index * 7}
          stroke={SOFT}
          strokeWidth="1"
          animate={{
            x1: [280 - index * 5, 274 - index * 5, 280 - index * 5],
            x2: [258 - index * 5, 252 - index * 5, 258 - index * 5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        />
      ))}
      <FadeText x={164} y={95} anchor="middle" size={7.8} letterSpacing={2.4} delay={1.1}>
        DEEP SHADE
      </FadeText>
      <FadeText x={174} y={104} anchor="middle" size={7.1} letterSpacing={2.2} delay={1.18} tone="soft">
        STACK COOLING
      </FadeText>
      <FadeText x={240} y={127} anchor="middle" size={7.2} letterSpacing={2.2} delay={1.24} tone="soft">
        WATER COURT
      </FadeText>
      <FadeText x={282} y={76} anchor="end" size={7.2} letterSpacing={2.2} delay={1.3}>
        LOW SUN
      </FadeText>
      <PulseNode cx={174} cy={126} delay={0.25} />
    </DiagramFrame>
  );
}

function ClifflineHorizonDiagram() {
  return (
    <DiagramFrame title="CLIFFLINE HORIZON HOUSE" subtitle="CANTILEVER ELEVATION" idSuffix="cliffline">
      <DrawLine x1={40} y1={166} x2={314} y2={166} delay={0.08} width={2} />
      <motion.path
        d="M72 166 H150 V132 H194 V94 H266 V118 H292 V166 Z"
        fill={FILL}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
      />
      <DrawPath d="M72 166 H150 V132 H194 V94 H266 V118 H292 V166" delay={0.24} strokeWidth={2.35} />
      <DrawRect x={96} y={140} w={36} h={14} rx={4} delay={0.34} soft strokeWidth={1.1} />
      <DrawRect x={206} y={108} w={38} h={12} rx={4} delay={0.42} soft strokeWidth={1.1} />
      <DrawLine x1={194} y1={94} x2={194} y2={166} delay={0.5} soft dashed width={1.1} />
      <DrawLine x1={244} y1={108} x2={244} y2={166} delay={0.58} soft dashed width={1.1} />
      <DrawLine x1={292} y1={118} x2={316} y2={118} delay={0.66} width={1.4} />
      <DrawLine x1={316} y1={112} x2={316} y2={124} delay={0.74} width={1.1} />
      <DrawPath d="M24 188 Q112 152 188 170 T336 182" delay={0.82} soft strokeWidth={1.15} />
      {[0, 1, 2].map((index) => (
        <motion.line
          key={index}
          x1={286}
          y1={122}
          x2={326}
          y2={94 + index * 18}
          stroke={SOFT}
          strokeWidth="1"
          strokeDasharray="4 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.92 + index * 0.08, ease: 'easeInOut' }}
        />
      ))}
      <DrawLine x1={66} y1={82} x2={150} y2={82} delay={1.08} soft width={1.1} />
      <DrawLine x1={72} y1={82} x2={72} y2={166} delay={1.16} soft width={1.1} />
      <DrawLine x1={150} y1={82} x2={150} y2={132} delay={1.22} soft width={1.1} />
      <FadeText x={228} y={86} anchor="middle" size={7.7} letterSpacing={2.4} delay={1.3}>
        SKY SUITE
      </FadeText>
      <FadeText x={317} y={106} anchor="end" size={7.2} letterSpacing={2.2} delay={1.38}>
        VIEW LINES
      </FadeText>
      <FadeText x={110} y={74} anchor="middle" size={7.1} letterSpacing={2.2} delay={1.44} tone="soft">
        16.8M PODIUM
      </FadeText>
      <FadeText x={304} y={132} anchor="end" size={7.1} letterSpacing={2.2} delay={1.5} tone="soft">
        CANTILEVER EDGE
      </FadeText>
      <PulseNode cx={194} cy={94} delay={0.2} />
      <PulseNode cx={292} cy={118} delay={0.55} />
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
        <div className="mx-auto grid max-w-[1580px] gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.name}
              className="flex h-full flex-col rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(212,191,168,0.08),transparent_38%),linear-gradient(180deg,#181818,#111111)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] lg:min-h-[760px] lg:p-7 xl:min-h-[820px] xl:p-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#D4BFA8]">{project.type}</p>
                  <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight md:text-[2.15rem]">
                    {project.name}
                  </h2>
                </div>
                <div className="rounded-full border border-[#D4BFA8]/22 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="mt-8">
                <project.Diagram />
              </div>

              <p className="mt-8 text-base leading-relaxed text-white/62 xl:text-[1.02rem]">
                {project.summary}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/8 bg-white/8">
                {[
                  ['Year', project.year],
                  ['Area', project.area],
                  ['Status', 'In Progress'],
                  ['Drawing', project.drawing],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#111111] p-5 xl:p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">{label}</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-white md:text-base">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-center justify-between border-t border-white/8 pt-5 text-[10px] uppercase tracking-[0.38em] text-white/40">
                  <span>Next Planners</span>
                  <span>{project.type}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
