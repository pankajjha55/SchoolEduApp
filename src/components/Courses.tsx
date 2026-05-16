import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Atom, BookOpen, Globe, ChevronRight, MoreVertical } from 'lucide-react';
import { COURSES } from '../constants';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Calculator,
  Atom,
  BookOpen,
  Globe,
};

export const Courses: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24 pt-6 px-6"
    >
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-500 text-sm">You are enrolled in {COURSES.length} subjects</p>
      </header>

      <div className="space-y-4">
        {COURSES.map((course) => {
          const Icon = iconMap[course.icon];
          return (
            <div key={course.id} className="bg-white border border-gray-100 p-5 rounded-3xl flex items-center gap-4 group active:scale-[0.98] transition-all">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0", course.color)}>
                <Icon size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{course.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{course.teacher}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", course.color)} style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600">{course.progress}%</span>
                </div>
              </div>
              <button className="p-2 text-gray-300 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Recommended for you */}
      <section className="mt-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended for you</h3>
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">Intro to AI & ML</h4>
            <p className="text-indigo-100 text-sm mb-4 opacity-80">Learn the basics of Artificial Intelligence and Machine Learning.</p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl text-sm font-bold shadow-lg">
              Enroll Now
            </button>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
        </div>
      </section>
    </motion.div>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
