'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Terminal, Box, Shield, Cpu, Layers, Zap } from 'lucide-react';

export const Fedora = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('why');

  const setupCommands = `
# Update system
sudo dnf update -y

# Install development tools
sudo dnf groupinstall "Development Tools"

# Install container tools
sudo dnf install podman buildah skopeo

# Enable Flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
`;

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Fedora <span className="gradient-text">Workstation</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('fedora.subtitle')}
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['why', 'setup', 'deepdive', 'interactive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
              ? 'bg-accent text-white shadow-lg scale-105'
              : 'bg-card hover:bg-accent/10'
              }`}
          >
            {tab === 'why' ? 'Why Fedora?' :
              tab === 'deepdive' ? 'Deep Dive' :
                tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'why' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-accent" />
              {t('fedora.why.title')}
            </h2>
            <p className="text-lg text-muted mb-8">{t('fedora.why.content')}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('fedora.features.upstream.title')} icon={Zap}>
                {t('fedora.features.upstream.content')}
              </Card>
              <Card title={t('fedora.features.technologies.title')} icon={Cpu}>
                {t('fedora.features.technologies.content')}
              </Card>
              <Card title={t('fedora.features.containers.title')} icon={Box}>
                {t('fedora.features.containers.content')}
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'setup' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('fedora.setup.title')}</h2>
            <p className="mb-4 text-muted">{t('fedora.setup.desc')}</p>
            <CodeBlock title="setup.sh" language="bash" code={setupCommands} />
          </section>
        </div>
      )}

      {activeTab === 'deepdive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('fedora.deepDive.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title={t('fedora.deepDive.systemd.title')} icon={Layers}>
                {t('fedora.deepDive.systemd.content')}
              </Card>
              <Card title={t('fedora.deepDive.firewall.title')} icon={Shield}>
                {t('fedora.deepDive.firewall.content')}
              </Card>
              <Card title={t('fedora.deepDive.toolbox.title')} icon={Box}>
                {t('fedora.deepDive.toolbox.content')}
              </Card>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'interactive' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className="text-3xl font-bold mb-6">DNF Package Manager</h2>
            <p className="mb-4 text-muted">Manage packages with DNF. Try <code>sudo dnf install neofetch</code></p>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4">
                <MockTerminal
                  prompt="[user@fedora ~]$"
                  initialOutput={[
                    "Fedora Linux 39 (Workstation Edition)",
                    "Kernel 6.5.6-300.fc39.x86_64"
                  ]}
                  commands={{
                    'sudo dnf install neofetch': {
                      desc: 'Install a package',
                      output: 'Last metadata expiration check: 0:45:12 ago.\nDependencies resolved.\n================================================================================\n Package           Architecture   Version           Repository             Size\n================================================================================\nInstalling:\n neofetch          noarch         7.1.0-2.fc39      fedora                105 k\n\nTransaction Summary\n================================================================================\nInstall  1 Package\n\nTotal download size: 105 k\nInstalled size: 360 k\nIs this ok [y/N]: y\nComplete!'
                    },
                    'neofetch': {
                      desc: 'Display system information',
                      output: '  _____ ____  _  __   user@fedora\n | ____|  _ \\| |/ /   -----------\n |  _| | | | | \' /    OS: Fedora Linux 39 (Workstation Edition) x86_64\n | |___| |_| | . \\    Host: Laptop\n |_____|____/|_|\\_\\   Kernel: 6.5.6-300.fc39.x86_64\n                      Uptime: 1 hour, 23 mins\n                      Packages: 1845 (rpm), 12 (flatpak)\n                      Shell: bash 5.2.15\n                      DE: GNOME 45.0'
                    },
                    'sudo dnf update': {
                      desc: 'Update installed packages',
                      output: 'Last metadata expiration check: 0:05:23 ago.\nDependencies resolved.\nNothing to do.\nComplete!'
                    },
                    'help': {
                      desc: 'Show help',
                      output: 'Available commands: sudo dnf install neofetch, neofetch, sudo dnf update'
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
