import React, { useState } from 'react';
import { Search, Sparkles, Filter, Terminal, Database, Cloud, Code, Binary } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export default function Skills() {
  const { categories } = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    return cat.skills.length > 0;
  });

  return (
    <section id="skills" className="section relative border-b border-white/10 bg-[#08080a]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              04 // TECHNICAL SKILLS & STACK
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-wider">
            SYSTEMS • MLOPS • FULL-STACK
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            TECHNICAL <span className="stroke-text">ARSENAL</span> &{' '}
            <span className="serif-it text-[var(--accent)] normal-case">Stack</span>
          </h2>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => {
                playTick();
                setActiveCategory('all');
              }}
              className={`px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider transition-all shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[var(--accent)] text-black font-bold'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              ALL SKILLS
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playTick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[var(--accent)] text-black font-bold'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Docker, AWS, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e0e12] border border-white/15 pl-9 pr-4 py-2 rounded-sm font-mono text-xs text-white placeholder:text-neutral-600 focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-sm bg-[#0e0e12] border border-white/10 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">{cat.description}</p>
                </div>
                <span className="font-mono text-xs text-[var(--accent)] font-bold">
                  {cat.skills.length} TOOLS
                </span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={playTick}
                    className="group/card p-3 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[var(--accent)]/50 hover:bg-white/5 transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-white group-hover/card:text-[var(--accent)] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
