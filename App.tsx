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
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[100] overflow-hidden">

      {/* Soft moving gradients */}
      <div className="absolute w-[600px] h-[600px] bg-blue-200/40 blur-[160px] rounded-full -top-40 -left-40 animate-float1" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-200/40 blur-[160px] rounded-full bottom-[-200px] right-[-200px] animate-float2" />

      {/* Center Logo Container */}
      <div className="relative flex items-center justify-center">
        {/* Glow Ring */}
        <div className="absolute w-44 h-44 border-4 border-blue-300/40 rounded-full animate-spin-slow"></div>
        <div className="absolute w-32 h-32 border-2 border-indigo-300/40 rounded-full animate-spin-reverse"></div>

        {/* Logo */}
        <img
          src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
          alt="Internadda Logo"
          className="relative w-28 h-28 object-contain animate-logo-float drop-shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
        />
      </div>

      <style>{`
        @keyframes float1 {
          0% { transform:translate(0,0); }
          50% { transform:translate(40px,30px); }
          100% { transform:translate(0,0); }
        }

        @keyframes float2 {
          0% { transform:translate(0,0); }
          50% { transform:translate(-40px,-30px); }
          100% { transform:translate(0,0); }
        }

        @keyframes logoFloat {
          0% { transform:translateY(0px) scale(0.95); }
          50% { transform:translateY(-10px) scale(1); }
          100% { transform:translateY(0px) scale(0.95); }
        }

        @keyframes spinSlow {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform:rotate(360deg); }
          to { transform:rotate(0deg); }
        }

        .animate-float1 { animation: float1 10s ease-in-out infinite; }
        .animate-float2 { animation: float2 12s ease-in-out infinite; }

        .animate-logo-float {
          animation: logoFloat 2.8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 9s linear infinite;
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
