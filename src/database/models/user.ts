import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
	id?: number;
	user_name_: string;
	email: string;
	user_password: string;
	created_at?: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const sql = 'SELECT id, user_name_, email, created_at FROM users';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql);
			cnctn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get users. Error: ${err}`);
		}
	}

	async show(id: number): Promise<User> {
		try {
			const sql =
				'SELECT id, user_name_, email, created_at FROM users WHERE id=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find the user with id: ${id}. Error: ${err}`);
		}
	}

	async create(user: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (user_name_, email, user_password) VALUES ($1, $2, $3) RETURNING id, user_name_, email, created_at';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				user.user_name_,
				user.email,
				this.hashPassword(user.user_password),
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new user ${user}. Error: ${err}`);
		}
	}

	async delete(id: number): Promise<User> {
		try {
			const sql =
				'DELETE FROM users WHERE id=($1) RETURNING id, user_name_, email, created_at';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [id]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Couldn't delete the user with id: ${id}. Error: ${err}`);
		}
	}

	async update(id: number, user: User): Promise<User> {
		try {
			const sql =
				'UPDATE users SET user_name_=($1), email=($2), user_password=($3) WHERE id=($4) RETURNING id, user_name_, email, created_at';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [
				user.user_name_,
				user.email,
				user.user_password,
				id,
			]);
			cnctn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update the user ${user}. Error: ${err}`);
		}
	}

	hashPassword(password: string): string {
		return bcrypt.hashSync(
			`${password}${process.env.PEPPER}`,
			parseInt(process.env.SALT as string),
		);
	}

	async authenticate(user: User): Promise<User | null> {
		try {
			const sql = 'SELECT user_password FROM users WHERE email=($1)';
			const cnctn = await client.connect();
			const result = await cnctn.query(sql, [user.email]);
			cnctn.release();
			if (result.rows.length) {
				const password = result.rows[0].user_password;
				if (
					bcrypt.compareSync(
						`${user.user_password}${process.env.PEPPER}`,
						password,
					)
				) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Could not authenticate user. Error: ${err}`);
		}
	}
}
