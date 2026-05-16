import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, Clock, AlertCircle, Filter, ArrowLeft, FileText, ExternalLink, Download } from 'lucide-react';
import { ASSIGNMENTS, COURSES } from '../constants';
import { cn } from '../lib/utils';
import { Assignment } from '../types';

export const Assignments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [selectedTask, setSelectedTask] = useState<Assignment | null>(null);

  const filteredTasks = ASSIGNMENTS.filter(task => filter === 'all' || task.status === filter);

  const statusConfig = {
    pending: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    completed: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    overdue: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  };

  return (
    <div className="relative h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="pb-24 pt-6 px-6 h-full"
      >
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-500 text-sm">You have {ASSIGNMENTS.filter(a => a.status === 'pending').length} pending tasks</p>
          </div>
          <button className="p-2 bg-gray-50 rounded-xl text-gray-600">
            <Filter size={20} />
          </button>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {(['all', 'pending', 'completed', 'overdue'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                filter === f ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-400 border border-gray-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => {
              const config = statusConfig[task.status];
              const StatusIcon = config.icon;
              const course = COURSES.find(c => c.id === task.courseId);

              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={cn("px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest", course?.color, "text-white")}>
                      {course?.name}
                    </div>
                    <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full", config.bg, config.color)}>
                      <StatusIcon size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{task.status}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-4">{task.title}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-xs font-medium">Due {task.dueDate}</span>
                    </div>
                    <button 
                      className="text-blue-600 text-xs font-bold uppercase tracking-wider"
                      onClick={(e) => { e.stopPropagation(); /* Submit logic */ }}
                    >
                      Submit
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] pb-safe flex flex-col md:max-w-md md:mx-auto"
          >
            <div className="shrink-0 pt-6 px-6 pb-4 border-b border-gray-50 flex items-center justify-between">
              <button 
                onClick={() => setSelectedTask(null)}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="font-bold text-gray-900 truncate px-4">Task Details</h2>
              <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {/* Header Info */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest", COURSES.find(c => c.id === selectedTask.courseId)?.color, "text-white")}>
                    {COURSES.find(c => c.id === selectedTask.courseId)?.name}
                  </div>
                  <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full", statusConfig[selectedTask.status].bg, statusConfig[selectedTask.status].color)}>
                    {React.createElement(statusConfig[selectedTask.status].icon, { size: 14 })}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{selectedTask.status}</span>
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{selectedTask.title}</h1>
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">Due {selectedTask.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm font-medium">11:59 PM</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <section className="mb-10">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Description</h3>
                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col gap-2">
                  <p className="text-gray-700 leading-relaxed text-sm antialiased">
                    {selectedTask.description || "No description provided for this assignment."}
                  </p>
                </div>
              </section>

              {/* Resources */}
              {selectedTask.resources && selectedTask.resources.length > 0 && (
                <section className="mb-10">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Resources</h3>
                  <div className="space-y-3">
                    {selectedTask.resources.map((res) => (
                      <div key={res.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            {res.type === 'pdf' ? <FileText size={20} /> : <ExternalLink size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{res.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{res.type}</p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                          <Download size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Bottom Sticky Action */}
            <div className="p-6 border-t border-gray-50 bg-white shrink-0">
              <button 
                className={cn(
                  "w-full py-4 rounded-2xl font-bold text-white shadow-xl shadow-blue-500/20 transition-transform active:scale-[0.98]",
                  selectedTask.status === 'completed' ? "bg-green-600 shadow-green-500/20" : "bg-blue-600"
                )}
              >
                {selectedTask.status === 'completed' ? "Resubmit Assignment" : "Add Submission"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
