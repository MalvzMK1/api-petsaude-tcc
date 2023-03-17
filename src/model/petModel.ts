import { PetGender, PetSize, PetSpecie } from '@prisma/client';
import prisma from '../lib/prisma';

export default class Pet {
	async findPet(petID: number) {
		try {
			const pet = await prisma.pet.findUnique({
				where: {
					id: petID,
				},
				include: {
					petSize: true,
					petGender: true,
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
					// @ts-ignore
					ownerId: userID,
				},
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
			const createdPet = await prisma.pet.create({
				data: {
					name: pet.name,
					birthDate: pet.birthDate,
					microship: pet.microship,
					// @ts-ignore
					ownerId: pet.ownerId,
					petGenderId: pet.genderId,
					petSizeId: pet.sizeId,
					petSpecieId: pet.specieId,
					photo: pet.photo,
				},
			});
			return createdPet;
		} catch (err) {
			console.log(err);
			throw new Error(`${err}`);
		}
	}
	async deletePet(petID: number) {
		try {
			return prisma.pet.delete({
				where: {
					id: petID,
				},
				include: {
					petSize: true,
					petGender: true,
					petSpecie: true,
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
					petGenderId: petInfos.genderId,
					petSizeId: petInfos.sizeId,
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
}

export class PetComplements {
	async getSpecie(specie: string): Promise<PetSpecie | null> {
		const foundSpecie = await prisma.petSpecie.findMany({
			where: {
				name: specie,
			},
		});
		if (foundSpecie.length > 0) return foundSpecie[0];
		return null;
	}
	async getGender(gender: string): Promise<PetGender | null> {
		const foundGender = await prisma.petGender.findMany({
			where: {
				name: gender,
			},
		});
		if (foundGender.length > 0) return foundGender[0];
		return null;
	}
	async getSize(size: string): Promise<PetSize | null> {
		const foundSize = await prisma.petSize.findMany({
			where: {
				name: size,
			},
		});
		if (foundSize.length > 0) return foundSize[0];
		return null;
	}
}
