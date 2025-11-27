'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Github, GitPullRequest, Users, Zap, Shield, Package, Star, CheckCircle } from 'lucide-react';

export const GitHub = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('prs');
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    const prWorkflow = `
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/repo.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and commit
git add .
git commit -m "Add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Open a Pull Request on GitHub
# Navigate to the original repo and click "New Pull Request"
`;

    const actionsExample = `
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
`;

    const quizQuestions = [
        {
            question: "What is a Pull Request?",
            options: [
                "A request to download code",
                "A proposal to merge changes from one branch to another",
                "A way to delete a repository",
                "A backup of your code"
            ],
            correct: 1
        },
        {
            question: "What does GitHub Actions allow you to do?",
            options: [
                "Only run tests",
                "Automate workflows like CI/CD, testing, and deployments",
                "Only deploy to production",
                "Delete old commits"
            ],
            correct: 1
        },
        {
            question: "What is a GitHub Issue used for?",
            options: [
                "Only for reporting bugs",
                "Tracking tasks, enhancements, and bugs",
                "Storing code",
                "Running automated tests"
            ],
            correct: 1
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
                    GitHub <span className="gradient-text">Collaboration</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    The world's leading platform for version control and collaboration. Build, ship, and maintain software with millions of developers.
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['prs', 'actions', 'issues', 'security', 'interactive'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
                            ? 'bg-accent text-white shadow-lg scale-105'
                            : 'bg-card hover:bg-accent/10'
                            }`}
                    >
                        {tab === 'prs' ? 'Pull Requests' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'prs' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GitPullRequest className="text-accent" />
                            Pull Requests & Code Review
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">The PR Workflow</h3>
                                <p className="mb-4 text-muted">
                                    Pull Requests let you tell others about changes you've pushed to a branch in a repository on GitHub. Once a PR is opened, you can discuss and review the potential changes with collaborators.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Fork & Clone</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Create Feature Branch</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Make Changes & Commit</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Push & Open PR</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Code Review</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Merge</div>
                                </div>
                            </div>
                            <CodeBlock title="pr-workflow.sh" language="bash" code={prWorkflow} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Code Review Best Practices</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="Be Constructive" icon={Users}>
                                Provide specific, actionable feedback. Focus on the code, not the person. Suggest improvements rather than just pointing out problems.
                            </Card>
                            <Card title="Review Promptly" icon={Clock}>
                                Timely reviews keep the development process moving. Aim to review PRs within 24 hours to maintain team momentum.
                            </Card>
                            <Card title="Test Thoroughly" icon={CheckCircle}>
                                Don't just read the code—pull it down and test it. Verify that changes work as expected and don't break existing functionality.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'actions' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Zap className="text-accent" />
                            GitHub Actions & CI/CD
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <CodeBlock title=".github/workflows/ci.yml" language="yaml" code={actionsExample} />
                            <div>
                                <h3 className="text-xl font-bold mb-4">What are GitHub Actions?</h3>
                                <p className="mb-4 text-muted">
                                    GitHub Actions makes it easy to automate all your software workflows with world-class CI/CD. Build, test, and deploy your code right from GitHub.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">Workflows</h4>
                                        <p className="text-sm text-muted">Automated processes defined in YAML files that run on specific events.</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">Jobs</h4>
                                        <p className="text-sm text-muted">A set of steps that execute on the same runner. Jobs can run in parallel or sequentially.</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">Actions</h4>
                                        <p className="text-sm text-muted">Reusable units of code that can be shared across workflows and repositories.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Common Use Cases</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="Continuous Integration" icon={Zap}>
                                Automatically build and test code changes. Run tests on every push or PR to catch bugs early.
                            </Card>
                            <Card title="Continuous Deployment" icon={Package}>
                                Automatically deploy to staging or production when code is merged. Streamline your release process.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'issues' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <AlertCircle className="text-accent" />
                            Issues & Project Management
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">GitHub Issues</h3>
                                <p className="mb-4 text-muted">
                                    Issues are a great way to keep track of tasks, enhancements, and bugs for your projects. They're like email—except they can be shared and discussed with the rest of your team.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>Labels:</strong> Categorize and filter issues
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>Milestones:</strong> Group issues for releases
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>Assignees:</strong> Delegate work to team members
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">GitHub Projects</h3>
                                <p className="mb-4 text-muted">
                                    Projects help you organize and prioritize your work. You can create project boards for specific features, comprehensive roadmaps, or even release checklists.
                                </p>
                                <div className="bg-card p-6 rounded-lg border border-border">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl mb-2">📋</div>
                                            <strong className="text-sm">To Do</strong>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-2">🚧</div>
                                            <strong className="text-sm">In Progress</strong>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-2">✅</div>
                                            <strong className="text-sm">Done</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="text-accent" />
                            Security Features
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="Dependabot" icon={Package}>
                                Automatically checks your dependencies for known security vulnerabilities and creates PRs to update them.
                            </Card>
                            <Card title="Code Scanning" icon={Search}>
                                Finds security vulnerabilities and coding errors in your code. Powered by CodeQL and other tools.
                            </Card>
                            <Card title="Secret Scanning" icon={Shield}>
                                Detects secrets (API keys, tokens) that have been accidentally committed to your repository.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>Enable Branch Protection:</strong> Require PR reviews and status checks before merging.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>Use Secrets Management:</strong> Store sensitive data in GitHub Secrets, never in code.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>Enable 2FA:</strong> Protect your account with two-factor authentication.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>Review Permissions:</strong> Regularly audit who has access to your repositories.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">GitHub CLI Playground</h2>
                        <p className="mb-4 text-muted">Practice GitHub CLI commands in this simulated environment.</p>
                        <MockTerminal
                            initialOutput={[
                                "Welcome to the GitHub CLI Interactive Shell",
                                "Try commands like 'gh pr list', 'gh issue list', or 'gh repo view'"
                            ]}
                            commands={{
                                'gh pr list': {
                                    desc: 'List pull requests in this repository',
                                    output: 'Showing 3 of 3 open pull requests in owner/repo\n\n#1  Feature: Add login page     feature-login\n#2  Fix: Resolve layout bug     fix-layout\n#3  Docs: Update README         docs-update'
                                },
                                'gh pr create': {
                                    desc: 'Create a pull request',
                                    output: 'Creating pull request for feature-branch into main in owner/repo\n\n? Title My new feature\n? Body Description of the feature\n? What\'s next? Submit\n\nhttps://github.com/owner/repo/pull/4'
                                },
                                'gh issue list': {
                                    desc: 'List issues in this repository',
                                    output: 'Showing 2 of 2 open issues in owner/repo\n\n#10  Bug: App crashes on startup     bug, high-priority\n#11  Feature: Dark mode support      enhancement'
                                },
                                'gh repo view': {
                                    desc: 'View the current repository',
                                    output: 'owner/repo\nDescription: My awesome project\nPrimary language: JavaScript\n\nREADME.md\n...'
                                },
                                'gh workflow run test.yml': {
                                    desc: 'Run a GitHub Actions workflow',
                                    output: '✓ Created workflow run for test.yml'
                                },
                                'help': {
                                    desc: 'Show help',
                                    output: 'Available commands: gh pr list, gh pr create, gh issue list, gh repo view, gh workflow run test.yml'
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
                                            ? "Excellent! You're a GitHub pro!"
                                            : "Good try! Review the concepts and try again."}
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
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
        </div>
    );
};

// Helper components
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

// Missing imports
import { Clock, AlertCircle, Search } from 'lucide-react';
