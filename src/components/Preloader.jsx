import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      // Accelerating count increment
      const increment = start < 60 ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 5) + 1;
      start = Math.min(100, start + increment);
      setCount(start);

      if (start >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9990] overflow-hidden bg-[#08080a] text-[#efebe4] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'
      }`}
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-20">
        <div className="border-r border-[#efebe4]/10 h-full" />
        <div className="border-r border-[#efebe4]/10 h-full" />
        <div className="border-r border-[#efebe4]/10 h-full" />
        <div className="h-full" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 max-w-[1600px] mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase font-semibold">
              INITIALIZING ENVIRONMENT
            </span>
          </div>
          <span className="font-mono text-xs tracking-widest text-neutral-400">
            PUNE, IN • IST
          </span>
        </div>

        {/* Marquee Center Track */}
        <div className="py-6 overflow-hidden border-y border-white/5 my-auto">
          <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-xs md:text-sm tracking-[0.25em] text-neutral-400 uppercase">
            <span>SHIVAM KHOMANE</span>
            <span className="text-[var(--accent)]">///</span>
            <span>MLOPS & MACHINE LEARNING</span>
            <span className="text-[var(--accent)]">///</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-[var(--accent)]">///</span>
            <span>FASTAPI • REACT.JS • DOCKER • AWS • MYSQL</span>
            <span className="text-[var(--accent)]">///</span>
            <span>SHIVAM KHOMANE</span>
            <span className="text-[var(--accent)]">///</span>
            <span>MLOPS & MACHINE LEARNING</span>
            <span className="text-[var(--accent)]">///</span>
            <span>FULL-STACK DEVELOPMENT</span>
          </div>
        </div>

        {/* Bottom Section with Counter & Progress Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] font-mono text-xs tracking-wider uppercase rounded-sm w-fit">
              <span>●</span> MCA Candidate & Software Engineer
            </div>
            <p className="text-xs text-neutral-400 font-mono tracking-wide leading-relaxed">
              Loading system modules, neural models, relational pipelines & user interface assets...
            </p>
            {/* Progress Track */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-150 ease-out"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          {/* Massive Percentage Counter */}
          <div className="flex items-baseline font-display text-7xl sm:text-8xl md:text-9xl tracking-tighter leading-none text-white select-none">
            <span>{count.toString().padStart(2, '0')}</span>
            <sup className="text-2xl sm:text-3xl text-[var(--accent)] ml-2 font-mono">%</sup>
          </div>
        </div>
      </div>
    </div>
  );
}
