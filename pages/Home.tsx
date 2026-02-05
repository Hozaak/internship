
import React, { useState, useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const alerts = [
      "🔥 3 students passed in last 15 minutes",
      "🎯 5 interviews scheduled today",
      "🚀 12 companies actively hiring now",
      "✨ New Internship: Senior Backend Intern"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setNotifications(prev => [alerts[i % alerts.length], ...prev.slice(0, 2)]);
      i++;
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  return (
    <div className="pb-20">
      {/* Social Proof Bar */}
      <div className="bg-indigo-600 text-white py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20 items-center">
          {notifications.length > 0 ? (
            notifications.map((note, idx) => (
              <span key={idx} className="text-sm font-medium flex items-center gap-2">
                {note}
              </span>
            ))
          ) : (
            <span className="text-sm font-medium">🔥 Start your dream career today with Internadda</span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Find Your Dream <span className="text-indigo-600">Internship</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Explore verified, high-value opportunities to learn, grow, and kickstart your career with our Corporate Partners.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat 
                ? 'bg-indigo-100 text-indigo-700 shadow-inner' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
        
        {filteredInternships.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No internships found in this category yet.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
