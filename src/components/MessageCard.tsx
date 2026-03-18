import { motion } from 'framer-motion';
import type { MessageState } from '../types';

interface MessageCardProps {
  message: MessageState;
  readOnly?: boolean;
  isDark?: boolean;
}

export default function MessageCard({ message, isDark = false }: MessageCardProps) {
  const hasContent = message.text || message.to;
  if (!hasContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -2.5 }}
      whileHover={{ rotate: 0, y: -2, transition: { duration: 0.35, ease: 'easeOut' } }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      className="absolute bottom-8 right-6 z-50 w-64"
      style={{ transformOrigin: 'top right' }}
    >
      {/* Wax seal / pin at top */}
      <div className="absolute -top-3 right-6 z-10">
        <div
          className="w-6 h-6 rounded-full shadow-md flex items-center justify-center"
          style={{ background: '#c8938a' }}
        >
          <span style={{ fontSize: 10 }}>❤</span>
        </div>
      </div>
      
      {/* Card body */}
      <div
        className={`paper-texture rounded-2xl shadow-xl overflow-hidden border transition-colors duration-700 ${isDark ? 'border-[#5c4a3d]' : 'border-[#e4ddd5]'}`}
        style={{
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
            : '0 8px 32px rgba(100,70,50,0.12), 0 2px 8px rgba(100,70,50,0.06)',
        }}
      >
        {/* "To" section */}
        {message.to && (
          <div className={`px-5 pt-5 pb-0 ${isDark ? 'text-[#c9bfb5]' : 'text-[#7a6355]'}`}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-60 mb-0.5">To</p>
            <p className={`font-handwriting text-lg leading-tight ${isDark ? 'text-[#f0ebe4]' : 'text-[#3d2f24]'}`}>
              {message.to}
            </p>
          </div>
        )}

        {/* Divider line */}
        {message.to && message.text && (
          <div className={`mx-5 my-3 border-t border-dashed ${isDark ? 'border-[#5c4a3d]' : 'border-[#e4ddd5]'}`} />
        )}

        {/* Message body */}
        {message.text && (
          <div className={`px-5 ${message.to ? '' : 'pt-5'} ${message.sender ? 'pb-2' : 'pb-5'}`}>
            <p
              className={`leading-relaxed text-sm whitespace-pre-wrap ${message.font} ${isDark ? 'text-[#e4ddd5]' : 'text-[#5c4a3d]'}`}
              style={{ lineHeight: '1.8', fontSize: '0.88rem' }}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* "From" section */}
        {message.sender && (
          <div className={`px-5 pt-2 pb-5 text-right`}>
            <p className={`font-sans text-[10px] uppercase tracking-[0.18em] opacity-50 mb-0.5 ${isDark ? 'text-[#c9bfb5]' : 'text-[#7a6355]'}`}>From</p>
            <p className={`font-handwriting text-base ${isDark ? 'text-[#c8938a]' : 'text-[#c8938a]'}`}>
              {message.sender}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
