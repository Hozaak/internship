
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface AuthPageProps {
  mode: 'login' | 'signup';
  setUser: (user: UserProfile) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    education: '',
    domain: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a Supabase Auth call
    const mockUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'John Doe',
      email: formData.email,
      phone: formData.phone || '+91 9999999999',
      education: formData.education || 'Graduate',
      domain: formData.domain || 'Tech',
      unlockedRealTest: false
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20">
      <div className="bg-white w-full max-w-md rounded-[40px] p-10 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg shadow-indigo-100">ia</div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 mt-2">
            {mode === 'login' ? 'Continue your career journey' : 'Start building your professional future'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-indigo-500 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Age</label>
                  <input 
                    type="number" 
                    required
                    placeholder="21"
                    className="w-full bg-slate-50 border-2 border-slate-50 focus:border-indigo-500 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Domain</label>
                  <select 
                    className="w-full bg-slate-50 border-2 border-slate-50 focus:border-indigo-500 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all"
                    value={formData.domain}
                    onChange={e => setFormData({...formData, domain: e.target.value})}
                  >
                    <option value="">Select Domain</option>
                    <option value="Tech">Tech</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="rahul@example.com"
              className="w-full bg-slate-50 border-2 border-slate-50 focus:border-indigo-500 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border-2 border-slate-50 focus:border-indigo-500 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 mt-4"
          >
            {mode === 'login' ? 'Login Now' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <Link 
              to={mode === 'login' ? '/signup' : '/login'} 
              className="text-indigo-600 font-bold ml-2 hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
