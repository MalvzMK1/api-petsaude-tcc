import prisma from '../lib/prisma';
import {
	CreateUserInfosProps,
	UpdateUserInfosProps,
	UpdateVetInfosProps,
} from '../lib/userInfosProps';

export default class UserModel {
	async createUser(userInfos: CreateUserInfosProps) {
		try {
			if (!userInfos.isVet) {
				return await prisma.user.create({
					data: {
						userName: userInfos.userName,
						personName: userInfos.personName,
						cpf: userInfos.cpf,
						rg: userInfos.rg,
						email: userInfos.email,
						password: userInfos.password,
						isVet: userInfos.isVet,
						profilePhoto: userInfos.profilePhoto,
						profileBannerPhoto: userInfos.profileBannerPhoto,
						Address: {
							create: {
								cep: userInfos.cep,
								number: userInfos.number,
								street: userInfos.street,
								complement: userInfos.complement,
								neighborhood: userInfos.neighborhood,
								city: {
									connectOrCreate: {
										where: {
											id: userInfos.cityId,
										},
										create: {
											name: userInfos.cityName,
											stateId: userInfos.stateId,
										},
									},
								},
							},
						},
						PhoneNumber: {
							create: {
								number: userInfos.phoneNumber[0].number,
							},
						},
					},
				});
			} else if (userInfos.vetInfos)
				return await prisma.user.create({
					data: {
						userName: userInfos.userName,
						personName: userInfos.personName,
						cpf: userInfos.cpf,
						rg: userInfos.rg,
						email: userInfos.email,
						password: userInfos.password,
						isVet: userInfos.isVet,
						profilePhoto: userInfos.profilePhoto,
						profileBannerPhoto: userInfos.profileBannerPhoto,
						Address: {
							create: {
								cep: userInfos.cep,
								number: userInfos.number,
								street: userInfos.street,
								complement: userInfos.complement,
								neighborhood: userInfos.neighborhood,
								city: {
									connectOrCreate: {
										where: {
											id: userInfos.cityId,
										},
										create: {
											name: userInfos.cityName,
											stateId: userInfos.stateId,
										},
									},
								},
							},
						},
						vetInfos: {
							create: {
								crmv: userInfos.vetInfos.crmv,
								formation: userInfos.vetInfos.formation,
								occupationArea: userInfos.vetInfos.occupationArea,
								institution: userInfos.vetInfos.institution,
								AnimalTypesVetInfos: {
									create: {
										animalTypes: {
											create: {
												name: userInfos.vetInfos.animalTypes[0].name,
											},
										},
									},
								},
								VeterinaryEspecialities: {
									create: {
										specialities: {
											create: {
												name: userInfos.vetInfos.specialities[0].name,
											},
										},
									},
								},
							},
						},
					},
				});
			return false;
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

	async getSpecialities(vetInfosId: number){
		try {
			const specialties = await prisma.vetInfos.findUnique({
				where:{
					id: vetInfosId
				},
				include:{
					VeterinaryEspecialities:{
						include:{
							specialities:true
						}
					}
				}
			})

			return specialties?.VeterinaryEspecialities

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateSpecialtiesInfos(vetInfosId: number, specialtiesID: Array<{ id:number , specialtiesId: number, vetInfosId: number}>) {
		try {

			const specialties = specialtiesID.map(async (element) => {
				await prisma.vetInfos.update({
					where: {
						id: element.vetInfosId
					},
					data:{
						VeterinaryEspecialities:{
							upsert:{
								where:{
									id: element.id
								},
								create:{
									specialitiesId: element.specialtiesId
								},
								update:{
									specialitiesId: element.specialtiesId
								}
							}
						}
					}
				});
			});

			return specialties

		} catch (err) { 
			throw new Error(`${err}`);
		}
	}
	async updatePetSpecialtiesInfos(vetInfosId: number, specialtiesPet: Array<{ id:number , animalTypesId: number, vetInfosId: number}>) {
		try {

			const specialties = specialtiesPet.map(async (element) => {
				await prisma.vetInfos.update({
					where: {
						id: element.vetInfosId
					},
					data:{
						AnimalTypesVetInfos:{
							upsert:{
								where:{
									id: element.id
								},
								create:{
									animalTypesId: element.animalTypesId
								},
								update:{
									animalTypesId: element.animalTypesId
								}
							}
						}
					}
				});
			});

			return specialties

		} catch (err) { 
			throw new Error(`${err}`);
		}
	}

}
