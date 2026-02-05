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
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Real startup-like loading
      await new Promise(res => setTimeout(res, 1200));
      setIsLoading(false);
    };

    initApp();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center z-[100] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Loader Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo */}
{/* Logo */}
<div className="relative mb-12 flex items-center justify-center">
  {/* Soft ambient glow */}
  <div className="absolute w-40 h-40 bg-indigo-500/20 blur-[80px] rounded-full"></div>

  {/* Floating naked logo */}
  <img
    src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
    alt="Internadda Logo"
    className="relative w-24 h-24 object-contain animate-logo-float drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
  />
</div>

          {/* Brand Text */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient">
              INTERNADDA
            </span>
          </h1>

          <p className="text-slate-300 text-sm font-medium tracking-wider uppercase mb-8">
            Building India’s Most Trusted Internship Network
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500 rounded-full animate-progress-bar"></div>
          </div>

          {/* Trust Stats */}
          <div className="flex gap-10 text-slate-300 text-xs mb-6">
            <div>
              <div className="text-xl font-bold text-white">85+</div>
              <div>Hiring Partners</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">7,000+</div>
              <div>Verified Students</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">98%</div>
              <div>Success Rate</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 tracking-wide">
            🔐 Secured Platform · AI Verified Profiles · All Systems Operational 🚀
          </div>
        </div>

        <style>{`
          @keyframes gradient {
            0%,100% {background-position:0% 50%}
            50% {background-position:100% 50%}
          }
          @keyframes progress-bar {
            0% {width:0%;transform:translateX(-100%)}
            50% {width:100%;transform:translateX(0)}
            100% {width:0%;transform:translateX(100%)}
          }
          @keyframes spin-slow {
            0% {transform:rotate(0deg)}
            100% {transform:rotate(360deg)}
          }
          @keyframes pulse-slow {
            0%,100% {transform:scale(1);opacity:1}
            50% {transform:scale(1.05);opacity:.9}
          }
          .animate-gradient {animation:gradient 3s ease infinite;background-size:200% 100%}
          .animate-progress-bar {animation:progress-bar 3s ease-in-out infinite}
          .animate-spin-slow {animation:spin-slow 14s linear infinite}
          .animate-pulse-slow {animation:pulse-slow 2.4s ease-in-out infinite}
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
