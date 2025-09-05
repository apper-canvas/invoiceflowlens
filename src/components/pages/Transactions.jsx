import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionTable from "@/components/organisms/TransactionTable";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { transactionService } from "@/services/api/transactionService";
import { toast } from "react-toastify";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadTransactions = async () => {
    try {
      setError(null);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await transactionService.getAll();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
(transaction.TransactionNumber_c || transaction.transactionNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.Description_c || transaction.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.Client_c?.Name || transaction.clientName || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
filtered = filtered.filter(transaction => (transaction.Type_c || transaction.type) === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
filtered = filtered.filter(transaction => (transaction.Status_c || transaction.status) === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
filtered = filtered.filter(transaction => (transaction.Category_c || transaction.category) === categoryFilter);
    }

    // Apply date range filter
    if (fromDate || toDate) {
      filtered = filtered.filter(transaction => {
const transactionDate = new Date(transaction.Date_c || transaction.date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        
        if (from && to) {
          return transactionDate >= from && transactionDate <= to;
        } else if (from) {
          return transactionDate >= from;
        } else if (to) {
          return transactionDate <= to;
        }
        return true;
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery, typeFilter, statusFilter, categoryFilter, fromDate, toDate]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
    setFromDate("");
    setToDate("");
  };

  const handleNewTransaction = () => {
    navigate("/transactions/new");
  };

  const handleView = (transaction) => {
    navigate(`/transactions/${transaction.Id}`);
  };

  const handleEdit = (transaction) => {
    navigate(`/transactions/${transaction.Id}/edit`);
  };

  const handleDelete = async (transaction) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await transactionService.delete(transaction.Id);
        toast.success("Transaction deleted successfully");
        loadTransactions();
      } catch (err) {
        toast.error("Failed to delete transaction");
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
    return <Error message={error} onRetry={loadTransactions} />;
  }

  const getUniqueCategories = () => {
const categories = [...new Set(transactions.map(t => t.Category_c || t.category))];
    return categories.sort();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your financial transactions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <ApperIcon name="Download" size={18} className="mr-2" />
            Export
          </Button>
          <Button variant="primary" onClick={handleNewTransaction}>
            <ApperIcon name="Plus" size={18} className="mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <SearchBar
              placeholder="Search by transaction number, description, or client..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <Select
                label="Filter by Type"
                value={typeFilter}
                onChange={handleTypeFilter}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </div>
            <div>
              <Select
                label="Filter by Status"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
            <div>
              <Select
                label="Filter by Category"
                value={categoryFilter}
                onChange={handleCategoryFilter}
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
          {searchQuery && (
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded">
              Search: "{searchQuery}"
            </span>
          )}
          {typeFilter !== "all" && (
            <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded capitalize">
              Type: {typeFilter}
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="px-2 py-1 bg-info-100 text-info-800 rounded capitalize">
              Status: {statusFilter}
            </span>
          )}
          {categoryFilter !== "all" && (
            <span className="px-2 py-1 bg-accent-100 text-accent-800 rounded">
              Category: {categoryFilter}
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

      {/* Transaction Table */}
      <TransactionTable
        transactions={filteredTransactions}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions;