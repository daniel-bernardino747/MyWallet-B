import { MongoClient } from 'mongodb';

export default async function connectToMongo() {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    console.log('🌀 connected to MongoDB');
    return (await mongoClient.connect()).db('MyWallet');
  } catch (err) {
    console.error(err);
    return err;
  }
}
