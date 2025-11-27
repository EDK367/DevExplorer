'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <h1 className="text-5xl font-bold mb-6">
        {t('home.welcome')} <span className="gradient-text">DevExplorer</span>
      </h1>
      <p className="text-xl text-muted mb-8">
        {t('home.subtitle')}
      </p>
      <div className="features-grid">
        <div className='feature-card'>
          <h3>Java</h3>
          <p>{t('home.cards.java')}.</p>
        </div>
        <div className="feature-card">
          <h3>Microservices</h3>
          <p>{t('home.cards.microservices')}.</p>
        </div>
        <div className="feature-card">
          <h3>Docker</h3>
          <p>{t('home.cards.docker')}.</p>
        </div>
        <div className="feature-card">
          <h3>Kubernetes</h3>
          <p>{t('home.cards.k8s')}.</p>
        </div>
        <div className="feature-card">
          <h3>{t('home.title-cards.databases')}</h3>
          <p>{t('home.cards.databases')}.</p>
        </div>
      
      </div>
    </div>
  );
}
