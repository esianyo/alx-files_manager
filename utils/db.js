#!/usr/bin node

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Fix: Add quotes around connection string
    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connect().then(() => {
      this.db = this.client.db(database);
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  // Fix: Check if client is initialized before calling isConnected()
  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    try {
      const collection = this.db.collection('users');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error getting the number of users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const collection = this.db.collection('files');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error getting the number of files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
