import React from "react";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const TransactionTable = ({ transactions = [], onEdit, onDelete, onView }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6">
        <Empty
          icon="CreditCard"
          title="No transactions found"
          message="Start recording your financial transactions to track income and expenses"
          actionText="Add Transaction"
          onAction={() => console.log("Create new transaction")}
        />
      </Card>
    );
  }

  const getTypeIcon = (type) => {
    return type === 'income' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTypeColor = (type) => {
    return type === 'income' ? 'text-success-600' : 'text-error-600';
  };

  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        <p className="text-sm text-gray-600 mt-1">Track your income and expenses</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction #
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction.Id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
#{transaction.TransactionNumber_c || transaction.transactionNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <ApperIcon 
name={getTypeIcon(transaction.Type_c || transaction.type)} 
                      size={20} 
                      className="text-gray-500"
                    />
                    <span className={`capitalize text-sm font-medium ${getTypeColor(transaction.type)}`}>
{transaction.Type_c || transaction.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
<div className="text-gray-900 max-w-xs truncate">{transaction.Description_c || transaction.description}</div>
                  <div className="text-xs text-gray-500">{transaction.Client_c?.Name || transaction.clientName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
<div className={`text-lg font-bold ${getTypeColor(transaction.Type_c || transaction.type)}`}>
                    {(transaction.Type_c || transaction.type) === 'income' ? '+' : '-'}${(transaction.Amount_c || transaction.amount)?.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
{transaction.Category_c || transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
{format(new Date(transaction.Date_c || transaction.date), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
<StatusBadge status={transaction.Status_c || transaction.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onView && onView(transaction)}
                    >
                      <ApperIcon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onEdit && onEdit(transaction)}
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onDelete && onDelete(transaction)}
                      className="text-error-600 hover:text-error-700"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionTable;