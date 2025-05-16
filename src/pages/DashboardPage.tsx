import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import MainLayout from '../components/layout/MainLayout';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle,
  ArrowUpRight 
} from 'lucide-react';
import { Task } from '../types';
import { mockTasks } from '../services/mockData';
import TaskCard from '../components/tasks/TaskCard';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Done');
  
  // Find upcoming deadlines within the next 7 days
  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);
  
  const upcomingDeadlines = tasks
    .filter(task => {
      const deadlineDate = new Date(task.deadline);
      return (
        task.status !== 'Done' && 
        deadlineDate >= today && 
        deadlineDate <= oneWeekLater
      );
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="text-gray-600">
            Here's an overview of your task management dashboard
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-600">{tasks.length}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
              <p className="text-sm text-gray-600 mt-1">All assigned tasks</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <span className="text-3xl font-bold text-amber-600">{pendingTasks.length}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Pending</h3>
              <p className="text-sm text-gray-600 mt-1">Tasks waiting to start</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-bold text-indigo-600">{inProgressTasks.length}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
              <p className="text-sm text-gray-600 mt-1">Tasks currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-green-600">{completedTasks.length}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Completed</h3>
              <p className="text-sm text-gray-600 mt-1">Finished tasks</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link 
                  to="/tasks/new" 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-3 p-2 bg-blue-100 rounded-full">
                    <PlusCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Create New Task</h4>
                    <p className="text-sm text-gray-500">Add a new task to the system</p>
                  </div>
                </Link>
                
                <Link 
                  to="/tasks" 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-3 p-2 bg-teal-100 rounded-full">
                    <ClipboardList className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">View All Tasks</h4>
                    <p className="text-sm text-gray-500">See all tasks in the system</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <Link to="/tasks" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                View all <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming deadlines in the next 7 days</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;