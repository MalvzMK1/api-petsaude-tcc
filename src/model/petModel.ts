import { PetGender, PetSize, PetSpecie } from '@prisma/client';
import { CreatePetInfosModelProps } from '../lib/petInfosProps';
import prisma from '../lib/prisma';

export default class Pet {
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
