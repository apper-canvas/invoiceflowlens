import React, { useEffect, useState } from "react";
import { clientService } from "@/services/api/clientService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import ClientTable from "@/components/organisms/ClientTable";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Invoices from "@/components/pages/Invoices";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
    let filtered = [...clients];

    // Apply search filter
    if (searchQuery) {
filtered = filtered.filter(client =>
        (client.CompanyName_c || client.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.EmailAddress_c || client.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.PhoneNumber_c || client.phone || "")?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter based on invoice count
    if (statusFilter !== "all") {
      filtered = filtered.filter(client => {
        const invoiceCount = client.invoiceCount || 0;
        switch (statusFilter) {
          case "active":
            return invoiceCount >= 2;
          case "new":
            return invoiceCount === 1;
          case "inactive":
            return invoiceCount === 0;
          default:
            return true;
        }
      });
    }

    setFilteredClients(filtered);
  }, [clients, searchQuery, statusFilter]);
const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
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

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <SearchBar
              placeholder="Search clients by name, email, or phone..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select
                label="Filter by Client Status"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="all">All Clients</option>
                <option value="active">Active (2+ invoices)</option>
                <option value="new">New (1 invoice)</option>
                <option value="inactive">Inactive (0 invoices)</option>
              </Select>
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full md:w-auto"
              >
                <ApperIcon name="X" size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Filter Summary */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="font-medium">
            Showing {filteredClients.length} of {clients.length} clients
          </span>
          {searchQuery && (
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded">
              Search: "{searchQuery}"
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded capitalize">
              Status: {statusFilter === "active" ? "Active" : statusFilter === "new" ? "New" : "Inactive"}
            </span>
          )}
        </div>
      </div>

      {/* Client Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Active Clients</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent mt-1">
{clients.filter(c => (c.InvoiceCount_c || c.invoiceCount) > 0).length}
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
{clients.filter(c => (c.InvoiceCount_c || c.invoiceCount) === 0).length}
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
{clients.reduce((sum, c) => sum + (c.InvoiceCount_c || c.invoiceCount || 0), 0)}
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