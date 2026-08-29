import React, { useState } from 'react';
import { Plus, Minus, ExternalLink, Sparkles, Layers, CheckCircle2, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { playTick, playOpenTone } from '../utils/audio';

export default function Projects() {
  const { projects } = portfolioData;
  const [openProjectId, setOpenProjectId] = useState(projects[0]?.id || null);
  const [modalProject, setModalProject] = useState(null);

  const toggleProject = (id) => {
    playTick();
    setOpenProjectId(openProjectId === id ? null : id);
  };

  const openModal = (proj) => {
    playOpenTone();
    setModalProject(proj);
  };

  const closeModal = () => {
    playTick();
    setModalProject(null);
  };

  return (
    <section id="projects" className="section relative border-b border-white/10 bg-[#0f1420]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              02 // FEATURED WORK & SYSTEMS
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400 tracking-wider">
            {projects.length} FEATURED PRODUCTION PROJECTS
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            SELECTED <span className="stroke-text">PROJECTS</span> &{' '}
            <span className="serif-it text-gradient normal-case">Architectures</span>
          </h2>
          <p className="font-mono text-xs text-neutral-400 mt-4 tracking-wider">
            CLICK ON ANY ROW TO EXPAND ARCHITECTURAL HIGHLIGHTS, STACK & REPOSITORIES
          </p>
        </div>

        {/* Interactive Accordion List */}
        <div className="border-t border-white/10">
          {projects.map((proj, index) => {
            const isOpen = openProjectId === proj.id;
            const itemNum = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={proj.id}
                data-cursor="view"
                className={`border-b border-white/10 transition-colors ${
                  isOpen ? 'bg-[#1a1f2e]' : 'hover:bg-white/[0.03]'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleProject(proj.id)}
                  className="py-6 sm:py-8 px-4 sm:px-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none group"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-neutral-500 group-hover:text-[var(--accent)] transition-colors">
                      {itemNum}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-[var(--accent)] transition-colors leading-tight uppercase">
                        {proj.title}
                      </h3>
                      <p className="font-mono text-xs text-neutral-400 mt-1">
                        {proj.category} • {proj.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <span className="hidden lg:inline-block font-mono text-xs text-neutral-500 tracking-wider">
                      {proj.metrics}
                    </span>

                    <div className="w-10 h-10 rounded-sm border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Body */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-8 px-4 sm:px-6' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="overflow-hidden pt-2 border-t border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Summary & Bullet Points */}
                      <div className="lg:col-span-8 flex flex-col gap-4">
                        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="flex flex-col gap-2.5 pt-2">
                          {proj.points.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Stack Badges & Actions */}
                      <div className="lg:col-span-4 flex flex-col gap-5 p-5 rounded-sm bg-black/40 border border-white/10">
                        <span className="font-mono text-[11px] tracking-wider text-neutral-400 uppercase">
                          // TECHNOLOGIES & TOOLS
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {proj.stack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(proj);
                            }}
                            className="flex-1 py-2.5 bg-[var(--accent)] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-colors text-center"
                          >
                            CASE STUDY
                          </button>

                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              playTick();
                            }}
                            className="p-2.5 border border-white/20 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] text-white transition-colors"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-[9600] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#1a1f2e] border border-[var(--accent)]/40 p-6 sm:p-8 rounded-sm shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-sm border border-white/10 text-neutral-400 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col gap-2 pb-6 border-b border-white/10 pr-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest">
                {modalProject.category} • {modalProject.year}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase">
                {modalProject.title}
              </h3>
              <p className="text-sm font-mono text-neutral-400">{modalProject.subtitle}</p>
            </div>

            {/* Content */}
            <div className="py-6 flex flex-col gap-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  // PROJECT OVERVIEW
                </h4>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {modalProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                  // ARCHITECTURAL IMPLEMENTATIONS & HIGHLIGHTS
                </h4>
                <div className="flex flex-col gap-3">
                  {modalProject.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-neutral-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                  // TECH STACK ARCHITECTURE
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalProject.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-xs text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-white/20 text-neutral-300 font-mono text-xs uppercase hover:text-white transition-colors"
              >
                CLOSE
              </button>
              <a
                href={modalProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[var(--accent)] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
