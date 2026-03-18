import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BouquetState } from '../types';

interface BouquetCanvasProps {
  bouquet: BouquetState;
  onMoveFlower?: (id: string, x: number, y: number) => void;
  readOnly?: boolean;
  isDark?: boolean;
}

// Rich SVG flower components for premium feel
const FlowerSVGs: Record<string, (color: string) => React.ReactElement> = {
  rose: (c) => (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <ellipse cx="40" cy="58" rx="6" ry="18" fill="#5a7a3a" opacity="0.8"/>
      <ellipse cx="34" cy="62" rx="10" ry="4" fill="#5a7a3a" opacity="0.5" transform="rotate(-30,34,62)"/>
      <circle cx="40" cy="36" r="16" fill={c} opacity="0.9"/>
      <ellipse cx="40" cy="30" rx="10" ry="10" fill={c}/>
      <ellipse cx="33" cy="33" rx="9" ry="9" fill={c} opacity="0.85"/>
      <ellipse cx="47" cy="33" rx="9" ry="9" fill={c} opacity="0.85"/>
      <ellipse cx="40" cy="26" rx="8" ry="9" fill={c} opacity="0.9"/>
      <ellipse cx="40" cy="34" rx="5" ry="5" fill={lighten(c)} opacity="0.6"/>
      <circle cx="40" cy="32" r="3" fill={darken(c)} opacity="0.4"/>
    </svg>
  ),
  tulip: (c) => (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <rect x="38" y="42" width="4" height="28" rx="2" fill="#5a7a3a" opacity="0.8"/>
      <ellipse cx="30" cy="58" rx="10" ry="4" fill="#5a7a3a" opacity="0.5" transform="rotate(-25,30,58)"/>
      <ellipse cx="40" cy="28" rx="10" ry="16" fill={c} opacity="0.9"/>
      <ellipse cx="30" cy="34" rx="9" ry="13" fill={c} opacity="0.8"/>
      <ellipse cx="50" cy="34" rx="9" ry="13" fill={c} opacity="0.8"/>
      <ellipse cx="40" cy="26" rx="6" ry="10" fill={lighten(c)} opacity="0.5"/>
    </svg>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sunflower: (_c) => (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <rect x="38" y="42" width="4" height="28" rx="2" fill="#5a7a3a" opacity="0.8"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
        <ellipse key={i} cx="40" cy="40" rx="6" ry="14"
          fill="#fbbf24" opacity="0.9"
          transform={`rotate(${a},40,40) translate(0,-14)`}/>
      ))}
      <circle cx="40" cy="40" r="11" fill="#78350f"/>
      <circle cx="40" cy="40" r="8" fill="#92400e" opacity="0.8"/>
      <circle cx="40" cy="40" r="5" fill="#a16207" opacity="0.6"/>
    </svg>
  ),
  lily: (c) => (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <rect x="38" y="46" width="4" height="24" rx="2" fill="#5a7a3a" opacity="0.8"/>
      {[0,60,120,180,240,300].map((a,i) => (
        <ellipse key={i} cx="40" cy="40" rx="7" ry="16"
          fill={c} opacity="0.85"
          transform={`rotate(${a},40,40) translate(0,-10)`}/>
      ))}
      <circle cx="40" cy="40" r="5" fill="#fde68a" opacity="0.9"/>
      {[0,72,144,216,288].map((a,i) => (
        <line key={i} x1="40" y1="40" x2={40+12*Math.cos((a-90)*Math.PI/180)} y2={40+12*Math.sin((a-90)*Math.PI/180)}
          stroke="#f59e0b" strokeWidth="1" opacity="0.7"/>
      ))}
    </svg>
  ),
  daisy: (c) => (
    <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <rect x="38" y="46" width="4" height="24" rx="2" fill="#5a7a3a" opacity="0.8"/>
      {[0,40,80,120,160,200,240,280,320].map((a,i) => (
        <ellipse key={i} cx="40" cy="40" rx="5" ry="13"
          fill={c} opacity="0.9"
          transform={`rotate(${a},40,40) translate(0,-12)`}/>
      ))}
      <circle cx="40" cy="40" r="8" fill="#fef08a"/>
      <circle cx="40" cy="40" r="5" fill="#fde047" opacity="0.8"/>
    </svg>
  ),
};

