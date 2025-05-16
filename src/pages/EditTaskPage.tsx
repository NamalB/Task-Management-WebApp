import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import TaskForm from '../components/tasks/TaskForm';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Task, TaskFormData } from '../types';
import { mockTasks } from '../services/mockData';

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundTask = mockTasks.find((t) => t.id === id);
    setTask(foundTask || null);
    setIsLoading(false);
  }, [id]);

  const handleSubmit = (data: TaskFormData) => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    // Simulate API call latency
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/tasks/${id}`);
    }, 800);
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Back to Tasks
            </button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to={`/tasks/${id}`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Task Details</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm
              initialData={task}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditTaskPage;