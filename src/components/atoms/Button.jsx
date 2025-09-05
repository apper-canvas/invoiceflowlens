import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium", 
  icon,
  children, 
  disabled,
  loading,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:-translate-y-0.5 hover:shadow-lg focus:ring-primary-500 shadow-md",
    secondary: "bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 hover:-translate-y-0.5 hover:shadow-lg focus:ring-secondary-500 shadow-md",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:-translate-y-0.5 focus:ring-primary-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:-translate-y-0.5 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-error-600 to-error-700 text-white hover:from-error-700 hover:to-error-800 hover:-translate-y-0.5 hover:shadow-lg focus:ring-error-500 shadow-md"
  };
  
  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
      ) : icon ? (
        <ApperIcon name={icon} size={16} className="mr-2" />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;