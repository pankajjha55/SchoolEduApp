import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Courses } from './components/Courses';
import { Assignments } from './components/Assignments';
import { StudyBuddy } from './components/StudyBuddy';
import { Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'courses':
        return <Courses key="courses" />;
      case 'assignments':
        return <Assignments key="assignments" />;
      case 'ai':
        return <StudyBuddy key="ai" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl shadow-gray-200/50 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
    </div>
  );
}
