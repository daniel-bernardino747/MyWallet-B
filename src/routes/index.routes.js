import express from 'express';

import { registerClient, signIn } from '../controllers/auth.controller.js';
import { deleteOneTransaction, getAllTransaction, postTransaction } from '../controllers/transactions.controller.js';

import authValidate from '../middlewares/auth.middleware.js';
import { existingUserValidate, incorrectUserValidate } from '../middlewares/user.middleware.js';

const routes = express.Router();

// auth routes

routes.post('/sign-up', existingUserValidate, registerClient);

routes.post('/sign-in', incorrectUserValidate, signIn);

// transactions routes

routes.use(authValidate);

routes.post('/transactions', postTransaction);

routes.get('/transactions', getAllTransaction);

routes.delete('/transactions/:id', deleteOneTransaction);

export default routes;
