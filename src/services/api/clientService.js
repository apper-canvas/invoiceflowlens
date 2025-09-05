import clientsData from "@/services/mockData/clients.json";

class ClientService {
  constructor() {
    this.clients = [...clientsData];
  }

  async getAll() {
    await this.delay();
    return [...this.clients];
  }

  async getById(id) {
    await this.delay();
    const client = this.clients.find(client => client.Id === parseInt(id));
    if (!client) {
      throw new Error("Client not found");
    }
    return { ...client };
  }

  async create(clientData) {
    await this.delay();
    const newId = Math.max(...this.clients.map(client => client.Id)) + 1;
    const newClient = {
      Id: newId,
      ...clientData,
      invoiceCount: 0
    };
    this.clients.push(newClient);
    return { ...newClient };
  }

  async update(id, clientData) {
    await this.delay();
    const index = this.clients.findIndex(client => client.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    
    this.clients[index] = {
      ...this.clients[index],
      ...clientData,
      Id: parseInt(id)
    };
    
    return { ...this.clients[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.clients.findIndex(client => client.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    this.clients.splice(index, 1);
    return true;
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const clientService = new ClientService();