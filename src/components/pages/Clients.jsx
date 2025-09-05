import React, { useState, useEffect } from "react";
import ClientTable from "@/components/organisms/ClientTable";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { clientService } from "@/services/api/clientService";
import { toast } from "react-toastify";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadClients = async () => {
    try {
      setError(null);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await clientService.getAll();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [clients, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddClient = () => {
    toast.info("Add client functionality would be implemented here");
  };

  const handleView = (client) => {
    toast.info(`View client: ${client.name}`);
  };

  const handleEdit = (client) => {
    toast.info(`Edit client: ${client.name}`);
  };

  const handleDelete = async (client) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await clientService.delete(client.Id);
        toast.success("Client deleted successfully");
        loadClients();
      } catch (err) {
        toast.error("Failed to delete client");
      }
    }
  };

  const handleExport = () => {
    toast.info("Export functionality would be implemented here");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadClients} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage your client relationships and contact information
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <ApperIcon name="Download" size={18} className="mr-2" />
            Export
          </Button>
          <Button variant="primary" onClick={handleAddClient}>
            <ApperIcon name="Plus" size={18} className="mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SearchBar
              placeholder="Search clients by name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-center lg:justify-end">
            <div className="text-center lg:text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {filteredClients.length}
              </p>
              <p className="text-sm text-gray-600">
                {searchQuery ? "Found" : "Total"} Clients
              </p>
            </div>
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Showing {filteredClients.length} of {clients.length} clients
            </span>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm">
              Search: "{searchQuery}"
            </span>
          </div>
        )}
      </div>

      {/* Client Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Active Clients</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent mt-1">
                {clients.filter(c => c.invoiceCount > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="UserCheck" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">New Clients</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mt-1">
                {clients.filter(c => c.invoiceCount === 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="UserPlus" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Total Invoices</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent mt-1">
                {clients.reduce((sum, c) => sum + (c.invoiceCount || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Client Table */}
      <ClientTable
        clients={filteredClients}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Clients;