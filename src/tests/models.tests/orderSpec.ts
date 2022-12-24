import { Order, OrderStore } from '../../database/models/order';
import { User, UserStore } from '../../database/models/user';
import { Product, ProductStore } from '../../database/models/product';

const store = new OrderStore();

describe('orders model methods', () => {
	beforeAll(async () => {
		const user: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Ali',
			user_password: 'Ali',
		};
		const userStore = new UserStore();
		await userStore.create(user);
		const product: Product = {
			product_name: 'Ali',
			price: 1,
			description: 'Ali',
		};
		const productStore = new ProductStore();
		productStore.create(product);
	});
	it('Should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('Should have a show method', () => {
		expect(store.show).toBeDefined();
	});
	it('Should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});
	it('Should have a create method', () => {
		expect(store.create).toBeDefined();
	});
	it('Should have an update method', () => {
		expect(store.update).toBeDefined();
	});
	it('should have a getOrdersByUser method', () => {
		expect(store.getOrdersByUser).toBeDefined();
	});
	it('Should have a method to mark orders as fulfilled', () => {
		expect(store.markFulfilled).toBeDefined();
	});

	it('Index shall return a list of orders', async () => {
		const result = await store.index();
		expect(result).toEqual([]);
	});

	it('create method shall create an order', async () => {
		const order: Order = {
			user_id_: 1,
			product_id: 1,
			quantity: 1,
		};
		const result = await store.create(order);
		expect(result.user_id_).toEqual(order.user_id_);
	});

	it('show method shall return an order', async () => {
		const result = await store.show(1);
		expect(result.user_id_).toEqual(1);
	});

	it('update method shall update an order', async () => {
		const order = {
			user_id_: 1,
			product_id: 1,
			quantity: 2,
		};
		const result = await store.update(1, order);
		expect(result.quantity).toEqual(order.quantity);
	});

	it('getOrdersByUser method shall return a list of orders', async () => {
		const result = await store.getOrdersByUser(1);
		expect(result).toHaveSize(1);
	});

	it('markFulfilled method shall mark an order as fulfilled', async () => {
		const result = await store.markFulfilled(1, true);
		expect(result.fulfilled).toEqual(true);
	});

	afterAll(async () => {
		const userStore = new UserStore();
		await userStore.delete(1);
		const productStore = new ProductStore();
		await productStore.delete(1);
	});
});
