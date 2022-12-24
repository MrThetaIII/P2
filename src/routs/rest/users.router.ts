import { Router } from 'express';
import * as user_controller from '../../controllers/users.controller';
import authorize from '../../middleware/authenticate';

const user_router = Router();

user_router.get('/:id', authorize, user_controller.show);
user_router.delete('/:id', authorize, user_controller.destroy);
user_router.post('/authenticate', authorize, user_controller.authenticate);
user_router.patch('/:id', authorize, user_controller.update);
user_router.get('/', authorize, user_controller.index);
user_router.post('/', user_controller.create);

export default user_router;
