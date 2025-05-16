import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Clock 
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Task } from '../types';
import { mockTasks } from '../services/mockData';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundTask = mockTasks.find((t) => t.id === id);
    
    setTask(foundTask || null);
    setIsLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      // In a real app, this would be an API call
      navigate('/tasks');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!task) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Not Found</h2>
          <p className="text-gray-500 mb-8">The task you're looking for doesn't exist or has been removed.</p>
          <Link to="/tasks">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Done';

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link to="/tasks" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Tasks</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
              <div className="flex items-center mt-2">
                <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                {isOverdue && (
                  <span className="ml-2 text-sm px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
                    Overdue
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Link to={`/tasks/${task.id}/edit`}>
                <Button variant="outline" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="danger" className="flex items-center" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-base font-medium text-gray-900">Assigned To</h3>
              </div>
              <p className="text-gray-700">{task.assignedTo}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-base font-medium text-gray-900">Deadline</h3>
              </div>
              <p className={`${isOverdue ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                {format(new Date(task.deadline), 'MMMM d, yyyy')}
                {isOverdue && ' (Overdue)'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-base font-medium text-gray-900">Created</h3>
              </div>
              <p className="text-gray-700">{format(new Date(task.createdAt), 'MMMM d, yyyy')}</p>
              <p className="text-xs text-gray-500 mt-1">Last updated: {format(new Date(task.updatedAt), 'MMMM d, yyyy')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TaskDetailsPage;