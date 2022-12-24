import { Router } from 'express';
import * as order_controller from '../../controllers/orders.controller';
import authorize from '../../middleware/authenticate';

const order_router = Router();

order_router.patch('/fulfill/:id', authorize, order_controller.markFulfilled);
order_router.get('/all', authorize, order_controller.index);
order_router.get('/:id', authorize, order_controller.show);
order_router.delete('/:id', authorize, order_controller.destroy);
order_router.patch('/:id', authorize, order_controller.update);
order_router.get('/', authorize, order_controller.getOrdersByUser);
order_router.post('/', authorize, order_controller.create);

export default order_router;
