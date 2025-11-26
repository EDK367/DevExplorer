import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Microservices } from './pages/Microservices';
import { SpringBoot } from './pages/SpringBoot';
import { Docker } from './pages/Docker';
import { Kubernetes } from './pages/Kubernetes';
import { SQL } from './pages/SQL';
import { NoSQL } from './pages/NoSQL';
import { Databases } from './pages/Databases';
import { Fedora } from './pages/Fedora';
import { Git } from './pages/Git';
import { GitHub } from './pages/GitHub';

import { Java } from './pages/Java';

const Home = () => (
  <div className="home-container">
    <h1 className="text-5xl font-bold mb-6">Welcome to <span className="gradient-text">DevExplorer</span></h1>
    <p className="text-xl text-muted mb-8">
      Your interactive journey into the world of modern software engineering.
    </p>
    <div className="features-grid">
      <div className="feature-card">
        <h3>Microservices</h3>
        <p>Decouple your architecture.</p>
      </div>
      <div className="feature-card">
        <h3>Docker</h3>
        <p>Containerize everything.</p>
      </div>
      <div className="feature-card">
        <h3>Kubernetes</h3>
        <p>Orchestrate at scale.</p>
      </div>
      <div className="feature-card">
        <h3>Modern Data</h3>
        <p>SQL & NoSQL paradigms.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="microservices" element={<Microservices />} />
        <Route path="java" element={<Java />} />
        <Route path="spring-boot" element={<SpringBoot />} />
        <Route path="docker" element={<Docker />} />
        <Route path="kubernetes" element={<Kubernetes />} />
        <Route path="git" element={<Git />} />
        <Route path="github" element={<GitHub />} />
        <Route path="sql" element={<SQL />} />
        <Route path="nosql" element={<NoSQL />} />
        <Route path="databases" element={<Databases />} />
        <Route path="fedora" element={<Fedora />} />
      </Route>
    </Routes>
  );
}

export default App;
