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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Internships', path: '/', icon: '💼' },
    { label: 'Practice Tests', path: '/tests', icon: '📝' },
    { label: 'Resources', path: '/resources', icon: '📚' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout();
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
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                  <img 
                    src="https://drive.google.com/file/d/117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa/view?usp=drive_link" 
                    alt="Internadda" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.outerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <span class="text-white font-bold ${scrolled ? 'text-base' : 'text-lg'}">IA</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <span className={`font-bold tracking-tight transition-all duration-300 ${
                  scrolled ? 'text-lg' : 'text-xl'
                }`}>
                  <span className="text-slate-900">Intern</span>
                  <span className="text-indigo-600">adda</span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium -mt-1">
                  Career Launchpad
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'text-indigo-700 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-semibold text-indigo-700">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-900 truncate max-w-[140px]">
                        {user.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-slate-500">Dashboard</div>
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

                  {/* Desktop Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in slide-in-from-top-5 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-indigo-700">
                              {getInitials(user.name)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{user.name.split(' ')[0]}</div>
                            <div className="text-xs text-slate-500 truncate max-w-[160px]">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Dashboard</div>
                            <div className="text-xs text-slate-400">View progress & stats</div>
                          </div>
                        </Link>
                        
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Profile</div>
                            <div className="text-xs text-slate-400">Edit personal info</div>
                          </div>
                        </Link>
                        
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">Logout</div>
                              <div className="text-xs text-slate-400">Sign out of account</div>
                            </div>
                          </button>
                        </div>
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10"
            >
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={handleMobileMenuClose}
            />
            
            {/* Mobile Menu Panel */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-slate-200 animate-in slide-in-from-right-5 duration-300">
              {/* Menu Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">IA</span>
                    </div>
                    <div>
                      <span className="font-bold text-lg text-slate-900">Internadda</span>
                      <p className="text-xs text-slate-500">Career Launchpad</p>
                    </div>
                  </div>
                  <button
                    onClick={handleMobileMenuClose}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {user ? (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-700">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.name.split(' ')[0]}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[160px]">{user.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/login"
                      onClick={handleMobileMenuClose}
                      className="flex-1 text-center border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleMobileMenuClose}
                      className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="p-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={handleMobileMenuClose}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium ${
                        location.pathname === item.path
                          ? 'text-indigo-700 bg-indigo-50'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                {user && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="space-y-1">
                      <Link
                        to="/dashboard"
                        onClick={handleMobileMenuClose}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="text-lg">📊</span>
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={handleMobileMenuClose}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="text-lg">👤</span>
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={handleMobileMenuClose}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="text-lg">⚙️</span>
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <span className="text-lg">🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="text-xs text-slate-500 space-y-3">
                    <p>© 2024 Internadda. All rights reserved.</p>
                    <div className="flex gap-4">
                      <Link to="/privacy" onClick={handleMobileMenuClose} className="hover:text-slate-700">
                        Privacy
                      </Link>
                      <Link to="/terms" onClick={handleMobileMenuClose} className="hover:text-slate-700">
                        Terms
                      </Link>
                      <Link to="/contact" onClick={handleMobileMenuClose} className="hover:text-slate-700">
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
