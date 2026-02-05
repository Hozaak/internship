import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

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
