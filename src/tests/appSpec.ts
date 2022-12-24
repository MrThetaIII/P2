import supertest from 'supertest';
import app from '../app';
import { User } from '../database/models/user';

const request = supertest(app);

describe('User endpoints', () => {
	it('[GET]/api/users/ should require a token to get all users', async () => {
		const response = await request.get('/api/users/');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/users/:id should require a token to get a user', async () => {
		const response = await request.get('/api/users/1');
		expect(response.status).toEqual(401);
	});
	it('[POST]/api/users/ should create a user', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const response = await request.post('/api/users/').send(user);
		expect(response.status).toEqual(200);
	});
	it('[POST]/api/users/authenticate should require a token to authenticate a user', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const response = await request.post('/api/users/authenticate').send(user);
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/users/:id should require a token to delete a user', async () => {
		const response = await request.delete('/api/users/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/users/:id should require a token to update a user', async () => {
		const response = await request.patch('/api/users/1');
		expect(response.status).toEqual(401);
	});
});

describe('Order endpoints', () => {
	it('[GET]/api/orders/all should require a token to get all orders', async () => {
		const response = await request.get('/api/orders/all');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/:id should require a token to get an order', async () => {
		const response = await request.get('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[POST]/api/orders/ should require a token to create an order', async () => {
		const response = await request.post('/api/orders/');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/orders/:id should require a token to delete an order', async () => {
		const response = await request.delete('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/orders/:id should require a token to update an order', async () => {
		const response = await request.patch('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/orders/fulfill/:id should require a token to mark an order as fulfilled', async () => {
		const response = await request.patch('/api/orders/fulfill/1');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/ should require a token to get all orders by the current user', async () => {
		const response = await request.get('/api/orders/');
		expect(response.status).toEqual(401);
	});
});

describe('Product endpoints', () => {
	it('[GET]/api/products/ should return all products', async () => {
		const response = await request.get('/api/products/');
		expect(response.status).toEqual(200);
	});
	it('[GET]/api/products/:id should return a product', async () => {
		const response = await request.get('/api/products/1');
		expect(response.status).toEqual(200);
	});
	it('[POST]/api/products/ should require a token to create a product', async () => {
		const response = await request.post('/api/products/');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/products/:id should require a token to delete a product', async () => {
		const response = await request.delete('/api/products/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/products/:id should require a token to update a product', async () => {
		const response = await request.patch('/api/products/1');
		expect(response.status).toEqual(401);
	});
});
