'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Coffee, Box, Layers, Play, Code, Cpu } from 'lucide-react';

export const Java = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('core');

    const helloWorld = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
`;

    const oopExample = `
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
`;

    const streamExample = `
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .forEach(System.out::println);
`;

    return (
        <div className="page-container max-w-7xl mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Java <span className="gradient-text">Programming Language</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    {t('java.subtitle')}
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['core', 'oop', 'streams', 'interactive'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
                            ? 'bg-accent text-white shadow-lg scale-105'
                            : 'bg-card hover:bg-accent/10'
                            }`}
                    >
                        {tab === 'oop' ? 'OOP' :
                            tab === 'core' ? 'Core Concepts' :
                                tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'core' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Coffee className="text-accent" />
                            {t('java.core.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-lg text-muted mb-6">{t('java.core.description')}</p>
                                <div className="grid gap-4">
                                    <Card title={t('java.core.platform.title')} icon={Box}>
                                        {t('java.core.platform.content')}
                                    </Card>
                                    <Card title={t('java.core.memory.title')} icon={Cpu}>
                                        {t('java.core.memory.content')}
                                    </Card>
                                </div>
                            </div>
                            <div>
                                <CodeBlock title="HelloWorld.java" language="java" code={helloWorld} />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'oop' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t('java.oop.title')}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <CodeBlock title="Inheritance.java" language="java" code={oopExample} />
                            </div>
                            <div className="space-y-6">
                                <Card title={t('java.oop.encapsulation.title')} icon={Box}>
                                    {t('java.oop.encapsulation.content')}
                                </Card>
                                <Card title={t('java.oop.inheritance.title')} icon={Layers}>
                                    {t('java.oop.inheritance.content')}
                                </Card>
                                <Card title={t('java.oop.polymorphism.title')} icon={Code}>
                                    {t('java.oop.polymorphism.content')}
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'streams' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t('java.streams.title')}</h2>
                        <p className="text-lg text-muted mb-8">{t('java.streams.description')}</p>
                        <CodeBlock title="StreamExample.java" language="java" code={streamExample} />
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">JShell (Java Shell)</h2>
                        <p className="mb-4 text-muted">Try running Java code snippets interactively.</p>

                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="p-4">
                                <MockTerminal
                                    prompt="jshell>"
                                    initialOutput={[
                                        "|  Welcome to JShell -- Version 17",
                                        "|  For an introduction type: /help intro"
                                    ]}
                                    commands={{
                                        'System.out.println("Hello")': {
                                            desc: 'Print to console',
                                            output: 'Hello'
                                        },
                                        'int x = 10': {
                                            desc: 'Define variable',
                                            output: 'x ==> 10'
                                        },
                                        'x * 2': {
                                            desc: 'Calculate',
                                            output: '$3 ==> 20'
                                        },
                                        '/help': {
                                            desc: 'Show help',
                                            output: 'Type a Java language expression, statement, or declaration.\nOr type one of the following commands:\n/list - list the source you have typed\n/exit - exit JShell'
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
