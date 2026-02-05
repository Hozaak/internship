
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-400 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Internadda</h2>
          <p className="max-w-xs mb-6 text-sm leading-relaxed">
            Transforming careers through learning, interning, and earning opportunities. We bridge the gap between academic learning and corporate expectations.
          </p>
          <div className="flex gap-4">
            {['linkedin', 'twitter', 'youtube', 'instagram'].map(platform => (
              <div key={platform} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                <span className="capitalize text-[10px] text-white font-bold">{platform[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Learn</h3>
          <ul className="space-y-4 text-sm">
            <li>Browse Courses</li>
            <li>Free Courses</li>
            <li>Paid Courses</li>
            <li>Offline Academy</li>
            <li>Become an Instructor</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Intern</h3>
          <ul className="space-y-4 text-sm">
            <li>Find Internships</li>
            <li>For Employees</li>
            <li>For Companies</li>
            <li>Success Stories</li>
            <li>Career Coaching</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Career Tools</h3>
          <ul className="space-y-4 text-sm">
            <li>ATS Score Checker</li>
            <li>Resume Builder</li>
            <li>Interview Prep</li>
            <li>Cover Letter Gen</li>
            <li>AI Playground</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Community</h3>
          <ul className="space-y-4 text-sm">
            <li>Join Community</li>
            <li>Partners</li>
            <li>Blog</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2025 Internadda. All rights reserved. | Developed by Internadda Team</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
