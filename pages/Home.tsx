import React, { useState } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  const stats = {
    internships: '30+',
    placed: '7000+',
    companies: '50+',
    successRate: '98%'
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Testing',
      description: 'Enterprise-grade proctored assessments'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Results',
      description: 'Get placement results within 48 hours'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Direct Interviews',
      description: 'Connect directly with hiring managers'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Certificate',
      description: 'Industry-recognized skill certification'
    }
  ];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full translate-y-48 -translate-x-48"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-6 border border-indigo-100 shadow-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Trusted by {stats.companies} Top Companies
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Launch Your Tech Career with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                    Guaranteed Placements
                  </span>
                </h1>
                <p className="text-lg text-slate-600 mt-6 leading-relaxed">
                  Join 7,000+ students who transformed their careers through our skill-based assessments and direct industry connections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Start Free Trial
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Try Practice Test
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {[
                  { label: 'Active Internships', value: stats.internships, color: 'text-indigo-600' },
                  { label: 'Students Placed', value: stats.placed, color: 'text-emerald-600' },
                  { label: 'Partner Companies', value: stats.companies, color: 'text-blue-600' },
                  { label: 'Success Rate', value: stats.successRate, color: 'text-amber-600' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center mb-4">
                      <img 
                        src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w200"
                        alt="Internadda"
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.outerHTML = `
                            <div class="w-10 h-10 flex items-center justify-center">
                              <span class="text-indigo-600 font-bold text-lg">IA</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Why Choose Internadda?</h3>
                    <p className="text-slate-600 mt-2">Industry-leading placement platform</p>
                  </div>
                  
                  <div className="space-y-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                          <p className="text-sm text-slate-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Listings */}
      <div id="internships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 lg:p-8">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Internship Grid */}
            {filteredInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map(internship => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No internships found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Try selecting a different category or check back later.</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ), 
                  title: 'Skill-Based', 
                  desc: 'Focus on your skills, not just academics' 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ), 
                  title: 'Secure', 
                  desc: 'Enterprise-grade security & anti-cheat' 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ), 
                  title: 'Fast', 
                  desc: 'Get results within 24-48 hours' 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ), 
                  title: 'Direct', 
                  desc: 'Direct interviews with companies' 
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 mx-auto bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
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
                Join 7,000+ students who have transformed their careers with Internadda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
