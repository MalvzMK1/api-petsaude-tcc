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
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async getAllVeterinarys() {
		try {
			const allVeterinary = await prisma.veterinary.findMany({
				include: {
					Address: true,
					VeterinaryEspecialities: true,
					AnimalTypesVetInfos: true,
					Appointments: true,
				},
			});
			if (allVeterinary.length > 0) return allVeterinary;
			return false;
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err}`);
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
}
