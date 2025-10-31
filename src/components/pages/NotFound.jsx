import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4">
          <ApperIcon name="AlertCircle" size={48} className="text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Link to="/">
            <Button variant="primary" size="medium">
              <ApperIcon name="Home" size={18} className="mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="medium"
            onClick={() => window.history.back()}
          >
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;