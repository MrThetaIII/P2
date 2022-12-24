import client from '../database';

export type Product = {
	id?: number;
	product_name: string;
	price: number;
	description: string;
	fulfilled?: boolean;
	created_at?: string;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM products';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products. Error: ${err}`);
		}
	}

	async show(id: number): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not find the product with id: ${id}. Error: ${err}`,
			);
		}
	}

	async create(product: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO products (product_name, price, description) VALUES ($1, $2, $3) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				product.product_name,
				product.price,
				product.description,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new product ${product}. Error: ${err}`);
		}
	}

	async delete(id: number): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete product with id: ${id}. Error: ${err}`);
		}
	}

	async update(id: number, product: Product): Promise<Product> {
		try {
			const sql =
				'UPDATE products SET product_name=($1), price=($2), description=($3) WHERE id=($4) RETURNING *';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				product.product_name,
				product.price,
				product.description,
				id,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update product ${product}. Error: ${err}`);
		}
	}
}
