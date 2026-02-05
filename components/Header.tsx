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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    { label: 'Courses', path: '/courses' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Resources', path: '/resources' },
    { label: 'Practice Tests', path: '/tests' },
  ];

  const handleNavClick = (path: string, e?: React.MouseEvent) => {
    if (path.includes('#')) {
      e?.preventDefault();
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

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
    
                  <img 
                    src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                    alt="Internadda"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain p-1"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-white font-bold text-lg">IA</span>
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
              {navItems.map((item) => {
                // Glow logic: 
                // 1. Exact path match OR
                // 2. If it's a hash path, ensure the current hash matches exactly.
                const isActive = item.path.includes('#') 
                  ? location.hash === `#${item.path.split('#')[1]}` 
                  : location.pathname === item.path && location.hash === '';

                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleNavClick(item.path, e)}
                    className={`text-sm font-medium px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'text-indigo-700 bg-indigo-50 font-semibold shadow-sm'
                        : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-700">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-900">
                        {user.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-slate-500">Account</div>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      </div>
                      <div className="py-2">
                        <Link to="/dashboard" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
                        <Link to="/profile" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Profile</Link>
                        <button onClick={onLogout} className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100 mt-2 pt-2">Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50">Sign In</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md">Get Started</Link>
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
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold">IA</span>
                    </div>
                    <span className="font-bold text-lg text-slate-900">Internadda</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">×</button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = item.path.includes('#') 
                      ? location.hash === `#${item.path.split('#')[1]}` 
                      : location.pathname === item.path && location.hash === '';

                    return (
                      <a
                        key={item.label}
                        href={item.path}
                        onClick={(e) => {
                          handleNavClick(item.path, e);
                          setMobileMenuOpen(false);
                        }}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                          isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
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
