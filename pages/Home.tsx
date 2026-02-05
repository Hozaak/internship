import React, { useState, useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');
  const [stats, setStats] = useState({ internships: 150, placed: 1200, companies: 85 });

  useEffect(() => {
    // Animate stats counter
    const timer = setInterval(() => {
      setStats(prev => ({
        internships: prev.internships + (Math.random() > 0.7 ? 1 : 0),
        placed: prev.placed + (Math.random() > 0.5 ? 1 : 0),
        companies: prev.companies
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-6 border border-indigo-100 shadow-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Trusted by {stats.companies}+ Top Companies
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                  Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Tech Career</span> Today
                </h1>
                <p className="text-lg text-slate-600 mt-6 leading-relaxed">
                  Get placed in top tech companies with our AI-powered skill assessments, anti-cheat secure tests, and guaranteed interview opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Try Practice Test
                  <span className="text-lg">📝</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { label: 'Live Internships', value: stats.internships, color: 'text-indigo-600' },
                  { label: 'Students Placed', value: stats.placed, color: 'text-emerald-600' },
                  { label: 'Success Rate', value: '95%', color: 'text-amber-600' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 lg:p-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900">Fast-track Your Career</h3>
                      <p className="text-slate-600 text-sm">Skip the queue with skill-based hiring</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 text-sm">✓</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700">AI-powered skill assessment</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700">Anti-cheat proctored tests</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700">Direct company interviews</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500 text-center">
                      Join <span className="font-semibold text-slate-700">1,200+</span> successful placements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Listings */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-12 lg:-mt-20 relative">
        <div className="bg-white rounded-2xl lg:rounded-[32px] border border-slate-200 shadow-lg lg:shadow-xl p-6 lg:p-10">
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Featured Internships</h2>
                <p className="text-slate-600">Hand-picked opportunities from top companies</p>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 lg:px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Internship Grid */}
            {filteredInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredInternships.map(internship => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-6">
                  🔍
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No internships found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Try selecting a different category or check back later for new opportunities.</p>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-12 border-t border-slate-100">
            <div className="text-center mb-10">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">Trusted by Students Worldwide</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our platform has helped thousands of students secure their dream internships at top companies.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '🎯', title: 'Skill-Based', desc: 'Focus on what matters most - your skills' },
                { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security & anti-cheat' },
                { icon: '⚡', title: 'Fast', desc: 'Get results within 24 hours' },
                { icon: '💼', title: 'Direct', desc: 'Direct interviews with companies' }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 mx-auto bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Ready to Launch Your Career?
              </h3>
              <p className="text-slate-600 mb-8 lg:text-lg">
                Join thousands of students who have transformed their careers with Internadda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-100 hover:shadow-xl transition-all"
                >
                  Start Free Today
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-10 py-3.5 rounded-xl font-semibold text-lg hover:border-indigo-300 transition-all"
                >
                  Try Demo Test
                </Link>
              </div>
              <p className="text-sm text-slate-400 mt-6">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
