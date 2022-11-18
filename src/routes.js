import express from 'express';
import { registerClient, signIn } from './controllers/auth.controller.js';
import { getAllTransaction, postTransaction } from './controllers/transactions.controller.js';

const routes = express.Router();

routes.post('/sign-up', registerClient);

routes.post('/sign-in', signIn);

routes.post('/transactions', postTransaction);

routes.get('/transactions', getAllTransaction);

export default routes;
