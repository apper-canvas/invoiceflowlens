import { toast } from 'react-toastify';

class ClientService {
  constructor() {
    this.tableName = 'client_c';
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
          {"field": {"Name": "CompanyName_c"}},
          {"field": {"Name": "EmailAddress_c"}},
          {"field": {"Name": "PhoneNumber_c"}},
          {"field": {"Name": "Address_c"}},
          {"field": {"Name": "TaxID_c"}},
          {"field": {"Name": "Website_c"}},
          {"field": {"Name": "InvoiceCount_c"}}
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
      console.error("Error fetching clients:", error?.response?.data?.message || error);
      toast.error("Failed to load clients");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "CompanyName_c"}},
          {"field": {"Name": "EmailAddress_c"}},
          {"field": {"Name": "PhoneNumber_c"}},
          {"field": {"Name": "Address_c"}},
          {"field": {"Name": "TaxID_c"}},
          {"field": {"Name": "Website_c"}},
          {"field": {"Name": "InvoiceCount_c"}}
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
      console.error(`Error fetching client ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load client details");
      return null;
    }
  }

  async create(clientData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          CompanyName_c: clientData.CompanyName_c || clientData.name,
          EmailAddress_c: clientData.EmailAddress_c || clientData.email,
          PhoneNumber_c: clientData.PhoneNumber_c || clientData.phone,
          Address_c: clientData.Address_c || clientData.address,
          TaxID_c: clientData.TaxID_c || clientData.taxId,
          Website_c: clientData.Website_c || clientData.website
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
          console.error(`Failed to create ${failed.length} clients:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating client:", error?.response?.data?.message || error);
      toast.error("Failed to create client");
      return null;
    }
  }

  async update(id, clientData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          CompanyName_c: clientData.CompanyName_c || clientData.name,
          EmailAddress_c: clientData.EmailAddress_c || clientData.email,
          PhoneNumber_c: clientData.PhoneNumber_c || clientData.phone,
          Address_c: clientData.Address_c || clientData.address,
          TaxID_c: clientData.TaxID_c || clientData.taxId,
          Website_c: clientData.Website_c || clientData.website
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
          console.error(`Failed to update ${failed.length} clients:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating client:", error?.response?.data?.message || error);
      toast.error("Failed to update client");
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
          console.error(`Failed to delete ${failed.length} clients:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting client:", error?.response?.data?.message || error);
      toast.error("Failed to delete client");
      return false;
    }
  }
}

export const clientService = new ClientService();