import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import TaskList from '../components/tasks/TaskList';
import Button from '../components/ui/Button';
import { Task, TaskFilter } from '../types';
import { mockTasks } from '../services/mockData';
import { generateTasksPDF } from '../services/pdfGenerator';
import { PlusCircle, FileText } from 'lucide-react';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    status: '',
    sortBy: 'deadline',
    sortOrder: 'asc',
  });

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.assignedTo.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filter.status) {
      result = result.filter((task) => task.status === filter.status);
    }

    // Apply sorting
    result = result.sort((a, b) => {
      if (filter.sortBy === 'deadline') {
        return filter.sortOrder === 'asc'
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      } else if (filter.sortBy === 'title') {
        return filter.sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        // status
        return filter.sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

    setFilteredTasks(result);
  }, [tasks, filter]);

  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleGeneratePDF = () => {
    generateTasksPDF(filteredTasks, 'Tasks Report');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">
              Manage and organize all your tasks
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
            <Button 
              variant="outline"
              onClick={handleGeneratePDF}
              className="flex items-center justify-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF Report
            </Button>
            <Link to="/tasks/new">
              <Button className="flex items-center justify-center w-full sm:w-auto">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            </Link>
          </div>
        </div>

        <TaskList 
          tasks={filteredTasks} 
          filter={filter} 
          onFilterChange={handleFilterChange} 
          onDelete={handleDeleteTask} 
        />
      </div>
    </MainLayout>
  );
};

export default TasksPage;