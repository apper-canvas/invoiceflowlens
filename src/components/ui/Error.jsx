import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-error-500 to-error-600 rounded-full flex items-center justify-center shadow-lg">
        <ApperIcon name="AlertTriangle" size={40} className="text-white" />
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Oops! Something went wrong</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="RefreshCw" size={18} />
            <span>Try Again</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Error;