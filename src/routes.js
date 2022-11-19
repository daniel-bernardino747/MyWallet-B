import express from 'express';
import { registerClient, signIn } from './controllers/auth.controller.js';
import { getAllTransaction, postTransaction } from './controllers/transactions.controller.js';
import authValidate from './middlewares/auth.middleware.js';
import { existingUserValidate, incorrectUserValidate } from './middlewares/user.middleware.js';

const routes = express.Router();

routes.post('/sign-up', existingUserValidate, registerClient);

routes.post('/sign-in', incorrectUserValidate, signIn);

routes.use(authValidate);

routes.post('/transactions', postTransaction);

routes.get('/transactions', getAllTransaction);

export default routes;
