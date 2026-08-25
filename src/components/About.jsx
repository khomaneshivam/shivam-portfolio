import React from 'react';
import { Layers, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export default function About() {
  const { personal, pillars } = portfolioData;

  const pillarIcons = [
    <Cpu className="w-6 h-6 text-[var(--accent)]" />,
    <Layers className="w-6 h-6 text-[var(--accent)]" />,
    <Server className="w-6 h-6 text-[var(--accent)]" />,
  ];

  return (
    <section id="about" className="section relative border-b border-white/10 bg-[#08080a]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              01 // BACKGROUND & PHILOSOPHY
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-wider">
            MCA CANDIDATE • SINHGAD
          </span>
        </div>

        {/* Big Editorial Statement */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            BRIDGING <span className="stroke-text">MACHINE LEARNING</span> &{' '}
            <span className="serif-it text-[var(--accent)] normal-case">Production-Scale</span> SOFTWARE
          </h2>
        </div>

        {/* Grid Layout: Left Narrative + Right Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-neutral-300">
            <p className="text-lg sm:text-xl text-white font-light leading-relaxed">
              {personal.bioP1}
            </p>
            <p className="text-base font-light text-neutral-400 leading-relaxed">
              {personal.bioP2}
            </p>
            <p className="text-sm font-mono text-neutral-500 leading-relaxed pt-4 border-t border-white/10">
              {personal.summary}
            </p>

            {/* Quick Competency Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
              {[
                'Full-Stack REST Architecture',
                'Docker & CI/CD Pipelines',
                'AWS EC2, S3 & ECR',
                'Machine Learning Model Serving',
                'Relational MySQL & ACID Safety',
                'FastAPI & Node.js Microservices',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 font-mono text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Core Pillars Cards */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
              // ARCHITECTURAL PILLARS
            </span>

            {pillars.map((pillar, idx) => (
              <div
                key={pillar.number}
                onMouseEnter={playTick}
                className="group p-6 sm:p-7 rounded-sm bg-[#0e0e12] border border-white/10 hover:border-[var(--accent)]/60 hover:bg-[#141419] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Glow accent pill */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-xl group-hover:bg-[var(--accent)]/15 transition-all" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 group-hover:border-[var(--accent)]/40 transition-colors">
                      {pillarIcons[idx] || <Cpu className="w-6 h-6 text-[var(--accent)]" />}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase group-hover:text-[var(--accent)] transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-600 group-hover:text-[var(--accent)] transition-colors">
                    {pillar.number}
                  </span>
                </div>

                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-neutral-400 font-mono text-[11px] group-hover:border-[var(--accent)]/30 group-hover:text-neutral-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
