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
	async createPet(pet: PetInfosControllerProps) {
		const petInfos = pet;

		const petGender = await petComplementsModel.getGender(petInfos.gender);
		const petSize = await petComplementsModel.getSize(petInfos.size);
		const petSpecie = await petComplementsModel.getSpecie(petInfos.specie);
		let birthDate: Date;

		if (petGender === null)
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NO_PET_GENDER_FOUND,
			};
		if (petSize === null)
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NO_PET_SIZE_FOUND,
			};
		if (petSpecie === null)
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NO_PET_SPECIE_FOUND,
			};

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
			ownerId: petInfos.ownerID,
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
	async deletePet(petID: number) {
		try {
			const deletedPet = await petModel.deletePet(petID);
			if (deletedPet)
				return {
					statusCode: 200,
					message: messages.MESSAGE_SUCESS.DELETE_ITEM,
				};
			return {
				statusCode: 400,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: `${err}`,
			};
		}
	}
	async updatePet(petID: number, pet: PetInfosControllerProps) {
		try {
			const petGender = await petComplementsModel.getGender(pet.gender);
			const petSize = await petComplementsModel.getSize(pet.size);
			const petSpecie = await petComplementsModel.getSpecie(pet.specie);

			if (petGender === null)
				return {
					statusCode: 404,
					message: messages.MESSAGE_ERROR.NO_PET_GENDER_FOUND,
				};
			if (petSize === null)
				return {
					statusCode: 404,
					message: messages.MESSAGE_ERROR.NO_PET_SIZE_FOUND,
				};
			if (petSpecie === null)
				return {
					statusCode: 404,
					message: messages.MESSAGE_ERROR.NO_PET_SPECIE_FOUND,
				};

			const splittedDate = pet.birthDate.split('-');
			const petBirthDate = new Date(
				parseInt(splittedDate[0]),
				parseInt(splittedDate[1]),
				parseInt(splittedDate[2])
			);

			const petInfos: UpdatePetInfosModelProps = {
				genderId: petGender.id,
				specieId: petSpecie.id,
				sizeId: petSize.id,

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
					message: messages.MESSAGE_SUCESS.UPDATE_ITEM,
					pet: updatedPet,
				};
			return {
				statusCode: 400,
				message: messages.MESSAGE_ERROR.COULDNT_UPDATE_ITEM,
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: `${err}`,
			};
		}
	}
}
