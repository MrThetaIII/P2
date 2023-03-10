import { User, UserStore } from '../../database/models/user';
import resetTables from '../../database/models/testingUtil/reset.data';

const store = new UserStore();

describe('users model methods', () => {
	it('Should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('Should have a show method', () => {
		expect(store.show).toBeDefined();
	});
	it('Should have an authentication method', () => {
		expect(store.authenticate).toBeDefined();
	});
	it('Should have an encrypting method', () => {
		expect(store.hashPassword).toBeDefined();
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

	it('Index shall return a list of users', async () => {
		const result = await store.index();
		expect(result.length).toBeDefined;
	});

	it('create method shall create a user', async () => {
		const user: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Ali1',
			user_password: 'Ali',
		};
		const result = await store.create(user);
		expect(result.user_name_).toEqual(user.user_name_);
	});

	it('show method shall return a user', async () => {
		const result = await store.show(1);
		expect(result.user_name_).toEqual('Ali');
	});

	it('authenticate method shall return a user', async () => {
		const user: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Ali1',
			user_password: 'Ali',
		};
		const result = await store.authenticate(user);
		expect(result).toBeTruthy();
	});

	it('update method shall update a user', async () => {
		const user: User = {
			user_name_: 'Ali',
			email: 'Ali@Ali.Ali3',
			user_password: 'Ali',
		};
		const result = await store.update(1, user);
		expect(result.email).toEqual(user.email);
	});

	it('delete method shall delete a user', async () => {
		await store.delete(1);
		const result = await store.index();
		expect(result).toHaveSize(0);
	});

	afterAll(async () => {
		await resetTables();
	});
});
