
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import InternshipDetail from './pages/InternshipDetail';
import TestEngine from './pages/TestEngine';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Mock persistence for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage mode="login" setUser={setUser} />} />
            <Route path="/signup" element={<AuthPage mode="signup" setUser={setUser} />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user?.email === 'admin@internadda.com' ? <AdminPanel /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
