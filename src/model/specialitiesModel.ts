import prisma from '../lib/prisma';

export default class SpecialitiesModel {
	async createSpecialties(specialties: { name: string }[]) {
		try {
			return await prisma.specialities.createMany({
				data: specialties,
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findAllSpecialities() {
		try {
			return await prisma.specialities.findMany();
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findSpecialitiesVeterinary(id: number) {
		try {
			return await prisma.veterinarySpecialities.findMany({
				where: {
					veterinaryId: id
				},
				include: {
					specialities: true
				}
			})
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async findSpecialityById(id: number) {
		try {
			return await prisma.specialities.findUnique({
				where: {
					id: id
				}
			})
		} catch (err) {
			throw new Error(`${err}`)
		}
	}

	async updateSpecialtiesInfos(
		specialtiesID: Array<{
			id: number;
			specialtiesId: number;
			veterinaryId: number;
		}>
	) {
		try {
			return specialtiesID.map(async (element) => {
				await prisma.veterinarySpecialities.create({
					data:{
						specialitiesId: element.specialtiesId,
						veterinaryId: element.veterinaryId
					}
				});
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async DeleteSpecialtiesInfos(
		specialtiesID: Array<{
			id: number;
			specialtiesId: number;
			veterinaryId: number;
		}>
	) {
		try {
			return specialtiesID.map(async (element) => {
				await prisma.veterinarySpecialities.deleteMany({
					where: {
						specialitiesId: element.specialtiesId,
						veterinaryId: element.veterinaryId,
					},
				});
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
