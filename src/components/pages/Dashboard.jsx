import React, { useState, useEffect } from "react";
import SummaryCard from "@/components/molecules/SummaryCard";
import InvoiceTable from "@/components/organisms/InvoiceTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { invoiceService } from "@/services/api/invoiceService";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const invoiceData = await invoiceService.getAll();
      setInvoices(invoiceData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const calculateMetrics = () => {
const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.TotalAmount_c || inv.total || 0), 0);
    const paidInvoices = invoices.filter(inv => (inv.Status_c || inv.status) === "paid");
    const pendingInvoices = invoices.filter(inv => (inv.Status_c || inv.status) === "sent");
    const overdueInvoices = invoices.filter(inv => (inv.Status_c || inv.status) === "overdue");

    const paidAmount = paidInvoices.reduce((sum, inv) => sum + (inv.TotalAmount_c || inv.total || 0), 0);
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + (inv.TotalAmount_c || inv.total || 0), 0);
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + (inv.TotalAmount_c || inv.total || 0), 0);

    return {
      totalRevenue,
      paidAmount,
      pendingAmount,
      overdueAmount,
      totalInvoices: invoices.length,
      paidCount: paidInvoices.length,
      pendingCount: pendingInvoices.length,
      overdueCount: overdueInvoices.length
    };
  };

  const handleView = (invoice) => {
    console.log("View invoice:", invoice);
  };

  const handleEdit = (invoice) => {
    console.log("Edit invoice:", invoice);
  };

  const handleDelete = (invoice) => {
    console.log("Delete invoice:", invoice);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const metrics = calculateMetrics();
  const recentInvoices = invoices.slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
          Welcome to InvoiceFlow
        </h1>
        <p className="text-gray-600">
          Manage your invoices and track payments with ease
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
          color="primary"
        />
        <SummaryCard
          title="Paid Invoices"
          value={`$${metrics.paidAmount.toLocaleString()}`}
          icon="CheckCircle"
          trend="up"
          trendValue="+8%"
          color="success"
        />
        <SummaryCard
          title="Pending Payments"
          value={`$${metrics.pendingAmount.toLocaleString()}`}
          icon="Clock"
          trend="down"
          trendValue="-3%"
          color="warning"
        />
        <SummaryCard
          title="Overdue Amount"
          value={`$${metrics.overdueAmount.toLocaleString()}`}
          icon="AlertTriangle"
          trend="up"
          trendValue="+5%"
          color="error"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalInvoices}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">{metrics.totalInvoices}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Paid Count</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent mt-1">
                {metrics.paidCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">{metrics.paidCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Pending Count</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-warning-600 to-warning-700 bg-clip-text text-transparent mt-1">
                {metrics.pendingCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">{metrics.pendingCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Overdue Count</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-error-600 to-error-700 bg-clip-text text-transparent mt-1">
                {metrics.overdueCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-error-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">{metrics.overdueCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div>
        <InvoiceTable 
          invoices={recentInvoices}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;