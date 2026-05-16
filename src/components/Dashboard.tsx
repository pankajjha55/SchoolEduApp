import React from 'react';
import { motion } from 'motion/react';
import { Bell, Search, ChevronRight, Calculator, Atom, BookOpen, Globe } from 'lucide-react';
import { COURSES, ANNOUNCEMENTS, ASSIGNMENTS } from '../constants';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Calculator,
  Atom,
  BookOpen,
  Globe,
};

export const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24 pt-6 px-6"
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, Alex!</h1>
          <p className="text-gray-500 text-sm">Ready for today's classes?</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-gray-50 rounded-full text-gray-600">
            <Search size={20} />
          </button>
          <button className="p-2 bg-gray-50 rounded-full text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Progress Card */}
      <section className="bg-blue-600 rounded-3xl p-6 text-white mb-8 shadow-xl shadow-blue-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-100 text-xs uppercase tracking-widest font-semibold mb-1">Overall Progress</p>
            <h2 className="text-3xl font-bold">68%</h2>
          </div>
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Calculator size={24} />
          </div>
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-white h-full rounded-full"
          />
        </div>
        <p className="mt-4 text-sm text-blue-100">You've completed 12/18 modules this week. Keep it up!</p>
      </section>

      {/* Announcements */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Announcements</h3>
          <button className="text-blue-600 text-sm font-semibold">View all</button>
        </div>
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((ann) => (
            <div key={ann.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{ann.title}</h4>
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{ann.content}</p>
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider font-medium">{ann.date} • {ann.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Preview */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
          <button className="text-blue-600 text-sm font-semibold">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {COURSES.slice(0, 2).map((course) => {
            const Icon = iconMap[course.icon];
            return (
              <div key={course.id} className="bg-white border border-gray-100 p-5 rounded-3xl">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg", course.color)}>
                  <Icon size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{course.name}</h4>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-3">{course.teacher}</p>
                <div className="flex items-center gap-2">
                   <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", course.color)} style={{ width: `${course.progress}%` }} />
                   </div>
                   <span className="text-[10px] font-bold text-gray-600">{course.progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Tasks</h3>
        </div>
        <div className="space-y-3">
          {ASSIGNMENTS.filter(a => a.status === 'pending').slice(0, 2).map((task) => (
            <div key={task.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-blue-500 rounded-full" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{task.title}</h4>
                  <p className="text-gray-400 text-xs">Due {task.dueDate}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
