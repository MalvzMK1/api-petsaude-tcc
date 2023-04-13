import prisma from '../lib/prisma';

export default class Address {
	async updateAddress(addressID: number, address: AddressUpdateModelProps) {
		try {
			const updatedAddress = await prisma.address.update({
				where: {
					id: addressID,
				},
				data: {
					cep: address.zipCode,
					complement: address.complement,
					number: address.number,
				},
			});
			if (updatedAddress) return updatedAddress;
			return false;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}
}
