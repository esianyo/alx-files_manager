const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const connection = await this.client.connect();
      const db = connection.db(process.env.DB_DATABASE || 'files_manager');
      const count = await db.collection('users').countDocuments();
      connection.close();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      throw error; // Re-throw the error for handling in main.js
    }
  }

  async nbFiles() {
    try {
      const connection = await this.client.connect();
      const db = connection.db(process.env.DB_DATABASE || 'files_manager');
      const count = await db.collection('files').countDocuments();
      connection.close();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      throw error; // Re-throw the error for handling in main.js
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
