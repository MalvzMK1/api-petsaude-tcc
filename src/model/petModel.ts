import prisma from '../lib/prisma';

export default class PetModel {
	async findPet(petID: number) {
		try {
			const pet = await prisma.pet.findUnique({
				where: {
					id: petID,
				},
				include: {
					petSpecie: true,
				},
			});
			if (pet) return pet;
			return false;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}

	async findAllPets(userID: number) {
		try {
			const pets = await prisma.pet.findMany({
				where: {
					ownerId: userID,
				},
				include: {
					petSpecie: true,
				}
			});

			if (pets.length > 0) return pets;
			return false;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}

	async createNewPet(pet: CreatePetInfosModelProps) {
		try {
			if (pet.specieId) {
			}
			return await prisma.pet.create({
				data: {
					name: pet.name,
					birthDate: pet.birthDate,
					microship: pet.microship,
					ownerId: pet.ownerId,
					petGender: pet.gender,
					petSize: pet.size,
					petSpecieId: pet.specieId,
					photo: pet.photo,
				},
			});
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}

	async deletePet(petID: number) {
		try {
			await prisma.appointment.deleteMany({
				where: {
					petId: petID
				}
			})
			return prisma.pet.delete({
				where: {
					id: petID,
				},
			});
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}

	async updatePet(petID: number, petInfos: UpdatePetInfosModelProps) {
		try {
			const updatedPet = await prisma.pet.update({
				where: {
					id: petID,
				},
				data: {
					name: petInfos.name,
					birthDate: petInfos.birthDate,
					microship: petInfos.microship,
					petGender: petInfos.gender,
					petSize: petInfos.size,
					petSpecieId: petInfos.specieId,
					photo: petInfos.photo,
				},
			});
			if (updatedPet) return updatedPet;
			return null;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}

	async findOrCreateSpecie(specie: string) {
		try {
			const petSpecie = await prisma.petSpecie.findMany({
				where: {
					name: specie,
				},
			});
			if (petSpecie.length < 1)
				return await prisma.petSpecie.create({
					data: {
						name: specie,
					},
				});
			else return petSpecie;
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}
