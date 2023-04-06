import prisma from '../lib/prisma';

export default class UserModel {
	async createUser(userInfos: CreateUserInfosModelProps) {
		try {
			return await prisma.client.create({
				data: {
					personName: userInfos.personName,
					userName: '',
					cpf: userInfos.cpf,
					email: userInfos.email,
					password: userInfos.password,
					rg: '',
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
			throw new Error(`${err}`);
		}
	}

	async findAllUsers() {
		try {
			return await prisma.client.findMany({
				include: {
					Pet: {
						include: {
							petSpecie: true
						},
					},
					Address: true,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findUserById(userID: number) {
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

	async findUserByEmail(userEmail: string) {
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

	async updateUser(userID: number, userInfos: UpdateUserInfosProps) {
		try {
			return await prisma.client.update({
				where: {
					id: userID,
				},
				data: {
					personName: userInfos.personName,
					userName: userInfos.userName,
					cpf: userInfos.cpf,
					rg: userInfos.rg,
					profilePhoto: userInfos.profilePhoto,
					profileBannerPhoto: userInfos.profileBannerPhoto,
					email: userInfos.email,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async deleteUser(userID: number) {
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

			return !!(userPetDelete &&
				userDelete);

		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
