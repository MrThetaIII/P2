import { Product, ProductStore } from '../../database/models/product';
import resetTables from '../../database/models/testingUtil/reset.data';

const store = new ProductStore();

describe('products model methods', () => {
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

	it('Index shall return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([]);
	});

	it('create method shall create a product', async () => {
		const product: Product = {
			product_name: 'Ali',
			price: 1,
			description: 'Ali',
		};
		const result = await store.create(product);
		expect(result.product_name).toEqual(product.product_name);
	});

	it('show method shall return a product', async () => {
		const result = await store.show(1);
		expect(result.product_name).toEqual('Ali');
	});

	it('update method shall update a product', async () => {
		const product = {
			product_name: 'Ali',
			price: 2,
			description: 'Ali',
		};
		const result = await store.update(1, product);
		expect(result.price).toBeCloseTo(2);
	});

	it('delete method shall delete a product', async () => {
		await store.delete(1);
		const result = await store.index();
		expect(result).toHaveSize(0);
	});

	afterAll(async () => {
		await resetTables();
	});
});
