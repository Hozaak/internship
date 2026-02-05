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

// AdminPanel placeholder component if not yet defined in a separate file
const AdminPanel = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <h1 className="text-2xl font-bold">Admin Dashboard - Access Granted</h1>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Persistence check and Preloader trigger
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Professional animation duration (2.5 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // 1. Professional Preloader with Internship Shoot-in Animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-indigo-600 flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500">
        <div className="relative">
          {/* Logo Shoot-in effect */}
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
             <img 
               src="images/logo.jpg" 
               className="w-16 h-16 rounded-xl object-cover" 
               alt="Internadda Logo" 
             />
          </div>
          {/* Pulse/Radar effect */}
          <div className="absolute -inset-4 border-4 border-white/30 rounded-[2rem] animate-ping"></div>
        </div>
        
        <h2 className="mt-8 text-white font-black text-3xl tracking-widest animate-pulse">
          INTERNADDA
        </h2>
        <p className="text-indigo-100 text-sm mt-2 font-medium">Launching Your Career...</p>
        
        {/* Progress Bar Animation */}
        <div className="mt-6 w-48 h-1.5 bg-indigo-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-loading-bar"></div>
        </div>

        <style>{`
          @keyframes loading-bar {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 100%; transform: translateX(0); }
            100% { width: 0%; transform: translateX(100%); }
          }
          .animate-loading-bar {
            animation: loading-bar 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      {/* 2. Main Page Entry Animation */}
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] animate-in zoom-in-95 duration-700">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* 3. Authentication Routes */}
            <Route path="/login" element={<AuthPage mode="login" setUser={setUser} />} />
            <Route path="/signup" element={<AuthPage mode="signup" setUser={setUser} />} />
            
            {/* 4. Protected Dashboard Access */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
            
            {/* 5. Secured Admin Access */}
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
