import {
	CreatePetInfosControllerProps,
	CreatePetInfosModelProps,
} from '../lib/petInfosProps';
import Messages from '../messages/message';
import { PetComplements } from '../model/petModel';
import Pet from '../model/petModel';

const messages = new Messages();
const petComplementsModel = new PetComplements();
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
				message: messages.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async getAllPets(userID: number) {
		try {
			const pets = await petModel.findAllPets(userID);
			if (pets) return { statusCode: 200, pets };
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async createPet(pet: CreatePetInfosControllerProps) {
		const petInfos = pet;

		const petGender = await petComplementsModel.getGender(petInfos.gender);
		const petSize = await petComplementsModel.getSize(petInfos.size);
		const petSpecie = await petComplementsModel.getSpecie(petInfos.specie);
		let birthDate: Date;

		if (petGender === null || petSize === null || petSpecie === null)
			return { statusCode: 404, message: messages.MESSAGE_ERROR.NOT_FOUND_DB };

		try {
			const splittedDate = petInfos.birthDate.split('-');
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
				message: messages.MESSAGE_ERROR.INCORRECT_DATE_TYPE,
			};
		}
		const petInfosJSON: CreatePetInfosModelProps = {
			name: petInfos.name,
			birthDate: birthDate,
			microship: petInfos.microship,
			photo: petInfos.photo,
			genderId: petGender.id,
			sizeId: petSize.id,
			specieId: petSpecie.id,
			ownerId: petInfos.ownerId,
		};
		try {
			const createdPet = await petModel.createNewPet(petInfosJSON);
			return {
				statusCode: 201,
				message: messages.MESSAGE_SUCESS.INSERT_ITEM,
				pet: createdPet,
			};
		} catch (err) {
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}
