import React, { useState } from 'react';
import { Download, Eye, FileText, CheckCircle2, Sparkles, X, Printer, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { playTick, playSuccessChime, playOpenTone } from '../utils/audio';

export default function ResumeSection({ isModalOpen, setIsModalOpen }) {
  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'text'

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    playTick();
    setDownloadState('running');
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      setProgress(Math.min(100, current));

      if (current >= 100) {
        clearInterval(interval);
        setDownloadState('done');
        playSuccessChime();

        // Fire celebratory confetti
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.7 },
            colors: ['#ff7a00', '#ff3d7f', '#ffc107', '#fff3e0', '#1a1f2e'],
          });
        } catch (e) {}

        // Trigger direct PDF download
        const a = document.createElement('a');
        a.href = '/Shivam_Khomane_Resume.pdf';
        a.download = 'Shivam_Khomane_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
          setDownloadState('idle');
          setProgress(0);
        }, 3500);
      }
    }, 60);
  };

  const openViewer = () => {
    playOpenTone();
    setIsModalOpen(true);
  };

  const closeViewer = () => {
    playTick();
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    const iframe = document.getElementById('resume-pdf-frame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    } else {
      window.print();
    }
  };

  return (
    <section id="resume" className="section relative border-b border-white/10 bg-[#0f1420]">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              06 // CURRICULUM VITAE
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400 tracking-wider">
            OFFICIAL RESUME DOSSIER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.9] text-white tracking-tight uppercase">
              DOWNLOAD <span className="stroke-text">CURRICULUM</span>{' '}
              <span className="serif-it text-gradient normal-case">Vitae (PDF)</span>
            </h2>
            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed max-w-xl">
              Download the official PDF resume highlighting full-stack engineering at Evolware Solutions, MCA scholar credentials (8.03 CGPA), and specialized technical competencies in MLOps, AWS, and modern web architectures.
            </p>

            <ul className="flex flex-wrap gap-6 pt-4 border-t border-white/10 font-mono text-xs text-neutral-400">
              <li className="flex flex-col gap-1">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px]">FORMAT</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  PDF DOCUMENT (.pdf)
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px]">REVISED</span>
                <span className="text-[var(--accent)]">LATEST 2026 EDITION</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px]">LOCATION</span>
                <span className="text-white">PUNE, MH, INDIA</span>
              </li>
            </ul>
          </div>

          {/* Right Interactive Download Box */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloadState !== 'idle'}
              className="relative w-full aspect-[16/9] max-w-[420px] rounded-sm border border-[var(--accent)] bg-transparent text-[var(--accent)] overflow-hidden group flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
            >
              {/* Background fill wash animation on hover or running */}
              <div
                className={`absolute inset-0 bg-[var(--accent)] z-0 transition-transform duration-500 ease-out ${
                  downloadState === 'running' || downloadState === 'done'
                    ? 'translate-y-0'
                    : 'translate-y-full group-hover:translate-y-0'
                }`}
              />

              {/* Progress bar at bottom */}
              {downloadState === 'running' && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-black z-20 transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              )}

              {/* Foreground content */}
              <div className="relative z-10 flex flex-col items-center gap-2 group-hover:text-black transition-colors">
                <div className="w-10 h-10 rounded-full border border-current grid place-items-center mb-1">
                  {downloadState === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-black animate-bounce" />
                  ) : (
                    <Download className={`w-5 h-5 ${downloadState === 'running' ? 'animate-pulse' : 'group-hover:translate-y-0.5 transition-transform'}`} />
                  )}
                </div>

                <span className="font-display text-2xl sm:text-3xl tracking-tight uppercase">
                  {downloadState === 'running'
                    ? `DOWNLOADING (${progress}%)`
                    : downloadState === 'done'
                    ? 'PDF DOWNLOADED!'
                    : 'DOWNLOAD RESUME (PDF)'}
                </span>

                <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">
                  {downloadState === 'done' ? 'CLICK TO RE-DOWNLOAD' : 'OFFICIAL PDF RESUME FILE'}
                </span>
              </div>
            </button>

            {/* Direct preview button */}
            <button
              onClick={openViewer}
              className="font-mono text-xs text-neutral-400 hover:text-[var(--accent)] flex items-center gap-2 transition-colors py-1"
            >
              <Eye className="w-4 h-4 text-[var(--accent)]" />
              <span>OR PREVIEW PDF IN BROWSER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9600] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-[#1a1f2e] border border-white/20 rounded-sm shadow-2xl overflow-hidden">
            {/* Modal Controls Bar */}
            <div className="flex flex-wrap items-center justify-between p-3.5 px-6 border-b border-white/10 bg-black/50 gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono text-xs text-white uppercase tracking-wider">
                  Shivam_Khomane_Resume.pdf
                </span>
              </div>

              {/* View Toggle & Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-sm p-0.5 font-mono text-[11px]">
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`px-3 py-1 rounded-sm transition-colors ${
                      viewMode === 'pdf' ? 'bg-[var(--accent)] text-[#1a1f2e] font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    PDF VIEWER
                  </button>
                  <button
                    onClick={() => setViewMode('text')}
                    className={`px-3 py-1 rounded-sm transition-colors ${
                      viewMode === 'text' ? 'bg-[var(--accent)] text-[#1a1f2e] font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    HTML SUMMARY
                  </button>
                </div>

                <a
                  href="/Shivam_Khomane_Resume.pdf"
                  download="Shivam_Khomane_Resume.pdf"
                  onClick={playSuccessChime}
                  className="px-3 py-1.5 rounded-sm bg-[var(--accent)] text-[#1a1f2e] font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-hover)] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="hidden sm:flex px-3 py-1.5 rounded-sm border border-white/15 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] text-neutral-300 font-mono text-xs items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT</span>
                </button>

                <button
                  onClick={closeViewer}
                  className="p-1.5 rounded-sm border border-white/15 text-neutral-400 hover:text-white hover:border-white transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {viewMode === 'pdf' ? (
              <div className="flex-1 w-full h-full bg-[#1b1b22] relative">
                <iframe
                  id="resume-pdf-frame"
                  src="/Shivam_Khomane_Resume.pdf"
                  title="Shivam Khomane Resume PDF"
                  className="w-full h-full border-none"
                />
              </div>
            ) : (
              /* Structured HTML Summary View */
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-neutral-200 bg-[#0f1420]">
                {/* Header */}
                <div className="text-center pb-6 border-b border-white/15">
                  <h1 className="font-display text-4xl sm:text-5xl text-white tracking-tight uppercase">
                    Shivam Khomane
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 flex flex-wrap items-center justify-center gap-3">
                    <span>{portfolioData.personal.email}</span>
                    <span>•</span>
                    <span>{portfolioData.personal.phone}</span>
                    <span>•</span>
                    <span>{portfolioData.personal.location}</span>
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-2 font-mono text-xs text-[var(--accent)]">
                    <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                    <span>•</span>
                    <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="py-6 border-b border-white/10">
                  <h2 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
                    // PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {portfolioData.personal.summary}
                  </p>
                </div>

                {/* Education */}
                <div className="py-6 border-b border-white/10">
                  <h2 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-4">
                    // EDUCATION
                  </h2>
                  <div className="flex flex-col gap-4">
                    {portfolioData.education.map((edu, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <span className="font-semibold text-sm text-white">{edu.institution}</span>
                          <p className="text-xs text-neutral-400">{edu.degree}</p>
                        </div>
                        <div className="sm:text-right font-mono text-xs text-[var(--accent)]">
                          <span>{edu.score}</span>
                          <p className="text-neutral-500">{edu.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="py-6 border-b border-white/10">
                  <h2 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-4">
                    // TECHNICAL SKILLS
                  </h2>
                  <div className="flex flex-col gap-2 font-mono text-xs">
                    <div>
                      <span className="text-neutral-400">Programming: </span>
                      <span className="text-white">Python, SQL, JavaScript</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Machine Learning & Data: </span>
                      <span className="text-white">Pandas, NumPy, Matplotlib, Scikit-learn, Classification, Regression, Model Evaluation</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">MLOps & DevOps: </span>
                      <span className="text-white">Docker, CI/CD, Git, GitHub, REST APIs, Model Deployment & Monitoring</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Cloud & AWS: </span>
                      <span className="text-white">AWS EC2, S3, ECR, IAM, VPC, CloudWatch, Lambda, SageMaker</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Backend & Databases: </span>
                      <span className="text-white">FastAPI, Node.js, Express.js, MySQL, MongoDB</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Frontend & Tools: </span>
                      <span className="text-white">React.js, Tailwind CSS, HTML5, CSS3, Postman, Linux, Bash, VS Code</span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="py-6 border-b border-white/10">
                  <h2 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-4">
                    // EXPERIENCE
                  </h2>
                  <div className="flex flex-col gap-6">
                    {portfolioData.experience.map((exp) => (
                      <div key={exp.id} className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <span className="font-semibold text-sm text-white">
                            {exp.company} — <span className="text-[var(--accent)]">{exp.role}</span>
                          </span>
                          <span className="font-mono text-xs text-neutral-400">{exp.period}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 mt-1">
                          {exp.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                              <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="py-6">
                  <h2 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-4">
                    // PROJECTS
                  </h2>
                  <div className="flex flex-col gap-6">
                    {portfolioData.projects.map((p) => (
                      <div key={p.id} className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <span className="font-semibold text-sm text-white">
                            {p.title} <span className="font-mono text-xs text-neutral-400 font-normal">| {p.stack.join(', ')}</span>
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5 mt-1">
                          {p.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                              <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
