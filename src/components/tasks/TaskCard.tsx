import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Task } from '../../types';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Done';

  return (
    <Card className="h-full transition-transform hover:shadow-md hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-500 w-24">Assigned to:</span>
              <span className="text-gray-700 font-medium">{task.assignedTo}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="text-gray-500 w-24">Deadline:</span>
              <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-700'}`}>
                {format(new Date(task.deadline), 'MMM dd, yyyy')}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
          <Link
            to={`/tasks/${task.id}`}
            className="text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/tasks/${task.id}/edit`}
            className="text-gray-600 hover:text-indigo-600 p-1 rounded transition-colors"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;