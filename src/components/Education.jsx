import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="section relative border-b border-white/10 bg-[#08080a]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              05 // ACADEMICS & QUALIFICATIONS
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-wider">
            SINHGAD INSTITUTE • SPPU PUNE
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            ACADEMIC <span className="stroke-text">FOUNDATION</span> &{' '}
            <span className="serif-it text-[var(--accent)] normal-case">Degrees</span>
          </h2>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={playTick}
              className="group p-6 sm:p-8 rounded-sm bg-[#0e0e12] border border-white/10 hover:border-[var(--accent)]/50 hover:bg-[#141419] transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[var(--accent)]/10 border border-[var(--accent)]/30 font-mono text-xs font-bold text-[var(--accent)]">
                    <Award className="w-3.5 h-3.5" />
                    {edu.score}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-white uppercase group-hover:text-[var(--accent)] transition-colors mt-2">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-neutral-300 mt-1">
                    {edu.institution}
                  </p>
                  {edu.affiliation && (
                    <p className="font-mono text-[11px] text-neutral-500">
                      Affiliated to {edu.affiliation}
                    </p>
                  )}
                </div>

                {edu.highlights && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
                    {edu.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-400 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-neutral-500">
                <span>STATUS: {edu.status}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
