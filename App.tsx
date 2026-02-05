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

      {/* Deep ambient background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* ICONIC LOGO ONLY */}
      <div className="relative flex items-center justify-center">
        {/* Soft pulse glow */}
        <div className="absolute w-40 h-40 bg-indigo-500/30 blur-[100px] rounded-full animate-glow-pulse"></div>

        {/* Logo */}
        <img
          src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
          alt="Internadda Logo"
          className="relative w-28 h-28 object-contain animate-logo-iconic drop-shadow-[0_30px_55px_rgba(0,0,0,0.8)]"
        />
      </div>

      <style>{`
        @keyframes logoIconic {
          0%   { opacity:0; transform:scale(0.6) rotate(-6deg); }
          60%  { opacity:1; transform:scale(1.08) rotate(1deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }

        @keyframes glowPulse {
          0%,100% { opacity:0.6; transform:scale(1); }
          50%     { opacity:1; transform:scale(1.15); }
        }

        .animate-logo-iconic {
          animation: logoIconic 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-glow-pulse {
          animation: glowPulse 2.5s ease-in-out infinite;
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
