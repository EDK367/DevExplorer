'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import { MockTerminal } from './MockTerminal';
import { Database, Table, FileJson, Server, ShieldCheck, Network } from 'lucide-react';
import Link from 'next/link';

export const Databases = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {t('databases.title')} <span className="gradient-text">{t('databases.persistence')}</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('databases.subtitle')}
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['overview', 'comparison', 'interactive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
              ? 'bg-accent text-white shadow-lg scale-105'
              : 'bg-card hover:bg-accent/10'
              }`}
          >
            {t(`databases.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/sql" className="group">
            <div className="bg-card hover:bg-accent/5 border border-border rounded-xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <Table size={40} className="text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold">SQL</h2>
              </div>
              <p className="text-muted text-lg mb-6">
                {t('databases.sqlCard.desc')}
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" /> {t('databases.sqlCard.features.acid')}
                </li>
                <li className="flex items-center gap-2">
                  <Server size={16} className="text-blue-500" /> {t('databases.sqlCard.features.scaling')}
                </li>
                <li className="flex items-center gap-2">
                  <Network size={16} className="text-purple-500" /> {t('databases.sqlCard.features.joins')}
                </li>
              </ul>
            </div>
          </Link>

          <Link href="/nosql" className="group">
            <div className="bg-card hover:bg-accent/5 border border-border rounded-xl p-8 transition-all hover:scale-[1.02] hover:shadow-xl h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <FileJson size={40} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold">NoSQL</h2>
              </div>
              <p className="text-muted text-lg mb-6">
                {t('databases.nosqlCard.desc')}
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Server size={16} className="text-green-500" /> {t('databases.nosqlCard.features.scaling')}
                </li>
                <li className="flex items-center gap-2">
                  <FileJson size={16} className="text-yellow-500" /> {t('databases.nosqlCard.features.flexible')}
                </li>
                <li className="flex items-center gap-2">
                  <Database size={16} className="text-red-500" /> {t('databases.nosqlCard.features.ha')}
                </li>
              </ul>
            </div>
          </Link>
        </div>
      )}

      {activeTab === 'comparison' && (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('databases.comparison.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title={t('databases.comparisonDetails.structure.title')} icon={Table}>
              <strong>SQL:</strong> {t('databases.comparisonDetails.structure.sql')}<br />
              <strong>NoSQL:</strong> {t('databases.comparisonDetails.structure.nosql')}
            </Card>
            <Card title={t('databases.comparisonDetails.schema.title')} icon={ShieldCheck}>
              <strong>SQL:</strong> {t('databases.comparisonDetails.schema.sql')}<br />
              <strong>NoSQL:</strong> {t('databases.comparisonDetails.schema.nosql')}
            </Card>
            <Card title={t('databases.comparisonDetails.scalability.title')} icon={Server}>
              <strong>SQL:</strong> {t('databases.comparisonDetails.scalability.sql')}<br />
              <strong>NoSQL:</strong> {t('databases.comparisonDetails.scalability.nosql')}
            </Card>
          </div>
        </section>
      )}

      {activeTab === 'interactive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('databases.interactive.title')}</h2>
            <p className="mb-4 text-muted">{t('databases.interactive.desc')}</p>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <MockTerminal
                  prompt="db-hub >"
                  initialOutput={[
                    "Database Hub CLI v1.0",
                    "Type 'help' to see available commands."
                  ]}
                  commands={{
                    'sql info': {
                      desc: t('databases.interactive.commands.sqlInfo'),
                      output: 'SQL (Structured Query Language) is the standard language for relational database management systems.'
                    },
                    'nosql info': {
                      desc: t('databases.interactive.commands.nosqlInfo'),
                      output: 'NoSQL databases provide a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.'
                    },
                    'list types': {
                      desc: t('databases.interactive.commands.listTypes'),
                      output: '1. Relational (PostgreSQL, MySQL)\n2. Document (MongoDB, CouchDB)\n3. Key-Value (Redis, DynamoDB)\n4. Graph (Neo4j)'
                    },
                    'help': {
                      desc: t('databases.interactive.commands.help'),
                      output: 'Available commands: sql info, nosql info, list types'
                    }
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
