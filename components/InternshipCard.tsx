
import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
      <div className="relative h-48">
        <img 
          src={internship.image} 
          alt={internship.title} 
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
          {internship.status}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{internship.title}</h3>
        </div>
        
        <p className="text-slate-500 text-sm flex items-center gap-2 mb-4">
          <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">🏢</span>
          {internship.company}
        </p>

        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="text-emerald-500 text-lg">✓</span>
            Certified Opportunity
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="text-blue-500 text-lg">👥</span>
            Vetted by Experts
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="bg-amber-100 p-1 rounded">💰</span>
            {internship.stipend}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="bg-emerald-100 p-1 rounded">📍</span>
            {internship.location}
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <Link 
            to={`/test/real/${internship.id}`}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
          >
            <span className="text-sm">🔒</span> Secure Exam Access
          </Link>
          <Link 
            to={`/test/practice/${internship.id}`}
            className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
          >
            <span className="text-sm">✎</span> Take Practice Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