// Flower color palettes per type
const FLOWER_COLORS: Record<string, string[]> = {
  rose: ['#d4697a', '#e07d96', '#c45b7b', '#b04a88'],
  tulip: ['#e86870', '#d6548e', '#9c4fac', '#f4884a'],
  sunflower: ['#f59e0b', '#fbbf24', '#f97316', '#fde68a'],
  lily: ['#c084fc', '#a78bfa', '#f9a8d4', '#fb7185'],
  daisy: ['#f0fdf4', '#fef9c3', '#fce7f3', '#e0f2fe'],
};

// Wrapper palettes
const WRAPPER_STYLES: Record<string, { bg: string; shade: string }> = {
  classic: { bg: 'rgba(253,241,220,0.85)', shade: 'rgba(220,190,140,0.2)' },
  modern:  { bg: 'rgba(220,235,250,0.85)', shade: 'rgba(147,197,230,0.2)' },
  rustic:  { bg: 'rgba(230,218,195,0.85)', shade: 'rgba(180,150,100,0.2)' },
  none:    { bg: 'transparent', shade: 'transparent' },
};

function lighten(hex: string): string {
  return hex; // simplified - return same color for SVG tinting
}
function darken(hex: string): string {
  return hex; // simplified
}

export default function BouquetCanvas({ bouquet, onMoveFlower, readOnly = false, isDark = false }: BouquetCanvasProps) {
  const wrapStyle = WRAPPER_STYLES[bouquet.wrapper] || WRAPPER_STYLES.none;

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center" style={{ pointerEvents: 'none' }}>
      <div className="relative" style={{ width: 320, height: 380, pointerEvents: 'auto' }} id="bouquet-capture-area">

        {/* Wrapper paper cone */}
        {bouquet.wrapper !== 'none' && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 transition-all duration-700"
            style={{
              width: 220,
              height: 200,
              background: wrapStyle.bg,
              clipPath: 'polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)',
              boxShadow: `0 20px 40px ${wrapStyle.shade}`,
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.35)',
            }}
          />
        )}

        {/* Flowers */}
        <AnimatePresence>
          {bouquet.flowers.map(flower => {
            const colors = FLOWER_COLORS[flower.type] || ['#d4697a'];
            const flowerColor = colors[flower.zIndex % colors.length];
            const FlowerSVG = FlowerSVGs[flower.type];
            return (
              <motion.div
                key={flower.id}
                drag={!readOnly}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (onMoveFlower) {
                    onMoveFlower(flower.id, flower.x + info.offset.x, flower.y + info.offset.y);
                  }
                }}
                initial={{ opacity: 0, scale: 0.3, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: flower.scale,
                  x: flower.x,
                  y: flower.y,
                  rotate: flower.rotation,
                }}
                exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.3 } }}
                whileHover={!readOnly ? { scale: flower.scale * 1.12, zIndex: 99 } : {}}
                whileDrag={!readOnly ? { zIndex: 200, scale: flower.scale * 1.05 } : {}}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '45%',
                  marginLeft: -36,
                  marginTop: -36,
                  zIndex: flower.zIndex,
                  cursor: readOnly ? 'default' : 'grab',
                }}
              >
                {/* Per-flower floating animation with unique offset */}
                <motion.div
                  animate={{ y: [0, -(4 + (flower.zIndex % 4)), 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5 + (flower.zIndex % 3) * 0.7,
                    ease: 'easeInOut',
                    delay: flower.zIndex * 0.15,
                  }}
                >
                  {FlowerSVG ? FlowerSVG(flowerColor) : <span style={{ fontSize: 60 }}>🌸</span>}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Ribbon */}
        {bouquet.wrapper !== 'none' && (
          <div
            className="absolute z-20 transition-all duration-500"
            style={{
              bottom: 60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
            }}
          >
            {/* bow */}
            <svg viewBox="0 0 120 40" width="120" height="40">
              <ellipse cx="40" cy="20" rx="32" ry="12" fill={bouquet.ribbonColor} opacity="0.9"/>
              <ellipse cx="80" cy="20" rx="32" ry="12" fill={bouquet.ribbonColor} opacity="0.9"/>
              <ellipse cx="60" cy="20" rx="10" ry="10" fill={bouquet.ribbonColor}/>
              <ellipse cx="60" cy="20" rx="6" ry="6" fill="rgba(255,255,255,0.25)"/>
            </svg>
          </div>
        )}

        {/* Empty state helper */}
        {bouquet.flowers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
          >
            <div className={`text-5xl mb-2 opacity-30`}>🌸</div>
            <p className={`font-serif text-sm italic tracking-wide ${isDark ? 'text-[#7a6355]' : 'text-[#c9bfb5]'}`}>
              Add flowers to start your bouquet
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
