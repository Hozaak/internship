import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface DashboardProps {
  user: UserProfile;
}

interface DashboardStats {
  testsCompleted: number;
  testsPassed: number;
  applicationsSubmitted: number;
  credits: number;
  profileCompletion: number;
}

interface RecentActivity {
  id: string;
  type: 'test' | 'application' | 'payment';
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  score?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState<DashboardStats>({
    testsCompleted: 0,
    testsPassed: 0,
    applicationsSubmitted: 0,
    credits: 0,
    profileCompletion: 65
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from Supabase or local storage
    const fetchUserData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, fetch from Supabase:
        // const { data: testResults } = await supabase
        //   .from('test_results')
        //   .select('*')
        //   .eq('user_id', user.id);
        
        // For now, simulate data
        setStats({
          testsCompleted: 0, // Start with zero
          testsPassed: 0,
          applicationsSubmitted: 0,
          credits: 0,
          profileCompletion: user.name && user.email && user.phone ? 85 : 65
        });

        setRecentActivity([]); // Start with empty activity

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'test': return '📝';
      case 'application': return '📋';
      case 'payment': return '💳';
      default: return '📌';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded-lg w-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Stats skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>
                ))}
              </div>
              {/* Activity skeleton */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-slate-100 rounded-2xl"></div>
              <div className="h-48 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">
              Welcome back, {user.name}. Track your progress and manage your internship journey.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500">Profile: {stats.profileCompletion}% complete</div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                style={{ width: `${stats.profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${stats.testsCompleted > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.testsCompleted > 0 ? 'Active' : 'Start'}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">{stats.testsCompleted}</div>
              <div className="text-sm text-slate-500">Tests Completed</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${stats.testsPassed > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.testsPassed > 0 ? `${((stats.testsPassed/stats.testsCompleted)*100 || 0).toFixed(0)}%` : '0%'}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">{stats.testsPassed}</div>
              <div className="text-sm text-slate-500">Tests Passed</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${stats.applicationsSubmitted > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.applicationsSubmitted > 0 ? 'Applied' : 'Ready'}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">{stats.applicationsSubmitted}</div>
              <div className="text-sm text-slate-500">Applications</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <Link 
                  to="/add-credits"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Add +
                </Link>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">₹{stats.credits}</div>
              <div className="text-sm text-slate-500">Available Credits</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              <p className="text-sm text-slate-500 mt-1">Track your recent tests and applications</p>
            </div>
            
            <div className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <span className="text-lg">{getTypeIcon(activity.type)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{activity.title}</h4>
                          <p className="text-sm text-slate-500">{activity.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-400">{activity.date}</span>
                            {activity.score && (
                              <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">
                                Score: {activity.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-medium text-slate-900 mb-2">No activity yet</h4>
                  <p className="text-sm text-slate-500 mb-6">Start by taking a practice test or applying for internships</p>
                  <div className="flex justify-center gap-3">
                    <Link 
                      to="/tests"
                      className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Take Practice Test
                    </Link>
                    <Link 
                      to="/"
                      className="border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      Browse Internships
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl">
              Take your first step towards your dream internship. Complete a practice test to understand your skill level.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/tests"
                className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
              >
                Take Practice Test
              </Link>
              <Link 
                to="/profile"
                className="bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Complete Profile
              </Link>
              <Link 
                to="/add-credits"
                className="bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Add Credits
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Your Profile</h3>
                <Link 
                  to="/profile"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Edit
                </Link>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                    <span className="text-xl font-semibold text-indigo-700">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{user.name}</h4>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">
                        {user.domain}
                      </span>
                      <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                        {user.education}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Phone</span>
                    <span className="text-sm font-medium text-slate-900">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Member Since</span>
                    <span className="text-sm font-medium text-slate-900">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Account Status</span>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-6">
              <Link 
                to="/settings"
                className="block w-full text-center border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Account Settings
              </Link>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Learning Progress</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Profile Completion</span>
                  <span className="text-sm font-medium text-slate-900">{stats.profileCompletion}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                    style={{ width: `${stats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Skill Assessment</span>
                  <span className="text-sm font-medium text-slate-900">
                    {stats.testsCompleted > 0 ? 'Started' : 'Not started'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                    style={{ width: `${Math.min(stats.testsCompleted * 25, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Application Readiness</span>
                  <span className="text-sm font-medium text-slate-900">
                    {stats.applicationsSubmitted > 0 ? 'Applied' : 'Ready'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    style={{ width: `${Math.min(stats.applicationsSubmitted * 33, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-600 mb-4">Next steps to improve your profile:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs">1</span>
                  </div>
                  Complete your profile details
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs">2</span>
                  </div>
                  Take a practice test
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs">3</span>
                  </div>
                  Apply for internships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
