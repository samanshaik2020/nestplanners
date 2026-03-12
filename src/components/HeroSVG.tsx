'use client';

import { motion } from 'framer-motion';

const S = '#D4BFA8'; // stroke colour

// Use explicit individual props to avoid SVGProps ↔ SVGMotionProps conflict
function AL({ x1, y1, x2, y2, sw = '0.8', dash, delay = 0, dur = 1.4 }: {
    x1: number; y1: number; x2: number; y2: number;
    sw?: string; dash?: string; delay?: number; dur?: number;
}) {
    return (
        <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={S} strokeWidth={sw} strokeDasharray={dash}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                pathLength: { delay, duration: dur, ease: 'easeInOut' as const },
                opacity: { delay, duration: 0.01 },
            }}
        />
    );
}

function AR({ x, y, w, h, sw = '1', delay = 0, dur = 1.4 }: {
    x: number; y: number; w: number; h: number;
    sw?: string; delay?: number; dur?: number;
}) {
    return (
        <motion.rect
            x={x} y={y} width={w} height={h}
            stroke={S} strokeWidth={sw} fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                pathLength: { delay, duration: dur, ease: 'easeInOut' as const },
                opacity: { delay, duration: 0.01 },
            }}
        />
    );
}

export default function HeroSVG() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Faint background grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke={S} strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Animated architectural blueprint */}
            <motion.svg
                viewBox="0 0 800 600"
                className="w-full max-w-3xl h-auto px-6 md:px-12"
                style={{ filter: 'drop-shadow(0 0 28px rgba(212,191,168,0.15))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Main building facade */}
                <AR x={150} y={180} w={500} h={300} sw="1.2" delay={0.2} dur={1.8} />

                {/* Roof lines */}
                <AL x1={120} y1={180} x2={680} y2={180} sw="1.2" delay={0.5} dur={1.2} />
                <AL x1={120} y1={162} x2={680} y2={162} sw="0.5" dash="5 5" delay={0.7} dur={1.2} />

                {/* Horizontal floor bands */}
                <AL x1={150} y1={280} x2={650} y2={280} sw="0.5" dash="6 6" delay={1.0} dur={1.0} />
                <AL x1={150} y1={380} x2={650} y2={380} sw="0.5" dash="6 6" delay={1.1} dur={1.0} />

                {/* Vertical glass panel dividers */}
                {[200, 260, 320, 380, 440, 500, 560, 610].map((x, i) => (
                    <AL key={x} x1={x} y1={180} x2={x} y2={480} sw="0.35" delay={1.2 + i * 0.06} dur={0.8} />
                ))}

                {/* Left tower */}
                <AR x={90} y={240} w={60} h={240} delay={0.4} dur={1.4} />
                <AL x1={90} y1={295} x2={150} y2={295} sw="0.4" dash="4 4" delay={1.5} dur={0.6} />
                <AL x1={90} y1={365} x2={150} y2={365} sw="0.4" dash="4 4" delay={1.6} dur={0.6} />
                <AL x1={90} y1={435} x2={150} y2={435} sw="0.4" dash="4 4" delay={1.7} dur={0.6} />

                {/* Right tower (taller) */}
                <AR x={650} y={210} w={60} h={270} delay={0.6} dur={1.4} />
                <AL x1={650} y1={275} x2={710} y2={275} sw="0.4" dash="4 4" delay={1.5} dur={0.6} />
                <AL x1={650} y1={350} x2={710} y2={350} sw="0.4" dash="4 4" delay={1.6} dur={0.6} />
                <AL x1={650} y1={425} x2={710} y2={425} sw="0.4" dash="4 4" delay={1.7} dur={0.6} />

                {/* Entrance opening */}
                <AR x={330} y={378} w={140} h={102} delay={1.8} dur={0.8} />
                <AL x1={400} y1={378} x2={400} y2={480} sw="0.5" delay={2.0} dur={0.5} />

                {/* Pool edge */}
                <AL x1={150} y1={492} x2={650} y2={492} sw="1.5" delay={2.2} dur={0.8} />
                <AL x1={150} y1={502} x2={650} y2={502} sw="0.4" delay={2.3} dur={0.8} />

                {/* Ground line */}
                <AL x1={60} y1={522} x2={740} y2={522} sw="0.8" delay={2.4} dur={0.8} />

                {/* Compass rose */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.8 }}>
                    <circle cx="730" cy="100" r="18" fill="none" stroke={S} strokeWidth="0.8" />
                    <line x1="730" y1="82" x2="730" y2="118" stroke={S} strokeWidth="0.8" />
                    <line x1="712" y1="100" x2="748" y2="100" stroke={S} strokeWidth="0.8" />
                    <polygon points="730,82 726,96 730,92 734,96" fill={S} />
                    <text x="730" y="75" textAnchor="middle" fill={S} fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="2">N</text>
                </motion.g>

                {/* Scale bar */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7, duration: 0.6 }}>
                    <line x1="70" y1="562" x2="150" y2="562" stroke={S} strokeWidth="1" />
                    <line x1="70" y1="557" x2="70" y2="567" stroke={S} strokeWidth="1" />
                    <line x1="150" y1="557" x2="150" y2="567" stroke={S} strokeWidth="1" />
                    <text x="110" y="577" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="1">10 m</text>
                </motion.g>

                {/* Pulsing structural nodes */}
                {([[150, 180], [400, 180], [650, 180], [90, 240], [710, 210]] as [number, number][]).map(([cx, cy], i) => (
                    <motion.circle
                        key={`${cx}-${cy}`}
                        cx={cx} cy={cy} r={3}
                        fill={S}
                        animate={{ scale: [1, 1.9, 1], opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.45 }}
                    />
                ))}
            </motion.svg>
        </div>
    );
}
