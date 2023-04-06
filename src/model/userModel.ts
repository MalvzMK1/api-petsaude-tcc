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

	async createVeterinary(userId: number, veterinary: createVeterinaryModel) {
		try {
			return await prisma.veterinary.create({
				data: {
					personName: veterinary.personName,
					userName: '',
					cpf: veterinary.cpf,
					email: veterinary.email,
					password: veterinary.password,
					rg: '',
					profilePhoto: '',
					profileBannerPhoto: '',
					phoneNumber: veterinary.phoneNumber,
					cellphoneNumber: veterinary.cellphoneNumber,
					Address: {
						create: {
							cep: veterinary.address.zipCode,
							number: veterinary.address.number,
							complement: veterinary.address.complement,
						},
					},
					crmv: veterinary.crmv,
					formation: veterinary.formation,
					institution: veterinary.institution,
					occupationArea: veterinary.occupationArea,
					startActingDate: veterinary.startActingDate,
					formationDate: veterinary.formationDate,
				},
			});
			// return await prisma.user.update({
			// 	where: {
			// 		id: userId
			// 	},
			// 	data: {
			// 		vetInfos: {
			// 			create: {
			// 				crmv: vetInfos.crmv,
			// 				formation: vetInfos.formation,
			// 				institution: vetInfos.institution,
			// 				occupationArea: vetInfos.occupationArea,
			// 				startActingDate: vetInfos.startActingDate,
			// 				formationDate: vetInfos.formationDate,
			// 			}
			// 		}
			// 	},
			// 	include: {
			// 		vetInfos: true
			// 	}
			// })
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

	async updateVetInfos(vetInfosID: number, vetInfos: UpdateVetInfosProps) {
		try {
			return await prisma.veterinary.update({
				where: {
					id: vetInfosID,
				},
				data: {
					crmv: vetInfos.crmv,
					formation: vetInfos.formation,
					institution: vetInfos.institution,
					occupationArea: vetInfos.occupationArea,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
