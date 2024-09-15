import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017'; // MongoDB connection URL
let client; // To cache the DB instance after successful connection

export const mongoDB = async () => {
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connection successful');
    } catch (err) {
        console.error('Failed database connection', err);
    }
};


// Function to connect and return the MongoDB instance
export const getDB = () => {
    if (client) {
        return client.db('newDatabaseName');
    } else {
        throw new Error('Database connection not initialized');
    }
};
