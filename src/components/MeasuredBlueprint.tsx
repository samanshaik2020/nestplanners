'use client';

import { motion } from 'framer-motion';

const LINE = '#D4BFA8';
const SOFT = 'rgba(212,191,168,0.22)';
const FILL = 'rgba(212,191,168,0.05)';

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function BlueprintPlan() {
  return (
    <motion.svg
      viewBox="0 0 760 540"
      className="w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={SOFT} strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="760" height="540" fill="url(#grid)" />

      <motion.path
        d="M95 460 Q40 405 40 336 V154 Q40 118 71 90 Q100 64 143 64 H262"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M122 460 Q70 410 70 338 V166 Q70 132 96 108 Q118 88 153 88 H262"
        fill="none"
        stroke={SOFT}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay: 0.1, ease: 'easeInOut' }}
      />

      <circle cx="148" cy="336" r="48" fill="none" stroke={SOFT} strokeWidth="1" />
      <circle cx="148" cy="336" r="18" fill="none" stroke={SOFT} strokeWidth="0.8" />
      <circle cx="148" cy="406" r="42" fill="none" stroke={SOFT} strokeWidth="1" />
      <circle cx="148" cy="406" r="16" fill="none" stroke={SOFT} strokeWidth="0.8" />

      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      >
        <rect x="238" y="78" width="452" height="386" fill="none" stroke={LINE} strokeWidth="4.5" />
        <rect x="238" y="78" width="452" height="386" fill={FILL} stroke="none" />

        <line x1="480" y1="78" x2="480" y2="286" stroke={LINE} strokeWidth="3.2" />
        <line x1="238" y1="286" x2="690" y2="286" stroke={LINE} strokeWidth="3.2" />
        <line x1="574" y1="78" x2="574" y2="286" stroke={LINE} strokeWidth="3.2" />
        <line x1="610" y1="78" x2="610" y2="190" stroke={LINE} strokeWidth="2.4" />
        <line x1="610" y1="224" x2="610" y2="286" stroke={LINE} strokeWidth="2.4" />
        <line x1="650" y1="78" x2="650" y2="190" stroke={LINE} strokeWidth="2.4" />
        <line x1="650" y1="224" x2="650" y2="286" stroke={LINE} strokeWidth="2.4" />
        <line x1="362" y1="78" x2="362" y2="198" stroke={LINE} strokeWidth="2.4" />
        <line x1="362" y1="234" x2="362" y2="286" stroke={LINE} strokeWidth="2.4" />
        <line x1="426" y1="78" x2="426" y2="158" stroke={LINE} strokeWidth="2.4" />
        <line x1="426" y1="188" x2="426" y2="286" stroke={LINE} strokeWidth="2.4" />
        <line x1="300" y1="156" x2="480" y2="156" stroke={LINE} strokeWidth="2.2" />
        <line x1="574" y1="352" x2="690" y2="352" stroke={LINE} strokeWidth="2.4" />
        <line x1="574" y1="78" x2="690" y2="78" stroke={LINE} strokeWidth="2.4" />
        <line x1="238" y1="386" x2="480" y2="386" stroke={LINE} strokeWidth="2.8" />
        <line x1="480" y1="286" x2="480" y2="464" stroke={LINE} strokeWidth="3.2" />
        <line x1="574" y1="286" x2="574" y2="464" stroke={LINE} strokeWidth="3.2" />
        <line x1="238" y1="352" x2="376" y2="352" stroke={LINE} strokeWidth="2.2" />
        <line x1="238" y1="286" x2="238" y2="464" stroke={LINE} strokeWidth="3.2" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <path d="M362 198 A42 42 0 0 1 404 240" fill="none" stroke={SOFT} strokeWidth="1.4" strokeDasharray="5 4" />
        <path d="M426 158 A30 30 0 0 1 456 188" fill="none" stroke={SOFT} strokeWidth="1.2" strokeDasharray="5 4" />
        <path d="M610 190 A34 34 0 0 0 644 224" fill="none" stroke={SOFT} strokeWidth="1.2" strokeDasharray="5 4" />
        <path d="M300 156 A28 28 0 0 0 328 184" fill="none" stroke={SOFT} strokeWidth="1.2" strokeDasharray="5 4" />

        <rect x="400" y="308" width="82" height="62" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <rect x="506" y="308" width="44" height="62" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <circle cx="432" cy="336" r="18" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <rect x="292" y="310" width="86" height="52" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <rect x="312" y="328" width="46" height="16" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <circle cx="320" cy="390" r="46" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <path d="M320 344 L338 386 L320 430 L302 386 Z" fill="none" stroke={SOFT} strokeWidth="1" />

        <rect x="598" y="308" width="32" height="118" rx="16" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <rect x="636" y="308" width="32" height="118" rx="16" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <path d="M603 332 L625 332" stroke={SOFT} strokeWidth="1" />
        <path d="M641 332 L663 332" stroke={SOFT} strokeWidth="1" />

        <rect x="252" y="92" width="94" height="120" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <rect x="386" y="94" width="70" height="56" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <rect x="494" y="96" width="64" height="96" fill="none" stroke={SOFT} strokeWidth="1.1" />
        <rect x="582" y="94" width="20" height="56" fill="none" stroke={SOFT} strokeWidth="1" />
        <rect x="622" y="94" width="20" height="56" fill="none" stroke={SOFT} strokeWidth="1" />
        <rect x="664" y="92" width="14" height="68" fill="none" stroke={SOFT} strokeWidth="1" />
        <circle cx="651" cy="255" r="6" fill="none" stroke={SOFT} strokeWidth="1" />
        <circle cx="430" cy="178" r="10" fill="none" stroke={SOFT} strokeWidth="1" />
        <circle cx="604" cy="168" r="7" fill="none" stroke={SOFT} strokeWidth="1" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
        fill={LINE}
        fontFamily="Inter, sans-serif"
      >
        <text x="52" y="62" fontSize="11" letterSpacing="4">N</text>
        <text x="106" y="38" fontSize="10" letterSpacing="6">SITE TURN</text>
        <text x="266" y="132" fontSize="12" letterSpacing="4">ENTRY GARDEN</text>
        <text x="300" y="235" fontSize="10" letterSpacing="5">TERRACE</text>
        <text x="387" y="244" fontSize="11" letterSpacing="4">LIVING ROOM</text>
        <text x="415" y="340" fontSize="10" letterSpacing="4">DINING</text>
        <text x="508" y="343" fontSize="10" letterSpacing="4">KITCHEN</text>
        <text x="509" y="180" fontSize="11" letterSpacing="4">GUEST</text>
        <text x="505" y="195" fontSize="11" letterSpacing="4">BEDROOM</text>
        <text x="591" y="174" fontSize="9" letterSpacing="3">BATH</text>
        <text x="628" y="174" fontSize="9" letterSpacing="3">POWDER</text>
        <text x="671" y="190" fontSize="9" letterSpacing="3" transform="rotate(-90 671 190)">MUD</text>
        <text x="606" y="376" fontSize="11" letterSpacing="5" transform="rotate(-90 606 376)">GARAGE</text>
        <text x="645" y="376" fontSize="11" letterSpacing="5" transform="rotate(-90 645 376)">GARAGE</text>
        <text x="286" y="414" fontSize="11" letterSpacing="4">CARPORT</text>
        <text x="507" y="414" fontSize="11" letterSpacing="4">FORECOURT</text>
        <text x="530" y="64" fontSize="11" letterSpacing="5">GROUND FLOOR PLAN</text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        stroke={LINE}
        fill="none"
      >
        <line x1="238" y1="42" x2="690" y2="42" strokeWidth="1" />
        <line x1="238" y1="42" x2="238" y2="78" strokeWidth="1" />
        <line x1="690" y1="42" x2="690" y2="78" strokeWidth="1" />
        <polygon points="238,42 248,38 248,46" fill={LINE} stroke="none" />
        <polygon points="690,42 680,38 680,46" fill={LINE} stroke="none" />

        <line x1="714" y1="78" x2="714" y2="464" strokeWidth="1" />
        <line x1="690" y1="78" x2="714" y2="78" strokeWidth="1" />
        <line x1="690" y1="464" x2="714" y2="464" strokeWidth="1" />
        <polygon points="714,78 710,88 718,88" fill={LINE} stroke="none" />
        <polygon points="714,464 710,454 718,454" fill={LINE} stroke="none" />

        <line x1="238" y1="492" x2="574" y2="492" strokeWidth="1" />
        <line x1="238" y1="464" x2="238" y2="492" strokeWidth="1" />
        <line x1="574" y1="464" x2="574" y2="492" strokeWidth="1" />
        <polygon points="238,492 248,488 248,496" fill={LINE} stroke="none" />
        <polygon points="574,492 564,488 564,496" fill={LINE} stroke="none" />
      </motion.g>

      <g fill={LINE} fontFamily="Inter, sans-serif" fontSize="12" letterSpacing="5">
        <text x="461" y="34" textAnchor="middle">24.0 M LENGTH</text>
        <text x="732" y="280" transform="rotate(-90 732 280)" textAnchor="middle">18.5 M BREADTH</text>
        <text x="406" y="512" textAnchor="middle">16.2 M COVERED SPAN</text>
      </g>
    </motion.svg>
  );
}

