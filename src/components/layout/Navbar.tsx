import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, LogOut, User } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TaskManager</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/tasks" 
            className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Tasks
          </Link>
          <Link 
            to="/tasks/new" 
            className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Add Task
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center">
              <div className="hidden md:flex items-center mr-4">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;