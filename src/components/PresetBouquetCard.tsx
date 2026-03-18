import { motion } from 'framer-motion';
import type { FlowerItem } from '../types';

// ─── Typed preset config ──────────────────────────────────────────────
export interface PresetConfig {
  id: string;
  label: string;
  subtitle: string;
  ribbonColor: string;
  wrapperColor: string;
  gradientFrom: string;
  gradientTo: string;
  badgeColor: string;
  textColor: string;
  flowers: Partial<FlowerItem>[];
}

export const PRESET_CONFIGS: PresetConfig[] = [
  {
    id: 'romantic',
    label: 'Romantic',
    subtitle: 'Roses & soft petals',
    ribbonColor: '#c8938a',
    wrapperColor: 'rgba(250,228,225,0.95)',
    gradientFrom: '#fdf0ee',
    gradientTo: '#fae4df',
    badgeColor: '#d4697a',
    textColor: '#9c4a55',
    flowers: [
      { type: 'rose', x: 0,   y: -30, rotation: 0,   scale: 1.1, zIndex: 14 },
      { type: 'rose', x: -55, y: 10,  rotation: -30, scale: 0.9, zIndex: 12 },
      { type: 'rose', x: 55,  y: 10,  rotation: 30,  scale: 0.9, zIndex: 12 },
      { type: 'rose', x: -25, y: -60, rotation: -12, scale: 0.8, zIndex: 15 },
      { type: 'rose', x: 25,  y: -60, rotation: 12,  scale: 0.8, zIndex: 15 },
      { type: 'daisy', x: -40, y: -45, rotation: -20, scale: 0.6, zIndex: 16 },
      { type: 'daisy', x: 40,  y: -45, rotation: 20,  scale: 0.6, zIndex: 16 },
      { type: 'daisy', x: 0,   y: -75, rotation: 0,   scale: 0.55, zIndex: 17 },
    ],
  },
  {
    id: 'sunshine',
    label: 'Sunshine',
    subtitle: 'Warmth & golden blooms',
    ribbonColor: '#c8a87e',
    wrapperColor: 'rgba(253,245,220,0.95)',
    gradientFrom: '#fffbee',
    gradientTo: '#fef0c7',
    badgeColor: '#d97706',
    textColor: '#92400e',
    flowers: [
      { type: 'sunflower', x: 0,   y: -35, rotation: 0,   scale: 1.1, zIndex: 14 },
      { type: 'sunflower', x: -60, y: 5,   rotation: -25, scale: 0.85, zIndex: 12 },
      { type: 'sunflower', x: 60,  y: 5,   rotation: 25,  scale: 0.85, zIndex: 12 },
      { type: 'sunflower', x: -28, y: -55, rotation: -10, scale: 0.7,  zIndex: 15 },
      { type: 'sunflower', x: 28,  y: -55, rotation: 10,  scale: 0.7,  zIndex: 15 },
      { type: 'daisy', x: 0,   y: -70, rotation: 0,   scale: 0.55, zIndex: 17 },
      { type: 'daisy', x: -45, y: -35, rotation: -18, scale: 0.5,  zIndex: 16 },
      { type: 'daisy', x: 45,  y: -35, rotation: 18,  scale: 0.5,  zIndex: 16 },
    ],
  },
  {
    id: 'elegant',
    label: 'Elegant',
    subtitle: 'Lilies & refined grace',
    ribbonColor: '#a87eaa',
    wrapperColor: 'rgba(238,232,248,0.95)',
    gradientFrom: '#faf8ff',
    gradientTo: '#f0eafe',
    badgeColor: '#9061c2',
    textColor: '#6b3fa0',
    flowers: [
      { type: 'lily', x: 0,   y: -40, rotation: 0,   scale: 1.15, zIndex: 14 },
      { type: 'tulip', x: -50, y: 2,  rotation: -20, scale: 0.95, zIndex: 12 },
      { type: 'tulip', x: 50,  y: 2,  rotation: 20,  scale: 0.95, zIndex: 12 },
      { type: 'lily', x: -22, y: -65, rotation: -8,  scale: 0.72, zIndex: 15 },
      { type: 'lily', x: 22,  y: -65, rotation: 8,   scale: 0.72, zIndex: 15 },
      { type: 'tulip', x: -55, y: -30, rotation: -28, scale: 0.6,  zIndex: 16 },
      { type: 'tulip', x: 55,  y: -30, rotation: 28,  scale: 0.6,  zIndex: 16 },
      { type: 'lily', x: 0,   y: -80, rotation: 0,   scale: 0.5,  zIndex: 17 },
    ],
  },
  {
    id: 'playful',
    label: 'Playful',
    subtitle: 'Mixed blooms & color',
    ribbonColor: '#87a87e',
    wrapperColor: 'rgba(225,242,230,0.95)',
    gradientFrom: '#f0fdf4',
    gradientTo: '#dcfce7',
    badgeColor: '#16a34a',
    textColor: '#15803d',
    flowers: [
      { type: 'tulip',     x: 0,   y: -32, rotation: 0,   scale: 1.05, zIndex: 14 },
      { type: 'daisy',     x: -52, y: 8,   rotation: -25, scale: 0.85, zIndex: 12 },
      { type: 'rose',      x: 52,  y: 8,   rotation: 25,  scale: 0.85, zIndex: 12 },
      { type: 'sunflower', x: -22, y: -58, rotation: -12, scale: 0.7,  zIndex: 15 },
      { type: 'lily',      x: 22,  y: -58, rotation: 12,  scale: 0.7,  zIndex: 15 },
      { type: 'rose',      x: -48, y: -32, rotation: -22, scale: 0.55, zIndex: 16 },
      { type: 'daisy',     x: 48,  y: -32, rotation: 22,  scale: 0.55, zIndex: 16 },
      { type: 'tulip',     x: 0,   y: -72, rotation: 0,   scale: 0.5,  zIndex: 17 },
    ],
  },
];

