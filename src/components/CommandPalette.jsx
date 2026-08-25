import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, CornerDownLeft, Sparkles, Terminal, FileText, Mail, Phone, Palette, Hash } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick, playOpenTone, playSuccessChime } from '../utils/audio';

export default function CommandPalette({ isOpen, onClose, onOpenTerminal, onOpenResume }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);

  const themes = [
    { name: 'Neon Lime (Default)', id: 'lime', color: '#ccff00' },
    { name: 'Cyber Cyan', id: 'cyan', color: '#00f0ff' },
    { name: 'Matrix Green', id: 'matrix', color: '#00ff66' },
    { name: 'Cyber Purple', id: 'purple', color: '#d946ef' },
    { name: 'Solar Amber', id: 'amber', color: '#ffb703' },
  ];

  const changeTheme = (themeId) => {
    document.body.removeAttribute('data-theme');
    if (themeId !== 'lime') {
      document.body.setAttribute('data-theme', themeId);
    }
    showToast(`Accent theme switched to ${themeId.toUpperCase()}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const allCommands = [
    {
      group: 'NAVIGATION',
      items: [
        { label: 'Jump to Hero / Top', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#hero') },
        { label: 'Jump to About Section', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#about') },
        { label: 'Jump to Selected Projects', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#projects') },
        { label: 'Jump to Experience History', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#experience') },
        { label: 'Jump to Skills Matrix', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#skills') },
        { label: 'Jump to Academic Degrees', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#education') },
        { label: 'Jump to Contact Section', icon: <Hash className="w-4 h-4" />, action: () => scrollTo('#contact') },
      ],
    },
    {
      group: 'QUICK ACTIONS',
      items: [
        {
          label: 'Open Interactive CLI Terminal (~)',
          icon: <Terminal className="w-4 h-4 text-[var(--accent)]" />,
          action: () => {
            onClose();
            onOpenTerminal();
          },
        },
        {
          label: 'Download Curriculum Vitae (PDF)',
          icon: <FileText className="w-4 h-4 text-[var(--accent)]" />,
          action: () => {
            const a = document.createElement('a');
            a.href = '/Shivam_Khomane_Resume.pdf';
            a.download = 'Shivam_Khomane_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('Downloading Shivam_Khomane_Resume.pdf...');
          },
        },
        {
          label: 'View Curriculum Vitae (CV Modal)',
          icon: <FileText className="w-4 h-4 text-[var(--accent)]" />,
          action: () => {
            onClose();
            onOpenResume();
          },
        },
        {
          label: `Copy Email (${portfolioData.personal.email})`,
          icon: <Mail className="w-4 h-4" />,
          action: () => {
            navigator.clipboard.writeText(portfolioData.personal.email);
            showToast('Email address copied to clipboard!');
          },
        },
        {
          label: `Copy Phone (${portfolioData.personal.phone})`,
          icon: <Phone className="w-4 h-4" />,
          action: () => {
            navigator.clipboard.writeText(portfolioData.personal.phone);
            showToast('Phone number copied to clipboard!');
          },
        },
      ],
    },
    {
      group: 'THEME ACCENTS',
      items: themes.map((t) => ({
        label: `Switch Accent: ${t.name}`,
        icon: <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.color }} />,
        action: () => changeTheme(t.id),
      })),
    },
  ];

  // Filter commands by query
  const filteredGroups = allCommands
    .map((grp) => ({
      ...grp,
      items: grp.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((grp) => grp.items.length > 0);

  const flatItems = filteredGroups.flatMap((g) => g.items);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenResume(); // or open command palette
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playTick();
        setSelectedIndex((prev) => (prev + 1) % (flatItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playTick();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % (flatItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          playSuccessChime();
          flatItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose]);

  const scrollTo = (id) => {
    onClose();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9700] flex items-start justify-center pt-[10vh] sm:pt-[15vh] p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9900] bg-[var(--accent)] text-black px-4 py-2 rounded-sm font-mono text-xs font-bold tracking-wider shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="relative w-full max-w-xl bg-[#0e0e12] border border-white/20 rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Search Field */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#141419]">
          <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent border-none text-white text-sm font-sans placeholder:text-neutral-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10 font-mono text-[10px] text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-3 font-mono text-xs">
          {filteredGroups.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">
              No matching commands for "{query}"
            </div>
          ) : (
            filteredGroups.map((grp, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-1">
                <span className="px-3 pt-2 text-[10px] text-neutral-500 tracking-widest uppercase">
                  {grp.group}
                </span>
                {grp.items.map((item) => {
                  const globalIdx = flatItems.indexOf(item);
                  const isSelected = globalIdx === selectedIndex;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        playSuccessChime();
                        item.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors text-left ${
                        isSelected
                          ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40'
                          : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-[var(--accent)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-black/40 font-mono text-[10px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[var(--accent)]">SHIVAM KHOMANE PORTFOLIO</span>
        </div>
      </div>
    </div>
  );
}
