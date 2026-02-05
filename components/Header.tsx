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
    { label: 'Internships', path: '/internships' },
    { label: 'Practice Tests', path: '/tests' },
    { label: 'Resources', path: '/resources' },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg py-3' 
          : 'bg-white backdrop-blur-lg border-b border-slate-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                {/* Replace this with your custom logo */}
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="Internadda" 
                  className="w-full h-full object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <div>
                <span className={`font-bold tracking-tight transition-all duration-300 ${
                  scrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  <span className="text-slate-900">Intern</span>
                  <span className="text-indigo-600">adda</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-medium tracking-wide transition-all px-3 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-semibold text-slate-900 truncate max-w-[120px]">
                        {user.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-slate-500">{user.domain}</div>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in slide-in-from-top-5 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        My Profile
                      </Link>
                      
                      <Link
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        Settings
                      </Link>
                      
                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onLogout();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-1 mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {!user && (
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-semibold"
                  >
                    Get Started
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
