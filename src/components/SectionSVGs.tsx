'use client';

import { motion } from 'framer-motion';

const S = '#D4BFA8';
const S2 = 'rgba(212,191,168,0.25)';

// ─── Reusable draw wrapper ────────────────────────────────────────────────────
function Draw({ delay = 0, dur = 1.2, children }: {
    delay?: number; dur?: number; children: React.ReactNode;
}) {
    return (
        <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: dur }}
        >
            {children}
        </motion.g>
    );
}

// ─── 1. Project Overview — Floor Plan SVG ────────────────────────────────────
export function FloorPlanSVG() {
    return (
        <motion.svg
            viewBox="0 0 400 340"
            className="w-full max-w-md"
            style={{ filter: 'drop-shadow(0 0 20px rgba(212,191,168,0.08))' }}
        >
            {/* Outer boundary */}
            <motion.rect
                x="20" y="20" width="360" height="300"
                fill="none" stroke={S} strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 2, ease: 'easeInOut' as const }, opacity: { duration: 0.01 } }}
            />

            {/* Internal room divisions */}
            <Draw delay={0.4} dur={0.8}>
                {/* Vertical centre wall */}
                <line x1="200" y1="20" x2="200" y2="220" stroke={S} strokeWidth="0.8" />
                {/* Horizontal mid wall */}
                <line x1="20" y1="180" x2="320" y2="180" stroke={S} strokeWidth="0.8" />
                {/* Right wing */}
                <line x1="320" y1="180" x2="320" y2="320" stroke={S} strokeWidth="0.8" />
            </Draw>

            {/* Room labels */}
            <Draw delay={0.8} dur={0.6}>
                <text x="105" y="100" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter" letterSpacing="2" opacity="0.6">GREAT ROOM</text>
                <text x="295" y="100" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter" letterSpacing="2" opacity="0.6">MASTER</text>
                <text x="155" y="250" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter" letterSpacing="2" opacity="0.6">ENTRANCE</text>
                <text x="355" y="250" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter" letterSpacing="2" opacity="0.6">TERRACE</text>
            </Draw>

            {/* Door swings */}
            <Draw delay={1.0} dur={0.6}>
                <path d="M 200 180 Q 230 150 200 150" fill="none" stroke={S} strokeWidth="0.6" strokeDasharray="3 3" />
                <path d="M 20  180 Q 50  210  50  180" fill="none" stroke={S} strokeWidth="0.6" strokeDasharray="3 3" />
                <path d="M 200  20 Q 230  50  230  20" fill="none" stroke={S} strokeWidth="0.6" strokeDasharray="3 3" />
            </Draw>

            {/* Window indicators */}
            <Draw delay={1.2} dur={0.5}>
                {[60, 120, 250, 310].map((x) => (
                    <g key={x}>
                        <line x1={x} y1="20" x2={x + 40} y2="20" stroke={S} strokeWidth="3" />
                    </g>
                ))}
                {[60, 130, 200, 260].map((y) => (
                    <g key={y}>
                        <line x1="380" y1={y} x2="380" y2={y + 30} stroke={S} strokeWidth="3" />
                    </g>
                ))}
            </Draw>

            {/* North indicator */}
            <Draw delay={1.5} dur={0.5}>
                <circle cx="370" cy="30" r="12" fill="none" stroke={S} strokeWidth="0.6" />
                <line x1="370" y1="18" x2="370" y2="42" stroke={S} strokeWidth="0.6" />
                <line x1="358" y1="30" x2="382" y2="30" stroke={S} strokeWidth="0.6" />
                <polygon points="370,18 367,28 370,25 373,28" fill={S} />
                <text x="370" y="14" textAnchor="middle" fill={S} fontSize="6" fontFamily="Inter">N</text>
            </Draw>

            {/* Pulsing room centre dots */}
            {[[105, 90], [295, 90], [155, 240], [350, 240]].map(([cx, cy], i) => (
                <motion.circle
                    key={`${cx}-${cy}`}
                    cx={cx} cy={cy} r={2.5}
                    fill={S}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.5 }}
                />
            ))}
        </motion.svg>
    );
}

// ─── 2. Elevation / Section SVG for Overview ─────────────────────────────────
export function ElevationSVG() {
    return (
        <motion.svg
            viewBox="0 0 420 200"
            className="w-full max-w-md opacity-60"
        >
            {/* Ground */}
            <motion.line
                x1="0" y1="180" x2="420" y2="180"
                stroke={S} strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1, ease: 'easeInOut' as const }, opacity: { duration: 0.01 } }}
            />
            {/* Main block */}
            <Draw delay={0.3} dur={1}>
                <rect x="60" y="80" width="300" height="100" fill="none" stroke={S} strokeWidth="0.8" />
                {/* Glass grid */}
                {[100, 140, 180, 220, 260, 300, 340].map((x) => (
                    <line key={x} x1={x} y1="80" x2={x} y2="180" stroke={S} strokeWidth="0.3" />
                ))}
                {[110, 140].map((y) => (
                    <line key={y} x1="60" y1={y} x2="360" y2={y} stroke={S} strokeWidth="0.3" />
                ))}
            </Draw>
            {/* Left tower */}
            <Draw delay={0.6} dur={0.8}>
                <rect x="20" y="40" width="50" height="140" fill="none" stroke={S} strokeWidth="0.8" />
                {[70, 100, 130, 160].map((y) => (
                    <line key={y} x1="20" y1={y} x2="70" y2={y} stroke={S} strokeWidth="0.3" />
                ))}
            </Draw>
            {/* Right tower */}
            <Draw delay={0.8} dur={0.8}>
                <rect x="350" y="20" width="50" height="160" fill="none" stroke={S} strokeWidth="0.8" />
                {[50, 80, 110, 140, 170].map((y) => (
                    <line key={y} x1="350" y1={y} x2="400" y2={y} stroke={S} strokeWidth="0.3" />
                ))}
            </Draw>
            {/* Roof overhang */}
            <Draw delay={1.0} dur={0.6}>
                <line x1="40" y1="80" x2="390" y2="80" stroke={S} strokeWidth="1.2" />
                <line x1="40" y1="68" x2="390" y2="68" stroke={S} strokeWidth="0.4" strokeDasharray="4 4" />
            </Draw>
            {/* Dimension arrows */}
            <Draw delay={1.4} dur={0.4}>
                <line x1="60" y1="195" x2="360" y2="195" stroke={S} strokeWidth="0.6" />
                <polygon points="60,195 68,192 68,198" fill={S} />
                <polygon points="360,195 352,192 352,198" fill={S} />
                <text x="210" y="192" textAnchor="middle" fill={S} fontSize="7" fontFamily="Inter" letterSpacing="1">42.5 m</text>
            </Draw>
        </motion.svg>
    );
}

