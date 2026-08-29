import React, { useState, useEffect } from 'react';
import { Terminal, Command, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { playTick, playOpenTone, setAudioEnabled, getAudioEnabled } from '../utils/audio';

export default function Navbar({ onOpenCommandPalette, onOpenTerminal }) {
  const [time, setTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(getAudioEnabled());

    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const now = new Date();
      setTime(`${now.toLocaleTimeString('en-GB', options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setAudioEnabled(next);
    if (next) playOpenTone();
  };

  const navItems = [
    { label: 'ABOUT', href: '#about', index: '01' },
    { label: 'WORK', href: '#projects', index: '02' },
    { label: 'EXPERIENCE', href: '#experience', index: '03' },
    { label: 'SKILLS', href: '#skills', index: '04' },
    { label: 'EDUCATION', href: '#education', index: '05' },
    { label: 'CONTACT', href: '#contact', index: '06' },
  ];

  const handleNavClick = (href) => {
    playTick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[900] h-[76px] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#101420]/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="shell h-full flex items-center justify-between gap-4">
          {/* Brand / Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#1a1f2e] border border-[var(--accent)]/40 grid place-items-center font-mono text-xs font-bold text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/15 group-hover:shadow-[0_0_15px_var(--accent-glow)] transition-all duration-300">
              SK
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-tight text-lg text-white group-hover:text-[var(--accent)] transition-colors">
                SHIVAM KHOMANE
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--accent)] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                AVAILABLE FOR ROLES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="group relative flex items-start gap-1 font-mono text-xs tracking-wider text-neutral-300 hover:text-white py-1 transition-colors"
              >
                <sup className="text-[9px] text-neutral-500 font-mono group-hover:text-[var(--accent)] transition-colors">
                  {item.index}
                </sup>
                <span className="relative overflow-hidden inline-block font-semibold">
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute left-0 top-0 inline-block text-[var(--accent)] transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                    {item.label}
                  </span>
                </span>
              </button>
            ))}
          </nav>

          {/* Utility Tools & IST Clock */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Pune IST clock */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 font-mono text-[11px] text-neutral-300 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{time || 'PUNE, IN'}</span>
            </div>

            {/* Command Palette Button */}
            <button
              onClick={() => {
                playOpenTone();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (Ctrl+K)"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm border border-white/10 bg-white/5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 text-neutral-300 hover:text-[var(--accent)] transition-all font-mono text-xs"
            >
              <Command className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline text-[11px] tracking-wider">CMD</span>
              <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] bg-black/60 border border-white/15 rounded text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Terminal Launcher Button */}
            <button
              onClick={() => {
                playOpenTone();
                onOpenTerminal();
              }}
              title="Open Interactive CLI Terminal (~)"
              className="p-2 rounded-sm border border-white/10 bg-white/5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 text-neutral-300 hover:text-[var(--accent)] transition-all"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Mute Interface Audio' : 'Unmute Interface Audio'}
              className={`p-2 rounded-sm border transition-all ${
                soundActive
                  ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playTick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-sm border border-white/10 bg-white/5 text-white hover:text-[var(--accent)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[850] bg-[#101420]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            // DIRECTORY NAVIGATION
          </span>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-baseline gap-4 text-left group"
              >
                <span className="font-mono text-sm text-neutral-500 group-hover:text-[var(--accent)]">
                  {item.index}
                </span>
                <span className="font-display text-4xl sm:text-5xl text-white group-hover:text-[var(--accent)] transition-colors">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-white/10 font-mono text-xs text-neutral-400">
          <div className="flex items-center justify-between">
            <span>LOCATION:</span>
            <span className="text-white">PUNE, MAHARASHTRA, IN</span>
          </div>
          <div className="flex items-center justify-between">
            <span>LOCAL TIME:</span>
            <span className="text-[var(--accent)]">{time}</span>
          </div>
        </div>
      </div>
    </>
  );
}
