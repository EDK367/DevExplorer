'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronDown, ChevronRight, Play } from 'lucide-react';

interface CommandValue {
  desc?: string;
  output?: string;
}

interface MockTerminalProps {
  prompt?: string;
  commands?: Record<string, string | CommandValue>;
  initialOutput?: string[];
}

interface HistoryItem {
  type: 'command' | 'output';
  content: string;
}

export const MockTerminal = ({ prompt = "$", commands = {}, initialOutput = [] }: MockTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialOutput.map(line => ({ type: 'output', content: line })));
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of terminal body only
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const newHistory: HistoryItem[] = [...history, { type: 'command', content: `${prompt} ${cmd}` }];

    if (cmd) {
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      const cmdValue = commands[cmd];
      let response = `bash: ${cmd}: command not found`;

      if (cmdValue) {
        if (typeof cmdValue === 'string') {
          response = cmdValue;
        } else if (typeof cmdValue === 'object' && cmdValue.output) { // Explicitly check for object type
          response = cmdValue.output;
        }
      }

      newHistory.push({ type: 'output', content: response });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input.trim());
    }
  };

  // Parse commands for the accordion
  const commandList = Object.entries(commands).map(([cmd, value]) => ({
    cmd,
    desc: (typeof value === 'object' ? value.desc : undefined) || 'Execute command',
    output: typeof value === 'object' ? value.output : value
  })).filter(item => item.cmd !== 'help');

  return (
    <div className="flex flex-col gap-4">
      <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="t-btn close"></span>
            <span className="t-btn minimize"></span>
            <span className="t-btn maximize"></span>
          </div>
          <div className="terminal-title">
            <TerminalIcon size={14} />
            <span>Terminal</span>
          </div>
        </div>
        <div className="terminal-body" ref={bodyRef}>
          {history.map((line, i) => (
            <div key={i} className={`terminal-line ${line.type}`}>
              {line.content}
            </div>
          ))}
          <div className="input-line">
            <span className="prompt">{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus
            />
          </div>
        </div>
        <style>{`
          .terminal-window {
              background: #1e1e1e;
              border-radius: var(--radius-md);
              box-shadow: var(--shadow-md);
              overflow: hidden;
              font-family: var(--font-mono);
              border: 1px solid #333;
          }
          .terminal-header {
              background: #2d2d2d;
              padding: 0.5rem 1rem;
              display: flex;
              align-items: center;
              position: relative;
          }
          .terminal-buttons {
              display: flex;
              gap: 6px;
          }
          .t-btn {
              width: 12px;
              height: 12px;
              border-radius: 50%;
          }
          .close { background: #ff5f56; }
          .minimize { background: #ffbd2e; }
          .maximize { background: #27c93f; }
          .terminal-title {
              position: absolute;
              left: 0;
              right: 0;
              text-align: center;
              color: #999;
              font-size: 0.8rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              pointer-events: none;
          }
          .terminal-body {
              padding: 1rem;
              height: 300px;
              overflow-y: auto;
              color: #f0f0f0;
              font-size: 0.9rem;
              scroll-behavior: smooth;
          }
          .terminal-line {
              margin-bottom: 0.25rem;
              white-space: pre-wrap;
          }
          .terminal-line.command {
              color: #a5d6ff;
          }
          .terminal-line.output {
              color: #e6e6e6;
          }
          .input-line {
              display: flex;
              align-items: center;
          }
          .prompt {
              color: #27c93f;
              margin-right: 0.5rem;
          }
          .terminal-input {
              background: transparent;
              border: none;
              color: #fff;
              font-family: inherit;
              font-size: inherit;
              flex: 1;
              outline: none;
          }
        `}</style>
      </div>

      {/* Command Accordion */}
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <span className="font-semibold flex items-center gap-2">
            <TerminalIcon size={16} />
            Available Commands
          </span>
          {isAccordionOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {isAccordionOpen && (
          <div className="divide-y divide-border">
            {commandList.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between hover:bg-accent/5 transition-colors group">
                <div className="flex flex-col gap-1">
                  <code className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded w-fit">
                    {item.cmd}
                  </code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
                <button
                  onClick={() => handleCommand(item.cmd)}
                  className="p-2 rounded-full hover:bg-accent hover:text-white text-muted-foreground transition-all opacity-0 group-hover:opacity-100"
                  title="Run command"
                >
                  <Play size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
