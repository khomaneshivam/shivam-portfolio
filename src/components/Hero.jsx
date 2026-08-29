import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowDown, FileText, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick, playOpenTone } from '../utils/audio';

export default function Hero({ onOpenResumeModal }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', onResize);

    // Particle nodes for subtle sunset cyber constellation effect
    const numParticles = Math.min(55, Math.floor((width * height) / 18000));
    const particles = [];
    const paletteColors = [
      'rgba(255, 122, 0, 0.65)',   // #FF7A00 Flame Orange
      'rgba(255, 61, 127, 0.65)',  // #FF3D7F Vivid Rose
      'rgba(255, 193, 7, 0.65)',   // #FFC107 Warm Amber
    ];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.9,
        color: paletteColors[i % paletteColors.length],
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle architectural grid background
      ctx.strokeStyle = 'rgba(255, 243, 224, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gravity pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dxx = p.x - p2.x;
          const dyy = p.y - p2.y;
          const d = Math.sqrt(dxx * dxx + dyy * dyy);

          if (d < 110) {
            const alpha = (1 - d / 110) * 0.16;
            ctx.strokeStyle = `rgba(255, 122, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id) => {
    playTick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* Background Interactive Particle Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1420]/40 to-[#0f1420]" />
      </div>

      <div className="shell relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Meta Pill & Availability */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] font-mono text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span>MLOPS & FULL-STACK ENGINEER</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              MCA @ SINHGAD INSTITUTE
            </span>
            <span className="text-neutral-600">/</span>
            <span>DEVELOPING @ EVOLWARE</span>
          </div>
        </div>

        {/* Massive Editorial Display Headline */}
        <div className="my-auto py-8 sm:py-12 select-none">
          <div className="flex flex-col">
            <h1 className="font-display text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[12rem] xl:text-[14rem] tracking-tight leading-[0.82] text-white">
              SHIVAM
            </h1>
            <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
              <h1 className="font-display text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[12rem] xl:text-[14rem] tracking-tight leading-[0.82] stroke-text">
                KHOMANE
              </h1>
              <span className="serif-it text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient ml-2">
                — Engineer & Scholar
              </span>
            </div>
          </div>

          {/* Subtitle & Value Proposition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-8 sm:mt-12 pt-6 border-t border-white/10">
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
                Developing robust <span className="text-white font-medium">backend APIs</span>, relational{' '}
                <span className="text-[var(--accent)] font-mono font-normal">MySQL / FastAPI</span> workflows, and{' '}
                <span className="text-white font-medium">production MLOps pipelines</span> with Docker, CI/CD, and AWS.
              </p>
            </div>

            {/* Quick Action CTA Group */}
            <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
              <button
                onClick={() => scrollTo('#projects')}
                className="group px-6 py-3.5 bg-[var(--accent)] text-[#1a1f2e] font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 hover:bg-[var(--accent-hover)] transition-all shadow-[0_0_22px_var(--accent-glow)]"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playOpenTone();
                  onOpenResumeModal();
                }}
                className="px-5 py-3.5 border border-white/20 bg-white/5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 text-white hover:text-[var(--accent)] font-mono text-xs uppercase font-medium tracking-wider flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                <span>RESUME</span>
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="p-3.5 border border-white/20 bg-white/5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 text-white hover:text-[var(--accent)] transition-all"
                title="Direct Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats Banner & Scroll Down Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          {portfolioData.personal.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1 p-3 rounded-sm bg-[#1a1f2e]/60 border border-white/10 hover:border-[var(--accent)]/40 transition-colors">
              <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">{stat.label}</span>
              <span className="font-sans text-sm sm:text-base font-semibold text-white">{stat.value}</span>
              <span className="font-mono text-xs text-[var(--accent)]">{stat.highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
