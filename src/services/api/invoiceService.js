import invoicesData from "@/services/mockData/invoices.json";

class InvoiceService {
  constructor() {
    this.invoices = [...invoicesData];
  }

  async getAll() {
    await this.delay();
    return [...this.invoices];
  }

  async getById(id) {
    await this.delay();
    const invoice = this.invoices.find(invoice => invoice.Id === parseInt(id));
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return { ...invoice };
  }

  async create(invoiceData) {
    await this.delay();
    const newId = Math.max(...this.invoices.map(inv => inv.Id)) + 1;
    const newInvoice = {
      Id: newId,
      ...invoiceData,
      issueDate: new Date(invoiceData.issueDate).toISOString(),
      dueDate: new Date(invoiceData.dueDate).toISOString(),
    };
    this.invoices.push(newInvoice);
    return { ...newInvoice };
  }

  async update(id, invoiceData) {
    await this.delay();
    const index = this.invoices.findIndex(invoice => invoice.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Invoice not found");
    }
    
    this.invoices[index] = {
      ...this.invoices[index],
      ...invoiceData,
      Id: parseInt(id),
      issueDate: new Date(invoiceData.issueDate).toISOString(),
      dueDate: new Date(invoiceData.dueDate).toISOString(),
    };
    
    return { ...this.invoices[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.invoices.findIndex(invoice => invoice.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Invoice not found");
    }
    this.invoices.splice(index, 1);
    return true;
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const invoiceService = new InvoiceService();