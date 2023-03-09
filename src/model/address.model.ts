import { AddressUpdateModelProps } from '../lib/addressProps';
import prisma from '../lib/prisma';

export default class Address {
	async updateAddress(addressID: number, address: AddressUpdateModelProps) {
		try {
			const updatedAddress = await prisma.address.update({
				where: {
					id: addressID,
				},
				data: {
					cep: address.cep,
					cityId: address.cityID,
					complement: address.complement,
					neighborhood: address.neighborhood,
					number: address.number,
					street: address.street,
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

export class AddressComplements {
	async getCityByName(cityName: string) {
		try {
			const city = await prisma.city.findMany({
				where: {
					name: cityName,
				},
			});
			if (city.length > 0) return city[0];
			return null;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}
	async getStateByName(stateName: string) {
		try {
			const state = await prisma.state.findMany({
				where: {
					name: stateName,
				},
			});
			if (state.length > 0) return state[0];
			return null;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}
}
