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
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center z-[100] overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main loader */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with animation */}
          <div className="relative mb-8">
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl animate-pulse-slow overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-inner shadow-black/20">
                  <img 
                    src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                    alt="Internadda Logo"
                    className="w-20 h-20 object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.outerHTML = `
                        <div class="w-20 h-20 flex items-center justify-center">
                          <span class="text-white font-bold text-2xl">IA</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Rotating ring */}
            <div className="absolute -inset-8 border-[3px] border-transparent border-t-indigo-500 border-r-blue-500 rounded-full animate-spin-slow"></div>
          </div>

          {/* Text */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              INTERNADDA
            </span>
          </h1>
          <p className="text-slate-300 text-sm font-medium tracking-wider uppercase mb-10">
            Launching Career Excellence
          </p>

          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500 rounded-full animate-progress-bar"></div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-white/60 text-xs">
            <div className="text-center">
              <div className="text-lg font-bold text-white">30+</div>
              <div>Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">7000+</div>
              <div>Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">98%</div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes progress-bar {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 100%; transform: translateX(0%); }
            100% { width: 0%; transform: translateX(100%); }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
            background-size: 200% 100%;
          }
          .animate-progress-bar {
            animation: progress-bar 2s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
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
            
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            
            <Route path="/tests" element={<Tests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/courses" element={<div className="max-w-7xl mx-auto px-4 py-20"><h1 className="text-3xl font-bold">Courses - Coming Soon</h1></div>} />
            <Route path="/jobs" element={<div className="max-w-7xl mx-auto px-4 py-20"><h1 className="text-3xl font-bold">Jobs - Coming Soon</h1></div>} />
            <Route path="/resources" element={<div className="max-w-7xl mx-auto px-4 py-20"><h1 className="text-3xl font-bold">Resources - Coming Soon</h1></div>} />
            
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
