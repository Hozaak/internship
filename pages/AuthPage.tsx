//internship/internship-main/pages/AuthPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'; // Assuming supabase client is initialized
import { UserProfile } from '../types';

// Supabase Initialization (Normally in a separate config file)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

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
            // Add other registration fields here so they save to metadata
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

      // Map Supabase auth data to your UserProfile type for a unique dashboard
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
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <img src="images/logo.jpg" alt="Logo" className="w-20 h-20 mx-auto rounded-2xl mb-6 shadow-lg" />
          <h2 className="text-3xl font-black text-slate-900">{mode === 'login' ? 'Welcome Back' : 'Get Started'}</h2>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <input 
              className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
              placeholder="Full Name" 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input 
            className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
            placeholder="Email" 
            type="email" 
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
            placeholder="Password" 
            type="password" 
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default AuthPage;
