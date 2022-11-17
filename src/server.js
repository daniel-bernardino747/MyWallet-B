import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';
import connectToMongo from './database.js';

dotenv.config();

const db = await connectToMongo();

const app = express();
const port = 5000;

app.use(cors())
  .use(express.json())
  .use(routes);

app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`);
});

export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const transactionsCollection = db.collection('transactions');
