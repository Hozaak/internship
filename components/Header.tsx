import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Internships', path: '/internships', icon: '💼' },
    { label: 'Practice Tests', path: '/tests', icon: '📝' },
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Resources', path: '/resources', icon: '📚' },
  ];

  const handleApplyNow = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-slate-200/80 shadow-lg py-2' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                  <span className="text-white font-bold text-lg">IA</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <div>
                <span className={`font-black bg-gradient-to-r from-indigo-900 via-indigo-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 ${
                  scrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  Internadda
                </span>
                <p className="text-[10px] text-slate-400 font-medium -mt-1 hidden md:block">
                  Launch Your Career
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-700 shadow-inner'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA & User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name[0]}
                    </div>
                    <div className="text-sm font-bold text-slate-700">{user.name.split(' ')[0]}</div>
                  </div>
                  <button
                    onClick={handleApplyNow}
                    className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={onLogout}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-slate-700 px-4 py-3 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
};

export default Header;
