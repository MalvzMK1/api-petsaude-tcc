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

	async getSpecialities(vetInfosId: number){
		try {

			const specialties = await prisma.veterinary.findUnique({

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

			return specialties?.VeterinaryEspecialities;

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updateSpecialtiesInfos( specialtiesID: Array<{ id: number, specialtiesId: number, veterinaryId: number }>) {

		try {

			return specialtiesID.map(async (element) => {
				const sql = `select * from tbl_veterinary_specialities where specialities_id = ${element.specialtiesId} AND vet_infos_id = ${element.veterinaryId}`

				const result = await prisma.$queryRawUnsafe(sql)

				if (result) {

					await prisma.veterinarySpecialities.update({
						where: {
							id: element.id
						},
						data: {
							veterinaryId: element.veterinaryId,
							specialitiesId: element.specialtiesId
						}
					})

				} else {
					await prisma.veterinarySpecialities.create({
						data: {
							specialitiesId: element.specialtiesId,
							veterinaryId: element.veterinaryId
						}
					})
				}
				// // await prisma.vetInfos.upsert({
				// // 	where: {
				// // 		id: vetInfosId
				// // 	},
				// // 	update:{
				// // 		VeterinaryEspecialities:{
				// // 			update:{
				// // 				where:{

				// // 				}
				// // 				data:{

				// // 				}
				// // 			}
				// // 		}
				// // 	}
				// // 	create:{
				// // 		VeterinaryEspecialities:{
				// // 			create:{
				// // 				specialitiesId: element.specialtiesId
				// // 			}
				// // 		}
				// // 	}
				// // 	data: {
				// // 		VeterinaryEspecialities: {
				// // 			upsert: {
				// // 				where: {
				// // 					id: element.id
				// // 				},
				// // 				create: {
				// // 					specialitiesId: element.specialtiesId
				// // 				},
				// // 				update: {
				// // 					specialitiesId: element.specialtiesId
				// // 				}
				// // 			}
				// // 		}
				// // 	}
				// });
			})

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async DeleteSpecialtiesInfos( specialtiesID: Array<{ id: number, specialtiesId: number, veterinaryId: number }>) {

		try {

			return specialtiesID.map(async (element) => {
				await prisma.veterinarySpecialities.deleteMany({
					where: {
						specialitiesId: element.specialtiesId,
						veterinaryId: element.veterinaryId
						// vetInfosId: vetInfosId
					},
				});
			})

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

}
