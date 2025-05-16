import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import TaskForm from '../components/tasks/TaskForm';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TaskFormData } from '../types';
import { mockTasks } from '../services/mockData';

const NewTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: TaskFormData) => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    // Simulate API call latency
    setTimeout(() => {
      const newTask = {
        ...data,
        id: `${mockTasks.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setIsSubmitting(false);
      navigate('/tasks');
    }, 800);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/tasks" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Tasks</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NewTaskPage;