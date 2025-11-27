'use client';

import React, { useState, useEffect } from 'react';
import { Star, GitFork, Loader } from 'lucide-react';

export const GithubStats = ({ repo }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.github.com/repos/${repo}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          description: data.description
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [repo]);

  if (loading) return <div className="stats-loading"><Loader className="spin" /> Loading stats...</div>;
  if (error) return <div className="stats-error">Failed to load stats</div>;

  return (
    <div className="github-stats">
      <div className="stat-item">
        <Star size={16} className="text-yellow" />
        <span>{(stats.stars / 1000).toFixed(1)}k Stars</span>
      </div>
      <div className="stat-item">
        <GitFork size={16} className="text-blue" />
        <span>{(stats.forks / 1000).toFixed(1)}k Forks</span>
      </div>
      <style>{`
            .github - stats {
                display: inline - flex;
                gap: 1rem;
                padding: 0.5rem 1rem;
                background: hsla(var(--bg - card) / 0.8);
    border - radius: var(--radius - sm);
    border: 1px solid hsl(var(--border - color));
    font - size: 0.9rem;
}
        .stat - item {
    display: flex;
    align - items: center;
    gap: 0.5rem;
    font - weight: 600;
}
        .text - yellow { color: #ffd700; }
        .text - blue { color: #58a6ff; }
        .spin { animation: spin 1s linear infinite; }
@keyframes spin { 100 % { transform: rotate(360deg); } }
`}</style>
    </div>
  );
};
