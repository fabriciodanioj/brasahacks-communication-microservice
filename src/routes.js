import { Router } from 'express';

import MessageController from './app/controllers/MessageController';
import TTSController from './app/controllers/TTSController';

const routes = new Router();

routes.post('/messages/:phone', MessageController.store);
routes.get('/messages/:phone', MessageController.show);

routes.post('/tts/:phone', TTSController.store);
routes.get('/tts/:phone', TTSController.show);

export default routes;
