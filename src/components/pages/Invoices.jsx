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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
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

    // Apply date range filter
    if (fromDate || toDate) {
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.issueDate);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        
        if (from && to) {
          return invoiceDate >= from && invoiceDate <= to;
        } else if (from) {
          return invoiceDate >= from;
        } else if (to) {
          return invoiceDate <= to;
        }
        return true;
      });
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchQuery, statusFilter, fromDate, toDate]);

const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
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
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <SearchBar
              placeholder="Search by invoice number or client name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-gray-900"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
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
          {fromDate && (
            <span className="px-2 py-1 bg-warning-100 text-warning-800 rounded">
              From: {new Date(fromDate).toLocaleDateString()}
            </span>
          )}
          {toDate && (
            <span className="px-2 py-1 bg-warning-100 text-warning-800 rounded">
              To: {new Date(toDate).toLocaleDateString()}
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