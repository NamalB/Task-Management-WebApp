import { Task, User } from '../types';

// Mock user for demo purposes
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  picture: 'https://i.pravatar.cc/150?img=1'
};

// Mock tasks for demonstration
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up Google OAuth 2.0 for user authentication in the application.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
    assignedTo: 'Sarah Johnson',
    status: 'In Progress',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Create dashboard layout',
    description: 'Design and implement the main dashboard layout with task statistics and quick actions.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
    assignedTo: 'David Chen',
    status: 'Pending',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Implement task filtering and sorting',
    description: 'Add functionality to filter tasks by status and search by title or description. Also implement sorting by various criteria.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
    assignedTo: 'Emma Wilson',
    status: 'Pending',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Fix responsive layout issues',
    description: 'Address responsive design issues on mobile devices, particularly for the task form and task details view.',
    deadline: new Date(new Date().setDate(new Date().getDate() - 1)),
    assignedTo: 'James Rodriguez',
    status: 'Done',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: '5',
    title: 'Implement PDF export functionality',
    description: 'Add the ability to export task lists as PDF documents with proper formatting and styling.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
    assignedTo: 'Lisa Wang',
    status: 'In Progress',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    updatedAt: new Date()
  },
  {
    id: '6',
    title: 'Write API documentation',
    description: 'Create comprehensive documentation for all backend API endpoints including request/response formats and authentication requirements.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
    assignedTo: 'Michael Brown',
    status: 'Pending',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date()
  }
];