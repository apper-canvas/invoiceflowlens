import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { invoiceService } from "@/services/api/invoiceService";
import { toast } from "react-toastify";

const Invoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadInvoices = async () => {
    try {
      setError(null);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await invoiceService.getAll();
      setInvoices(data);
      setFilteredInvoices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  useEffect(() => {
    let filtered = [...invoices];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchQuery, statusFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleNewInvoice = () => {
    navigate("/invoices/new");
  };

  const handleView = (invoice) => {
    navigate(`/invoices/${invoice.Id}`);
  };

  const handleEdit = (invoice) => {
    navigate(`/invoices/${invoice.Id}/edit`);
  };

  const handleDelete = async (invoice) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await invoiceService.delete(invoice.Id);
        toast.success("Invoice deleted successfully");
        loadInvoices();
      } catch (err) {
        toast.error("Failed to delete invoice");
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
    return <Error message={error} onRetry={loadInvoices} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your invoices in one place
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <ApperIcon name="Download" size={18} className="mr-2" />
            Export
          </Button>
          <Button variant="primary" onClick={handleNewInvoice}>
            <ApperIcon name="Plus" size={18} className="mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar
              placeholder="Search by invoice number or client name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div>
            <Select
              label="Filter by Status"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </Select>
          </div>
        </div>
        
        {/* Filter Summary */}
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <span>
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </span>
          {searchQuery && (
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded">
              Search: "{searchQuery}"
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded capitalize">
              Status: {statusFilter}
            </span>
          )}
        </div>
      </div>

      {/* Invoice Table */}
      <InvoiceTable
        invoices={filteredInvoices}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Invoices;