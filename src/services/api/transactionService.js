import transactionsData from "@/services/mockData/transactions.json";

class TransactionService {
  constructor() {
    this.transactions = [...transactionsData];
  }

  async getAll() {
    await this.delay();
    return [...this.transactions];
  }

  async getById(id) {
    await this.delay();
    const transaction = this.transactions.find(transaction => transaction.Id === parseInt(id));
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { ...transaction };
  }

  async create(transactionData) {
    await this.delay();
    const newId = Math.max(...this.transactions.map(txn => txn.Id)) + 1;
    const newTransaction = {
      Id: newId,
      ...transactionData,
      transactionNumber: `TXN-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`,
      date: new Date(transactionData.date).toISOString(),
    };
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

  async update(id, transactionData) {
    await this.delay();
    const index = this.transactions.findIndex(transaction => transaction.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    
    this.transactions[index] = {
      ...this.transactions[index],
      ...transactionData,
      Id: parseInt(id),
      date: new Date(transactionData.date).toISOString(),
    };
    
    return { ...this.transactions[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.transactions.findIndex(transaction => transaction.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    this.transactions.splice(index, 1);
    return true;
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const transactionService = new TransactionService();