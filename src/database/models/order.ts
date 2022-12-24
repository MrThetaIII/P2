import client from '../database';

export type Order = {
	id?: number;
	user_id_: number;
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

	async create(order: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (user_id_, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				order.user_id_,
				order.product_id,
				order.quantity,
			]);
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

	async update(id: number, order: Order): Promise<Order> {
		try {
			const sql =
				'UPDATE orders SET user_id_=($1), product_id=($2), quantity=($3) WHERE id=($4) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				order.user_id_,
				order.product_id,
				order.quantity,
				id,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update order ${order}. Error: ${err}`);
		}
	}

	async markFulfilled(id: number, fulfilled: boolean): Promise<Order> {
		try {
			const sql = 'UPDATE orders SET fulfilled=($1) WHERE id=($2) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [fulfilled, id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update order ${id}. Error: ${err}`);
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
