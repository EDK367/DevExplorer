import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Container, Layers, Box, Network, Shield, Server, FileText, Terminal as TerminalIcon, CheckCircle, XCircle } from 'lucide-react';

export const Docker = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    const dockerfileExample = `
# Use multi-stage builds for smaller images
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
`;

    const composeExample = `
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:14-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

volumes:
  postgres_data:
`;

    const quizQuestions = [
        {
            question: "What is the primary difference between a Docker Image and a Container?",
            options: [
                "They are the same thing",
                "An image is a running instance, a container is the blueprint",
                "An image is a read-only template, a container is a runnable instance",
                "Containers are for Linux, Images are for Windows"
            ],
            correct: 2
        },
        {
            question: "Which command lists all running containers?",
            options: [
                "docker images",
                "docker ps",
                "docker run",
                "docker info"
            ],
            correct: 1
        },
        {
            question: "What is the purpose of a multi-stage build?",
            options: [
                "To make the build slower",
                "To run multiple apps in one container",
                "To reduce final image size by discarding build dependencies",
                "To use multiple operating systems"
            ],
            correct: 2
        }
    ];

    const handleQuizSubmit = (answers) => {
        let score = 0;
        answers.forEach((ans, idx) => {
            if (ans === quizQuestions[idx].correct) score++;
        });
        setQuizScore(score);
        setShowQuizResult(true);
    };

    return (
        <div className="page-container max-w-7xl mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Docker <span className="gradient-text">Mastery</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    The complete guide to containerization, from basic concepts to production-grade orchestration.
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['overview', 'architecture', 'best-practices', 'compose', 'interactive'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
                            ? 'bg-accent text-white shadow-lg scale-105'
                            : 'bg-card hover:bg-accent/10'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Container className="text-accent" />
                            Core Concepts
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="What is Docker?" icon={Box}>
                                Docker is an open platform for developing, shipping, and running applications. It enables you to separate your applications from your infrastructure so you can deliver software quickly.
                            </Card>
                            <Card title="Why Containers?" icon={Layers}>
                                Containers are lightweight, standalone, executable packages of software that include everything needed to run an application: code, runtime, system tools, system libraries and settings.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Images vs Containers</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText size={40} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Docker Image</h3>
                                    <p className="text-muted">Read-only template (The Recipe)</p>
                                    <ul className="text-left mt-4 space-y-2 text-sm">
                                        <li>• Built from Dockerfile</li>
                                        <li>• Layered file system</li>
                                        <li>• Immutable</li>
                                    </ul>
                                </div>
                                <div className="text-2xl font-bold text-muted">→</div>
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Box size={40} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Docker Container</h3>
                                    <p className="text-muted">Runnable Instance (The Cake)</p>
                                    <ul className="text-left mt-4 space-y-2 text-sm">
                                        <li>• Created from Image</li>
                                        <li>• Isolated process</li>
                                        <li>• Ephemeral (usually)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'architecture' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Server className="text-accent" />
                            Docker Architecture
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="The Daemon (dockerd)" icon={Settings}>
                                The background process that manages Docker objects such as images, containers, networks, and volumes. It listens for Docker API requests.
                            </Card>
                            <Card title="The Client (docker)" icon={TerminalIcon}>
                                The primary way many Docker users interact with Docker. When you use commands like `docker run`, the client sends these commands to dockerd.
                            </Card>
                            <Card title="Registries" icon={Database}>
                                Stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Under the Hood</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Namespaces</h3>
                                <p className="mb-4">Docker uses a technology called namespaces to provide the isolated workspace called the container. When you run a container, Docker creates a set of namespaces for that container.</p>
                                <ul className="list-disc list-inside space-y-2 text-muted">
                                    <li><strong>pid</strong>: Process isolation</li>
                                    <li><strong>net</strong>: Managing network interfaces</li>
                                    <li><strong>ipc</strong>: Managing access to IPC resources</li>
                                    <li><strong>mnt</strong>: Managing filesystem mount points</li>
                                    <li><strong>uts</strong>: Isolating kernel and version identifiers</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Control Groups (cgroups)</h3>
                                <p className="mb-4">A Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, network, etc.) of a collection of processes.</p>
                                <div className="bg-card p-4 rounded-lg border border-border">
                                    <code className="text-sm text-green-400">
                                        docker run --cpus=.5 --memory=512m nginx
                                    </code>
                                    <p className="text-xs text-muted mt-2">Example: Limiting a container to 50% CPU and 512MB RAM.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'best-practices' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <CheckCircle className="text-accent" />
                            Dockerfile Best Practices
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Optimization Tips</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-green-500/20 p-2 rounded-full"><CheckCircle size={16} className="text-green-400" /></div>
                                        <div>
                                            <strong>Use Multi-stage Builds</strong>
                                            <p className="text-sm text-muted">Keep image sizes down by copying only necessary artifacts to the final image.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-green-500/20 p-2 rounded-full"><CheckCircle size={16} className="text-green-400" /></div>
                                        <div>
                                            <strong>Leverage Build Cache</strong>
                                            <p className="text-sm text-muted">Order instructions from least to most frequently changing (e.g., copy package.json before source code).</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-green-500/20 p-2 rounded-full"><CheckCircle size={16} className="text-green-400" /></div>
                                        <div>
                                            <strong>Use .dockerignore</strong>
                                            <p className="text-sm text-muted">Exclude unnecessary files (node_modules, git, logs) from the build context.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <CodeBlock title="Optimized Dockerfile" language="dockerfile" code={dockerfileExample} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="text-accent" />
                            Security Best Practices
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="Don't run as Root" icon={Shield}>
                                Always create a non-root user in your Dockerfile and switch to it using the `USER` instruction.
                            </Card>
                            <Card title="Use Trusted Base Images" icon={CheckCircle}>
                                Stick to official images from Docker Hub or verified publishers. Avoid `latest` tag in production.
                            </Card>
                            <Card title="Scan for Vulnerabilities" icon={Search}>
                                Use tools like `docker scan` or Trivy to check your images for known security flaws.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'compose' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Network className="text-accent" />
                            Docker Compose
                        </h2>
                        <p className="text-lg mb-8">
                            Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <CodeBlock title="docker-compose.yml" language="yaml" code={composeExample} />
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold">Key Concepts</h3>
                                <div className="space-y-4">
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-2">Services</h4>
                                        <p className="text-sm text-muted">The computing resources of your application (e.g., web server, database).</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-2">Networks</h4>
                                        <p className="text-sm text-muted">Define how services communicate. By default, Compose sets up a single network for your app.</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-2">Volumes</h4>
                                        <p className="text-sm text-muted">Persistent data storage. Essential for databases so data survives container restarts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Interactive Terminal</h2>
                        <p className="mb-4 text-muted">Try running some Docker commands in this simulated environment.</p>
                        <MockTerminal
                            initialOutput={[
                                "Welcome to the Docker Interactive Shell",
                                "Try commands like 'docker ps', 'docker images', or 'docker run hello-world'"
                            ]}
                            commands={{
                                'docker ps': {
                                    desc: 'List running containers',
                                    output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES\n1234567890ab   nginx     "..."     1m ago    Up 1m     80/tcp    web-server'
                                },
                                'docker images': {
                                    desc: 'List available images',
                                    output: 'REPOSITORY   TAG       IMAGE ID       CREATED      SIZE\nnginx        latest    605c77e624dd   2 weeks ago  141MB\nalpine       latest    c059bfaa849c   1 month ago  5.59MB'
                                },
                                'docker run hello-world': {
                                    desc: 'Run a container from an image',
                                    output: 'Hello from Docker!\nThis message shows that your installation appears to be working correctly.'
                                },
                                'docker build -t my-app .': {
                                    desc: 'Build an image from a Dockerfile',
                                    output: '[+] Building 0.1s (5/5) FINISHED\n => [internal] load build definition from Dockerfile\n => => transferring dockerfile: 32B\n => [internal] load .dockerignore\n => => transferring context: 2B\n => [internal] load metadata for docker.io/library/node:14\n => [1/2] FROM docker.io/library/node:14\n => [2/2] WORKDIR /app\n => exporting to image\n => => exporting layers\n => => writing image sha256:...\n => naming to docker.io/library/my-app'
                                },
                                'docker compose up': {
                                    desc: 'Start services defined in docker-compose.yml',
                                    output: '[+] Running 2/2\n ⠿ Network app_default  Created\n ⠿ Container app-web-1  Started\nAttaching to app-web-1\napp-web-1  | Listening on port 3000...'
                                },
                                'help': {
                                    desc: 'Show help',
                                    output: 'Available commands: docker ps, docker images, docker run hello-world, docker build -t my-app ., docker compose up'
                                }
                            }}
                        />
                    </section>

                    <section className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Knowledge Check</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            {!showQuizResult ? (
                                <QuizComponent questions={quizQuestions} onSubmit={handleQuizSubmit} />
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl mb-4">{quizScore === quizQuestions.length ? '🏆' : '📝'}</div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        You scored {quizScore} out of {quizQuestions.length}
                                    </h3>
                                    <p className="text-muted mb-6">
                                        {quizScore === quizQuestions.length
                                            ? "Perfect score! You're a Docker master!"
                                            : "Good effort! Review the sections and try again."}
                                    </p>
                                    <button
                                        onClick={() => setShowQuizResult(false)}
                                        className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}

            <style>{`
        .gradient-text {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
        </div>
    );
};

// Helper components for the file
const QuizComponent = ({ questions, onSubmit }) => {
    const [answers, setAnswers] = useState(new Array(questions.length).fill(null));

    const handleSelect = (qIndex, oIndex) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = oIndex;
        setAnswers(newAnswers);
    };

    const isComplete = answers.every(a => a !== null);

    return (
        <div className="space-y-8">
            {questions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                    <h4 className="font-medium text-lg">{qIdx + 1}. {q.question}</h4>
                    <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                            <button
                                key={oIdx}
                                onClick={() => handleSelect(qIdx, oIdx)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${answers[qIdx] === oIdx
                                    ? 'border-accent bg-accent/10 text-accent'
                                    : 'border-border hover:bg-secondary/50'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button
                disabled={!isComplete}
                onClick={() => onSubmit(answers)}
                className={`w-full py-3 rounded-lg font-bold transition-all ${isComplete
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-secondary text-muted cursor-not-allowed'
                    }`}
            >
                Submit Answers
            </button>
        </div>
    );
};

// Missing icons import fix
import { Settings, Database, Search } from 'lucide-react';
