import supertest from 'supertest';
import app from '../app';
import { User } from '../database/models/user';
import { Product } from '../database/models/product';
import resetTables from '../database/models/testingUtil/reset.data';

const request = supertest(app);
let token: string;

describe('User endpoints', () => {
	it('[POST]/api/users/ should create a user', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const response = await request.post('/api/users/').send(user);
		token = response.body;
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/users/ should require a token to get all users', async () => {
		const response = await request.get('/api/users/');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/users/ should get all users once givin a token', async () => {
		const response = await request
			.get('/api/users/')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/users/:id should require a token to get a user', async () => {
		const response = await request.get('/api/users/1');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/users/:id should get a user once givin a token', async () => {
		const response = await request
			.get('/api/users/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[POST]/api/users/authenticate should authenticate a user', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const response = await request.post('/api/users/authenticate').send(user);
		expect(response.status).toEqual(200);
	});

	it('[PATCH]/api/users/:id should require a token to update a user', async () => {
		const response = await request.patch('/api/users/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/users/:id should update a user once givin a token', async () => {
		const user: User = {
			user_name_: 'Alii_Rajii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const response = await request
			.patch('/api/users/1')
			.send(user)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[DELETE]/api/users/:id should require a token to delete a user', async () => {
		const response = await request.delete('/api/users/1');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/users/:id should delete a user once givin a token', async () => {
		const response = await request
			.delete('/api/users/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	afterAll(async () => {
		await resetTables();
	});
});

describe('Order endpoints', () => {
	it('[POST]/api/orders/ should require a token to create an order', async () => {
		const response = await request.post('/api/orders/');
		expect(response.status).toEqual(401);
	});
	it('[POST]/api/orders/ should create an order once givin a token', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const _ = await request.post('/api/users/').send(user);
		token = _.body;
		const product: Product = {
			product_name: 'Alii',
			price: 1,
			description: 'Alii',
		};
		await request
			.post('/api/products/')
			.send(product)
			.set('Authorization', `Bearer ${token}`);
		const order = {
			user_id_: '1',
			products: [
				{
					product_id: '1',
					quantity: '2',
				},
				{
					product_id: '1',
					quantity: '3',
				},
			],
		};
		const response = await request
			.post('/api/orders/')
			.send(order)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/orders/all should require a token to get all orders', async () => {
		const response = await request.get('/api/orders/all');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/all should get all orders once givin a token', async () => {
		const response = await request
			.get('/api/orders/all')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/orders/:id should require a token to get an order', async () => {
		const response = await request.get('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/:id should get an order once givin a token', async () => {
		const response = await request
			.get('/api/orders/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[PATCH]/api/orders/:id should require a token to update an order', async () => {
		const response = await request.patch('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/orders/:id should update an order once givin a token', async () => {
		const order = {
			user_id_: '1',
		};
		const response = await request
			.patch('/api/orders/1')
			.send(order)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[PATCH]/api/orders/products/:id/fulfill should require a token to mark a product as fulfilled', async () => {
		const response = await request.patch('/api/orders/products/1/fulfill');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/orders/products/:id/fulfill should mark a product as fulfilled once givin a token', async () => {
		const response = await request
			.patch('/api/orders/products/1/fulfill')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/orders/ should require a token to get all orders by the current user', async () => {
		const response = await request.get('/api/orders/');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/ should get all orders by the current user once givin a token', async () => {
		const response = await request
			.get('/api/orders/')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/orders/products should require a token to get all products', async () => {
		const response = await request.get('/api/orders/products');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/products should get all products once givin a token', async () => {
		const response = await request
			.get('/api/orders/products')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/orders/:id/products should require a token to get all products by order', async () => {
		const response = await request.get('/api/orders/1/products');
		expect(response.status).toEqual(401);
	});
	it('[GET]/api/orders/:id/products should get all products by order once givin a token', async () => {
		const response = await request
			.get('/api/orders/1/products')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[POST]/api/orders/:id/products should require a token to add a product to an order', async () => {
		const response = await request.post('/api/orders/1/products');
		expect(response.status).toEqual(401);
	});
	it('[POST]/api/orders/:id/products should add a product to an order once givin a token', async () => {
		const product = {
			product_id: '1',
			quantity: '3',
		};
		const response = await request
			.post('/api/orders/1/products')
			.send(product)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[PATCH]/api/orders/products/:id should require a token to update a product', async () => {
		const response = await request.patch('/api/orders/products/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/orders/products/:id should update a product once givin a token', async () => {
		const product = {
			order_id: '1',
			product_id: '1',
			quantity: '3',
		};
		const response = await request
			.patch('/api/orders/products/1')
			.send(product)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[DELETE]/api/orders/products/:id should require a token to delete a product', async () => {
		const response = await request.delete('/api/orders/products/1');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/orders/products/:id should delete a product once givin a token', async () => {
		const response = await request
			.delete('/api/orders/products/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[DELETE]/api/orders/:id should require a token to delete an order', async () => {
		const response = await request.delete('/api/orders/1');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/orders/:id should delete an order once givin a token', async () => {
		const response = await request
			.delete('/api/orders/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	afterAll(async () => {
		await resetTables();
	});
});

describe('Product endpoints', () => {
	it('[POST]/api/products/ should require a token to create a product', async () => {
		const response = await request.post('/api/products/');
		expect(response.status).toEqual(401);
	});
	it('[POST]/api/products/ should create a product once given a token', async () => {
		const user: User = {
			user_name_: 'Alii',
			email: 'Ali@Ali.Aliii',
			user_password: 'Alii',
		};
		const _ = await request.post('/api/users/').send(user);
		token = _.body;
		const product: Product = {
			product_name: 'Alii',
			price: 1,
			description: 'Alii',
		};
		const response = await request
			.post('/api/products/')
			.send(product)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/products/ should return all products', async () => {
		const response = await request.get('/api/products/');
		expect(response.status).toEqual(200);
	});

	it('[GET]/api/products/:id should return a product', async () => {
		const response = await request.get('/api/products/1');
		expect(response.status).toEqual(200);
	});

	it('[PATCH]/api/products/:id should require a token to update a product', async () => {
		const response = await request.patch('/api/products/1');
		expect(response.status).toEqual(401);
	});
	it('[PATCH]/api/products/:id should update a product once given a token', async () => {
		const product: Product = {
			product_name: 'Alii',
			price: 1,
			description: 'Alii',
		};
		const response = await request
			.patch('/api/products/1')
			.send(product)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('[DELETE]/api/products/:id should require a token to delete a product', async () => {
		const response = await request.delete('/api/products/1');
		expect(response.status).toEqual(401);
	});
	it('[DELETE]/api/products/:id should delete a product once given a token', async () => {
		const response = await request
			.delete('/api/products/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	afterAll(async () => {
		await resetTables();
	});
});
