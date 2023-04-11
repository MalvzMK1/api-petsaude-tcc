import prisma from '../lib/prisma';

export default class ClientModel {
	async createClient(userInfos: CreateUserInfosModelProps) {
		try {
			return await prisma.client.create({
				data: {
					personName: userInfos.personName,
					userName: '',
					cpf: userInfos.cpf,
					email: userInfos.email,
					password: userInfos.password,
					profilePhoto: '',
					profileBannerPhoto: '',
					phoneNumber: userInfos.phoneNumber,
					cellphoneNumber: userInfos.cellphoneNumber,
					Address: {
						create: {
							cep: userInfos.address.zipCode,
							number: userInfos.address.number,
							complement: userInfos.address.complement,
						},
					},
				},
			});
		} catch (err) {
			console.log(err);

			throw new Error(`${err}`);
		}
	}

	async findAllClients() {
		try {
			return await prisma.client.findMany({
				include: {
					Pet: {
						include: {
							petSpecie: true,
						},
					},
					Address: true,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findClientById(userID: number) {
		try {
			return await prisma.client.findUnique({
				where: {
					id: userID,
				},
				include: {
					Pet: {
						include: {
							petSpecie: true,
						},
					},
					Address: true,
				},
			});
		} catch (err) {
			throw new Error(`ERROR: ${err}`);
		}
	}

	async findClientByEmail(userEmail: string) {
		try {
			return await prisma.client.findMany({
				where: {
					email: userEmail,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateClient(userID: number, userInfos: UpdateUserInfosProps) {
		try {
			return await prisma.client.update({
				where: {
					id: userID,
				},
				data: {
					personName: userInfos.personName,
					cpf: userInfos.cpf,
					rg: userInfos.rg,
					phoneNumber: userInfos.phoneNumber,
					cellphoneNumber: userInfos.cellphoneNumber,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async deleteClient(userID: number) {
		try {
			const userPetDelete = await prisma.pet.deleteMany({
				where: {
					id: userID,
				},
			});
			const userDelete = await prisma.client.deleteMany({
				where: {
					id: userID,
					Address: {},
				},
			});

			return !!(userPetDelete && userDelete);
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
