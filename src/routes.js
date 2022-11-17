import express from 'express';
import { registerClient } from './controllers/auth.controller.js';

const routes = express.Router();

routes.post('/sign-up', registerClient);

export default routes;
