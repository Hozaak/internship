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
               src="/images/logo.jpg" 
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
            <Route path="/" element={<Home />} />// internship/internship-main/pages/AuthPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

// Supabase client initialization
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthPage: React.FC<{ mode: 'login' | 'signup', setUser: (user: any) => void }> = ({ mode, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { 
            data: { 
              full_name: formData.name,
              education: 'Graduate', 
              domain: 'Tech'
            } 
          }
        });
        if (error) throw error;
        alert("Registration successful! Please check your email for confirmation.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;

        const loggedInUser: UserProfile = {
          id: data.user.id,
          name: data.user.user_metadata.full_name || 'User',
          email: data.user.email || '',
          phone: data.user.user_metadata.phone || '+91 0000000000',
          education: data.user.user_metadata.education || 'N/A',
          domain: data.user.user_metadata.domain || 'N/A',
          unlockedRealTest: false
        };

        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          {/* Logo path fixed to /images/logo.jpg */}
          <Link to="/">
            <img src="/images/logo.jpg" alt="Logo" className="w-20 h-20 mx-auto rounded-2xl mb-6 shadow-lg hover:scale-105 transition-transform" />
          </Link>
          <h2 className="text-3xl font-black text-slate-900">
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            {mode === 'login' ? 'Enter your details to access your account' : 'Join Internadda to launch your career'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
              <input 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700 font-medium"
                placeholder="John Doe" 
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
            <input 
              required
              className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700 font-medium"
              placeholder="name@email.com" 
              type="email" 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Password</label>
            <input 
              required
              className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700 font-medium"
              placeholder="••••••••" 
              type="password" 
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Login/Signup Toggle Link */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {mode === 'login' ? (
            <p>Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Sign Up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
            
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
