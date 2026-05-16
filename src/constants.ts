import { Course, Assignment, Announcement } from './types';

export const COURSES: Course[] = [
  { id: '1', name: 'Advanced Mathematics', teacher: 'Dr. Sarah Smith', color: 'bg-blue-500', progress: 75, icon: 'Calculator' },
  { id: '2', name: 'Physics II', teacher: 'Prof. James Wilson', color: 'bg-purple-500', progress: 45, icon: 'Atom' },
  { id: '3', name: 'English Literature', teacher: 'Ms. Emily Brown', color: 'bg-orange-500', progress: 90, icon: 'BookOpen' },
  { id: '4', name: 'World History', teacher: 'Mr. David Clark', color: 'bg-green-500', progress: 60, icon: 'Globe' },
];

export const ASSIGNMENTS: Assignment[] = [
  { 
    id: '1', 
    title: 'Calculus Problem Set 4', 
    courseId: '1', 
    dueDate: '2026-04-10', 
    status: 'pending',
    description: 'Solve problems 1-15 in Chapter 4. focus on integration by parts and trigonometric substitution. Show all your steps clearly.',
    resources: [
      { id: 'r1', name: 'Integration Guide.pdf', type: 'pdf', url: '#' },
      { id: 'r2', name: 'Formula Sheet', type: 'link', url: '#' }
    ]
  },
  { 
    id: '2', 
    title: 'Lab Report: Thermodynamics', 
    courseId: '2', 
    dueDate: '2026-04-08', 
    status: 'pending',
    description: 'Document the results from our last experiment on heat transfer. Include your data tables, graphs of temperature vs time, and an analysis of any errors encountered during the lab session.',
    resources: [
      { id: 'r3', name: 'Lab Data Template.xlsx', type: 'pdf', url: '#' }
    ]
  },
  { 
    id: '3', 
    title: 'Essay: Shakespearean Themes', 
    courseId: '3', 
    dueDate: '2026-04-12', 
    status: 'completed',
    description: 'Write a 1500-word essay discussing the themes of ambition and fate in Macbeth. Use at least three secondary sources to support your arguments.',
    resources: [
      { id: 'r4', name: 'Essay Rubric.pdf', type: 'pdf', url: '#' },
      { id: 'r5', name: 'Reference List Example.pdf', type: 'pdf', url: '#' }
    ]
  },
  { 
    id: '4', 
    title: 'History Quiz: Renaissance', 
    courseId: '4', 
    dueDate: '2026-04-05', 
    status: 'overdue',
    description: 'Short quiz covering the political and artistic changes in 15th-century Italy. Focus on the Medici family and the shift from Gothic to Renaissance art styles.',
    resources: []
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Spring Break Schedule', content: 'The school will be closed from April 15th to April 22nd.', date: '2026-04-01', author: 'Principal Office' },
  { id: '2', title: 'Science Fair Registration', content: 'Register your projects by the end of this week.', date: '2026-04-03', author: 'Science Dept' },
];
