import client from '../../database';

const resetTables = async (): Promise<void> => {
	try {
		const sql_requests = [
			'DELETE FROM order_products',
			'DELETE FROM orders',
			'DELETE FROM products',
			'DELETE FROM users',
			'ALTER SEQUENCE orders_id_seq RESTART WITH 1',
			'ALTER SEQUENCE order_products_id_seq RESTART WITH 1',
			'ALTER SEQUENCE users_id_seq RESTART WITH 1',
			'ALTER SEQUENCE products_id_seq RESTART WITH 1',
		];

		const cnctn = await client.connect();
		for (const sql of sql_requests) {
			await cnctn.query(sql);
		}
	} catch (err) {
		throw new Error(`Could not reset the tables. Error: ${err}`);
	}
};

export default resetTables;
