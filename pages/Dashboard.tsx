
import React from 'react';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16"></div>
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black mb-8 relative z-10">
              {user.name[0]}
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{user.name}</h2>
            <p className="text-slate-400 font-medium text-sm mb-8">{user.email}</p>
            
            <div className="space-y-6 pt-8 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education</span>
                <span className="text-sm font-bold text-slate-700">{user.education}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</span>
                <span className="text-sm font-bold text-slate-700">{user.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Domain</span>
                <span className="text-sm font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">{user.domain}</span>
              </div>
            </div>

            <button className="w-full mt-10 bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats & History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <span className="block text-4xl font-black text-indigo-600 mb-1">02</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tests Passed</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <span className="block text-4xl font-black text-emerald-500 mb-1">05</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Applied</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <span className="block text-4xl font-black text-amber-500 mb-1">₹199</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Credits</span>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900">Recent Assessments</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
            </div>
            
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl group-hover:scale-110 transition-transform">
                      {i === 1 ? '🐍' : '🌐'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{i === 1 ? 'Python Development' : 'Web Development'}</h4>
                      <p className="text-xs text-slate-400 font-medium">May 1{i}, 2025 • Real Exam</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="block text-lg font-black text-slate-900">8{i}%</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">Passed</span>
                    </div>
                    <button className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                      →
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="text-center py-10 opacity-30 italic text-sm text-slate-400">
                End of recent activity
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
