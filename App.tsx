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
import Tests from './pages/Tests';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(JSON.parse(savedUser));
      await new Promise(res => setTimeout(res, 1400));
      setIsLoading(false);
    };
    initApp();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100] overflow-hidden">

        {/* Ambient depth */}
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[140px] rounded-full top-[-250px] left-[-250px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-220px] right-[-220px]" />

        {/* Iconic Logo Moment */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="absolute w-44 h-44 bg-indigo-500/35 blur-[90px] rounded-full"></div>

          <img
            src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
            alt="Internadda Logo"
            className="relative w-28 h-28 object-contain animate-logo-iconic drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)]"
          />
        </div>

        <style>{`
          @keyframes logoIconic {
            0%   { opacity:0; transform:scale(0.7) translateY(12px); }
            60%  { opacity:1; transform:scale(1.05) translateY(0); }
            100% { opacity:1; transform:scale(1); }
          }

          .animate-logo-iconic {
            animation: logoIconic 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}</style>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage mode="login" setUser={setUser} />} />
            <Route path="/signup" element={<AuthPage mode="signup" setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
