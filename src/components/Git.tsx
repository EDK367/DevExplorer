'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Terminal as TerminalIcon, History, CheckCircle, XCircle } from 'lucide-react';

export const Git = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('basics');
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    interface QuizQuestion {
        question: string;
        options: string[];
        correct: number;
    }


    const basicCommands = `
# Initialize a repository
git init

# Clone a repository
git clone https://github.com/user/repo.git

# Check status
git status

# Add files to staging
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main
`;

    const branchingExample = `
# Create a new branch
git branch feature/new-feature

# Switch to the branch
git checkout feature/new-feature
# Or use the shorthand
git checkout -b feature/new-feature

# List all branches
git branch -a

# Merge a branch
git checkout main
git merge feature/new-feature

# Delete a branch
git branch -d feature/new-feature
`;

    const advancedCommands = `
# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Cherry-pick a specific commit
git cherry-pick abc123

# Find which commit introduced a bug
git bisect start
git bisect bad
git bisect good abc123

# View reflog (history of HEAD)
git reflog

# Stash changes
git stash
git stash pop
`;

    const quizQuestions = [
        {
            question: t('git.quiz.questions.0.question'),
            options: [
                t('git.quiz.questions.0.options.0'),
                t('git.quiz.questions.0.options.1'),
                t('git.quiz.questions.0.options.2'),
                t('git.quiz.questions.0.options.3')
            ],
            correct: 1
        },
        {
            question: t('git.quiz.questions.1.question'),
            options: [
                t('git.quiz.questions.1.options.0'),
                t('git.quiz.questions.1.options.1'),
                t('git.quiz.questions.1.options.2'),
                t('git.quiz.questions.1.options.3')
            ],
            correct: 2
        },
        {
            question: t('git.quiz.questions.2.question'),
            options: [
                t('git.quiz.questions.2.options.0'),
                t('git.quiz.questions.2.options.1'),
                t('git.quiz.questions.2.options.2'),
                t('git.quiz.questions.2.options.3')
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
                    {t('git.title')} <span className="gradient-text">{t('git.subtitle')}</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    {t('git.description')}
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['basics', 'branching', 'advanced', 'workflows', 'interactive'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === tab
                            ? 'bg-accent text-white shadow-lg scale-105'
                            : 'bg-card hover:bg-accent/10'
                            }`}
                    >
                        {t(`git.tabs.${tab}`)}
                    </button>
                ))}
            </div>

            {activeTab === 'basics' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GitCommit className="text-accent" />
                            {t('git.tabs.basics')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title={t('git.sections.repository')} icon={Database}>
                                {t('git.sections.repositoryDesc')}
                            </Card>
                            <Card title={t('git.sections.commit')} icon={GitCommit}>
                                {t('git.sections.commitDesc')}
                            </Card>
                            <Card title={t('git.sections.branch')} icon={GitBranch}>
                                {t('git.sections.branchDesc')}
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">The Three States</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText size={40} className="text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Working Directory</h3>
                                    <p className="text-muted text-sm">{t('git.title-card.working-directory')}</p>
                                </div>
                                <ArrowRight className="hidden md:block text-muted" />
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Box size={40} className="text-yellow-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Staging Area</h3>
                                    <p className="text-muted text-sm">{t('git.title-card.staging-area')}</p>
                                </div>
                                <ArrowRight className="hidden md:block text-muted" />
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Database size={40} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Repository</h3>
                                    <p className="text-muted text-sm">{t('git.title-card.repository')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Essential Commands</h2>
                        <CodeBlock title="basic-git.sh" language="bash" code={basicCommands} />
                    </section>
                </div>
            )}

            {activeTab === 'branching' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GitBranch className="text-accent" />
                            {t('git.title-card.branching')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Why Branch?</h3>
                                <p className="mb-4 text-muted">
                                    Branching allows you to diverge from the main line of development and continue to work without messing with that main line. It's essential for:
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-400 mt-1" /> Feature development</li>
                                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-400 mt-1" /> Bug fixes</li>
                                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-400 mt-1" /> Experimentation</li>
                                    <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-400 mt-1" /> Parallel development</li>
                                </ul>
                            </div>
                            <CodeBlock title="branching.sh" language="bash" code={branchingExample} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GitMerge className="text-accent" />
                            {t('git.title-card.merge-strategies')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="Fast-Forward Merge" icon={ArrowRight}>
                                When there's a direct path from the current branch tip to the target branch, Git simply moves the pointer forward. No merge commit is created.
                            </Card>
                            <Card title="Three-Way Merge" icon={GitMerge}>
                                When branches have diverged, Git creates a new merge commit that combines the changes from both branches. This preserves the history of both branches.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'advanced' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <History className="text-accent" />
                            {t('git.title-card.advanced-techniques')}
                        </h2>
                        <CodeBlock title="advanced-git.sh" language="bash" code={advancedCommands} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Powerful Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="Rebase" icon={GitBranch}>
                                Reapply commits on top of another base tip. Creates a linear history but rewrites commit hashes. Never rebase public commits!
                            </Card>
                            <Card title="Cherry-Pick" icon={GitCommit}>
                                Apply a specific commit from one branch to another. Useful for selectively applying bug fixes or features.
                            </Card>
                            <Card title="Bisect" icon={Search}>
                                Binary search through commit history to find which commit introduced a bug. Extremely powerful for debugging.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'workflows' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Common Workflows</h2>
                        <div className="space-y-8">
                            <div className="bg-card p-6 rounded-xl border border-border">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <GitBranch className="text-accent" />
                                    {t('git.title-card.feature-branch-workflow')}
                                </h3>
                                <p className="mb-4 text-muted">{t('git.title-card.feature-branch-workflow-description')}</p>
                                <ol className="list-decimal list-inside space-y-2 text-sm">
                                    <li>{t('git.title-card.feature-branch-workflow-create-branch')}</li>
                                    <li>{t('git.title-card.feature-branch-workflow-make-commits')}</li>
                                    <li>{t('git.title-card.feature-branch-workflow-push-branch')}</li>
                                    <li>{t('git.title-card.feature-branch-workflow-open-pull-request')}</li>
                                    <li>{t('git.title-card.feature-branch-workflow-merge-after-code-review')}</li>
                                </ol>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <GitMerge className="text-accent" />
                                    {t('git.title-card.gitflow-workflow')}
                                </h3>
                                <p className="mb-4 text-muted">{t('git.title-card.gitflow-workflow-description')}</p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Main Branches:</strong>
                                        <ul className="list-disc list-inside mt-2">
                                            <li>{t('git.title-card.gitflow-workflow-main-branches-main')}</li>
                                            <li>{t('git.title-card.gitflow-workflow-main-branches-develop')}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Supporting Branches:</strong>
                                        <ul className="list-disc list-inside mt-2">
                                            <li>{t('git.title-card.gitflow-workflow-supporting-branches-feature')}</li>
                                            <li>{t('git.title-card.gitflow-workflow-supporting-branches-release')}</li>
                                            <li>{t('git.title-card.gitflow-workflow-supporting-branches-hotfix')}</li>
                                        </ul>
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
                        <h2 className="text-3xl font-bold mb-6">{t('git.sections.gitCommandPlayground')}</h2>
                        <p className="mb-4 text-muted">{t('git.sections.gitCommandPlayground')}</p>
                        <MockTerminal
                            initialOutput={[
                                t('git.terminal.welcome'),
                                t('git.terminal.hint')
                            ]}
                            commands={{
                                'git init': {
                                    desc: 'Initialize a new Git repository',
                                    output: 'Initialized empty Git repository in /home/user/project/.git/'
                                },
                                'git status': {
                                    desc: 'Show the working tree status',
                                    output: 'On branch main\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n    README.md\n\nnothing added to commit but untracked files present'
                                },
                                'git add .': {
                                    desc: 'Add file contents to the index',
                                    output: ''
                                },
                                'git commit -m "Initial commit"': {
                                    desc: 'Record changes to the repository',
                                    output: '[main (root-commit) 1a2b3c4] Initial commit\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md'
                                },
                                'git log': {
                                    desc: 'Show commit logs',
                                    output: 'commit 1a2b3c4d5e6f7g8h9i0j\nAuthor: User <user@example.com>\nDate:   Mon Jan 1 12:00:00 2024 +0000\n\n    Initial commit'
                                },
                                'git branch': {
                                    desc: 'List, create, or delete branches',
                                    output: '* main'
                                },
                                'help': {
                                    desc: 'Show help',
                                    output: 'Available commands: git init, git status, git add ., git commit -m "Initial commit", git log, git branch'
                                }
                            }}
                        />
                    </section>

                    <section className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">{t('git.quiz.knowledgeCheck')}</h2>
                        <div className="bg-card p-8 rounded-xl border border-border">
                            {!showQuizResult ? (
                                <QuizComponent questions={quizQuestions} onSubmit={handleQuizSubmit} t={t} />
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl mb-4">{quizScore === quizQuestions.length ? '🏆' : '📝'}</div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        {t('git.quiz.score', { score: quizScore, total: quizQuestions.length })}
                                    </h3>
                                    <p className="text-muted mb-6">
                                        {quizScore === quizQuestions.length
                                            ? t('git.quiz.perfect')
                                            : t('git.quiz.goodEffort')}
                                    </p>
                                    <button
                                        onClick={() => setShowQuizResult(false)}
                                        className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90"
                                    >
                                        {t('git.quiz.tryAgain')}
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
                {t('git.quiz.submitAnswers')}
            </button>
        </div>
    );
};

// Missing imports
import { Database, FileText, Box, ArrowRight, Search } from 'lucide-react';
