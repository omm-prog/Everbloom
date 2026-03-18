import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, X, Heart } from 'lucide-react';

interface ShareModalProps {
  shareUrl: string;
  onClose: () => void;
  isDark?: boolean;
}

export default function ShareModal({ shareUrl, onClose, isDark = false }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select input
    }
  };

  const bg = isDark ? '#2c2118' : '#fdfaf6';
  const border = isDark ? '#3d2f24' : '#e4ddd5';
  const textMuted = isDark ? '#7a6355' : '#c9bfb5';
  const textBody = isDark ? '#c9bfb5' : '#5c4a3d';
  const textHead = isDark ? '#f0ebe4' : '#3d2f24';
  const inputBg = isDark ? '#1a1410' : '#f8f5f2';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(30,20,14,0.5)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="relative max-w-md w-full rounded-3xl overflow-hidden"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          boxShadow: isDark
            ? '0 32px 80px rgba(0,0,0,0.5)'
            : '0 32px 80px rgba(100,70,50,0.16)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ background: border, color: textMuted }}
        >
          <X size={14} />
        </button>

        <div className="p-8">
          {/* Heart icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: '#f5d9d5' }}
          >
            <Heart size={22} className="text-[#c8938a]" fill="currentColor" />
          </div>

          <h2 className="font-serif text-2xl font-semibold mb-1.5" style={{ color: textHead }}>
            Ready to share
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: textBody }}>
            Your bouquet has been captured into a link. Anyone who opens it will see exactly what you designed — no account needed.
          </p>

          {/* URL copy row */}
          <div
            className="flex items-center gap-2 p-2 pl-4 rounded-2xl mb-4"
            style={{ background: inputBg, border: `1px solid ${border}` }}
          >
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs outline-none truncate"
              style={{ color: textMuted, letterSpacing: '0.02em' }}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium shrink-0 transition-all duration-300"
              style={{
                background: copied ? '#87a87e' : '#c8938a',
                color: '#fff',
                boxShadow: copied ? '0 4px 12px rgba(135,168,126,0.3)' : '0 4px 12px rgba(200,147,138,0.3)',
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>

          <p className="text-[11px] text-center" style={{ color: textMuted }}>
            The link encodes your entire bouquet — no data is stored anywhere.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
