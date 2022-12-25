import { Router } from 'express';
import * as order_controller from '../../controllers/orders.controller';
import authorize from '../../middleware/authenticate';

const order_router = Router();

order_router.get('/products', authorize, order_controller.getProducts);
order_router.get('/all', authorize, order_controller.index);
order_router.patch(
	'/products/:order_product_id/fulfill',
	authorize,
	order_controller.markFulfilled,
);
order_router.delete(
	'/products/:order_product_id',
	authorize,
	order_controller.deleteProduct,
);
order_router.patch(
	'/products/:order_product_id',
	authorize,
	order_controller.updateProduct,
);
order_router.post('/:id/products', authorize, order_controller.addProduct);
order_router.get(
	'/:id/products',
	authorize,
	order_controller.getProductsByOrder,
);
order_router.get('/:id', authorize, order_controller.show);
order_router.delete('/:id', authorize, order_controller.destroy);
order_router.patch('/:id', authorize, order_controller.updateOrder);
order_router.get('/', authorize, order_controller.getOrdersByUser);
order_router.post('/', authorize, order_controller.create);

export default order_router;
