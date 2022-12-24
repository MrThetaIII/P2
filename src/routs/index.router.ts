import { Router } from 'express';
import user_router from './rest/users.router';
import product_router from './rest/products.router';
import order_router from './rest/orders.router';

const router = Router();

router.use('/users', user_router);
router.use('/products', product_router);
router.use('/orders', order_router);

export default router;
