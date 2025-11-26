import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <header className="mobile-header hidden-desktop">
        <button
          className="menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="mobile-logo">Dev<span className="gradient-text">Explorer</span></span>
      </header>

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        .mobile-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: hsla(var(--bg-secondary) / 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid hsl(var(--border-color));
            display: flex;
            align-items: center;
            padding: 0 1rem;
            z-index: 50;
            gap: 1rem;
        }
        .menu-btn {
            background: none;
            border: none;
            color: hsl(var(--text-primary));
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mobile-logo {
            font-weight: 700;
            font-size: 1.25rem;
        }
        .main-content {
          flex: 1;
          margin-left: 280px; /* Sidebar width */
          padding: 2rem;
          background: radial-gradient(circle at top right, hsla(var(--accent-primary) / 0.05), transparent 40%);
          transition: margin-left 0.3s ease;
        }
        .content-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding-bottom: 80px; /* Mobile nav space */
          }
        }
      `}</style>
    </div>
  );
};