// ─── Reusable tiny SVG flower primitives ────────────────────────────────

function MiniLeaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0,0 Q5,-10 0,-18 Q-5,-10 0,0 Z" fill="#6a8c4a" opacity="0.55"/>
      <line x1="0" y1="0" x2="0" y2="-16" stroke="#4a6a2e" strokeWidth="0.5" opacity="0.4"/>
    </g>
  );
}

function Filler({ x, y, color, s = 1 }: { x: number; y: number; color: string; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="2" fill={color} opacity="0.7"/>
      <circle cx="3" cy="-3" r="1.5" fill={color} opacity="0.5"/>
      <circle cx="-2" cy="-4" r="1.8" fill={color} opacity="0.6"/>
    </g>
  );
}

function MiniRose({ x, y, r, rot, color }: { x: number; y: number; r: number; rot: number; color: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
      <line x1="0" y1="5" x2="0" y2="15" stroke="#6a8c4a" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="0" cy="0" r="7" fill={color} opacity="0.92"/>
      <ellipse cx="-4" cy="2" rx="5" ry="4.5" fill={color} opacity="0.76"/>
      <ellipse cx="4"  cy="2" rx="5" ry="4.5" fill={color} opacity="0.76"/>
      <ellipse cx="0" cy="-4" rx="4.5" ry="5" fill={color} opacity="0.84"/>
      <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.25)"/>
      <circle cx="0" cy="-1" r="1.5" fill="rgba(0,0,0,0.08)"/>
    </g>
  );
}

function MiniTulip({ x, y, r, rot, color }: { x: number; y: number; r: number; rot: number; color: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
      <line x1="0" y1="5" x2="0" y2="17" stroke="#6a8c4a" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="0"  cy="-1" rx="4.5" ry="8" fill={color} opacity="0.92"/>
      <ellipse cx="-3" cy="3"  rx="4"   ry="7" fill={color} opacity="0.76"/>
      <ellipse cx="3"  cy="3"  rx="4"   ry="7" fill={color} opacity="0.76"/>
      <ellipse cx="0"  cy="-5" rx="2.5" ry="4" fill="rgba(255,255,255,0.22)"/>
    </g>
  );
}

function MiniSunflower({ x, y, r, rot }: { x: number; y: number; r: number; rot: number }) {
  const a = [0,30,60,90,120,150,180,210,240,270,300,330];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
      <line x1="0" y1="5" x2="0" y2="17" stroke="#6a8c4a" strokeWidth="1.4" strokeLinecap="round"/>
      {a.map((d,i) => (
        <ellipse key={i} cx="0" cy="-11" rx="2.8" ry="6" fill="#fbbf24" opacity="0.88" transform={`rotate(${d},0,0)`}/>
      ))}
      <circle cx="0" cy="0" r="5.5" fill="#78350f"/>
      <circle cx="0" cy="0" r="3.5" fill="#92400e" opacity="0.7"/>
    </g>
  );
}