// ─── 3. Highlight icons ───────────────────────────────────────────────────────

/** Panoramic Views — animated concentric arcs */
export function PanoramicSVG() {
    return (
        <motion.svg viewBox="0 0 80 80" className="w-16 h-16">
            {[30, 22, 14].map((r, i) => (
                <motion.circle
                    key={r} cx="40" cy="50" r={r}
                    fill="none" stroke={S} strokeWidth="1"
                    strokeDasharray={`${Math.PI * r * 0.55} ${Math.PI * r * 1.45}`}
                    strokeDashoffset={`${Math.PI * r * 0.28}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const }}
                />
            ))}
            {/* Eye centre */}
            <motion.circle
                cx="40" cy="50" r="3"
                fill={S}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            {/* Horizon line */}
            <motion.line
                x1="10" y1="50" x2="70" y2="50"
                stroke={S} strokeWidth="0.6" strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ pathLength: { delay: 0.5, duration: 0.8, ease: 'easeInOut' as const }, opacity: { delay: 0.5, duration: 0.1 } }}
            />
        </motion.svg>
    );
}

/** Zero-Carbon — animated solar + leaf hybrid */
export function ZeroCarbonSVG() {
    return (
        <motion.svg viewBox="0 0 80 80" className="w-16 h-16">
            {/* Outer ring */}
            <motion.circle
                cx="40" cy="40" r="28"
                fill="none" stroke={S} strokeWidth="0.7"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1.2, ease: 'easeInOut' as const }, opacity: { duration: 0.1 } }}
            />
            {/* Rays */}
            {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                const x1 = 40 + Math.cos(a) * 16;
                const y1 = 40 + Math.sin(a) * 16;
                const x2 = 40 + Math.cos(a) * 26;
                const y2 = 40 + Math.sin(a) * 26;
                return (
                    <motion.line
                        key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={S} strokeWidth="1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                    />
                );
            })}
            {/* Centre leaf */}
            <motion.path
                d="M40 52 Q28 40 40 28 Q52 40 40 52Z"
                fill="none" stroke={S} strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { delay: 0.4, duration: 1, ease: 'easeInOut' as const }, opacity: { delay: 0.4, duration: 0.01 } }}
            />
            <motion.line
                x1="40" y1="28" x2="40" y2="52"
                stroke={S} strokeWidth="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ pathLength: { delay: 1, duration: 0.5, ease: 'easeInOut' as const }, opacity: { delay: 1, duration: 0.01 } }}
            />
        </motion.svg>
    );
}

/** Infinity Terrace — animated water-edge pool */
export function InfinityPoolSVG() {
    return (
        <motion.svg viewBox="0 0 80 80" className="w-16 h-16">
            {/* Pool outline */}
            <motion.rect
                x="10" y="30" width="60" height="30"
                fill="none" stroke={S} strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1, ease: 'easeInOut' as const }, opacity: { duration: 0.01 } }}
            />
            {/* Animated water lines */}
            {[40, 47, 54].map((y, i) => (
                <motion.line
                    key={y} x1="14" y1={y} x2="66" y2={y}
                    stroke={S} strokeWidth="0.6"
                    animate={{ x1: [14, 16, 14], x2: [66, 64, 66], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.4 }}
                />
            ))}
            {/* Infinity edge (right side open) */}
            <motion.line
                x1="70" y1="30" x2="70" y2="60"
                stroke={S} strokeWidth="0"  // hidden — the right wall is removed
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
            />
            {/* Horizon mountains silhouette */}
            <motion.path
                d="M10 30 L22 18 L35 26 L50 14 L65 24 L70 30"
                fill="none" stroke={S} strokeWidth="0.7"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ pathLength: { delay: 0.6, duration: 1.2, ease: 'easeInOut' as const }, opacity: { delay: 0.6, duration: 0.1 } }}
            />
            {/* Ground line */}
            <motion.line
                x1="0" y1="64" x2="80" y2="64"
                stroke={S} strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ pathLength: { delay: 0.3, duration: 0.8, ease: 'easeInOut' as const }, opacity: { delay: 0.3, duration: 0.1 } }}
            />
        </motion.svg>
    );
}
