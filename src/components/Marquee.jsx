import React from 'react';

export default function Marquee() {
  const primaryItems = [
    'FASTAPI',
    'REACT.JS',
    'DOCKER',
    'AMAZON WEB SERVICES (AWS)',
    'MACHINE LEARNING',
    'MYSQL & CRUD',
    'CI/CD AUTOMATION',
    'SCIKIT-LEARN',
    'TAILWIND CSS',
    'NODE.JS & EXPRESS',
    'MLOPS LIFECYCLE',
    'PYTHON & SQL',
  ];

  const secondaryItems = [
    'ERP SYSTEMS',
    'HOSTINGER VPS DEPLOYMENT',
    'KONKANTRIP PLATFORM',
    'SUPERVISED LEARNING',
    'MODEL MONITORING',
    'PANDAS & NUMPY',
    'RESTFUL APIS',
    'POSTMAN & LINUX',
    'AWS EC2 / S3 / ECR',
    'DATA CONSISTENCY',
  ];

  return (
    <div className="relative border-y border-white/10 bg-[#1a1f2e] overflow-hidden py-4 select-none">
      {/* Top Track (Left to Right) */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee mb-3">
        {[...primaryItems, ...primaryItems].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 font-display text-2xl sm:text-3xl md:text-4xl text-neutral-400 hover:text-[var(--accent)] transition-colors">
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          </div>
        ))}
      </div>

      {/* Bottom Track (Right to Left) */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse">
        {[...secondaryItems, ...secondaryItems].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 font-mono text-xs sm:text-sm tracking-[0.25em] text-neutral-500 hover:text-white uppercase transition-colors">
            <span>{item}</span>
            <span className="text-[var(--accent)] font-bold">///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