function MiniLily({ x, y, r, rot, color }: { x: number; y: number; r: number; rot: number; color: string }) {
  const a = [0,60,120,180,240,300];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
      <line x1="0" y1="5" x2="0" y2="17" stroke="#6a8c4a" strokeWidth="1.4" strokeLinecap="round"/>
      {a.map((d,i) => (
        <ellipse key={i} cx="0" cy="-8" rx="3.5" ry="8" fill={color} opacity="0.84" transform={`rotate(${d},0,0)`}/>
      ))}
      <circle cx="0" cy="0" r="3" fill="#fde68a" opacity="0.9"/>
    </g>
  );
}

function MiniDaisy({ x, y, r, rot, color }: { x: number; y: number; r: number; rot: number; color: string }) {
  const a = [0,40,80,120,160,200,240,280,320];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
      <line x1="0" y1="5" x2="0" y2="17" stroke="#6a8c4a" strokeWidth="1.4" strokeLinecap="round"/>
      {a.map((d,i) => (
        <ellipse key={i} cx="0" cy="-7" rx="2.2" ry="5.5" fill={color} opacity="0.88" transform={`rotate(${d},0,0)`}/>
      ))}
      <circle cx="0" cy="0" r="3.5" fill="#fef08a"/>
      <circle cx="0" cy="0" r="2" fill="#fde047" opacity="0.7"/>
    </g>
  );
}

// ─── Full compositional scenes per preset ──────────────────────────────

