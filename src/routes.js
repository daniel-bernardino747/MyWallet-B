import express from 'express';
import { registerClient, signIn } from './controllers/auth.controller.js';

const routes = express.Router();

routes.post('/sign-up', registerClient);

routes.post('/sign-in', signIn);

export default routes;
