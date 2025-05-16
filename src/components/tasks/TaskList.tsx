import React from 'react';
import { Task, TaskFilter } from '../../types';
import TaskCard from './TaskCard';
import { SearchIcon, Filter, ArrowUpDown } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onDelete: (id: string) => void;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

const sortOptions = [
  { value: 'deadline', label: 'Deadline' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
];

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onFilterChange,
  onDelete,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, status: e.target.value });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      sortBy: e.target.value as 'deadline' | 'title' | 'status',
    });
  };

  const toggleSortOrder = () => {
    onFilterChange({
      ...filter,
      sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks found. Create a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={filter.search}
              onChange={handleSearchChange}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:w-1/4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filter.status}
                onChange={handleStatusChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="md:w-1/4">
            <div className="flex items-center">
              <select
                value={filter.sortBy}
                onChange={handleSortByChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={toggleSortOrder}
                className="ml-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                aria-label={`Sort ${filter.sortOrder === 'asc' ? 'ascending' : 'descending'}`}
              >
                <ArrowUpDown className={`h-5 w-5 ${filter.sortOrder === 'asc' ? 'text-gray-600' : 'text-gray-600 transform rotate-180'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;