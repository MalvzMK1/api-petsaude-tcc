import prisma from '../lib/prisma';

export default class SpecialtiesPetModel {
	async createPetSpecialties(specialtiesPets: string) {
		try {
			return await prisma.animalTypes.create({
				data: {
					name: specialtiesPets,
				},
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
	async updatePetSpecialtiesInfos(specialtiesPet: Array<{ id: number, animalTypesId: number, veterinaryId: number }>) {

		try {

			const specialtiesPets = specialtiesPet.map(async (element) => {

				const sql = `select * from tbl_animal_type_vet_infos where animal_type_id = ${element.animalTypesId} AND vet_infos_id = ${element.veterinaryId}`

				const result = await prisma.$queryRawUnsafe(sql)

				if (result) {

					await prisma.veterinarySpecialities.update({
						where: {
							id: element.id
						},
						data:{
							veterinaryId: element.veterinaryId,
							specialitiesId: element.animalTypesId
						}
					})

				} else {
					await prisma.veterinarySpecialities.create({
						data:{
							specialitiesId: element.animalTypesId,
							veterinaryId: element.veterinaryId
						}
					})
				}

			// const specialitiesPet = specialtiesPet.map(async (element) => {
			// 	await prisma.vetInfos.update({
			// 		where:{
			// 			id: vetInfosId
			// 		},
			// 		data:{
			// 			AnimalTypesVetInfos:{
			// 				upsert:{
			// 					where:{
			// 						id: element.id,
			// 					},
			// 					create:{
			// 						animalTypesId: element.animalTypesId
			// 					},
			// 					update:{
			// 						animalTypesId: element.animalTypesId
			// 					},
			// 				},
			// 			},
			// 		},
			// 	});
			});

			return specialtiesPets

		} catch (err) {
			throw new Error(`${err}`);
		}
	}
	async DeleteSpecialtiesPet(specialtiesPetID: Array<{ id: number, animalTypesId: number, veterinaryId: number }>) {

		try {

			return specialtiesPetID.map(async (element) => {
				await prisma.animalTypesVetInfos.deleteMany({
					where: {
						animalTypesId: element.animalTypesId,
						veterinaryId: element.veterinaryId
					},
				});
			})

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

}
