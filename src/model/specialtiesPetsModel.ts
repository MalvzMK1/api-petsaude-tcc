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
	async updatePetSpecialtiesInfos(vetInfosId: number, specialtiesPet: Array<{ id: number, animalTypesId: number, vetInfosId: number }>) {

		try {

			const specialitiesPet = specialtiesPet.map(async (element) => {
				await prisma.vetInfos.update({
					where:{
						id: vetInfosId
					},
					data:{
						AnimalTypesVetInfos:{
							upsert:{
								where:{
									id: element.id,
								},
								create:{
									animalTypesId: element.animalTypesId
								},
								update:{
									animalTypesId: element.animalTypesId
								},
							},
						},
					},
				});
			});

			return specialitiesPet

		} catch (err) {
			throw new Error(`${err}`);
		}
	} 
	async DeleteSpecialtiesPet(vetInfosId: number, specialtiesPetID: Array<{ id: number, animalTypesId: number, vetInfosId: number }>) {
 
		try {

			const specialties = specialtiesPetID.map(async (element) => {
				await prisma.animalTypesVetInfos.deleteMany({
					where: {
						animalTypesId: element.animalTypesId,
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
