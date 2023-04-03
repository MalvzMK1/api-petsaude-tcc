import prisma from '../lib/prisma';

export default class UserModel {
	async createUser(userInfos: CreateUserInfosModelProps) {
		try {
			return await prisma.user.create({
				data: {
					personName: userInfos.personName,
					userName: '',
					cpf: userInfos.cpf,
					email: userInfos.email,
					password: userInfos.password,
					PhoneNumber: {
						createMany: {
							data: [
								{
									number: userInfos.cellphoneNumber,
								},
								{
									number: userInfos.phoneNumber,
								},
							],
						},
					},
					Address: {
						create: {
							cep: userInfos.address.cep,
							neighborhood: userInfos.address.neighborhood,
							number: userInfos.address.number,
							street: userInfos.address.street,
							complement: userInfos.address.complement,
							cityId: userInfos.address.cityID,
						},
					},
					isVet: false,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async createVeterinary(userId: number, vetInfos: createVeterinaryModel) {
		try {
			return await prisma.vetInfos.create({
				data: {
					User: {
						connect: {
							id: userId,
						},
					},
					crmv: vetInfos.crmv,
					formation: vetInfos.formation,
					institution: vetInfos.institution,
					occupationArea: vetInfos.occupationArea,
					startActingDate: vetInfos.startActingDate,
					formationDate: vetInfos.formationDate,
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
			return await prisma.user.findMany({
				include: {
					Pet: {
						include: {
							petGender: true,
							petSize: true,
							petSpecie: true,
						},
					},
					PhoneNumber: true,
					Address: {
						include: {
							city: {
								include: {
									state: true,
								},
							},
						},
					},
					vetInfos: {
						include: {
							VeterinaryEspecialities: {
								include: {
									specialities: true,
								},
							},
							AnimalTypesVetInfos: {
								include: {
									animalTypes: true,
								},
							},
						},
					},
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findUserById(userID: number) {
		try {
			return await prisma.user.findUnique({
				where: {
					id: userID,
				},
				include: {
					Pet: {
						include: {
							petGender: true,
							petSize: true,
							petSpecie: true,
						},
					},
					PhoneNumber: true,
					Address: {
						include: {
							city: {
								include: {
									state: true,
								},
							},
						},
					},
					vetInfos: {
						include: {
							VeterinaryEspecialities: {
								include: {
									specialities: true,
								},
							},
							AnimalTypesVetInfos: {
								include: {
									animalTypes: true,
								},
							},
						},
					},
				},
			});
		} catch (err) {
			throw new Error(`ERROR: ${err}`);
		}
	}

	async findUserByEmail(userEmail: string) {
		try {
			return await prisma.user.findMany({
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
			return await prisma.user.update({
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
					isVet: userInfos.isVet,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async deleteUser(userID: number) {
		try {
			const userPhoneNumberDelete = await prisma.phoneNumber.deleteMany({
				where: {
					userId: userID,
				},
			});
			const userPetDelete = await prisma.pet.deleteMany({
				where: {
					id: userID,
				},
			});
			const animalTypesVetInfosDelete =
				await prisma.animalTypesVetInfos.deleteMany({
					where: {
						vet: {
							User: {
								every: {
									id: userID,
								},
							},
						},
					},
				});
			const veterinarySpecialitiesDelete =
				await prisma.veterinarySpecialities.deleteMany({
					where: {
						vetInfos: {
							User: {
								every: {
									id: userID,
								},
							},
						},
					},
				});
			const userVetInfos = await prisma.vetInfos.deleteMany({
				where: {
					User: {
						every: {
							id: userID,
						},
					},
				},
			});
			const userDelete = await prisma.user.deleteMany({
				where: {
					id: userID,
					Address: {},
				},
			});

			if (
				userPhoneNumberDelete &&
				userPetDelete &&
				animalTypesVetInfosDelete &&
				veterinarySpecialitiesDelete &&
				userVetInfos &&
				userDelete
			)
				return true;
			return false;
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateVetInfos(vetInfosID: number, vetInfos: UpdateVetInfosProps) {
		try {
			return await prisma.vetInfos.update({
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

	async updateIsVet(id: number, isVet: boolean) {
		try {
			return await prisma.user.update({
				where: {
					id,
				},
				data: {
					isVet,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
