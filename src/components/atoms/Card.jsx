import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children,
  gradient = false,
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "rounded-xl shadow-md transition-all duration-200 hover:shadow-lg",
        gradient 
          ? "bg-gradient-to-br from-white to-gray-50 border border-gray-100" 
          : "bg-white border border-gray-100",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;