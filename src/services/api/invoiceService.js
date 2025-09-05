import { toast } from 'react-toastify';

class InvoiceService {
  constructor() {
    this.tableName = 'invoice_c';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "InvoiceNumber_c"}},
          {"field": {"Name": "Client_c"}},
          {"field": {"Name": "IssueDate_c"}},
          {"field": {"Name": "DueDate_c"}},
          {"field": {"Name": "SubtotalAmount_c"}},
          {"field": {"Name": "TaxAmount_c"}},
          {"field": {"Name": "TotalAmount_c"}},
          {"field": {"Name": "Status_c"}},
          {"field": {"Name": "Items_c"}},
          {"field": {"Name": "TaxRate_c"}},
          {"field": {"Name": "Notes_c"}}
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching invoices:", error?.response?.data?.message || error);
      toast.error("Failed to load invoices");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "InvoiceNumber_c"}},
          {"field": {"Name": "Client_c"}},
          {"field": {"Name": "IssueDate_c"}},
          {"field": {"Name": "DueDate_c"}},
          {"field": {"Name": "SubtotalAmount_c"}},
          {"field": {"Name": "TaxAmount_c"}},
          {"field": {"Name": "TotalAmount_c"}},
          {"field": {"Name": "Status_c"}},
          {"field": {"Name": "Items_c"}},
          {"field": {"Name": "TaxRate_c"}},
          {"field": {"Name": "Notes_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching invoice ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load invoice details");
      return null;
    }
  }

  async create(invoiceData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          InvoiceNumber_c: invoiceData.InvoiceNumber_c || invoiceData.invoiceNumber,
          Client_c: parseInt(invoiceData.Client_c || invoiceData.clientId),
          IssueDate_c: invoiceData.IssueDate_c || invoiceData.issueDate,
          DueDate_c: invoiceData.DueDate_c || invoiceData.dueDate,
          SubtotalAmount_c: parseFloat(invoiceData.SubtotalAmount_c || invoiceData.subtotal || 0),
          TaxAmount_c: parseFloat(invoiceData.TaxAmount_c || invoiceData.taxAmount || 0),
          TotalAmount_c: parseFloat(invoiceData.TotalAmount_c || invoiceData.total || 0),
          Status_c: invoiceData.Status_c || invoiceData.status || 'draft',
          Items_c: JSON.stringify(invoiceData.Items_c || invoiceData.items || []),
          TaxRate_c: parseFloat(invoiceData.TaxRate_c || invoiceData.taxRate || 0),
          Notes_c: invoiceData.Notes_c || invoiceData.notes || ''
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} invoices:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating invoice:", error?.response?.data?.message || error);
      toast.error("Failed to create invoice");
      return null;
    }
  }

  async update(id, invoiceData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          InvoiceNumber_c: invoiceData.InvoiceNumber_c || invoiceData.invoiceNumber,
          Client_c: parseInt(invoiceData.Client_c || invoiceData.clientId),
          IssueDate_c: invoiceData.IssueDate_c || invoiceData.issueDate,
          DueDate_c: invoiceData.DueDate_c || invoiceData.dueDate,
          SubtotalAmount_c: parseFloat(invoiceData.SubtotalAmount_c || invoiceData.subtotal || 0),
          TaxAmount_c: parseFloat(invoiceData.TaxAmount_c || invoiceData.taxAmount || 0),
          TotalAmount_c: parseFloat(invoiceData.TotalAmount_c || invoiceData.total || 0),
          Status_c: invoiceData.Status_c || invoiceData.status,
          Items_c: JSON.stringify(invoiceData.Items_c || invoiceData.items || []),
          TaxRate_c: parseFloat(invoiceData.TaxRate_c || invoiceData.taxRate || 0),
          Notes_c: invoiceData.Notes_c || invoiceData.notes || ''
        }]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} invoices:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating invoice:", error?.response?.data?.message || error);
      toast.error("Failed to update invoice");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = { 
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} invoices:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting invoice:", error?.response?.data?.message || error);
      toast.error("Failed to delete invoice");
      return false;
    }
  }
}

export const invoiceService = new InvoiceService();