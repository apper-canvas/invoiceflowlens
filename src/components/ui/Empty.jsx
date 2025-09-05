import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "FileText", 
  title = "No data found", 
  message = "Get started by creating your first item",
  actionText = "Create New",
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
        <ApperIcon name={icon} size={48} className="text-gray-400" />
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
      
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Plus" size={18} />
            <span>{actionText}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Empty;