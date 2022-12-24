import { Router } from 'express';
import * as product_controller from '../../controllers/products.controller';
import authorize from '../../middleware/authenticate';

const product_router = Router();

product_router.get('/:id', product_controller.show);
product_router.delete('/:id', authorize, product_controller.destroy);
product_router.patch('/:id', authorize, product_controller.update);
product_router.get('/', product_controller.index);
product_router.post('/', authorize, product_controller.create);

export default product_router;
