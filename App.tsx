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
import { UserProfile } from './types';

const AdminPanel = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <h1 className="text-2xl font-bold">Admin Dashboard - Access Granted</h1>
  </div>
);

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
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Replace the loading section in App.tsx with:

if (isLoading) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Logo with pulsing animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl mx-auto animate-pulse-slow">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-inner">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                IA
              </div>
            </div>
          </div>
          {/* Multiple animated rings */}
          <div className="absolute -inset-8 border-4 border-white/20 rounded-[3rem] animate-ping-slow"></div>
          <div className="absolute -inset-12 border-4 border-white/10 rounded-[4rem] animate-ping-slower"></div>
        </div>
        
        {/* Text with gradient animation */}
        <h1 className="text-5xl font-black tracking-widest mb-4">
          <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent animate-gradient">
            INTERNADDA
          </span>
        </h1>
        
        <p className="text-white/80 text-sm font-medium mb-8 animate-pulse">
          Launching Your Career Journey...
        </p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-white to-blue-400 animate-loading-bar rounded-full"></div>
        </div>
        
        {/* Stats counter */}
        <div className="mt-8 flex justify-center gap-8 text-white/70 text-xs">
          <div className="text-center">
            <div className="text-lg font-bold text-white">50+</div>
            <div>Companies</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">1000+</div>
            <div>Interns Placed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">95%</div>
            <div>Success Rate</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0; }
        }
        @keyframes ping-slower {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
          background-size: 200% 100%;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] animate-in zoom-in-95 duration-700">
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
            
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
            
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
