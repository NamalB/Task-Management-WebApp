import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { ClipboardList } from 'lucide-react';
import { mockUser } from '../services/mockData';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = (response: any) => {
    // In a real application, you would verify the Google token on your backend
    // For this demo, we'll use the mock user
    login(mockUser);
    navigate('/');
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const handleDemoLogin = () => {
    login(mockUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 sm:p-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ClipboardList className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TaskManager</h1>
          <p className="text-gray-500">Sign in to manage your tasks and boost productivity</p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col items-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="rectangular"
              text="signin_with"
              size="large"
              width="300"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <button 
            onClick={handleDemoLogin}
            className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded-md border border-gray-300 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Demo Login (No Account Required)
          </button>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to our</p>
          <div className="mt-1">
            <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;