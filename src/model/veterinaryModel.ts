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

	async findVeterinaryById(id: number) {
		try {
			return await prisma.veterinary.findUnique({
				where: {
					id
				}
			})
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`)
		}
	}

	async updateVeterinaryPersonalInfos(
		id: number,
		body: UpdateVeterinaryPersonalInfos
	) {
		try {
			return await prisma.veterinary.update({
				where: {
					id: id,
				},
				data: {
					personName: body.personName,
					cpf: body.cpf,
					email: body.email,
					password: body.password,
					cellphoneNumber: body.cellphoneNumber,
					rg: body.rg,
					phoneNumber: body.phoneNumber,
					profileBannerPhoto: body.profileBannerPhoto,
					profilePhoto: body.profilePhoto
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateVeterinaryProfessionalInfos(id:number, body: UpdateVeterinaryProfessionalInfos) {
		try {

			return await prisma.veterinary.update({
				where:{
					id: id
				},
				data:{
					occupationArea: body.occupationArea,
					formation: body.formation,
					institution: body.institution,
					crmv: body.crmv,
					startActingDate: body.startActingDate,
					formationDate: body.formationDate,
				}
			})

		} catch (err) {

			if (err instanceof Error) throw new Error(`${err.message}`);

		}
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
				where:{
					id: id
				}
			})
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`);
		}
	}

}
