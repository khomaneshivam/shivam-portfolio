import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { playTick, playSuccessChime } from '../utils/audio';

export default function Contact() {
  const { personal } = portfolioData;
  const [copiedKey, setCopiedKey] = useState(null);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyToClipboard = (text, key) => {
    playSuccessChime();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playTick();
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('sent');
      playSuccessChime();
      // Generate mailto link fallback
      const mailtoLink = `mailto:${personal.email}?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      window.open(mailtoLink, '_blank');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1000);
  };

  const contactList = [
    {
      label: 'EMAIL',
      value: personal.email,
      action: () => copyToClipboard(personal.email, 'email'),
      key: 'email',
      icon: <Mail className="w-4 h-4 text-[var(--accent)]" />,
      sub: 'Copy direct address',
    },
    {
      label: 'PHONE',
      value: personal.phone,
      action: () => copyToClipboard(personal.phone, 'phone'),
      key: 'phone',
      icon: <Phone className="w-4 h-4 text-[var(--accent)]" />,
      sub: 'Direct mobile / WhatsApp',
    },
    {
      label: 'LOCATION',
      value: personal.location,
      action: () => copyToClipboard(personal.location, 'loc'),
      key: 'loc',
      icon: <MapPin className="w-4 h-4 text-[var(--accent)]" />,
      sub: 'India (IST Timezone)',
    },
  ];

  return (
    <section id="contact" className="section relative bg-[#0f1420] pb-24">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              07 // CONNECT & INQUIRE
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400 tracking-wider">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white tracking-tight uppercase">
            LET'S <span className="stroke-text">BUILD</span> SOMETHING{' '}
            <span className="serif-it text-gradient normal-case">Exceptional</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Contact Rows */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
              Whether you are looking for an <span className="text-white font-medium">MLOps / Machine Learning Engineer</span>, a{' '}
              <span className="text-white font-medium">Full-Stack Developer</span>, or want to collaborate on production software architectures, I'm always open to discussing new engineering challenges.
            </p>

            {/* Clickable Info Rows */}
            <div className="flex flex-col border-t border-white/10 mt-4">
              {contactList.map((item) => (
                <div
                  key={item.key}
                  onClick={item.action}
                  className="group py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-sm bg-white/5 border border-white/10 group-hover:border-[var(--accent)] transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[var(--accent)] transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                    {copiedKey === item.key ? (
                      <span className="text-[var(--accent)] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> COPIED!
                      </span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" /> COPY
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="px-4 py-2 rounded-sm border border-white/15 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] text-neutral-300 font-mono text-xs flex items-center gap-2 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="px-4 py-2 rounded-sm border border-white/15 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] text-neutral-300 font-mono text-xs flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-sm bg-[#1a1f2e] border border-white/10 relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider">
                // TRANSMIT DIRECT MESSAGE
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mb-1.5">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#242c3f] border border-white/15 p-3 rounded-sm font-sans text-sm text-white placeholder:text-neutral-500 focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#242c3f] border border-white/15 p-3 rounded-sm font-sans text-sm text-white placeholder:text-neutral-500 focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mb-1.5">
                  MESSAGE / PROJECT INQUIRY
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project, team opportunity, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#242c3f] border border-white/15 p-3 rounded-sm font-sans text-sm text-white placeholder:text-neutral-500 focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3.5 bg-[var(--accent)] text-[#1a1f2e] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-all shadow-[0_0_20px_var(--accent-glow)] mt-2"
              >
                {formStatus === 'sending' ? (
                  <span>TRANSMITTING...</span>
                ) : formStatus === 'sent' ? (
                  <span>MESSAGE DISPATCHED!</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