function BlueprintElevation() {
  return (
    <motion.svg
      viewBox="0 0 620 250"
      className="w-full"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <rect x="0" y="0" width="620" height="250" fill="none" />

      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <line x1="38" y1="206" x2="584" y2="206" stroke={LINE} strokeWidth="1.2" />
        <rect x="126" y="98" width="308" height="108" fill={FILL} stroke={LINE} strokeWidth="2.4" />
        <rect x="84" y="46" width="66" height="160" fill="none" stroke={LINE} strokeWidth="2.2" />
        <rect x="434" y="26" width="70" height="180" fill="none" stroke={LINE} strokeWidth="2.2" />
        <line x1="74" y1="98" x2="516" y2="98" stroke={LINE} strokeWidth="2.6" />
        <line x1="74" y1="84" x2="516" y2="84" stroke={SOFT} strokeWidth="1.2" strokeDasharray="5 5" />
        {[164, 202, 240, 278, 316, 354, 392].map((x) => (
          <line key={x} x1={x} y1="98" x2={x} y2="206" stroke={SOFT} strokeWidth="0.9" />
        ))}
        {[132, 160].map((y) => (
          <line key={y} x1="126" y1={y} x2="434" y2={y} stroke={SOFT} strokeWidth="0.9" />
        ))}
        {[72, 102, 132, 162].map((y) => (
          <line key={y} x1="84" y1={y} x2="150" y2={y} stroke={SOFT} strokeWidth="0.9" />
        ))}
        {[52, 82, 112, 142, 172].map((y) => (
          <line key={y} x1="434" y1={y} x2="504" y2={y} stroke={SOFT} strokeWidth="0.9" />
        ))}
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        stroke={LINE}
        fill="none"
      >
        <line x1="126" y1="224" x2="434" y2="224" strokeWidth="1" />
        <line x1="126" y1="206" x2="126" y2="224" strokeWidth="1" />
        <line x1="434" y1="206" x2="434" y2="224" strokeWidth="1" />
        <polygon points="126,224 136,220 136,228" fill={LINE} stroke="none" />
        <polygon points="434,224 424,220 424,228" fill={LINE} stroke="none" />

        <line x1="528" y1="26" x2="528" y2="206" strokeWidth="1" />
        <line x1="504" y1="26" x2="528" y2="26" strokeWidth="1" />
        <line x1="504" y1="206" x2="528" y2="206" strokeWidth="1" />
        <polygon points="528,26 524,36 532,36" fill={LINE} stroke="none" />
        <polygon points="528,206 524,196 532,196" fill={LINE} stroke="none" />
      </motion.g>

      <g fill={LINE} fontFamily="Inter, sans-serif">
        <text x="280" y="18" textAnchor="middle" fontSize="12" letterSpacing="6">FRONT ELEVATION</text>
        <text x="280" y="240" textAnchor="middle" fontSize="12" letterSpacing="5">17.8 M FACADE WIDTH</text>
        <text x="548" y="120" transform="rotate(-90 548 120)" textAnchor="middle" fontSize="12" letterSpacing="5">
          8.4 M HEIGHT
        </text>
        <text x="114" y="38" fontSize="10" letterSpacing="4">DOUBLE HEIGHT PORTAL</text>
        <text x="446" y="16" fontSize="10" letterSpacing="4">STAIR TOWER</text>
      </g>
    </motion.svg>
  );
}

