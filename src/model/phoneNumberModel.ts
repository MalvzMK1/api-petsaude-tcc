import prisma from '../lib/prisma';

export default class UserModel {
	async createPhone(userID: number, PhoneNumber: string) {
		try {
			return await prisma.phoneNumber.create({
				data: {
					number: PhoneNumber,
					userId: userID,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
	async updatePhone(phoneID: number, phoneNumber: string) {
		try {
			return await prisma.phoneNumber.update({
				where: {
					id: phoneID,
				},
				data: {
					number: phoneNumber,
				},
			});
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}
}
