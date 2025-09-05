import { toast } from 'react-toastify';

class TransactionService {
  constructor() {
    this.tableName = 'transaction_c';
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
          {"field": {"Name": "TransactionNumber_c"}},
          {"field": {"Name": "Type_c"}},
          {"field": {"Name": "Description_c"}},
          {"field": {"Name": "Client_c"}},
          {"field": {"Name": "Amount_c"}},
          {"field": {"Name": "Category_c"}},
          {"field": {"Name": "Date_c"}},
          {"field": {"Name": "Status_c"}}
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
      console.error("Error fetching transactions:", error?.response?.data?.message || error);
      toast.error("Failed to load transactions");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "TransactionNumber_c"}},
          {"field": {"Name": "Type_c"}},
          {"field": {"Name": "Description_c"}},
          {"field": {"Name": "Client_c"}},
          {"field": {"Name": "Amount_c"}},
          {"field": {"Name": "Category_c"}},
          {"field": {"Name": "Date_c"}},
          {"field": {"Name": "Status_c"}}
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
      console.error(`Error fetching transaction ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load transaction details");
      return null;
    }
  }

  async create(transactionData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          TransactionNumber_c: transactionData.TransactionNumber_c || transactionData.transactionNumber,
          Type_c: transactionData.Type_c || transactionData.type,
          Description_c: transactionData.Description_c || transactionData.description,
          Client_c: parseInt(transactionData.Client_c || transactionData.clientId),
          Amount_c: parseFloat(transactionData.Amount_c || transactionData.amount || 0),
          Category_c: transactionData.Category_c || transactionData.category,
          Date_c: transactionData.Date_c || transactionData.date,
          Status_c: transactionData.Status_c || transactionData.status || 'pending'
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
          console.error(`Failed to create ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating transaction:", error?.response?.data?.message || error);
      toast.error("Failed to create transaction");
      return null;
    }
  }

  async update(id, transactionData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          TransactionNumber_c: transactionData.TransactionNumber_c || transactionData.transactionNumber,
          Type_c: transactionData.Type_c || transactionData.type,
          Description_c: transactionData.Description_c || transactionData.description,
          Client_c: parseInt(transactionData.Client_c || transactionData.clientId),
          Amount_c: parseFloat(transactionData.Amount_c || transactionData.amount || 0),
          Category_c: transactionData.Category_c || transactionData.category,
          Date_c: transactionData.Date_c || transactionData.date,
          Status_c: transactionData.Status_c || transactionData.status
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
          console.error(`Failed to update ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating transaction:", error?.response?.data?.message || error);
      toast.error("Failed to update transaction");
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
          console.error(`Failed to delete ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting transaction:", error?.response?.data?.message || error);
      toast.error("Failed to delete transaction");
      return false;
    }
  }
}

export const transactionService = new TransactionService();