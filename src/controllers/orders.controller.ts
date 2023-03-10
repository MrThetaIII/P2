import { Response, Request } from 'express';
import { Order, OrderProduct, OrderStore } from '../database/models/order';

const store = new OrderStore();

export const index = async (_req: Request, res: Response) => {
	try {
		const orders = await store.index();
		res.json(orders);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const show = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const order = await store.show(id);
		res.json(order);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const create = async (_req: Request, res: Response) => {
	try {
		const order: Order = {
			user_id_: _req.body.user.user.id,
		};
		const products: OrderProduct[] = _req.body.products;
		const new_order = await store.create(order, products);
		res.json(new_order);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const destroy = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const order = await store.delete(id);
		res.json(order);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const updateOrder = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const order: Order = {
			user_id_: _req.body.user.user.id,
		};
		const updated_order = await store.updateOrder(id, order);
		res.json(updated_order);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const addProduct = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const product: OrderProduct = {
			order_id: id,
			product_id: _req.body.product_id,
			quantity: _req.body.quantity,
		};
		const new_product = await store.addProduct(id, product);
		res.json(new_product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const deleteProduct = async (_req: Request, res: Response) => {
	try {
		const order_product_id = parseInt(_req.params.order_product_id);
		const deleted_product = await store.deleteProduct(order_product_id);
		res.json(deleted_product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const updateProduct = async (_req: Request, res: Response) => {
	try {
		const order_product_id = parseInt(_req.params.order_product_id);
		const product: OrderProduct = {
			order_id: _req.body.order_id,
			product_id: _req.body.product_id,
			quantity: _req.body.quantity,
		};
		const updated_product = await store.updateProduct(
			order_product_id,
			product,
		);
		res.json(updated_product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const getProductsByOrder = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const products = await store.getProductsByOrder(id);
		res.json(products);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const getProducts = async (_req: Request, res: Response) => {
	try {
		const products = await store.getProducts();
		res.json(products);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const getOrdersByUser = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.body.user.user.id);
		const orders = await store.getOrdersByUser(id);
		res.json(orders);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const markFulfilled = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.order_product_id);
		const order = await store.markFulfilled(id, true);
		res.json(order);
	} catch (err) {
		res.status(400).json(err);
	}
};
