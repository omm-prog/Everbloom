import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { FlowerType, WrapperStyle, BouquetState, MessageState, FlowerItem } from '../types';
import PresetBouquetCard, { PRESET_CONFIGS } from './PresetBouquetCard';

interface EditorPanelProps {
  bouquet: BouquetState;
  setBouquet: React.Dispatch<React.SetStateAction<BouquetState>>;
  message: MessageState;
  setMessage: React.Dispatch<React.SetStateAction<MessageState>>;
  isDark?: boolean;
}

const FLOWER_TYPES: { type: FlowerType; label: string; emoji: string; accent: string }[] = [
  { type: 'rose',      label: 'Rose',      emoji: '🌹', accent: '#d4697a' },
  { type: 'tulip',     label: 'Tulip',     emoji: '🌷', accent: '#e86870' },
  { type: 'sunflower', label: 'Sunflower', emoji: '🌻', accent: '#f59e0b' },
  { type: 'lily',      label: 'Lily',      emoji: '🪷', accent: '#c084fc' },
  { type: 'daisy',     label: 'Daisy',     emoji: '🌼', accent: '#86efac' },
];

const WRAPPERS: { style: WrapperStyle; label: string; icon: string }[] = [
  { style: 'none',    label: 'Bare',    icon: '·' },
  { style: 'classic', label: 'Warm',    icon: '🟡' },
  { style: 'modern',  label: 'Cool',    icon: '🔵' },
  { style: 'rustic',  label: 'Earthy',  icon: '🟤' },
];

const RIBBON_COLORS = [
  { label: 'Blush',   value: '#c8938a' },
  { label: 'Sage',    value: '#87a87e' },
  { label: 'Sky',     value: '#7eaec8' },
  { label: 'Mauve',   value: '#a87eaa' },
  { label: 'Gold',    value: '#c8a87e' },
  { label: 'Slate',   value: '#8e9eab' },
];

const MESSAGE_TEMPLATES = [
  { label: '💕 Romantic',    text: 'In every petal, a whisper of my love for you.' },
  { label: '🌿 Friendship',  text: 'To the one who always makes everything bloom a little brighter.' },
  { label: '🕊 Apology',     text: 'Words fall short, so I let these flowers speak instead.' },
  { label: '🎂 Birthday',    text: 'May this day be as beautiful as the person you are. Happy Birthday!' },
];

const FONT_OPTIONS = [
  { value: 'font-handwriting', label: 'Handwritten' },
  { value: 'font-serif',       label: 'Serif' },
  { value: 'font-sans',        label: 'Modern' },
];


function makeId() { return Math.random().toString(36).substr(2, 9); }

