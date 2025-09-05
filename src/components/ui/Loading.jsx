import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
      <div className="text-lg font-medium text-gray-700 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        Loading your data...
      </div>
      
      {/* Dashboard loading skeleton */}
      <div className="w-full max-w-6xl space-y-8">
        {/* Summary cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-24 shimmer rounded"></div>
                <div className="h-8 w-8 shimmer rounded-lg"></div>
              </div>
              <div className="h-8 w-32 shimmer rounded mb-2"></div>
              <div className="h-3 w-20 shimmer rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Table skeleton */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 w-48 shimmer rounded"></div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-4 w-16 shimmer rounded"></div>
                  <div className="h-4 w-32 shimmer rounded"></div>
                  <div className="h-4 w-24 shimmer rounded"></div>
                  <div className="h-4 w-20 shimmer rounded"></div>
                  <div className="h-4 w-16 shimmer rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;