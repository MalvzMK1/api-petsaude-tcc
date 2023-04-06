import prisma from '../lib/prisma';
import {CreatePetInfosModelProps, UpdatePetInfosModelProps} from "../@types/petInfosProps";

export default class Pet {
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
			return prisma.pet.delete({
				where: {
					id: petID,
				},
				include: {
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
}
