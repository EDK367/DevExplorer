import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className="lang-btn" title="Switch Language">
            <Globe size={20} />
            <span className="lang-text">{i18n.language.toUpperCase()}</span>
            <style>{`
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid hsl(var(--border-color));
          color: hsl(var(--text-secondary));
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .lang-btn:hover {
          background: hsla(var(--text-primary) / 0.05);
          color: hsl(var(--text-primary));
          border-color: hsl(var(--accent-primary));
        }
        .lang-text {
          font-size: 0.875rem;
        }
      `}</style>
        </button>
    );
};
