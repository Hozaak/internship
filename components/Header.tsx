//internship/internship-main/components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Internships', path: '/', active: location.pathname === '/' },
    { label: 'Remote Jobs', path: '/jobs' },
    { label: 'About Us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform">
            <img src="logo.jpg" alt="Internadda Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-900 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Internadda
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-sm font-bold tracking-tight transition-all hover:text-indigo-600 ${
                item.active ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {user.name[0]}
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">Dashboard</span>
              </Link>
              <button 
                onClick={onLogout}
                className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-tighter"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-xl hover:bg-indigo-600 transition-all active:scale-95 hover:shadow-indigo-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
