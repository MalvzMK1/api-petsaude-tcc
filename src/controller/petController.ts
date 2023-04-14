import Messages from '../messages/message';
import Pet from '../model/petModel';
import {PetSpecie} from '@prisma/client';

const message = new Messages();
const petModel = new Pet();

export default class PetController {
	async getPetById(petID: number) {
		try {
			const pet = await petModel.findPet(petID);
			if (pet)
				return {
					statusCode: 200,
					pet,
				};
			return {
				statusCode: 404,
				message: message.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async getAllPets(userID: number) {
		try {
			const pets = await petModel.findAllPets(userID);
			if (pets) return {statusCode: 200, pets};
			return {
				statusCode: 404,
				message: message.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async createPet(pet: PetInfosControllerProps) {
		let birthDate: Date;

		try {
			const splittedDate = pet.birthDate.split('-');
			birthDate = new Date(
				parseInt(splittedDate[0]),
				parseInt(splittedDate[1]),
				parseInt(splittedDate[2])
			);
			console.log(birthDate);
		} catch (err) {
			console.log(err);
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.INCORRECT_DATE_TYPE,
			};
		}
		const findOrCreateSpecieResponse = await petModel.findOrCreateSpecie(
			pet.specie
		);
		let specie: PetSpecie;

		if (Array.isArray(findOrCreateSpecieResponse))
			specie = findOrCreateSpecieResponse[0];
		else specie = findOrCreateSpecieResponse;

		try {
			const petInfosJSON: CreatePetInfosModelProps = {
				name: pet.name,
				birthDate: birthDate,
				microship: pet.microship,
				photo: pet.photo,
				gender: pet.gender,
				size: pet.size,
				specieId: specie.id,
				ownerId: pet.ownerID,
			};
			const createdPet = await petModel.createNewPet(petInfosJSON);
			return {
				statusCode: 201,
				message: message.MESSAGE_SUCESS.INSERT_ITEM,
				pet: createdPet,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async deletePet(petID: number) {
		try {
			const deletedPet = await petModel.deletePet(petID);
			if (deletedPet)
				return {
					statusCode: 200,
					message: message.MESSAGE_SUCESS.DELETE_ITEM,
				};
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async updatePet(petID: number, pet: PetInfosControllerProps) {
		try {
			const splittedDate = pet.birthDate.split('-');
			const petBirthDate = new Date(
				parseInt(splittedDate[0]),
				parseInt(splittedDate[1]),
				parseInt(splittedDate[2])
			);

			const findOrCreateSpecieResponse = await petModel.findOrCreateSpecie(
				pet.specie
			);
			let specie: PetSpecie;

			if (Array.isArray(findOrCreateSpecieResponse))
				specie = findOrCreateSpecieResponse[0];
			else specie = findOrCreateSpecieResponse;

			const petInfos: UpdatePetInfosModelProps = {
				gender: pet.gender,
				size: pet.size,
				specieId: specie.id,

				microship: pet.microship,
				name: pet.name,
				ownerId: pet.ownerID,
				photo: pet.photo,
				birthDate: petBirthDate,
			};

			const updatedPet = await petModel.updatePet(petID, petInfos);

			if (updatedPet)
				return {
					statusCode: 200,
					message: message.MESSAGE_SUCESS.UPDATE_ITEM,
					pet: updatedPet,
				};
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.COULDNT_UPDATE_ITEM,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}
