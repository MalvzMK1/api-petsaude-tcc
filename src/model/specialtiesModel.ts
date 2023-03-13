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

			const specialties = await prisma.vetInfos.findUnique({
				
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

	async updateSpecialtiesInfos(vetInfosId: number, specialtiesID: Array<{ id: number, specialtiesId: number, vetInfosId: number }>) {

		try {


			const specialties = specialtiesID.map(async (element) => {
				await prisma.vetInfos.update({
					where: {
						id: vetInfosId
					},
					data: {
						VeterinaryEspecialities: {
							upsert: {
								where: {
									id: element.id
								},
								create: {
									specialitiesId: element.specialtiesId
								},
								update: {
									specialitiesId: element.specialtiesId 
								}
							}
						}
					}
				});
			});

			return specialties

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async DeleteSpecialtiesInfos(vetInfosId: number, specialtiesID: Array<{ id: number, specialtiesId: number, vetInfosId: number }>) {

		try {

			const specialties = specialtiesID.map(async (element) => {
				await prisma.veterinarySpecialities.deleteMany({
					where: {
						specialitiesId: element.specialtiesId,
						vetInfosId: vetInfosId
					},
				});
			});

			return specialties

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

}
