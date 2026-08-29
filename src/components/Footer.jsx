import React from 'react';
import { ArrowUp, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick, playOpenTone } from '../utils/audio';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#1a1f2e] py-8 text-neutral-400 font-mono text-xs select-none">
      <div className="shell flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-sm bg-[#0f1420] border border-[var(--accent)]/30 grid place-items-center text-[10px] text-[var(--accent)] font-bold">
            SK
          </div>
          <div>
            <span className="text-white font-medium">SHIVAM KHOMANE</span>
            <span className="text-neutral-500 ml-2">© {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Center Tagline */}
        <div className="flex items-center gap-2 text-[11px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>ENGINEERED FOR HIGH RELIABILITY & PRODUCTION PERFORMANCE</span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playOpenTone();
              onOpenTerminal();
            }}
            className="hover:text-[var(--accent)] flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>CLI TERMINAL</span>
          </button>

          <button
            onClick={scrollToTop}
            className="hover:text-white flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-sm bg-white/5 border border-white/10"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
