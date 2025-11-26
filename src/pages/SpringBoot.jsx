import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Box, Zap, ShieldCheck, Database, Play, Terminal } from 'lucide-react';

export const SpringBoot = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('features');

  const restController = `
@RestController
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
`;

  const applicationClass = `
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
`;

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Spring Boot <span className="gradient-text">Java Framework</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('springBoot.subtitle')}
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['features', 'quickstart', 'deepdive', 'interactive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
              ? 'bg-accent text-white shadow-lg scale-105'
              : 'bg-card hover:bg-accent/10'
              }`}
          >
            {tab === 'quickstart' ? 'Quick Start' :
              tab === 'deepdive' ? 'Deep Dive' :
                tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'features' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Box className="text-accent" />
              Core Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('springBoot.features.opinionated.title')} icon={Zap}>
                {t('springBoot.features.opinionated.content')}
              </Card>
              <Card title={t('springBoot.features.standalone.title')} icon={Box}>
                {t('springBoot.features.standalone.content')}
              </Card>
              <Card title={t('springBoot.features.production.title')} icon={ShieldCheck}>
                {t('springBoot.features.production.content')}
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'quickstart' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('springBoot.quickStart.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{t('springBoot.entryPoint.title')}</h3>
                <p className="mb-4 text-muted">{t('springBoot.entryPoint.desc')}</p>
                <CodeBlock title="Application.java" language="java" code={applicationClass} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">REST Controller</h3>
                <p className="mb-4 text-muted">{t('springBoot.quickStart.desc')}</p>
                <CodeBlock title="HelloController.java" language="java" code={restController} />
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'deepdive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('springBoot.deepDive.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('springBoot.deepDive.di.title')} icon={Box}>
                {t('springBoot.deepDive.di.content')}
              </Card>
              <Card title={t('springBoot.deepDive.jpa.title')} icon={Database}>
                {t('springBoot.deepDive.jpa.content')}
              </Card>
              <Card title={t('springBoot.deepDive.security.title')} icon={ShieldCheck}>
                {t('springBoot.deepDive.security.content')}
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'interactive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">Spring Boot CLI</h2>
            <p className="mb-4 text-muted">Initialize and run Spring apps. Try <code>spring init --dependencies=web my-app</code></p>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <MockTerminal
                  prompt="spring >"
                  initialOutput={[
                    "Spring CLI v3.0.0",
                    "Type 'help' for available commands"
                  ]}
                  commands={{
                    'spring init --dependencies=web my-app': {
                      desc: 'Initialize a new Spring Boot project with Web dependency',
                      output: 'Using service at https://start.spring.io\nProject extracted to \'/my-app\''
                    },
                    'spring run app.groovy': {
                      desc: 'Run a Groovy script as a Spring Boot application',
                      output: '  .   ____          _            __ _ _\n /\\\\ / ___\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\\n \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n  \'  |____| .__|_| |_|_| |_\\__, | / / / /\n =========|_|==============|___/=/_/_/_/\n:: Spring Boot ::  (v3.0.0)\n\nTomcat started on port(s): 8080 (http)'
                    },
                    'spring version': {
                      desc: 'Show Spring CLI version',
                      output: 'Spring CLI v3.0.0'
                    },
                    'help': {
                      desc: 'Show help',
                      output: 'Available commands: spring init..., spring run..., spring version'
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