export default function EditorPanel({ bouquet, setBouquet, message, setMessage, isDark = false }: EditorPanelProps) {
  const [activeSection, setActiveSection] = useState<'flowers' | 'message'>('flowers');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const bg = isDark ? '#1a1410' : '#f8f5f2';
  const cardBg = isDark ? '#2c2118' : '#fdfaf6';
  const border = isDark ? '#3d2f24' : '#e4ddd5';
  const textMuted = isDark ? '#7a6355' : '#c9bfb5';
  const textBody = isDark ? '#c9bfb5' : '#5c4a3d';
  const textHead = isDark ? '#f0ebe4' : '#3d2f24';

  const handleAddFlower = (type: FlowerType) => {
    const newFlower: FlowerItem = {
      id: makeId(),
      type,
      color: 'default',
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 120 - 40,
      rotation: (Math.random() - 0.5) * 50,
      scale: 0.82 + Math.random() * 0.36,
      zIndex: bouquet.flowers.length + 10,
    };
    setBouquet(prev => ({ ...prev, flowers: [...prev.flowers, newFlower] }));
  };

  const applyPreset = (presetCfg: typeof PRESET_CONFIGS[0]) => {
    const flowers: FlowerItem[] = presetCfg.flowers.map((f) => ({
      id: makeId(),
      color: 'default',
      ...f,
    } as FlowerItem));
    setBouquet(prev => ({
      ...prev,
      flowers,
      wrapper: 'classic',
      ribbonColor: presetCfg.ribbonColor,
    }));
    setSelectedPresetId(presetCfg.id);
  };

  const clearFlowers = () => { setBouquet(prev => ({ ...prev, flowers: [] })); setSelectedPresetId(null); };

  return (
    <div className="flex flex-col h-full" style={{ background: bg }}>

      {/* Tab Switcher */}
      <div className="shrink-0 flex border-b" style={{ borderColor: border }}>
        {(['flowers', 'message'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className="flex-1 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 relative"
            style={{
              color: activeSection === tab ? '#c8938a' : textMuted,
              background: 'transparent',
            }}
          >
            {tab === 'flowers' ? '🌸 Bouquet' : '✉️ Message'}
            {activeSection === tab && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                style={{ background: '#c8938a' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '20px' }}>
        <AnimatePresence mode="wait">
          {activeSection === 'flowers' ? (
            <motion.div
              key="flowers"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Preset Bouquets */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4" style={{ color: textMuted }}>
                  Choose a style
                </p>

                {/* 2-col grid, mobile-first with generous gap */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 14,
                  }}
                >
                  {PRESET_CONFIGS.map(preset => (
                    <PresetBouquetCard
                      key={preset.id}
                      preset={preset}
                      isSelected={selectedPresetId === preset.id}
                      onClick={() => applyPreset(preset)}
                      isDark={isDark}
                    />
                  ))}
                </div>
              </section>

              {/* Single Flower Add */}
              <section className="section-divider pt-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: textMuted }}>
                    Add individually
                  </p>
                  {bouquet.flowers.length > 0 && (
                    <button
                      onClick={clearFlowers}
                      className="flex items-center gap-1 text-[11px] transition-colors"
                      style={{ color: '#c8938a' }}
                    >
                      <Trash2 size={11} /> Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {FLOWER_TYPES.map(ft => (
                    <button
                      key={ft.type}
                      onClick={() => handleAddFlower(ft.type)}
                      className="flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{
                        background: cardBg,
                        border: `1px solid ${border}`,
                      }}
                      title={`Add ${ft.label}`}
                    >
                      <span style={{ fontSize: 24 }}>{ft.emoji}</span>
                      <span className="text-[9px] font-medium" style={{ color: textMuted }}>{ft.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Wrapper */}
              <section className="section-divider pt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3" style={{ color: textMuted }}>
                  Wrapping Paper
                </p>
                <div className="flex gap-2">
                  {WRAPPERS.map(wrap => (
                    <button
                      key={wrap.style}
                      onClick={() => setBouquet(prev => ({ ...prev, wrapper: wrap.style }))}
                      className="flex-1 py-2 text-[11px] rounded-xl transition-all duration-200"
                      style={{
                        background: bouquet.wrapper === wrap.style ? '#c8938a' : cardBg,
                        color: bouquet.wrapper === wrap.style ? '#fff' : textBody,
                        border: `1px solid ${bouquet.wrapper === wrap.style ? '#c8938a' : border}`,
                        fontWeight: bouquet.wrapper === wrap.style ? 600 : 400,
                      }}
                    >
                      {wrap.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Ribbon Color */}
              {bouquet.wrapper !== 'none' && (
                <section>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3" style={{ color: textMuted }}>
                    Ribbon Color
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {RIBBON_COLORS.map(rc => (
                      <button
                        key={rc.value}
                        onClick={() => setBouquet(prev => ({ ...prev, ribbonColor: rc.value }))}
                        className="w-7 h-7 rounded-full transition-all duration-200 hover:scale-110"
                        style={{
                          background: rc.value,
                          outline: bouquet.ribbonColor === rc.value ? `2.5px solid ${rc.value}` : '2.5px solid transparent',
                          outlineOffset: 2,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                        }}
                        title={rc.label}
                        aria-label={`Ribbon color: ${rc.label}`}
                      />
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Templates */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3" style={{ color: textMuted }}>
                  Templates
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {MESSAGE_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(prev => ({ ...prev, text: tmpl.text }))}
                      className="text-left px-3 py-2.5 rounded-xl text-[11px] transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: cardBg,
                        color: textBody,
                        border: `1px solid ${border}`,
                      }}
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* To Field */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: textMuted }}>To</p>
                <input
                  type="text"
                  value={message.to}
                  onChange={e => setMessage(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="Recipient's name…"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    color: textHead,
                    fontFamily: "var(--font-handwriting)",
                    letterSpacing: '0.03em',
                  }}
                />
              </section>

              {/* Message Body */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: textMuted }}>Message</p>
                <textarea
                  value={message.text}
                  onChange={e => setMessage(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Write something heartfelt…"
                  rows={5}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    color: textHead,
                    lineHeight: 1.9,
                  }}
                />
              </section>

              {/* From Field */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: textMuted }}>From</p>
                <input
                  type="text"
                  value={message.sender}
                  onChange={e => setMessage(prev => ({ ...prev, sender: e.target.value }))}
                  placeholder="Your name…"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    color: textHead,
                    fontFamily: "var(--font-handwriting)",
                    letterSpacing: '0.03em',
                  }}
                />
              </section>

              {/* Font Style */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: textMuted }}>Note Style</p>
                <div className="flex gap-2">
                  {FONT_OPTIONS.map(fo => (
                    <button
                      key={fo.value}
                      onClick={() => setMessage(prev => ({ ...prev, font: fo.value }))}
                      className="flex-1 py-2 rounded-xl text-[11px] transition-all duration-200"
                      style={{
                        background: message.font === fo.value ? '#c8938a' : cardBg,
                        color: message.font === fo.value ? '#fff' : textBody,
                        border: `1px solid ${message.font === fo.value ? '#c8938a' : border}`,
                        fontWeight: message.font === fo.value ? 600 : 400,
                      }}
                    >
                      {fo.label}
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
