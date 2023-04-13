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
			throw new Error(`${err.message}`);
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
					AnimalTypesVetInfos: {
						include: {
							animalTypes: true,
						},
					},
					Appointments: true,
				},
			});
		} catch (err) {
			throw new Error(`${err.message}`);
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
		veterinaryID: number,
		veterinary: UpdateVeterinaryProps
	) {
		try {
			return await prisma.veterinary.update({
				where: {
					id: veterinaryID,
				},
				data: {
					personName: veterinary.personName,
					rg: veterinary.rg,
					phoneNumber: veterinary.phoneNumber,
					cellphoneNumber: veterinary.cellphoneNumber,
					// TODO: BIO FOR USER TABLE
					// bio: veterinary.bio,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
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
}
