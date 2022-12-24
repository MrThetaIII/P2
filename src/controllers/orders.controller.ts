import { Response, Request } from 'express';
import { Order, OrderStore } from '../database/models/order';

const store = new OrderStore();

export const index = async (_req: Request, res: Response) => {
	const orders = await store.index();
	res.json(orders);
};

export const show = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const order = await store.show(id);
	res.json(order);
};

export const create = async (_req: Request, res: Response) => {
	const order: Order = {
		user_id_: _req.body.user.user.id,
		product_id: _req.body.product_id,
		quantity: _req.body.quantity,
	};
	const new_order = await store.create(order);
	res.json(new_order);
};

export const destroy = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const order = await store.delete(id);
	res.json(order);
};

export const update = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const order: Order = {
		user_id_: _req.body.user.user.id,
		product_id: _req.body.product_id,
		quantity: _req.body.quantity,
	};
	const updated_order = await store.update(id, order);
	res.json(updated_order);
};

export const getOrdersByUser = async (_req: Request, res: Response) => {
	const id = parseInt(_req.body.user.user.id);
	const orders = await store.getOrdersByUser(id);
	res.json(orders);
};

export const markFulfilled = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const order = await store.markFulfilled(id, true);
	res.json(order);
};
