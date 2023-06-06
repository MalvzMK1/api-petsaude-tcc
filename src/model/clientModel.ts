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
					Appointments: true
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
					Appointments: true
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

	async updateClientPersonalInfos(userID: number, userInfos: UpdateClientPersonalInfosProps) {
		return prisma.client.update({
			where: {
				id: userID,
			},
			data: {
				personName: userInfos.personName,
				cpf: userInfos.cpf,
				rg: userInfos.rg,
				phoneNumber: userInfos.phoneNumber,
				cellphoneNumber: userInfos.cellphoneNumber,
				biography: userInfos.bio
			},
		});
	}

	async updateClientProfileInfos(clientID: number, clientInfos: UpdateClientProfileInfosProps) {
		return await prisma.client.update({
			where: {
				id: clientID
			},
			data: {
				...clientInfos
			}
		})
	}

	async deleteClient(userID: number) {
		try {
			const deleteAppointments = await prisma.appointment.deleteMany({
				where: {
					clientId: userID
				}
			})
			const userPetDelete = await prisma.pet.deleteMany({
				where: {
					ownerId: userID,
				}
			});
			const userDelete = await prisma.client.deleteMany({
				where: {
					id: userID,
					Address: {},
				},
			});

			return !!(userPetDelete && userDelete && deleteAppointments);
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
