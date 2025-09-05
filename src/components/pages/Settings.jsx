import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: "Your Business Name",
    email: "contact@yourbusiness.com",
    phone: "(555) 123-4567",
    address: "123 Business Street\nBusiness City, BC 12345",
    taxId: "123-45-6789",
    website: "www.yourbusiness.com"
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    defaultTaxRate: 8.5,
    paymentTerms: 30,
    currency: "USD",
    invoicePrefix: "INV",
    nextInvoiceNumber: 1001,
    logoUrl: "",
    customMessage: "Thank you for your business!"
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    overdueNotifications: true,
    paymentReceived: true,
    weeklyReports: false
  });

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInvoiceSettingsChange = (field, value) => {
    setInvoiceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings to defaults?")) {
      toast.info("Settings reset functionality would be implemented here");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure your business information and invoice preferences
        </p>
      </div>

      {/* Business Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
              <p className="text-sm text-gray-600">Update your company details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Business Name"
            value={businessInfo.name}
            onChange={(e) => handleBusinessInfoChange("name", e.target.value)}
            placeholder="Your Business Name"
          />
          <Input
            label="Email Address"
            type="email"
            value={businessInfo.email}
            onChange={(e) => handleBusinessInfoChange("email", e.target.value)}
            placeholder="contact@yourbusiness.com"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={businessInfo.phone}
            onChange={(e) => handleBusinessInfoChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
          />
          <Input
            label="Website"
            type="url"
            value={businessInfo.website}
            onChange={(e) => handleBusinessInfoChange("website", e.target.value)}
            placeholder="www.yourbusiness.com"
          />
          <Input
            label="Tax ID"
            value={businessInfo.taxId}
            onChange={(e) => handleBusinessInfoChange("taxId", e.target.value)}
            placeholder="123-45-6789"
          />
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <textarea
              rows={4}
              value={businessInfo.address}
              onChange={(e) => handleBusinessInfoChange("address", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
              placeholder="123 Business Street&#10;Business City, BC 12345"
            />
          </div>
        </div>
      </Card>

      {/* Invoice Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Invoice Settings</h2>
              <p className="text-sm text-gray-600">Configure default invoice options</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Default Tax Rate (%)"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={invoiceSettings.defaultTaxRate}
            onChange={(e) => handleInvoiceSettingsChange("defaultTaxRate", Number(e.target.value))}
          />
          <Input
            label="Payment Terms (Days)"
            type="number"
            min="1"
            value={invoiceSettings.paymentTerms}
            onChange={(e) => handleInvoiceSettingsChange("paymentTerms", Number(e.target.value))}
          />
          <Select
            label="Currency"
            value={invoiceSettings.currency}
            onChange={(e) => handleInvoiceSettingsChange("currency", e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </Select>
          <Input
            label="Invoice Prefix"
            value={invoiceSettings.invoicePrefix}
            onChange={(e) => handleInvoiceSettingsChange("invoicePrefix", e.target.value)}
            placeholder="INV"
          />
          <Input
            label="Next Invoice Number"
            type="number"
            min="1"
            value={invoiceSettings.nextInvoiceNumber}
            onChange={(e) => handleInvoiceSettingsChange("nextInvoiceNumber", Number(e.target.value))}
          />
          <Input
            label="Logo URL"
            type="url"
            value={invoiceSettings.logoUrl}
            onChange={(e) => handleInvoiceSettingsChange("logoUrl", e.target.value)}
            placeholder="https://example.com/logo.png"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Message
            </label>
            <textarea
              rows={3}
              value={invoiceSettings.customMessage}
              onChange={(e) => handleInvoiceSettingsChange("customMessage", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
              placeholder="Thank you for your business!"
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
              <p className="text-sm text-gray-600">Manage your notification preferences</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <p className="text-sm text-gray-600">
                  {key === "emailReminders" && "Send email reminders for upcoming due dates"}
                  {key === "overdueNotifications" && "Notify when invoices become overdue"}
                  {key === "paymentReceived" && "Notify when payments are received"}
                  {key === "weeklyReports" && "Send weekly summary reports"}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  value ? "bg-primary-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleReset}>
          <ApperIcon name="RotateCcw" size={18} className="mr-2" />
          Reset to Defaults
        </Button>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <ApperIcon name="Save" size={18} className="mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;