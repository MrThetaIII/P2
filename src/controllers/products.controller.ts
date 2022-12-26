import { Request, Response } from 'express';
import { Product, ProductStore } from '../database/models/product';

const store = new ProductStore();

export const index = async (_req: Request, res: Response) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const show = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const product = await store.show(id);
		res.json(product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const create = async (_req: Request, res: Response) => {
	try {
		const product: Product = {
			product_name: _req.body.product_name,
			price: _req.body.price,
			description: _req.body.description,
		};
		const new_product = await store.create(product);
		res.json(new_product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const destroy = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const product = await store.delete(id);
		res.json(product);
	} catch (err) {
		res.status(400).json(err);
	}
};

export const update = async (_req: Request, res: Response) => {
	try {
		const id = parseInt(_req.params.id);
		const product: Product = {
			product_name: _req.body.product_name,
			price: _req.body.price,
			description: _req.body.description,
		};
		const updated_product = await store.update(id, product);
		res.json(updated_product);
	} catch (err) {
		res.status(400).json(err);
	}
};
