import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { Card } from '../components/Card';
import { MockTerminal } from '../components/MockTerminal';
import { Ship, Box, Layers, Network, Lock, Database, Activity, Server, ArrowRight, CheckCircle } from 'lucide-react';

export const Kubernetes = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('concepts');
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    const deploymentYaml = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
`;

    const serviceYaml = `
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  type: LoadBalancer
`;

    const quizQuestions = [
        {
            question: "What is the smallest deployable unit in Kubernetes?",
            options: [
                "Container",
                "Pod",
                "Node",
                "Service"
            ],
            correct: 1
        },
        {
            question: "Which component ensures a specified number of pod replicas are running?",
            options: [
                "Kubelet",
                "ReplicaSet (managed by Deployment)",
                "Scheduler",
                "Etcd"
            ],
            correct: 1
        },
        {
            question: "How do you expose an application running on a set of Pods?",
            options: [
                "Using a Service",
                "Using a Volume",
                "Using a ConfigMap",
                "Using a Secret"
            ],
            correct: 0
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
                    Kubernetes <span className="gradient-text">Orchestration</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    Scale, manage, and automate your containerized applications with the industry standard orchestrator.
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['concepts', 'workloads', 'networking', 'config', 'interactive'].map((tab) => (
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
                            <Ship className="text-accent" />
                            Core Concepts
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card title="Pod" icon={Box}>
                                The smallest deployable unit. A Pod represents a single instance of a running process in your cluster. It can contain one or more containers.
                            </Card>
                            <Card title="Node" icon={Server}>
                                A worker machine in Kubernetes. A node may be a VM or physical machine, depending on the cluster. Each node is managed by the Control Plane.
                            </Card>
                            <Card title="Cluster" icon={Activity}>
                                A set of node machines for running containerized applications. If you're running Kubernetes, you're running a cluster.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">The Control Plane</h2>
                        <div className="bg-card p-8 rounded-xl border border-border relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Ship size={200} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-lg"><Activity size={20} className="text-blue-400" /></div>
                                        <div>
                                            <strong className="text-lg">API Server</strong>
                                            <p className="text-sm text-muted">The front end for the Kubernetes control plane. It exposes the Kubernetes API.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-lg"><Database size={20} className="text-blue-400" /></div>
                                        <div>
                                            <strong className="text-lg">etcd</strong>
                                            <p className="text-sm text-muted">Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-lg"><Layers size={20} className="text-blue-400" /></div>
                                        <div>
                                            <strong className="text-lg">Scheduler</strong>
                                            <p className="text-sm text-muted">Watches for newly created Pods with no assigned node, and selects a node for them to run on.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-lg"><Settings size={20} className="text-blue-400" /></div>
                                        <div>
                                            <strong className="text-lg">Controller Manager</strong>
                                            <p className="text-sm text-muted">Runs controller processes (Node controller, Job controller, EndpointSlice controller, etc.).</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'workloads' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Layers className="text-accent" />
                            Workload Resources
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Deployments</h3>
                                <p className="mb-4 text-muted">
                                    A Deployment provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Rolling Updates</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Rollbacks</div>
                                    <div className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-400" /> Scaling</div>
                                </div>
                            </div>
                            <CodeBlock title="deployment.yaml" language="yaml" code={deploymentYaml} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Other Controllers</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="StatefulSet" icon={Database}>
                                Manages the deployment and scaling of a set of Pods, and provides guarantees about the ordering and uniqueness of these Pods. Ideal for databases.
                            </Card>
                            <Card title="DaemonSet" icon={Server}>
                                Ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. Useful for log collectors or monitoring agents.
                            </Card>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'networking' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Network className="text-accent" />
                            Services & Networking
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <CodeBlock title="service.yaml" language="yaml" code={serviceYaml} />
                            <div>
                                <h3 className="text-xl font-bold mb-4">Service Types</h3>
                                <div className="space-y-4">
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">ClusterIP</h4>
                                        <p className="text-sm text-muted">Exposes the Service on a cluster-internal IP. Choosing this value makes the Service only reachable from within the cluster. (Default)</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">NodePort</h4>
                                        <p className="text-sm text-muted">Exposes the Service on each Node's IP at a static port. You can contact the NodePort Service, from outside the cluster, by requesting <code>NodeIP:NodePort</code>.</p>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg border border-border">
                                        <h4 className="font-bold text-accent mb-1">LoadBalancer</h4>
                                        <p className="text-sm text-muted">Exposes the Service externally using a cloud provider's load balancer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'config' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Lock className="text-accent" />
                            Configuration & Storage
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title="ConfigMaps" icon={FileText}>
                                API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.
                            </Card>
                            <Card title="Secrets" icon={Lock}>
                                Object that contains a small amount of sensitive data such as a password, a token, or a key. Using a Secret means you don't need to include confidential data in your application code.
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Persistent Storage</h2>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex-1 text-center p-4 border rounded-lg">
                                    <h4 className="font-bold mb-2">PersistentVolume (PV)</h4>
                                    <p className="text-sm text-muted">A piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes.</p>
                                </div>
                                <ArrowRight className="hidden md:block text-muted" />
                                <div className="flex-1 text-center p-4 border rounded-lg">
                                    <h4 className="font-bold mb-2">PersistentVolumeClaim (PVC)</h4>
                                    <p className="text-sm text-muted">A request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'interactive' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">kubectl Playground</h2>
                        <p className="mb-4 text-muted">Practice your kubectl commands in this simulated environment.</p>
                        <MockTerminal
                            initialOutput={[
                                "Welcome to the Kubernetes Interactive Shell",
                                "Try commands like 'kubectl get pods', 'kubectl get nodes', or 'kubectl cluster-info'"
                            ]}
                            commands={{
                                'kubectl get pods': {
                                    desc: 'List all pods in the current namespace',
                                    output: 'NAME                     READY   STATUS    RESTARTS   AGE\nnginx-6799fc88d8-abcde   1/1     Running   0          5m\napi-server-1234567890    1/1     Running   0          2d'
                                },
                                'kubectl get services': {
                                    desc: 'List all services',
                                    output: 'NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE\nkubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   10d\nnginx        NodePort    10.100.200.50   <none>        80:30080/TCP 5m'
                                },
                                'kubectl describe pod nginx': {
                                    desc: 'Show detailed information about a specific pod',
                                    output: 'Name:         nginx-6799fc88d8-abcde\nNamespace:    default\nPriority:     0\nNode:         minikube/192.168.49.2\nStart Time:   Mon, 01 Jan 2024 10:00:00 GMT\nLabels:       app=nginx\nStatus:       Running\nIP:           10.244.0.5\n...'
                                },
                                'kubectl apply -f deployment.yaml': {
                                    desc: 'Apply a configuration to a resource',
                                    output: 'deployment.apps/nginx-deployment created'
                                },
                                'kubectl logs nginx': {
                                    desc: 'Print the logs for a container in a pod',
                                    output: '192.168.1.1 - - [01/Jan/2024:10:00:00 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0"\n192.168.1.1 - - [01/Jan/2024:10:00:05 +0000] "GET /favicon.ico HTTP/1.1" 404 555 "-" "Mozilla/5.0"'
                                },
                                'help': {
                                    desc: 'Show help',
                                    output: 'Available commands: kubectl get pods, kubectl get services, kubectl describe pod nginx, kubectl apply -f deployment.yaml, kubectl logs nginx'
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
                                            ? "Excellent! You're ready to orchestrate!"
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
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
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
import { Settings, FileText } from 'lucide-react';
