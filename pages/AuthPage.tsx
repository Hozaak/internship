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
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{name: string, email: string} | null>(null);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '',
    phone: '',
    education: 'Undergraduate',
    domain: 'Technology'
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { 
            data: { 
              full_name: formData.name,
              phone: formData.phone,
              education: formData.education,
              domain: formData.domain
            } 
          }
        });
        
        if (signUpError) throw signUpError;

        // Auto login after signup
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (loginError) throw loginError;

        // Set success data for animation
        setSuccessData({
          name: formData.name,
          email: formData.email
        });
        setShowSuccess(true);

        // Create user profile
        const loggedInUser: UserProfile = {
          id: loginData.user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          education: formData.education,
          domain: formData.domain,
          unlockedRealTest: false
        };

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        // Auto navigate to dashboard after animation
        setTimeout(() => {
          setUser(loggedInUser);
          navigate('/dashboard');
        }, 3500);

      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;

        const loggedInUser: UserProfile = {
          id: data.user.id,
          name: data.user.user_metadata.full_name || 'User',
          email: data.user.email || '',
          phone: data.user.user_metadata.phone || '',
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

  // Success Animation Component
  if (showSuccess && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-slate-100 text-center">
          
          {/* Animated Checkmark */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            {/* Floating circles animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-emerald-300 rounded-full animate-ping"
                  style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2s' }}
                />
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Welcome aboard, {successData.name.split(' ')[0]}! 🎉
          </h2>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            Your account has been created successfully. We're redirecting you to your dashboard where you can start exploring opportunities.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Account Created</div>
              <div className="font-medium text-slate-700">{successData.email}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-500 text-sm">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Redirecting to dashboard...</span>
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 animate-loading-bar rounded-full"></div>
          </div>

          <style>{`
            @keyframes loading-bar {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .animate-loading-bar {
              animation: loading-bar 3s ease-in-out forwards;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          {/* Logo - Replace with your custom logo */}
          <div 
            onClick={() => navigate('/')}
            className="inline-block cursor-pointer mb-6 group"
          >
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Internadda" 
              className="w-20 h-20 mx-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
              }}
            />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900">
            {mode === 'login' ? 'Welcome Back' : 'Start Your Journey'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            {mode === 'login' ? 'Sign in to continue your career growth' : 'Create your account in 30 seconds'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Full Name</label>
              <input 
                required
                className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                placeholder="John Doe" 
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Email Address</label>
            <input 
              required
              className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium placeholder:text-slate-400"
              placeholder="name@email.com" 
              type="email" 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {mode === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Phone Number</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                  placeholder="+91 9876543210" 
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Education</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium"
                    onChange={e => setFormData({...formData, education: e.target.value})}
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Domain</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium"
                    onChange={e => setFormData({...formData, domain: e.target.value})}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-4">Password</label>
            <input 
              required
              className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 font-medium placeholder:text-slate-400"
              placeholder="••••••••" 
              type="password" 
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
                Sign up now
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
                Sign in here
              </Link>
            </p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-center text-slate-400">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-indigo-600 hover:underline">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
