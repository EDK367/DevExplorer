'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Server, Network, ShieldCheck, Zap, Box, Activity } from 'lucide-react';

export const Microservices = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('concepts');

  const gatewayConfig = `
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/users/**
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/orders/**
`;

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Microservices <span className="gradient-text">Architecture</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('microservices.subtitle')}
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['concepts', 'patterns', 'interactive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
              ? 'bg-accent text-white shadow-lg scale-105'
              : 'bg-card hover:bg-accent/10'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'concepts' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Server className="text-accent" />
              {t('microservices.whatIs.title')}
            </h2>
            <p className="text-lg text-muted mb-8">{t('microservices.whatIs.content')}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('microservices.features.deployable')} icon={Box}>
                Services can be deployed individually without affecting the entire system.
              </Card>
              <Card title={t('microservices.features.maintainable')} icon={ShieldCheck}>
                Smaller codebases are easier to understand, maintain, and test.
              </Card>
              <Card title={t('microservices.features.organized')} icon={Network}>
                Teams can focus on specific business domains (e.g., Orders, Users).
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">{t('microservices.characteristics.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('microservices.characteristics.decentralized.title')} icon={Database}>
                {t('microservices.characteristics.decentralized.content')}
              </Card>
              <Card title={t('microservices.characteristics.smartEndpoints.title')} icon={Zap}>
                {t('microservices.characteristics.smartEndpoints.content')}
              </Card>
              <Card title={t('microservices.characteristics.automated.title')} icon={Activity}>
                {t('microservices.characteristics.automated.content')}
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('microservices.patterns.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Network className="text-accent" />
                  API Gateway
                </h3>
                <p className="mb-4 text-muted">{t('microservices.patterns.gateway.content')}</p>
                <CodeBlock title="application.yml" language="yaml" code={gatewayConfig} />
              </div>
              <div className="space-y-6">
                <Card title={t('microservices.patterns.circuitBreaker.title')} icon={Zap}>
                  {t('microservices.patterns.circuitBreaker.content')}
                </Card>
                <Card title={t('microservices.patterns.discovery.title')} icon={Search}>
                  {t('microservices.patterns.discovery.content')}
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'interactive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">Service Mesh Simulator</h2>
            <p className="mb-4 text-muted">Simulate traffic between microservices. Try <code>curl service-a</code></p>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <MockTerminal
                  prompt="mesh-ctl >"
                  initialOutput={[
                    "Service Mesh Control Plane v1.0",
                    "Services detected: service-a, service-b, database"
                  ]}
                  commands={{
                    'curl service-a': {
                      desc: 'Send a request to Service A',
                      output: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "status": "up", "upstream": "service-b" }'
                    },
                    'curl service-b': {
                      desc: 'Send a request to Service B',
                      output: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "status": "up", "db_connection": "active" }'
                    },
                    'mesh status': {
                      desc: 'Check the status of the service mesh',
                      output: 'service-a: HEALTHY (1 instance)\nservice-b: HEALTHY (2 instances)\ndatabase: HEALTHY (Primary)'
                    },
                    'help': {
                      desc: 'Show help',
                      output: 'Available commands: curl service-a, curl service-b, mesh status'
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

// Missing imports
import { Database, Search } from 'lucide-react';
