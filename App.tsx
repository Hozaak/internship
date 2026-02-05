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
      await new Promise(res => setTimeout(res, 1800));
      setIsLoading(false);
    };
    initApp();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-indigo-900 flex items-center justify-center z-[100] overflow-hidden">

        {/* Ambient Lights */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

        {/* Cinematic Loader */}
        <div className="relative z-10 flex flex-col items-center text-center">

          {/* LOGO FIRST */}
          <div className="relative mb-10 animate-logo-reveal">
            <div className="absolute w-44 h-44 bg-indigo-500/30 blur-[90px] rounded-full"></div>
            <img
              src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
              alt="Internadda Logo"
              className="relative w-28 h-28 object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* BRAND */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 opacity-0 animate-text-reveal">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient">
              INTERNADDA
            </span>
          </h1>

          {/* TAGLINE */}
          <p className="text-slate-300 text-sm font-medium tracking-widest uppercase mb-8 opacity-0 animate-tagline-reveal">
            Building India’s Most Trusted Internship Network
          </p>

          {/* PROGRESS */}
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6 opacity-0 animate-bar-reveal">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500 animate-progress-bar"></div>
          </div>

          {/* STATS */}
          <div className="flex gap-10 text-slate-300 text-xs mb-6 opacity-0 animate-stats-reveal">
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

          <div className="text-[11px] text-slate-500 tracking-wide opacity-0 animate-footer-reveal">
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
          @keyframes logoReveal {
            0% { opacity:0; transform:scale(0.6); }
            100% { opacity:1; transform:scale(1); }
          }
          @keyframes textReveal {
            0% { opacity:0; transform:translateY(12px); }
            100% { opacity:1; transform:translateY(0); }
          }

          .animate-gradient {animation:gradient 3s ease infinite;background-size:200% 100%}
          .animate-progress-bar {animation:progress-bar 3s ease-in-out infinite}

          .animate-logo-reveal {
            animation:logoReveal 0.9s ease-out forwards;
          }
          .animate-text-reveal {
            animation:textReveal 0.8s ease-out forwards;
            animation-delay:0.6s;
          }
          .animate-tagline-reveal {
            animation:textReveal 0.8s ease-out forwards;
            animation-delay:1s;
          }
          .animate-bar-reveal {
            animation:textReveal 0.8s ease-out forwards;
            animation-delay:1.4s;
          }
          .animate-stats-reveal {
            animation:textReveal 0.8s ease-out forwards;
            animation-delay:1.8s;
          }
          .animate-footer-reveal {
            animation:textReveal 0.8s ease-out forwards;
            animation-delay:2.2s;
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
