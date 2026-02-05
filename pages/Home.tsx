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
    <div className="pb-20">
      {/* Hero Section with Stats */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 transform -rotate-12 origin-top-left"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-indigo-700 mb-6 border border-indigo-100 shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Trusted by {stats.companies}+ Companies
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                  Land Your Dream <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Internship</span>
                </h1>
                <p className="text-slate-500 text-xl mt-6 max-w-2xl leading-relaxed">
                  Get placed in top companies with our AI-powered skill assessments, anti-cheat secure tests, and guaranteed interview opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Get Started Free →
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-indigo-300 hover:bg-slate-50 transition-all"
                >
                  Try Practice Test
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8">
                <p className="text-sm text-slate-400 mb-4">Trusted by students from</p>
                <div className="flex flex-wrap gap-6 opacity-60">
                  {['IIT', 'NIT', 'DU', 'BITS', 'VIT', 'SRM'].map(uni => (
                    <div key={uni} className="bg-white px-4 py-2 rounded-lg border border-slate-100 text-sm font-bold text-slate-600">
                      {uni}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Live Internships', value: stats.internships, color: 'from-indigo-500 to-blue-500' },
                  { label: 'Students Placed', value: stats.placed, color: 'from-emerald-500 to-teal-500' },
                  { label: 'Success Rate', value: '95%', color: 'from-amber-500 to-orange-500' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg text-center">
                    <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Internship Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full -mr-8 -mt-8"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">Featured Internship</h3>
                    <p className="text-slate-400 text-sm">AI/ML Developer @ TechCorp</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Stipend:</span>
                    <span className="font-bold text-slate-900">₹15,000/month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-bold text-slate-900">Remote</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Applications:</span>
                    <span className="font-bold text-emerald-600">45 applied today</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Listings */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Latest Internship Opportunities</h2>
              <p className="text-slate-500">Hand-picked by our corporate partners</p>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Internship Grid */}
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-6">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No internships found</h3>
              <p className="text-slate-400">Try selecting a different category</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">
              Ready to launch your career?
            </h3>
            <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have secured internships through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all"
              >
                Create Free Account
              </Link>
              <Link 
                to="/tests"
                className="bg-white text-slate-700 border-2 border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:border-indigo-300 transition-all"
              >
                Take Skill Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
