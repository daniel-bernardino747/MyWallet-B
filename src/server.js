import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';
import connectToMongo from './database.js';

dotenv.config();

export const db = await connectToMongo();

const app = express();
const port = 5000;

app.use(cors())
  .use(express.json())
  .use(routes);

app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`);
});

export const collectionUsers = db.collection('users');
export const collectionSessions = db.collection('sessions');
export const collectionTransactions = db.collection('transactions');
