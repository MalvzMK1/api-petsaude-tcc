import prisma from '../lib/prisma';

export default class SpecialtiesPetModel {
	async getAllSpecialities() {
		try {
			return await prisma.petSpecie.findMany()
		} catch (err) {
			throw new Error(`${err}`)
		}
	}

	async findSpecialitiesPetVeterinary(id: number) {
		try {
			return await prisma.petSpecieVeterinary.findMany({
				where: {
					veterinaryId: id
				},
				include: {
					PetSpecie: true
				}
			})
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async createPetSpecies(specialtiesPets: { name: string }[]) {
		try {
			return await prisma.petSpecie.createMany({
				data: specialtiesPets,
			});
		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async updatePetSpecialtiesInfos(specialtiesPet: Array<{ id: number, animalTypesId: number, veterinaryId: number }>) {

		try {

			const specialtiesPets = specialtiesPet.map(async (element) => {

				await prisma.petSpecieVeterinary.update({
					where: {
						id: element.id
					},
					data: {
						veterinaryId: element.veterinaryId,
						petSpecieId: element.animalTypesId
					}
				})
			});

			return specialtiesPets

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

	async DeleteSpecialtiesPet(specialtiesPetID: Array<{ id: number, animalTypesId: number, veterinaryId: number }>) {

		try {

			return specialtiesPetID.map(async (element) => {
				await prisma.petSpecieVeterinary.deleteMany({
					where: {
						petSpecieId: element.animalTypesId,
						veterinaryId: element.veterinaryId
					},
				});
			})

		} catch (err) {
			throw new Error(`${err}`);
		}
	}

}
