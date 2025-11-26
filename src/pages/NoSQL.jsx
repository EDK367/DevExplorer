import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { FileJson, Network, Server, Search, Play, Database } from 'lucide-react';

export const NoSQL = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('concepts');

    const mongoInsert = `
db.users.insertOne({
    username: "jdoe",
    email: "john@example.com",
    profile: {
        age: 30,
        interests: ["coding", "gaming"]
    },
    created_at: new Date()
});
`;

    const mongoQuery = `
db.users.find({ 
    "profile.age": { $gt: 25 } 
})
`;

    return (
        <div className="page-container max-w-7xl mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    NoSQL <span className="gradient-text">Non-Relational</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    {t('databases.mongo.content')}
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['concepts', 'documents', 'scaling', 'interactive'].map((tab) => (
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
                            <FileJson className="text-accent" />
                            Core Concepts
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title={t('databases.comparison.nosql.structure')} icon={FileJson}>
                                Data is stored in flexible formats like JSON documents, key-value pairs, or graphs.
                            </Card>
                            <Card title={t('databases.comparison.nosql.schema')} icon={Network}>
                                Dynamic schema allows you to change data structure without downtime or migrations.
                            </Card>
                            <Card title={t('databases.comparison.nosql.scaling')} icon={Server}>
                                Designed for horizontal scaling (sharding) across commodity hardware.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">CAP Theorem</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-accent">Consistency, Availability, Partition Tolerance</h3>
                                    <p className="text-muted mb-4">{t('databases.deepDive.cap.content')}</p>
                                    <div className="bg-secondary p-4 rounded-lg">
                                        <p className="text-sm">In a distributed system, you can only have 2 of the 3:</p>
                                        <ul className="mt-2 space-y-1 text-sm">
                                            <li><strong>CP:</strong> Consistency + Partition Tolerance (e.g., MongoDB, HBase)</li>
                                            <li><strong>AP:</strong> Availability + Partition Tolerance (e.g., Cassandra, DynamoDB)</li>
                                            <li><strong>CA:</strong> Consistency + Availability (RDBMS, hard to achieve in distributed systems)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Network size={120} className="text-accent opacity-20" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'documents' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Document Model</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">JSON-like Documents</h3>
                                <p className="mb-4 text-muted">
                                    Documents map naturally to objects in your code, making it easier for developers to work with data.
                                </p>
                                <CodeBlock title="insert.js" language="javascript" code={mongoInsert} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Rich Queries</h3>
                                <p className="mb-4 text-muted">
                                    The query language allows you to filter and sort by any field, no matter how nested it is within a document.
                                </p>
                                <CodeBlock title="query.js" language="javascript" code={mongoQuery} />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'scaling' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Horizontal Scaling</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="Sharding" icon={Server}>
                                Distributes data across multiple machines. MongoDB handles the balancing of data and requests automatically.
                            </Card>
                            <Card title="Replication" icon={Database}>
                                Replica sets provide high availability and data redundancy. Automatic failover ensures uptime.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">MongoDB Playground</h2>
                        <p className="mb-4 text-muted">Practice MongoDB commands. Try <code>db.users.find()</code></p>

                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="p-4">
                                <MockTerminal
                                    prompt="mongo >"
                                    initialOutput={[
                                        "MongoDB shell version v5.0.0",
                                        "connecting to: mongodb://127.0.0.1:27017/test"
                                    ]}
                                    commands={{
                                        'db.users.find()': {
                                            desc: 'Find all documents in the users collection',
                                            output: '[ \n  { "_id": ObjectId("..."), "username": "jdoe", "email": "john@example.com" },\n  { "_id": ObjectId("..."), "username": "alice", "email": "alice@example.com" }\n]'
                                        },
                                        'db.users.insertOne({ name: "bob" })': {
                                            desc: 'Insert a document into the users collection',
                                            output: '{\n  "acknowledged" : true,\n  "insertedId" : ObjectId("651234567890abcdef123456")\n}'
                                        },
                                        'show dbs': {
                                            desc: 'List all databases',
                                            output: 'admin   0.000GB\nconfig  0.000GB\nlocal   0.000GB\ntest    0.000GB'
                                        },
                                        'show collections': {
                                            desc: 'List collections in the current database',
                                            output: 'users\nproducts\norders'
                                        },
                                        'help': {
                                            desc: 'Show help',
                                            output: 'Available commands: db.users.find(), db.users.insertOne(...), show dbs, show collections'
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
