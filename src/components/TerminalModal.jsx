import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playTick, playSuccessChime } from '../utils/audio';

export default function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Antigravity UNIX Shell v2.4 (x86_64-shivam-khomane-terminal)' },
    { type: 'sys', text: 'Type "help" to view available commands, or "cat resume" to view CV.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const rawCmd = inputVal.trim();
      const cmd = rawCmd.toLowerCase();
      playTick();

      if (rawCmd) {
        setCmdHistory((prev) => [...prev, rawCmd]);
        setCmdHistoryIndex(-1);
      }

      const newHistory = [...history, { type: 'input', text: `$ ${rawCmd}` }];

      if (!cmd) {
        setHistory(newHistory);
        setInputVal('');
        return;
      }

      if (cmd === 'help') {
        newHistory.push({
          type: 'out',
          text: `AVAILABLE COMMANDS:
  help               - Display this help manual
  whoami / bio       - Display developer summary
  skills             - List full technical arsenal
  projects           - Display software & ML projects
  exp                - View work experience timeline
  edu                - Show academic qualifications & CGPA
  contact            - Show direct email, phone & social links
  cat resume         - Print text curriculum vitae
  theme <color>      - Change theme (lime | cyan | matrix | purple | amber)
  clear              - Clear terminal window
  exit               - Close this terminal modal`,
        });
      } else if (cmd === 'whoami' || cmd === 'bio') {
        newHistory.push({
          type: 'out',
          text: `${portfolioData.personal.name}
Role: ${portfolioData.personal.title} & ${portfolioData.personal.subtitle}
Location: ${portfolioData.personal.location}
Summary: ${portfolioData.personal.summary}`,
        });
      } else if (cmd === 'skills') {
        const skillsText = portfolioData.skills.categories
          .map((cat) => `[${cat.name}]\n  ${cat.skills.map((s) => s.name).join(', ')}`)
          .join('\n\n');
        newHistory.push({ type: 'out', text: skillsText });
      } else if (cmd === 'projects') {
        const projText = portfolioData.projects
          .map((p, i) => `${i + 1}. ${p.title} (${p.category})\n   Stack: ${p.stack.join(', ')}\n   Highlights: ${p.metrics}`)
          .join('\n\n');
        newHistory.push({ type: 'out', text: projText });
      } else if (cmd === 'exp') {
        const expText = portfolioData.experience
          .map((e) => `• ${e.company} | ${e.role} (${e.period})\n  Summary: ${e.summary}\n  Tech: ${e.techStack.join(', ')}`)
          .join('\n\n');
        newHistory.push({ type: 'out', text: expText });
      } else if (cmd === 'edu') {
        const eduText = portfolioData.education
          .map((ed) => `• ${ed.degree}\n  ${ed.institution} | ${ed.score} (${ed.period})`)
          .join('\n\n');
        newHistory.push({ type: 'out', text: eduText });
      } else if (cmd === 'contact') {
        newHistory.push({
          type: 'out',
          text: `Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
LinkedIn: ${portfolioData.personal.linkedin}
GitHub: ${portfolioData.personal.github}
Location: ${portfolioData.personal.location}`,
        });
      } else if (cmd === 'cat resume' || cmd === 'cat resume.txt') {
        newHistory.push({
          type: 'out',
          text: `=== SHIVAM KHOMANE RESUME ===
Degree: MCA @ Sinhgad Institute of Management (CGPA: 8.0310)
Current Role: Software Development @ Evolware Solutions (React, Node.js, Express, MySQL)
Focus: MLOps, Docker, AWS (EC2/S3/ECR), FastAPI, Full-Stack Development
Contact: ${portfolioData.personal.email} | ${portfolioData.personal.phone}`,
        });
      } else if (cmd.startsWith('theme ')) {
        const t = cmd.split(' ')[1];
        if (['flame', 'rose', 'gold', 'lime', 'cyan', 'matrix', 'purple'].includes(t)) {
          document.body.removeAttribute('data-theme');
          if (t !== 'flame') document.body.setAttribute('data-theme', t);
          newHistory.push({ type: 'sys', text: `Theme successfully updated to "${t}".` });
        } else {
          newHistory.push({ type: 'err', text: `Unknown theme "${t}". Available: flame, rose, gold, lime, cyan, matrix, purple` });
        }
      } else if (cmd === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else if (cmd === 'exit') {
        onClose();
        return;
      } else {
        newHistory.push({
          type: 'err',
          text: `Command not found: "${rawCmd}". Type "help" for a list of commands.`,
        });
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
        setCmdHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdHistoryIndex !== -1) {
        const nextIdx = cmdHistoryIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdHistoryIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setCmdHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9600] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[80vh] max-h-[600px] flex flex-col bg-[#0f1420] border border-[var(--accent)]/40 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1f2e] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-neutral-400 text-[11px] ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3 h-3 text-[var(--accent)]" />
              shivam@portfolio:~ (bash)
            </span>
          </div>

          <button
            onClick={() => {
              playTick();
              onClose();
            }}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 cursor-text scrollbar-thin"
        >
          {history.map((line, idx) => (
            <pre
              key={idx}
              className={`whitespace-pre-wrap font-mono leading-relaxed text-xs ${
                line.type === 'sys'
                  ? 'text-[var(--accent)]'
                  : line.type === 'err'
                  ? 'text-rose-400'
                  : line.type === 'input'
                  ? 'text-white font-bold'
                  : 'text-neutral-300'
              }`}
            >
              {line.text}
            </pre>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-white">
            <span className="text-[var(--accent)] select-none font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-[var(--accent)] p-0"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
