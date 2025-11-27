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

    interface QuizQuestion {
        question: string;
        options: string[];
        correct: number;
    }


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
            question: t('github.quiz.questions.0.question'),
            options: [
                t('github.quiz.questions.0.options.0'),
                t('github.quiz.questions.0.options.1'),
                t('github.quiz.questions.0.options.2'),
                t('github.quiz.questions.0.options.3')
            ],
            correct: 1
        },
        {
            question: t('github.quiz.questions.1.question'),
            options: [
                t('github.quiz.questions.1.options.0'),
                t('github.quiz.questions.1.options.1'),
                t('github.quiz.questions.1.options.2'),
                t('github.quiz.questions.1.options.3')
            ],
            correct: 1
        },
        {
            question: t('github.quiz.questions.2.question'),
            options: [
                t('github.quiz.questions.2.options.0'),
                t('github.quiz.questions.2.options.1'),
                t('github.quiz.questions.2.options.2'),
                t('github.quiz.questions.2.options.3')
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
                    {t('github.title')} <span className="gradient-text">{t('github.collaboration')}</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    {t('github.description')}
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
                        {t(`github.tabs.${tab}`)}
                    </button>
                ))}
            </div>

            {activeTab === 'prs' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GitPullRequest className="text-accent" />
                            {t('github.sections.pullRequests.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('github.sections.pullRequests.prWorkflowTitle')}</h3>
                                <p className="mb-4 text-muted">
                                    {t('github.sections.pullRequests.prWorkflowDescription')}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.forkClone')}</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.createFeatureBranch')}</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.makeChangesCommit')}</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.pushOpenPR')}</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.codeReview')}</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> {t('github.sections.pullRequests.workflowSteps.merge')}</div>
                                </div>
                            </div>
                            <CodeBlock title="pr-workflow.sh" language="bash" code={prWorkflow} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t('github.sections.codeReviewBestPractices.title')}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title={t('github.sections.codeReviewBestPractices.constructive.title')} icon={Users}>
                                {t('github.sections.codeReviewBestPractices.constructive.description')}
                            </Card>
                            <Card title={t('github.sections.codeReviewBestPractices.promptly.title')} icon={Clock}>
                                {t('github.sections.codeReviewBestPractices.promptly.description')}
                            </Card>
                            <Card title={t('github.sections.codeReviewBestPractices.thoroughly.title')} icon={CheckCircle}>
                                {t('github.sections.codeReviewBestPractices.thoroughly.description')}
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
                            {t('github.sections.githubActions.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <CodeBlock title=".github/workflows/ci.yml" language="yaml" code={actionsExample} />
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('github.sections.githubActions.whatAreActionsTitle')}</h3>
                                <p className="mb-4 text-muted">
                                    {t('github.sections.githubActions.whatAreActionsDescription')}
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">{t('github.sections.githubActions.workflows.title')}</h4>
                                        <p className="text-sm text-muted">{t('github.sections.githubActions.workflows.description')}</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">{t('github.sections.githubActions.jobs.title')}</h4>
                                        <p className="text-sm text-muted">{t('github.sections.githubActions.jobs.description')}</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">{t('github.sections.githubActions.actions.title')}</h4>
                                        <p className="text-sm text-muted">{t('github.sections.githubActions.actions.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t('github.sections.commonUseCases.title')}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title={t('github.sections.commonUseCases.ci.title')} icon={Zap}>
                                {t('github.sections.commonUseCases.ci.description')}
                            </Card>
                            <Card title={t('github.sections.commonUseCases.cd.title')} icon={Package}>
                                {t('github.sections.commonUseCases.cd.description')}
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
                            {t('github.sections.issuesAndProjectManagement.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('github.sections.issuesAndProjectManagement.githubIssuesTitle')}</h3>
                                <p className="mb-4 text-muted">
                                    {t('github.sections.issuesAndProjectManagement.githubIssuesDescription')}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>{t('github.sections.issuesAndProjectManagement.labels.title')}:</strong> {t('github.sections.issuesAndProjectManagement.labels.description')}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>{t('github.sections.issuesAndProjectManagement.milestones.title')}:</strong> {t('github.sections.issuesAndProjectManagement.milestones.description')}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={16} className="text-green-400 mt-1" />
                                        <div>
                                            <strong>{t('github.sections.issuesAndProjectManagement.assignees.title')}:</strong> {t('github.sections.issuesAndProjectManagement.assignees.description')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('github.sections.issuesAndProjectManagement.githubProjectsTitle')}</h3>
                                <p className="mb-4 text-muted">
                                    {t('github.sections.issuesAndProjectManagement.githubProjectsDescription')}
                                </p>
                                <div className="bg-card p-6 rounded-lg border border-border">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl mb-2">📋</div>
                                            <strong className="text-sm">{t('github.sections.issuesAndProjectManagement.projectStatuses.todo')}</strong>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-2">🚧</div>
                                            <strong className="text-sm">{t('github.sections.issuesAndProjectManagement.projectStatuses.inProgress')}</strong>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-2">✅</div>
                                            <strong className="text-sm">{t('github.sections.issuesAndProjectManagement.projectStatuses.done')}</strong>
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
                            {t('github.sections.securityFeatures.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title={t('github.sections.securityFeatures.dependabot.title')} icon={Package}>
                                {t('github.sections.securityFeatures.dependabot.description')}
                            </Card>
                            <Card title={t('github.sections.securityFeatures.codeScanning.title')} icon={Search}>
                                {t('github.sections.securityFeatures.codeScanning.description')}
                            </Card>
                            <Card title={t('github.sections.securityFeatures.secretScanning.title')} icon={Shield}>
                                {t('github.sections.securityFeatures.secretScanning.description')}
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t('github.sections.securityBestPractices.title')}</h2>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>{t('github.sections.securityBestPractices.branchProtection.title')}:</strong> {t('github.sections.securityBestPractices.branchProtection.description')}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>{t('github.sections.securityBestPractices.secretsManagement.title')}:</strong> {t('github.sections.securityBestPractices.secretsManagement.description')}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>{t('github.sections.securityBestPractices.twoFactorAuth.title')}:</strong> {t('github.sections.securityBestPractices.twoFactorAuth.description')}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <strong>{t('github.sections.securityBestPractices.reviewPermissions.title')}:</strong> {t('github.sections.securityBestPractices.reviewPermissions.description')}
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
                        <h2 className="text-3xl font-bold mb-6">{t('github.sections.githubCLIPlayground')}</h2>
                        <p className="mb-4 text-muted">{t('github.sections.practiceGithubCLI')}</p>
                        <MockTerminal
                            initialOutput={[
                                t('github.terminal.welcome'),
                                t('github.terminal.hint')
                            ]}
                            commands={{
                                'gh pr list': {
                                    desc: 'List pull requests',
                                    output: '#123  feat: Add new feature  feature-branch  OPEN\n#122  fix: Bug fix  bugfix-branch  MERGED\n#121  docs: Update README  docs-branch  CLOSED'
                                },
                                'gh pr create': {
                                    desc: 'Create a pull request',
                                    output: 'Creating pull request for feature-branch into main in user/repo\n\nhttps://github.com/user/repo/pull/124'
                                },
                                'gh issue list': {
                                    desc: 'List issues',
                                    output: '#45  Bug: Login not working  OPEN\n#44  Feature: Add dark mode  IN_PROGRESS\n#43  Docs: API documentation  CLOSED'
                                },
                                'gh repo view': {
                                    desc: 'View repository details',
                                    output: 'user/repo\nA sample repository\n\n⭐ 1.2k stars  🍴 234 forks  📝 MIT License\n\nLast updated: 2 days ago'
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
                        <h2 className="text-3xl font-bold mb-6 text-center">{t('github.quiz.knowledgeCheck')}</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            {!showQuizResult ? (
                                <QuizComponent questions={quizQuestions} onSubmit={handleQuizSubmit} t={t} />
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl mb-4">{quizScore === quizQuestions.length ? '🏆' : '📝'}</div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        {t('github.quiz.score', { score: quizScore, total: quizQuestions.length })}
                                    </h3>
                                    <p className="text-muted mb-6">
                                        {quizScore === quizQuestions.length
                                            ? t('github.quiz.excellent')
                                            : t('github.quiz.goodTry')}
                                    </p>
                                    <button
                                        onClick={() => setShowQuizResult(false)}
                                        className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90"
                                    >
                                        {t('github.quiz.tryAgain')}
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
interface QuizComponentProps {
    questions: QuizQuestion[];
    onSubmit: (answers: number[]) => void;
    t: any;
}

const QuizComponent = ({ questions, onSubmit, t }: QuizComponentProps) => {
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
                {t('github.quiz.submitAnswers')}
            </button>
        </div>
    );
};

// Missing imports
import { Clock, AlertCircle, Search } from 'lucide-react';
