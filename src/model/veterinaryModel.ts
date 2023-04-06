import prisma from "../lib/prisma";

export default class VeterinaryModel {
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
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateVeterinaryPersonalInfos(veterinaryID: number, veterinary: UpdateVeterinaryProps) {
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
}
