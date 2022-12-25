import client from '../database';
import { Product } from './product';

export type Order = {
	id?: number;
	user_id_: number;
	created_at?: string;
};
export type OrderProduct = {
	id?: number;
	order_id: number;
	product_id: number;
	quantity: number;
	fulfilled?: boolean;
	created_at?: string;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`);
		}
	}

	async show(id: number): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find the order with id: ${id}. Error: ${err}`);
		}
	}

	async create(order: Order, products: OrderProduct[]): Promise<Order> {
		try {
			const sql = 'INSERT INTO orders (user_id_) VALUES($1) RETURNING *';
			const sql_ =
				'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [order.user_id_]);
			for (let i = 0; i < products.length; i++) {
				await cnctn.query(sql_, [
					result.rows[0].id,
					products[i].product_id,
					products[i].quantity,
				]);
			}
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new order ${order}. Error: ${err}`);
		}
	}

	async delete(id: number): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete order with id: ${id}. Error: ${err}`);
		}
	}

	async updateOrder(id: number, order: Order): Promise<Order> {
		try {
			const sql =
				'UPDATE orders SET user_id_ = ($1) WHERE id = ($2) RETURNING * ';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [order.user_id_, id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update order ${id}. Error: ${err}`);
		}
	}

	async addProduct(id: number, product: OrderProduct): Promise<OrderProduct> {
		try {
			const sql =
				'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				id,
				product.product_id,
				product.quantity,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not add product ${product} to order ${id}. Error: ${err}`,
			);
		}
	}

	async getProductsByOrder(id: number): Promise<Product[]> {
		try {
			const sql =
				'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products for order ${id}. Error: ${err}`);
		}
	}

	async getProducts(): Promise<OrderProduct[]> {
		try {
			const sql = 'SELECT * FROM order_products';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products. Error: ${err}`);
		}
	}

	async deleteProduct(order_product_id: number): Promise<OrderProduct> {
		try {
			const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [order_product_id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not delete product with id: ${order_product_id}. Error: ${err}`,
			);
		}
	}

	async updateProduct(
		order_product_id: number,
		product: OrderProduct,
	): Promise<OrderProduct> {
		try {
			const sql =
				'UPDATE order_products SET product_id = ($1), quantity = ($2) WHERE id = ($3) RETURNING * ';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				product.product_id,
				product.quantity,
				order_product_id,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not update product ${order_product_id}. Error: ${err}`,
			);
		}
	}

	async markFulfilled(
		order_product_id: number,
		fulfilled: boolean,
	): Promise<OrderProduct> {
		try {
			const sql =
				'UPDATE order_products SET fulfilled=($1) WHERE id=($2) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [fulfilled, order_product_id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not update order ${order_product_id}. Error: ${err}`,
			);
		}
	}

	async getOrdersByUser(id: number): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders WHERE user_id_=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(
				`Could not get orders for user with id: ${id}. Error: ${err}`,
			);
		}
	}
}
