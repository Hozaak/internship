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
import InternshipsPage from './pages/InternshipsPage';
import ApplyPage from './pages/ApplyPage';
import HiringProcess from './pages/HiringProcess';
import SuccessStories from './pages/SuccessStories';
import AboutUs from './pages/AboutUs';
import PaymentPage from './pages/PaymentPage';
import TeamPage from './pages/TeamPage';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check for saved user
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
      
      // Add a small delay for better UX
      await new Promise(res => setTimeout(res, 1200));
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center z-[9999]">
        {/* Enhanced Loading Animation */}
        <div className="relative mb-10">
          {/* Floating Logo Container */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            
            {/* Logo */}
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center shadow-2xl border border-white/30">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center animate-logo-float shadow-lg">
                <img
                  src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                  alt="Internadda Logo"
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-white font-bold text-2xl">IA</span>';
                    }
                  }}
                />
              </div>
            </div>
            
            {/* MSME Badge */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-[10px] font-bold text-white">MSME</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mb-6">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-progress"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 animate-pulse">
            Preparing Internadda...
          </h2>
          <p className="text-slate-600 max-w-sm mx-auto">
            India's Adda for Internships
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center gap-3 mt-4">
            <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
              <span className="text-xs font-semibold text-emerald-700">MSME Certified</span>
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
              <span className="text-xs font-semibold text-blue-700">7,000+ Students</span>
            </div>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2 mt-8">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-bounce"
              style={{ animationDelay: `${dot * 0.2}s` }}
            />
          ))}
        </div>

        <style>{`
          @keyframes logo-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-8px) rotate(1deg); }
          }
          
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          
          .animate-logo-float {
            animation: logo-float 3s ease-in-out infinite;
          }
          
          .animate-progress {
            animation: progress 1.2s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage mode="login" setUser={handleLogin} />} />
            <Route path="/signup" element={<AuthPage mode="signup" setUser={handleLogin} />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/process" element={<HiringProcess />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/apply/:id" element={<ApplyPage />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user ? <Settings user={user} /> : <Navigate to="/login" />} 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
