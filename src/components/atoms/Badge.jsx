import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    draft: "bg-gray-100 text-gray-800 border-gray-300",
    sent: "bg-blue-100 text-blue-800 border-blue-300",
    paid: "bg-green-100 text-green-800 border-green-300",
    overdue: "bg-red-100 text-red-800 border-red-300"
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;