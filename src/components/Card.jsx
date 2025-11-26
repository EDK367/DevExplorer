import React from 'react';

export const Card = ({ title, children, className = '', icon: Icon }) => {
    return (
        <div className={`card glass-panel ${className}`}>
            {(title || Icon) && (
                <div className="card-header">
                    {Icon && <Icon className="card-icon" size={24} />}
                    {title && <h3 className="card-title">{title}</h3>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
            <style>{`
        .card {
          padding: 1.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md), var(--shadow-glow);
          border-color: hsla(var(--accent-primary) / 0.3);
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .card-icon {
          color: hsl(var(--accent-primary));
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(var(--text-primary));
        }
        .card-content {
          color: hsl(var(--text-secondary));
        }
      `}</style>
        </div>
    );
};
