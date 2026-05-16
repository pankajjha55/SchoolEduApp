export interface Course {
  id: string;
  name: string;
  teacher: string;
  color: string;
  progress: number;
  icon: string;
}

export interface AssignmentResource {
  id: string;
  name: string;
  type: 'pdf' | 'link' | 'image';
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description?: string;
  resources?: AssignmentResource[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export type Tab = 'dashboard' | 'courses' | 'assignments' | 'ai';
