import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const ClientTable = ({ clients = [], onEdit, onDelete, onView }) => {
  if (!clients || clients.length === 0) {
    return (
      <Card className="p-6">
        <Empty
          icon="Users"
          title="No clients found"
          message="Add your first client to start creating invoices and managing relationships"
          actionText="Add Client"
          onAction={() => console.log("Add new client")}
        />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Client Directory</h3>
        <p className="text-sm text-gray-600 mt-1">Manage your client relationships and contact information</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Invoices
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr 
                key={client.Id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
<span className="text-white font-medium text-sm">
                        {(client.CompanyName_c || client.name)?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{client.CompanyName_c || client.name}</div>
                      {(client.TaxID_c || client.taxId) && (
                        <div className="text-sm text-gray-500">Tax ID: {client.TaxID_c || client.taxId}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
<div className="text-gray-900">{client.EmailAddress_c || client.email}</div>
                  {(client.PhoneNumber_c || client.phone) && (
                    <div className="text-sm text-gray-500">{client.PhoneNumber_c || client.phone}</div>
                  )}
                </td>
<td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {client.Address_c || client.address || "No address provided"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
<span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {client.InvoiceCount_c || client.invoiceCount || 0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onView && onView(client)}
                    >
                      <ApperIcon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onEdit && onEdit(client)}
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onDelete && onDelete(client)}
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

export default ClientTable;