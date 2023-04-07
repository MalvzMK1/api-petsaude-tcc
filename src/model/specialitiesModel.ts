import prisma from '../lib/prisma';

export default class SpecialitiesModel {
	async createSpecialties(specialties: {name: string}[]) {
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

	async updateSpecialtiesInfos(
		specialtiesID: Array<{
			id: number;
			specialtiesId: number;
			veterinaryId: number;
		}>
	) {
		try {
			return specialtiesID.map(async (element) => {
				const sql = `select * from tbl_veterinary_specialities where specialities_id = ${element.specialtiesId} AND vet_infos_id = ${element.veterinaryId}`;

				const result = await prisma.$queryRawUnsafe(sql);

				if (result) {
					await prisma.veterinarySpecialities.update({
						where: {
							id: element.id,
						},
						data: {
							veterinaryId: element.veterinaryId,
							specialitiesId: element.specialtiesId,
						},
					});
				} else {
					await prisma.veterinarySpecialities.create({
						data: {
							specialitiesId: element.specialtiesId,
							veterinaryId: element.veterinaryId,
						},
					});
				}
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
