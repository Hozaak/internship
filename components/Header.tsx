
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
    { label: 'Internships', path: '/', active: true },
    { label: 'Remote Jobs', path: '/jobs' },
    { label: 'About Us', path: '/about' },
    { label: 'More', path: '/more' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-indigo-200 shadow-lg">ia</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent">Internadda</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                item.active ? 'text-indigo-600 border-b-2 border-indigo-600 py-1' : 'text-slate-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-indigo-600">
                Hi, {user.name.split(' ')[0]}
              </Link>
              <button 
                onClick={onLogout}
                className="text-xs text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-indigo-100 shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
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
