import prisma from '../lib/prisma';

export default class VeterinaryModel {
	async createVeterinary(veterinary: createVeterinaryModel) {
		try {
			return await prisma.veterinary.create({
				data: {
					personName: veterinary.personName,
					userName: '',
					cpf: veterinary.cpf,
					email: veterinary.email,
					password: veterinary.password,
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
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async getAllVeterinarys() {
		try {
			return await prisma.veterinary.findMany({
				include: {
					Address: true,
					VeterinaryEspecialities: {
						include: {
							specialities: true,
						},
					},
					PetSpecieVeterinary: {
						include: {
							PetSpecie: true
						}
					},
					Appointments: true,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findVeterinaryById(userID: number) {
		try {
			return await prisma.veterinary.findUnique({
				where: {
					id: userID,
				},
				include: {
					PetSpecieVeterinary: true,
					VeterinaryEspecialities: true,
					Address: true,
					Appointments: true
				},
			});
		} catch (err) {
			throw new Error(`ERROR: ${err}`);
		}
	}

	async updateVeterinaryPersonalInfos(userID: number, userInfos: UpdateClientPersonalInfosProps) {
		return await prisma.veterinary.update({
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
	}

	async updateVeterinaryProfileInfos(veterinaryID: number, veterinaryInfos: UpdateClientProfileInfosProps) {
		return await prisma.veterinary.update({
			where: {
				id: veterinaryID
			},
			data: {
				...veterinaryInfos
			}
		})
	}

	async updateVeterinaryProfessionalInfos(id: number, body: UpdateVeterinaryProfessionalInfos) {
			const result = await prisma.veterinary.update({
				where: {
					id: id
				},
				data: {
					occupationArea: body.occupationArea,
					formation: body.formation,
					institution: body.institution,
					crmv: body.crmv,
					startActingDate: body.startActingDate,
					formationDate: body.formationDate
				}
			})

			console.log(result);

			return result
	}

	async findVeterinarysByCrmv(crmv: string) {
		try {
			return await prisma.veterinary.findMany({
				where: {
					crmv: crmv,
				},
			});
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`);
		}
	}

	async findVeterinarysByEmail(email: string) {
		try {
			// prisma.veterinary
			// 	.findUnique({
			// 		where: {
			// 			email: 'dedeco@gmail.com',
			// 		},
			// 	})
			// 	.then((response) => console.log(response));
			console.log(email);

			return await prisma.veterinary.findUnique({
				where: {
					email: email,
				},
			});
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`);
		}
	}

	async deleteVeterinary(id: number) {
		try {
			return await prisma.veterinary.delete({
				where: {
					id: id
				}
			})
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`);
		}
	}

}
