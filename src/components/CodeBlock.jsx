'use client';

import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-sql';
import { Copy, Check } from 'lucide-react';

export const CodeBlock = ({ code, language = 'javascript', title }) => {
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block-wrapper">
            {title && <div className="code-title">{title}</div>}
            <div className="code-container">
                <button className="copy-btn" onClick={handleCopy} title="Copy code">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className={`language-${language}`}>
                    <code className={`language-${language}`}>
                        {code.trim()}
                    </code>
                </pre>
            </div>
            <style>{`
        .code-block-wrapper {
          margin: 1.5rem 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid hsl(var(--border-color));
          background: #1d1f21; /* Match Tomorrow Night theme */
        }
        .code-title {
          padding: 0.5rem 1rem;
          background: hsla(var(--bg-card) / 0.5);
          border-bottom: 1px solid hsl(var(--border-color));
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: hsl(var(--text-muted));
        }
        .code-container {
          position: relative;
        }
        .copy-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.25rem;
          background: transparent;
          border: 1px solid hsl(var(--border-color));
          border-radius: 4px;
          color: hsl(var(--text-muted));
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .copy-btn:hover {
          background: hsla(var(--text-primary) / 0.1);
          color: hsl(var(--text-primary));
        }
        pre[class*="language-"] {
          margin: 0 !important;
          border-radius: 0 !important;
          padding: 1.5rem !important;
        }
      `}</style>
        </div>
    );
};
