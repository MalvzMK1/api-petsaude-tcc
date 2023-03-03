import prisma from '../lib/prisma';

export default class SpecialtiesModel {
	async createSpecialties(specialties: string) {
		try {
			return await prisma.specialities.create({
				data: {
					name: specialties,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
