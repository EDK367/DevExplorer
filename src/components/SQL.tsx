'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Database, Table, Server, ShieldCheck, Search, Play } from 'lucide-react';

export const SQL = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('concepts');
    const [queryResult, setQueryResult] = useState(null);

    const sqlSchema = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

    const sqlInsert = `
INSERT INTO users (username, email) 
VALUES ('jdoe', 'john@example.com');
`;

    const runMockQuery = (query) => {
        // Simulate query execution
        if (query.toLowerCase().includes('select')) {
            setQueryResult([
                { id: 1, username: 'jdoe', email: 'john@example.com', created_at: '2023-01-01' },
                { id: 2, username: 'alice', email: 'alice@example.com', created_at: '2023-01-02' }
            ]);
        } else {
            setQueryResult({ status: 'success', message: 'Query executed successfully', rows_affected: 1 });
        }
    };

    return (
        <div className="page-container max-w-7xl mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    SQL <span className="gradient-text">Relational Databases</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    {t('databases.postgres.content')}
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['concepts', 'schema', 'advanced', 'interactive'].map((tab) => (
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
                            <Database className="text-accent" />
                            Core Concepts
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title={t('databases.comparison.sql.structure')} icon={Table}>
                                Data is organized into tables with rows and columns. Relationships are defined by foreign keys.
                            </Card>
                            <Card title={t('databases.comparison.sql.schema')} icon={ShieldCheck}>
                                Strict schema enforcement ensures data integrity. Changes require migrations.
                            </Card>
                            <Card title={t('databases.comparison.sql.scaling')} icon={Server}>
                                Typically scales vertically (bigger server) but can scale horizontally with sharding.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">ACID Properties</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-accent">What is ACID?</h3>
                                    <p className="text-muted mb-4">{t('databases.deepDive.acid.content')}</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> <strong>Atomicity:</strong> All or nothing</li>
                                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> <strong>Consistency:</strong> Valid state transitions</li>
                                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> <strong>Isolation:</strong> Concurrent transactions don't interfere</li>
                                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> <strong>Durability:</strong> Committed data is saved</li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ShieldCheck size={120} className="text-accent opacity-20" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'schema' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Defining Data</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Creating Tables</h3>
                                <p className="mb-4 text-muted">
                                    SQL uses Data Definition Language (DDL) to define the structure of your data.
                                </p>
                                <CodeBlock title="schema.sql" language="sql" code={sqlSchema} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Manipulating Data</h3>
                                <p className="mb-4 text-muted">
                                    Data Manipulation Language (DML) is used to insert, update, and delete data.
                                </p>
                                <CodeBlock title="insert.sql" language="sql" code={sqlInsert} />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'advanced' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="Indexing" icon={Search}>
                                {t('databases.deepDive.indexing.content')} B-Trees are the most common index type.
                            </Card>
                            <Card title="Transactions" icon={ShieldCheck}>
                                Group multiple operations into a single unit of work. COMMIT to save, ROLLBACK to undo.
                            </Card>
                            <Card title="Joins" icon={Table}>
                                Combine rows from two or more tables, based on a related column between them.
                            </Card>
                            <Card title="Views" icon={Search}>
                                Virtual tables based on the result-set of an SQL statement.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">SQL Playground</h2>
                        <p className="mb-4 text-muted">Practice writing SQL queries. Try <code>SELECT * FROM users</code></p>

                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="p-4 bg-secondary border-b border-border flex items-center justify-between">
                                <span className="font-mono text-sm">query.sql</span>
                                <button
                                    onClick={() => runMockQuery('SELECT * FROM users')}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    <Play size={14} /> Run
                                </button>
                            </div>
                            <div className="p-4">
                                <MockTerminal
                                    prompt="postgres=#"
                                    initialOutput={[
                                        "Connected to PostgreSQL 15.0",
                                        "Type 'help' for help."
                                    ]}
                                    commands={{
                                        'SELECT * FROM users': {
                                            desc: 'Select all columns from the users table',
                                            output: ' id | username |       email       |     created_at      \n----+----------+-------------------+---------------------\n  1 | jdoe     | john@example.com  | 2023-01-01 10:00:00\n  2 | alice    | alice@example.com | 2023-01-02 11:30:00\n(2 rows)'
                                        },
                                        'INSERT INTO users (username) VALUES (\'bob\')': {
                                            desc: 'Insert a new user',
                                            output: 'INSERT 0 1'
                                        },
                                        '\\dt': {
                                            desc: 'List tables',
                                            output: '        List of relations\n Schema | Name  | Type  |  Owner   \n--------+-------+-------+----------\n public | users | table | postgres\n(1 row)'
                                        },
                                        '\\d users': {
                                            desc: 'Describe the users table',
                                            output: '                               Table "public.users"\n   Column   |            Type             | Collation | Nullable | Default \n------------+-----------------------------+-----------+----------+---------\n id         | integer                     |           | not null | \n username   | character varying(50)       |           | not null | \n email      | character varying(100)      |           | not null | \n created_at | timestamp without time zone |           |          | now()\nIndexes:\n    "users_pkey" PRIMARY KEY, btree (id)\n    "users_email_key" UNIQUE CONSTRAINT, btree (email)\n    "users_username_key" UNIQUE CONSTRAINT, btree (username)'
                                        },
                                        'help': {
                                            desc: 'Show help',
                                            output: 'Available commands: SELECT * FROM users, INSERT INTO users..., \\dt, \\d users'
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
