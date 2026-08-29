import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section relative border-b border-white/10 bg-[#0f1420]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              03 // CAREER & WORK HISTORY
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400 tracking-wider">
            SOFTWARE & ANALYTICS EXPERIENCE
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            WORK <span className="stroke-text">EXPERIENCE</span> &{' '}
            <span className="serif-it text-gradient normal-case">Production</span> ROLES
          </h2>
        </div>

        {/* Experience Timeline Grid */}
        <div className="flex flex-col gap-8">
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              onMouseEnter={playTick}
              className="group p-6 sm:p-8 rounded-sm bg-[#1a1f2e] border border-white/10 hover:border-[var(--accent)]/50 hover:bg-[#242c3f] transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Row: Role, Company, Period */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-2xl sm:text-3xl text-white uppercase group-hover:text-[var(--accent)] transition-colors">
                      {exp.role}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-[var(--accent)]">
                      <Building2 className="w-3 h-3" />
                      {exp.company}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-neutral-400 mt-1">
                    {exp.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 shrink-0">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-neutral-200">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div className="py-6 flex flex-col gap-3">
                {exp.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 text-sm text-neutral-300 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider mr-2">
                  CORE TECH:
                </span>
                {exp.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 group-hover:border-[var(--accent)]/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
