import { PetGender, PetSize, PetSpecie } from '@prisma/client';
import { CreatePetInfosModelProps } from '../lib/petInfosProps';
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
