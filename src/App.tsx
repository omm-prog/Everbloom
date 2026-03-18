import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Flower2, Heart, Download, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import type { AppState, BouquetState, MessageState } from './types';
import BouquetCanvas from './components/BouquetCanvas';
import EditorPanel from './components/EditorPanel';
import MessageCard from './components/MessageCard';
import ShareModal from './components/ShareModal';
import { encodeAppState, decodeAppState } from './utils/shareUtils';

const DEFAULT_BOUQUET: BouquetState = {
  flowers: [],
  wrapper: 'classic',
  ribbonColor: '#c8938a'
};

const DEFAULT_MESSAGE: MessageState = {
  text: '',
  font: 'font-handwriting',
  sender: '',
  to: '',
};

export default function App() {
  const [bouquet, setBouquet] = useState<BouquetState>(DEFAULT_BOUQUET);
  const [message, setMessage] = useState<MessageState>(DEFAULT_MESSAGE);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#load=')) {
      const encodedData = hash.replace('#load=', '');
      const state = decodeAppState(encodedData);
      if (state) {
        if (state.bouquet) setBouquet(state.bouquet);
        if (state.message) setMessage(state.message);
        if (state.theme) setTheme(state.theme);
        setIsReadOnly(true);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleMoveFlower = (id: string, x: number, y: number) => {
    setBouquet(prev => ({
      ...prev,
      flowers: prev.flowers.map(f => f.id === id ? { ...f, x, y } : f)
    }));
  };

  const generateShareUrl = () => {
    const stateToEncode: AppState = { bouquet, message, theme };
    const encoded = encodeAppState(stateToEncode);
    const url = `${window.location.origin}${window.location.pathname}#load=${encoded}`;
    setShareUrl(url);
  };

  const handleDownload = async () => {
    if (canvasRef.current) {
      setIsDownloading(true);
      try {
        // Small delay to let UI settle
        await new Promise(r => setTimeout(r, 100));
        const dataUrl = await toPng(canvasRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: theme === 'dark' ? '#1a1410' : '#f8f5f2',
        });
        const link = document.createElement('a');
        link.download = 'everbloom-bouquet.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen h-screen overflow-hidden flex flex-col transition-colors duration-700 ${isDark ? 'bg-[#1a1410] text-[#f0ebe4]' : 'bg-[#f8f5f2] text-[#3d2f24]'}`}>

      {/* ── Header ── */}
      <header className={`shrink-0 px-6 py-4 flex items-center justify-between relative z-20 transition-colors duration-700 ${isDark ? 'border-b border-[#3d2f24]' : 'border-b border-[#e4ddd5]'}`}>
        <button
          onClick={() => { setIsReadOnly(false); window.location.hash = ''; }}
          className="flex items-center gap-2.5 group"
          aria-label="Home"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-[#3d2f24]' : 'bg-[#f0ebe4]'}`}>
            <Flower2 size={16} className="text-[#c8938a]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-serif text-xl tracking-wide font-semibold ${isDark ? 'text-[#f0ebe4]' : 'text-[#3d2f24]'}`}>
              Everbloom
            </span>
            {!isReadOnly && (
              <a 
                href="https://github.com/omm-prog" 
                target="_blank" 
                rel="noreferrer" 
                className={`text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border transition-colors ${isDark ? 'border-[#3d2f24] text-[#e4ddd5]/70 hover:bg-[#3d2f24] hover:text-[#f0ebe4]' : 'border-[#e4ddd5] text-[#7a6355]/70 hover:bg-[#e4ddd5]/50 hover:text-[#3d2f24]'}`}
              >
                by Om Chauhan
              </a>
            )}
          </div>
        </button>

        <div className="flex items-center gap-3">
          {isReadOnly && (
            <button
              onClick={() => { setIsReadOnly(false); window.location.hash = ''; }}
              className={`text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${isDark ? 'bg-[#3d2f24] text-[#e4ddd5] hover:bg-[#5c4a3d]' : 'bg-[#f0ebe4] text-[#7a6355] hover:bg-[#e4ddd5]'}`}
            >
              Make your own
            </button>
          )}
          {!isReadOnly && (
            <>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${isDark ? 'bg-[#3d2f24] text-[#e4ddd5] hover:bg-[#5c4a3d]' : 'bg-[#f0ebe4] text-[#7a6355] hover:bg-[#e4ddd5]'}`}
                aria-label="Download"
              >
                <Download size={13} />
                {isDownloading ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={generateShareUrl}
                className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8938a] text-white hover:bg-[#b07d74] transition-all duration-300 shadow-sm shadow-[#c8938a]/30"
                aria-label="Share"
              >
                <Share2 size={13} />
                Share
              </button>
            </>
          )}
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-[#3d2f24] text-[#c9bfb5] hover:bg-[#5c4a3d]' : 'bg-[#f0ebe4] text-[#7a6355] hover:bg-[#e4ddd5]'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col lg:flex-row gap-0 min-h-0 overflow-y-auto lg:overflow-hidden">

        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`relative flex-1 flex items-center justify-center overflow-hidden transition-colors duration-700 min-h-[50vh] lg:min-h-0 shrink-0 ${isDark ? 'bg-[#1e1812]' : 'bg-[#fdfaf6]'}`}
        >
          {/* Soft ambient orb */}
          <div
            className="breathe absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(200,147,138,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(200,147,138,0.14) 0%, transparent 70%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Vignette */}
          <div className="canvas-vignette absolute inset-0 pointer-events-none z-10" />

          <BouquetCanvas
            bouquet={bouquet}
            onMoveFlower={handleMoveFlower}
            readOnly={isReadOnly}
            isDark={isDark}
          />

          {(message.text || message.to) && (
            <MessageCard message={message} readOnly={isReadOnly} isDark={isDark} />
          )}

          {isReadOnly && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
              <Heart size={10} className="text-[#c8938a]/50" fill="currentColor" />
              <span className="font-serif text-xs tracking-widest text-[#c8938a]/50 italic">Made with Everbloom</span>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {!isReadOnly && (
          <aside className={`w-full lg:w-[380px] shrink-0 flex flex-col overflow-hidden transition-colors duration-700 lg:border-l ${isDark ? 'bg-[#1a1410] border-t lg:border-t-0 border-[#3d2f24]' : 'bg-[#f8f5f2] border-t lg:border-t-0 border-[#e4ddd5]'}`}>
            <EditorPanel
              bouquet={bouquet}
              setBouquet={setBouquet}
              message={message}
              setMessage={setMessage}
              isDark={isDark}
            />
            {/* Creator Footer in Editor */}
            <div className={`py-4 text-center text-[10px] font-medium tracking-widest uppercase transition-colors ${isDark ? 'text-[#e4ddd5]/40' : 'text-[#7a6355]/40'}`}>
              Created by <a href="https://github.com/omm-prog" target="_blank" rel="noreferrer" className="hover:underline">Om Chauhan</a>
            </div>
          </aside>
        )}
      </main>

      {shareUrl && (
        <ShareModal shareUrl={shareUrl} onClose={() => setShareUrl(null)} isDark={isDark} />
      )}
    </div>
  );
}
