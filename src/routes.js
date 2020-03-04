import { Router } from 'express';

import MessageController from './app/controllers/MessageController';

const routes = new Router();

routes.post('/messages/:phone', MessageController.store);

export default routes;
