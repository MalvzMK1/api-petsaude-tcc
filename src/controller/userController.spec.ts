import { expect, it } from 'vitest';
import ClientModel from '../model/clientModel';

const model = new ClientModel();

it('Should return an array of User objects', async function () {
	const expectedEmail = 'johndoe@gmail.com';
	const allUsers = await model.findAllClients();
	expect(Array.isArray(allUsers)).toBe(true);
	expect(allUsers.every((user) => user.hasOwnProperty('email'))).toBe(true);

	const usersWithSameEmail = allUsers.filter(
		(user) => user.email === expectedEmail
	);
	expect(Array.isArray(usersWithSameEmail)).toBe(true);
	expect(
		usersWithSameEmail.every(
			(user) => user.hasOwnProperty('email') && user.email === expectedEmail
		)
	).toBe(true);
});
