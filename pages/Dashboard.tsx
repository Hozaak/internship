import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { createClient } from '@supabase/supabase-js';

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
    // In a real app, fetch from Supabase
    // For now, simulate loading and setting data
    const timer = setTimeout(() => {
      // Simulate fetching user data
      setStats({
        testsCompleted: 2,
        testsPassed: 1,
        applicationsSubmitted: 3,
        credits: 199,
        profileCompletion: 65
      });

      setRecentActivity([
        {
          id: '1',
          type: 'test',
          title: 'Python Developer Assessment',
          description: 'Skill test completed',
          date: '2024-03-15',
          status: 'completed',
          score: 82
        },
        {
          id: '2',
          type: 'application',
          title: 'Web Development Internship',
          description: 'Application submitted',
          date: '2024-03-14',
          status: 'pending'
        },
        {
          id: '3',
          type: 'test',
          title: 'Data Science Fundamentals',
          description: 'Practice test attempted',
          date: '2024-03-12',
          status: 'completed',
          score: 74
        }
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded-lg w-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>
              ))}
            </div>
            <div className="space-y-4">
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">
          Welcome back, {user.name}. Here's your progress and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-slate-900 mb-2">{stats.testsCompleted}</div>
              <div className="
