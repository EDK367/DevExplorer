'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to <span className="gradient-text">DevExplorer</span>
      </h1>
      <p className="text-xl text-muted mb-8">
        Your interactive journey into the world of modern software engineering.
      </p>
      <div className="features-grid">
        <div className='feature-card'>
          <h3>Java</h3>
          <p>Programming language.</p>
        </div>
        <div className="feature-card">
          <h3>Microservices</h3>
          <p>Decouple your architecture.</p>
        </div>
        <div className="feature-card">
          <h3>Docker</h3>
          <p>Containerize everything.</p>
        </div>
        <div className="feature-card">
          <h3>Kubernetes</h3>
          <p>Orchestrate at scale.</p>
        </div>
        <div className="feature-card">
          <h3>Modern Data</h3>
          <p>SQL & NoSQL paradigms.</p>
        </div>
      
      </div>
    </div>
  );
}
