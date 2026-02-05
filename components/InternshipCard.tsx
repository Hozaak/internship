import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full overflow-hidden">
      <div className="relative h-48">
        <img 
          src={internship.image} 
          alt={internship.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full">
          {internship.status}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-indigo-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {internship.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 min-h-[56px]">
            {internship.title}
          </h3>
          
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-3">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-xs">🏢</span>
            </div>
            <span>{internship.company}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <span className="text-amber-600 text-sm">💰</span>
            </div>
            <div>
              <div className="text-xs text-slate-500">Stipend</div>
              <div className="text-sm font-semibold text-slate-900">{internship.stipend}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <span className="text-emerald-600 text-sm">📍</span>
            </div>
            <div>
              <div className="text-xs text-slate-500">Location</div>
              <div className="text-sm font-semibold text-slate-900">{internship.location}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills Required</div>
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-100">
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span className="px-3 py-1.5 bg-slate-50 text-slate-500 text-xs font-medium rounded-lg">
                +{internship.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <Link 
            to={`/test/real/${internship.id}`}
            className="block w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg text-sm font-semibold text-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            Apply Now (₹199)
          </Link>
          <Link 
            to={`/test/practice/${internship.id}`}
            className="block w-full border border-slate-300 text-slate-700 py-3 rounded-lg text-sm font-semibold text-center hover:bg-slate-50 transition-colors"
          >
            Free Practice Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
