import { Order, OrderProduct, OrderStore } from '../../database/models/order';
import { User, UserStore } from '../../database/models/user';
import { Product, ProductStore } from '../../database/models/product';

const store = new OrderStore();

describe('orders model methods', () => {
	beforeAll(async () => {
		const user1: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Ali',
			user_password: 'Ali',
		};
		const user2: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Alii',
			user_password: 'Ali',
		};
		const userStore = new UserStore();
		await userStore.create(user1);
		await userStore.create(user2);
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
		expect(store.updateOrder).toBeDefined();
	});
	it('should have a getOrdersByUser method', () => {
		expect(store.getOrdersByUser).toBeDefined();
	});
	it('should have a addProduct method', () => {
		expect(store.addProduct).toBeDefined();
	});
	it('should have a deleteProduct method', () => {
		expect(store.deleteProduct).toBeDefined();
	});
	it('should have a updateProduct method', () => {
		expect(store.updateProduct).toBeDefined();
	});
	it('should have a getProducts method', () => {
		expect(store.getProducts).toBeDefined();
	});
	it('should have a getProductsByOrder method', () => {
		expect(store.getProductsByOrder).toBeDefined();
	});
	it('Should have a method to mark a product in an order as fulfilled', () => {
		expect(store.markFulfilled).toBeDefined();
	});

	it('Index shall return a list of orders', async () => {
		const result = await store.index();
		expect(result).toEqual([]);
	});

	it('create method shall create an order', async () => {
		const order: Order = {
			user_id_: 1,
		};
		const result = await store.create(order, [
			{ order_id: 1, product_id: 1, quantity: 1 },
		]);
		expect(result.user_id_).toEqual(order.user_id_);
	});

	it('show method shall return an order', async () => {
		const result = await store.show(1);
		expect(result.user_id_).toEqual(1);
	});

	it('update method shall update an order', async () => {
		const order = {
			user_id_: 2,
		};
		const result = await store.updateOrder(1, order);
		expect(result.user_id_).toEqual(order.user_id_);
	});

	it('getOrdersByUser method shall return a list of orders', async () => {
		const result = await store.getOrdersByUser(2);
		expect(result).toHaveSize(1);
	});

	it('markFulfilled method shall mark a product in an order as fulfilled', async () => {
		const result = await store.markFulfilled(1, true);
		expect(result.fulfilled).toEqual(true);
	});

	it('addProduct method shall add a product to an order', async () => {
		const orderProduct: OrderProduct = {
			order_id: 1,
			product_id: 1,
			quantity: 1,
		};
		const result = await store.addProduct(orderProduct.order_id, orderProduct);
		expect(result.order_id).toEqual(orderProduct.order_id);
	});

	it('updateProduct method shall update a product in an order', async () => {
		const orderProduct: OrderProduct = {
			order_id: 1,
			product_id: 1,
			quantity: 2,
		};
		const result = await store.updateProduct(1, orderProduct);
		expect(result.quantity).toEqual(orderProduct.quantity);
	});

	it('deleteProduct method shall delete a product from an order', async () => {
		const resultA = (await store.getProducts()).length;
		await store.deleteProduct(1);
		const resultB = (await store.getProducts()).length;
		expect(resultA - resultB).toEqual(1);
	});

	it('getProducts method shall return a list of all products', async () => {
		const result = await store.getProducts();
		expect(result.length).toBeDefined();
	});

	afterAll(async () => {
		const userStore = new UserStore();
		await userStore.delete(1);
		await userStore.delete(2);
		const productStore = new ProductStore();
		await productStore.delete(1);
	});
});