export default function MeasuredBlueprint() {
  return (
    <section className="relative border-t border-white/5 bg-[#0b0b0b] px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,191,168,0.09),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl space-y-10">
        <FadeIn delay={0.12} className="mx-auto max-w-5xl rounded-[32px] border border-[#D4BFA8]/16 bg-[#111111]/88 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-5">
          <div className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))] p-4 md:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4BFA8]">Residence Plate A</p>
                <p className="mt-2 text-xs uppercase tracking-[0.32em] text-white/35">
                  dimensioned plan inspired by the provided reference
                </p>
              </div>
              <div className="rounded-full border border-[#D4BFA8]/20 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">
                scale 1:125
              </div>
            </div>

            <BlueprintPlan />

            <div className="mt-8 rounded-[24px] border border-white/8 bg-[#0d0d0d] p-4 md:p-5">
              <BlueprintElevation />
            </div>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-5xl space-y-8">
          <FadeIn>
            <p className="text-center text-[10px] uppercase tracking-[0.55em] text-[#D4BFA8]">Measured Design</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-center text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
              Floor Plan With
              <br />
              Real Proportions
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-white/55">
              A clean architectural presentation inspired by your reference image, rebuilt as a premium plan board
              with labeled rooms, driveway geometry, garage bays, and clear length, breadth, and height markers.
            </p>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/8 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Length', '24.0 m'],
                ['Breadth', '18.5 m'],
                ['Height', '8.4 m'],
              ].map(([label, value], index) => (
                <FadeIn key={label} delay={0.22 + index * 0.06} className="bg-[#111111] p-6">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[#D4BFA8]">{label}</p>
                  <p className="text-2xl font-semibold text-white">{value}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.36} className="rounded-[28px] border border-[#D4BFA8]/20 bg-[#111111]/80 p-7">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#D4BFA8]">Spatial Brief</p>
              <div className="mt-5 space-y-4 text-sm text-white/60">
                <div className="flex items-center justify-between gap-6 border-b border-white/8 pb-4">
                  <span>Living + dining spine</span>
                  <span className="text-white">9.8 m x 5.8 m</span>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-white/8 pb-4">
                  <span>Guest suite + services</span>
                  <span className="text-white">7.0 m x 4.8 m</span>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-white/8 pb-4">
                  <span>Dual garage module</span>
                  <span className="text-white">5.6 m x 7.6 m</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span>Arrival court + carport</span>
                  <span className="text-white">16.2 m frontage</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
