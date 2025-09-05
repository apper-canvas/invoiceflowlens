import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const SummaryCard = ({ title, value, icon, trend, trendValue, color = "primary" }) => {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600 text-primary-600",
    secondary: "from-secondary-500 to-secondary-600 text-secondary-600",
    success: "from-success-500 to-success-600 text-success-600",
    warning: "from-warning-500 to-warning-600 text-warning-600",
    error: "from-error-500 to-error-600 text-error-600"
  };

  return (
    <Card className="p-6 hover:transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-sm`}>
          <ApperIcon name={icon} size={20} className="text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
          {value}
        </p>
        
        {trend && trendValue && (
          <div className="flex items-center space-x-1">
            <ApperIcon 
              name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={trend === "up" ? "text-success-500" : "text-error-500"} 
            />
            <span className={`text-sm font-medium ${trend === "up" ? "text-success-600" : "text-error-600"}`}>
              {trendValue}
            </span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SummaryCard;