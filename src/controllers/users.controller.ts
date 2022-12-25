import { Request, Response } from 'express';
import { User, UserStore } from '../database/models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

export const index = async (_req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};

export const show = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const user = await store.show(id);
	res.json(user);
};

export const create = async (_req: Request, res: Response) => {
	const user: User = {
		user_name_: _req.body.user_name_,
		email: _req.body.email,
		user_password: _req.body.user_password,
	};
	const new_user = await store.create(user);
	const token = jwt.sign({ user: new_user }, process.env.JWT_SECRET as string);
	res.json(token);
};

export const destroy = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const user = await store.delete(id);
	res.json(user);
};

export const update = async (_req: Request, res: Response) => {
	const id = parseInt(_req.params.id);
	const user: User = {
		user_name_: _req.body.user_name_,
		email: _req.body.email,
		user_password: _req.body.user_password,
	};
	const updated_user = await store.update(id, user);
	res.json(updated_user);
};

export const authenticate = async (_req: Request, res: Response) => {
	const user: User = {
		user_name_: _req.body.user_name_,
		email: _req.body.email,
		user_password: _req.body.user_password,
	};
	const auth_user = await store.authenticate(user);
	if (!auth_user) {
		res.status(401).json({ message: 'Wrong Email or password' });
	} else {
		const token = jwt.sign(
			{ user: auth_user },
			process.env.JWT_SECRET as string,
		);
		res.json(token);
	}
};
