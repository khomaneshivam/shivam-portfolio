import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import TerminalModal from './components/TerminalModal';
import { Terminal } from 'lucide-react';
import { playOpenTone } from './utils/audio';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // Toggle Command Palette on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      // Toggle Terminal on Backquote (~)
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0f1420] text-[#fff3e0] selection:bg-[var(--accent)] selection:text-[#1a1f2e]">
      {/* Film Grain Texture Overlay */}
      <div className="grain" />
      <div className="vignette" />

      {/* Custom Magnetic Cursor & Pointer Spotlight */}
      <CustomCursor />

      {/* Preloader Intro Animation */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <main>
          <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />
          <Marquee />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <ResumeSection
            isModalOpen={resumeModalOpen}
            setIsModalOpen={setResumeModalOpen}
          />
          <Contact />
        </main>

        <Footer onOpenTerminal={() => setTerminalOpen(true)} />
      </div>

      {/* Global Interactive Overlays */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Quick Terminal Trigger Button in Bottom Corner */}
      <button
        onClick={() => {
          playOpenTone();
          setTerminalOpen(true);
        }}
        title="Open Terminal (`~` key)"
        className="fixed bottom-6 right-6 z-[880] w-10 h-10 rounded-sm bg-[#1a1f2e] border border-white/20 hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 text-neutral-300 hover:text-[var(--accent)] flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-105"
      >
        <Terminal className="w-4 h-4" />
      </button>
    </div>
  );
}