function RomanticScene() {
  return (
    <svg viewBox="0 0 140 130" width="100%" height="100%" style={{ display: 'block' }}>
      {/* wrapper cone */}
      <path d="M30,110 L48,50 L92,50 L110,110 Z" fill="rgba(250,228,225,0.88)" stroke="rgba(212,105,122,0.1)" strokeWidth="0.6"/>
      <path d="M38,110 L52,58 L88,58 L102,110 Z" fill="rgba(255,240,238,0.4)" stroke="none"/>
      {/* leaves behind flowers */}
      <MiniLeaf x={38} y={55} rot={-40} s={1.1}/>
      <MiniLeaf x={102} y={55} rot={40} s={1.1}/>
      <MiniLeaf x={50} y={35} rot={-25} s={0.9}/>
      <MiniLeaf x={90} y={35} rot={25} s={0.9}/>
      <MiniLeaf x={70} y={20} rot={8} s={0.7}/>
      {/* fillers */}
      <Filler x={42} y={42} color="#f9d0d8" s={1.2}/>
      <Filler x={98} y={42} color="#f9d0d8" s={1.2}/>
      <Filler x={60} y={18} color="#fce7f3" s={1}/>
      <Filler x={80} y={18} color="#fce7f3" s={1}/>
      {/* stems */}
      <line x1="70" y1="68" x2="70" y2="52" stroke="#6a8c4a" strokeWidth="1.3" opacity="0.6"/>
      <line x1="70" y1="68" x2="50" y2="45" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="90" y2="45" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="42" y2="32" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="98" y2="32" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="56" y2="22" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="84" y2="22" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="70" y2="16" stroke="#6a8c4a" strokeWidth="0.8" opacity="0.3"/>
      {/* back row (smaller) */}
      <MiniDaisy x={56} y={20} r={0.7} rot={-8} color="#f9d0d8"/>
      <MiniDaisy x={84} y={20} r={0.7} rot={8} color="#fce7f3"/>
      <MiniDaisy x={70} y={14} r={0.6} rot={0} color="#f9d0d8"/>
      {/* mid row */}
      <MiniRose x={42} y={30} r={0.95} rot={-20} color="#c45b7b"/>
      <MiniRose x={98} y={30} r={0.95} rot={20} color="#d4697a"/>
      {/* front row (largest) */}
      <MiniRose x={70} y={48} r={1.3} rot={0} color="#d4697a"/>
      <MiniRose x={50} y={43} r={1.1} rot={-18} color="#c45b7b"/>
      <MiniRose x={90} y={43} r={1.1} rot={18} color="#d4697a"/>
      {/* ribbon bow */}
      <ellipse cx="50" cy="70" rx="10" ry="4.5" fill="#c8938a" opacity="0.88" transform="rotate(-14,50,70)"/>
      <ellipse cx="90" cy="70" rx="10" ry="4.5" fill="#c8938a" opacity="0.88" transform="rotate(14,90,70)"/>
      <circle cx="70" cy="70" r="5" fill="#c8938a"/>
      <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}

function SunshineScene() {
  return (
    <svg viewBox="0 0 140 130" width="100%" height="100%" style={{ display: 'block' }}>
      <path d="M30,110 L48,50 L92,50 L110,110 Z" fill="rgba(253,245,220,0.88)" stroke="rgba(217,119,6,0.08)" strokeWidth="0.6"/>
      <path d="M38,110 L52,58 L88,58 L102,110 Z" fill="rgba(254,248,230,0.3)" stroke="none"/>
      <MiniLeaf x={36} y={55} rot={-42} s={1.1}/>
      <MiniLeaf x={104} y={55} rot={42} s={1.1}/>
      <MiniLeaf x={48} y={34} rot={-28} s={0.9}/>
      <MiniLeaf x={92} y={34} rot={28} s={0.9}/>
      <MiniLeaf x={70} y={18} rot={0} s={0.7}/>
      <Filler x={44} y={40} color="#fef3c7" s={1.2}/>
      <Filler x={96} y={40} color="#fef3c7" s={1.2}/>
      <Filler x={58} y={16} color="#fde68a" s={1}/>
      <Filler x={82} y={16} color="#fde68a" s={1}/>
      <line x1="70" y1="68" x2="70" y2="50" stroke="#6a8c4a" strokeWidth="1.3" opacity="0.6"/>
      <line x1="70" y1="68" x2="48" y2="44" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="92" y2="44" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="40" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="100" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="55" y2="18" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="85" y2="18" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="70" y2="14" stroke="#6a8c4a" strokeWidth="0.8" opacity="0.3"/>
      {/* back row */}
      <MiniDaisy x={55} y={16} r={0.65} rot={-6} color="#fef9c3"/>
      <MiniDaisy x={85} y={16} r={0.65} rot={6} color="#fef9c3"/>
      <MiniDaisy x={70} y={12} r={0.55} rot={0} color="#fde68a"/>
      {/* mid row */}
      <MiniSunflower x={40} y={28} r={0.9} rot={-22}/>
      <MiniSunflower x={100} y={28} r={0.9} rot={22}/>
      <MiniSunflower x={55} y={35} r={0.78} rot={-10}/>
      <MiniSunflower x={85} y={35} r={0.78} rot={10}/>
      {/* front row */}
      <MiniSunflower x={70} y={47} r={1.3} rot={0}/>
      <MiniSunflower x={48} y={43} r={1.05} rot={-18}/>
      <MiniSunflower x={92} y={43} r={1.05} rot={18}/>
      {/* ribbon */}
      <ellipse cx="50" cy="70" rx="10" ry="4.5" fill="#c8a87e" opacity="0.88" transform="rotate(-14,50,70)"/>
      <ellipse cx="90" cy="70" rx="10" ry="4.5" fill="#c8a87e" opacity="0.88" transform="rotate(14,90,70)"/>
      <circle cx="70" cy="70" r="5" fill="#c8a87e"/>
      <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}

function ElegantScene() {
  return (
    <svg viewBox="0 0 140 130" width="100%" height="100%" style={{ display: 'block' }}>
      <path d="M32,110 L50,52 L90,52 L108,110 Z" fill="rgba(238,232,248,0.9)" stroke="rgba(144,97,194,0.08)" strokeWidth="0.6"/>
      <path d="M40,110 L54,60 L86,60 L100,110 Z" fill="rgba(248,244,255,0.35)" stroke="none"/>
      <MiniLeaf x={38} y={56} rot={-38} s={1}/>
      <MiniLeaf x={102} y={56} rot={38} s={1}/>
      <MiniLeaf x={50} y={36} rot={-22} s={0.85}/>
      <MiniLeaf x={90} y={36} rot={22} s={0.85}/>
      <MiniLeaf x={62} y={18} rot={-5} s={0.65}/>
      <MiniLeaf x={78} y={18} rot={5} s={0.65}/>
      <Filler x={44} y={42} color="#e9d5f5" s={1.1}/>
      <Filler x={96} y={42} color="#e9d5f5" s={1.1}/>
      <Filler x={60} y={15} color="#ddd6fe" s={0.9}/>
      <Filler x={80} y={15} color="#ddd6fe" s={0.9}/>
      <line x1="70" y1="68" x2="70" y2="50" stroke="#6a8c4a" strokeWidth="1.3" opacity="0.6"/>
      <line x1="70" y1="68" x2="48" y2="45" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="92" y2="45" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="38" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="102" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="55" y2="20" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="85" y2="20" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="70" y2="14" stroke="#6a8c4a" strokeWidth="0.8" opacity="0.3"/>
      {/* back */}
      <MiniLily x={55} y={18} r={0.6} rot={-6} color="#c084fc"/>
      <MiniLily x={85} y={18} r={0.6} rot={6} color="#a855f7"/>
      <MiniLily x={70} y={12} r={0.5} rot={0} color="#d8b4fe"/>
      {/* mid */}
      <MiniTulip x={38} y={28} r={0.85} rot={-24} color="#e879f9"/>
      <MiniTulip x={102} y={28} r={0.85} rot={24} color="#d946ef"/>
      <MiniLily x={52} y={36} r={0.75} rot={-12} color="#c084fc"/>
      <MiniLily x={88} y={36} r={0.75} rot={12} color="#a78bfa"/>
      {/* front */}
      <MiniLily x={70} y={47} r={1.3} rot={0} color="#c084fc"/>
      <MiniTulip x={48} y={43} r={1.05} rot={-16} color="#e879f9"/>
      <MiniTulip x={92} y={43} r={1.05} rot={16} color="#d946ef"/>
      {/* ribbon */}
      <ellipse cx="50" cy="70" rx="9.5" ry="4" fill="#a87eaa" opacity="0.88" transform="rotate(-14,50,70)"/>
      <ellipse cx="90" cy="70" rx="9.5" ry="4" fill="#a87eaa" opacity="0.88" transform="rotate(14,90,70)"/>
      <circle cx="70" cy="70" r="5" fill="#a87eaa"/>
      <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}

function PlayfulScene() {
  return (
    <svg viewBox="0 0 140 130" width="100%" height="100%" style={{ display: 'block' }}>
      <path d="M30,110 L48,50 L92,50 L110,110 Z" fill="rgba(225,242,230,0.88)" stroke="rgba(22,163,74,0.08)" strokeWidth="0.6"/>
      <path d="M38,110 L52,58 L88,58 L102,110 Z" fill="rgba(240,253,244,0.3)" stroke="none"/>
      <MiniLeaf x={36} y={55} rot={-42} s={1.1}/>
      <MiniLeaf x={104} y={55} rot={42} s={1.1}/>
      <MiniLeaf x={46} y={34} rot={-30} s={0.9}/>
      <MiniLeaf x={94} y={34} rot={30} s={0.9}/>
      <MiniLeaf x={70} y={16} rot={0} s={0.7}/>
      <Filler x={44} y={40} color="#bbf7d0" s={1.1}/>
      <Filler x={96} y={40} color="#fce7f3" s={1.1}/>
      <Filler x={58} y={14} color="#fde68a" s={0.9}/>
      <Filler x={82} y={14} color="#ddd6fe" s={0.9}/>
      <line x1="70" y1="68" x2="70" y2="50" stroke="#6a8c4a" strokeWidth="1.3" opacity="0.6"/>
      <line x1="70" y1="68" x2="48" y2="44" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="92" y2="44" stroke="#6a8c4a" strokeWidth="1.2" opacity="0.5"/>
      <line x1="70" y1="68" x2="40" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="100" y2="30" stroke="#6a8c4a" strokeWidth="1" opacity="0.4"/>
      <line x1="70" y1="68" x2="55" y2="18" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="85" y2="18" stroke="#6a8c4a" strokeWidth="0.9" opacity="0.35"/>
      <line x1="70" y1="68" x2="70" y2="12" stroke="#6a8c4a" strokeWidth="0.8" opacity="0.3"/>
      {/* back */}
      <MiniSunflower x={55} y={16} r={0.55} rot={-8}/>
      <MiniLily x={85} y={16} r={0.55} rot={8} color="#86efac"/>
      <MiniDaisy x={70} y={10} r={0.5} rot={0} color="#fde68a"/>
      {/* mid */}
      <MiniRose x={40} y={28} r={0.85} rot={-22} color="#fb7185"/>
      <MiniDaisy x={100} y={28} r={0.85} rot={22} color="#fde68a"/>
      <MiniLily x={52} y={36} r={0.72} rot={-10} color="#c084fc"/>
      <MiniSunflower x={88} y={36} r={0.72} rot={10}/>
      {/* front */}
      <MiniTulip x={70} y={47} r={1.25} rot={0} color="#f472b6"/>
      <MiniDaisy x={48} y={44} r={1.0} rot={-18} color="#fde68a"/>
      <MiniRose x={92} y={44} r={1.0} rot={18} color="#fb7185"/>
      {/* ribbon */}
      <ellipse cx="50" cy="70" rx="10" ry="4.5" fill="#87a87e" opacity="0.88" transform="rotate(-14,50,70)"/>
      <ellipse cx="90" cy="70" rx="10" ry="4.5" fill="#87a87e" opacity="0.88" transform="rotate(14,90,70)"/>
      <circle cx="70" cy="70" r="5" fill="#87a87e"/>
      <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}

const SCENE_MAP: Record<string, React.FC> = {
  romantic: RomanticScene,
  sunshine: SunshineScene,
  elegant:  ElegantScene,
  playful:  PlayfulScene,
};

// ─── Card component ──────────────────────────────────────────────────────
interface PresetBouquetCardProps {
  preset: PresetConfig;
  isSelected: boolean;
  onClick: () => void;
  isDark?: boolean;
}

export default function PresetBouquetCard({ preset, isSelected, onClick, isDark = false }: PresetBouquetCardProps) {
  const Scene = SCENE_MAP[preset.id];

  const cardBg     = isDark ? '#2c2118' : '#ffffff';
  const selBorder  = preset.badgeColor;
  const restBorder = isDark ? '#3d2f24' : '#ede8e2';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      aria-label={`Select ${preset.label} preset`}
      style={{
        background: isSelected
          ? `linear-gradient(150deg, ${preset.gradientFrom}, ${preset.gradientTo})`
          : cardBg,
        border: `1.5px solid ${isSelected ? selBorder : restBorder}`,
        boxShadow: isSelected
          ? `0 0 0 3px ${preset.badgeColor}22, 0 10px 28px ${preset.badgeColor}1a`
          : isDark
            ? '0 3px 14px rgba(0,0,0,0.3)'
            : '0 3px 14px rgba(100,70,50,0.08)',
        borderRadius: 20,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
        cursor: 'pointer',
        textAlign: 'left' as const,
        width: '100%',
        transition: 'border-color 0.3s, box-shadow 0.3s, background 0.4s',
      }}
    >
      {/* ── Illustration area ── */}
      <div
        style={{
          background: `linear-gradient(165deg, ${preset.gradientFrom}, ${preset.gradientTo})`,
          height: 130,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 65%, ${preset.badgeColor}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}/>

        {/* Breathing animation wrapper */}
        <motion.div
          animate={{ scale: [1, 1.02, 1], y: [0, -1.5, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          style={{ width: '92%', height: '100%' }}
        >
          {Scene && <Scene />}
        </motion.div>

        {/* Selected badge */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 22, height: 22, borderRadius: 999,
              background: preset.badgeColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px ${preset.badgeColor}40`,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 10 10">
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>
        )}
      </div>

      {/* ── Card footer ── */}
      <div style={{ padding: '11px 14px 13px' }}>
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.04em',
          lineHeight: 1.3,
          color: isSelected ? preset.textColor : (isDark ? '#e4ddd5' : '#3d2f24'),
          marginBottom: 3,
          fontFamily: 'var(--font-serif)',
        }}>
          {preset.label}
        </p>
        <p style={{
          fontSize: 10.5,
          letterSpacing: '0.02em',
          lineHeight: 1.35,
          color: isSelected ? preset.textColor : (isDark ? '#7a6355' : '#b5a99a'),
          opacity: isSelected ? 0.75 : 1,
          fontFamily: 'var(--font-sans)',
        }}>
          {preset.subtitle}
        </p>
      </div>
    </motion.button>
  );
}
