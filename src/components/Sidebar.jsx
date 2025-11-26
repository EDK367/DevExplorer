import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Server,
  Database,
  Container,
  Box,
  Terminal,
  Cpu,
  Home,
  GitBranch,
  Github,
  FileJson,
  Table
} from 'lucide-react';

export const Sidebar = () => {
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/microservices', label: t('nav.microservices'), icon: Server },
    { path: '/spring-boot', label: t('nav.springBoot'), icon: Box },
    { path: '/docker', label: 'Docker', icon: Container },
    { path: '/kubernetes', label: 'Kubernetes', icon: Box },
    { path: '/git', label: 'Git', icon: GitBranch },
    { path: '/github', label: 'GitHub', icon: Github },
    { path: '/databases', label: t('nav.databases'), icon: Database },
    { path: '/sql', label: 'SQL', icon: Table },
    { path: '/nosql', label: 'NoSQL', icon: FileJson },
    { path: '/fedora', label: t('nav.fedora'), icon: Terminal },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-area">
        <Cpu className="logo-icon" size={32} />
        <h1 className="logo-text">Dev<span className="gradient-text">Explorer</span></h1>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <LanguageSwitcher />
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid hsl(var(--border-color));
          background: hsl(var(--bg-secondary));
          z-index: 100;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding-left: 0.5rem;
        }
        .logo-icon {
          color: hsl(var(--accent-primary));
        }
        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          color: hsl(var(--text-secondary));
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .nav-item:hover {
          background: hsla(var(--text-primary) / 0.05);
          color: hsl(var(--text-primary));
        }
        .nav-item.active {
          background: linear-gradient(90deg, hsla(var(--accent-primary) / 0.1), transparent);
          color: hsl(var(--accent-primary));
          border-left: 3px solid hsl(var(--accent-primary));
        }
        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid hsl(var(--border-color));
        }
        @media (max-width: 768px) {
          .sidebar {
            display: none; /* Replace with mobile menu later */
          }
        }
      `}</style>
    </aside >
  );
};
