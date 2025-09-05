import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status, className }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "draft":
        return {
          variant: "draft",
          icon: "Edit",
          text: "Draft"
        };
      case "sent":
        return {
          variant: "sent",
          icon: "Send",
          text: "Sent"
        };
      case "paid":
        return {
          variant: "paid",
          icon: "CheckCircle",
          text: "Paid"
        };
      case "overdue":
        return {
          variant: "overdue",
          icon: "AlertCircle",
          text: "Overdue"
        };
      default:
        return {
          variant: "default",
          icon: "Circle",
          text: status || "Unknown"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={className}>
      <ApperIcon name={config.icon} size={12} className="mr-1" />
      {config.text}
    </Badge>
  );
};

export default StatusBadge;