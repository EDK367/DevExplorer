import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="app-layout">
            <Sidebar />
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
        .main-content {
          flex: 1;
          margin-left: 280px; /* Sidebar width */
          padding: 2rem;
          background: radial-gradient(circle at top right, hsla(var(--accent-primary) / 0.05), transparent 40%);
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
