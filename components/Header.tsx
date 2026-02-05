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
    { label: 'Home', path: '/' },
    { label: 'Internships', path: '/#internships' },
    { label: 'Practice Tests', path: '/tests' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg py-3' 
          : 'bg-white border-b border-slate-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                    alt="Internadda"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain p-1"
                    onError={(e) => {
                      e.currentTarget.outerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <span class="text-white font-bold text-base sm:text-lg">IA</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-slate-900 tracking-tight">
                  Intern<span className="text-indigo-600">adda</span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium -mt-1">
                  Career Excellence Platform
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-medium px-4 py-2.5 rounded-lg transition-all ${
                    location.pathname === (item.path.includes('#') ? '/' : item.path)
                      ? 'text-indigo-700 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <Link
                      to="/dashboard"
                      className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={onLogout}
                      className="text-sm text-slate-500 hover:text-red-600"
                    >
                      Logout
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-700">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10"
            >
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all mt-1.5 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all mt-1.5 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                      <img 
                        src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w200"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.outerHTML = '<span class="text-white font-bold">IA</span>';
                        }}
                      />
                    </div>
                    <span className="font-bold text-lg text-slate-900">Internadda</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">×</button>
                </div>

                {user ? (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-700">{getInitials(user.name)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.name.split(' ')[0]}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 mb-6">
                    <Link to="/login" className="flex-1 text-center border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-semibold">
                      Sign In
                    </Link>
                    <Link to="/signup" className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold">
                      Get Started
                    </Link>
                  </div>
                )}

                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
};

export default Header;
