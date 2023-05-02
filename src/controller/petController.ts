import Messages from '../messages/message';
import Pet from '../model/petModel';
import {PetSpecie, Prisma} from '@prisma/client';
import {parse} from 'date-fns';

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
		const birthDate = parse(pet.birthDate, 'dd-MM-yyyy', new Date());

		if (birthDate.toString().toLowerCase() === 'invalid date')
			return {
				statusCode: 400,
				message: {
					error: {
						title: 'Formato de data incorreto',
						fix: 'Espera-se um formato dd-MM-yyyy',
					},
				},
			};

		const findOrCreateSpecieResponse = await petModel.findOrCreateSpecie(
			pet.specie
		);
		let specie: PetSpecie;

		if (Array.isArray(findOrCreateSpecieResponse))
			specie = findOrCreateSpecieResponse[0];
		else specie = findOrCreateSpecieResponse;

		try {
			let gender: PetGender | null;
			let size: PetSize | null;

			switch (pet.size) {
				case 'SMALL':
					size = 'SMALL';
					break;
				case 'MEDIUM':
					size = 'MEDIUM';
					break;
				case 'BIG':
					size = 'BIG';
					break;
				default:
					return {
						statusCode: 400,
						message: 'Tipos de tamanho incorretos',
						options: ['SMALL', 'MEDIUM', 'BIG'],
					};
			}

			switch (pet.gender) {
				case 'F':
					gender = 'F';
					break;
				case 'M':
					gender = 'M';
					break;
				default:
					return {
						statusCode: 400,
						message: 'Tipos de gênero incorretos',
						options: ['F', 'M'],
					};
			}

			if (size && gender) {
				const petInfosJSON: CreatePetInfosModelProps = {
					name: pet.name,
					birthDate: birthDate,
					microship: pet.microship,
					photo: pet.photo,
					gender: gender,
					size: size,
					specieId: specie.id,
					ownerId: pet.ownerID,
				};
				const createdPet = await petModel.createNewPet(petInfosJSON);
				return {
					statusCode: 201,
					message: message.MESSAGE_SUCESS.INSERT_ITEM,
					pet: createdPet,
				};
			}
			return {
				statusCode: 400,
				message: 'Tipos incorretos',
			};
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError)
				if (err.code === 'P2009')
					return {
						statusCode: 400,
						message: err,
					};
			if (err instanceof Error)
				return {
					statusCode: 400,
					message: err.message,
				};
			return {
				statusCode: 100,
				message: err,
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
			if (err instanceof Prisma.PrismaClientKnownRequestError)
				return {statusCode: 400, message: err}
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
			const birthDate = parse(pet.birthDate, 'dd-MM-yyyy', new Date());

			if (birthDate.toString().toLowerCase() === 'invalid date')
				return {
					statusCode: 400,
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy',
						},
					},
				};

			let gender: PetGender | null;
			let size: PetSize | null;

			switch (pet.size) {
				case 'SMALL':
					size = 'SMALL';
					break;
				case 'MEDIUM':
					size = 'MEDIUM';
					break;
				case 'BIG':
					size = 'BIG';
					break;
				default:
					return {
						statusCode: 400,
						message: {error: 'Tipos de tamanho incorretos', options: ['SMALL', 'MEDIUM', 'BIG']},
					};
			}

			switch (pet.gender) {
				case 'F':
					gender = 'F';
					break;
				case 'M':
					gender = 'M';
					break;
				default:
					return {
						statusCode: 400,
						message: {error: 'Tipos de gênero incorretos', options: ['F', 'M']},
					};
			}

			const findOrCreateSpecieResponse = await petModel.findOrCreateSpecie(
				pet.specie
			);
			let specie: PetSpecie;

			if (Array.isArray(findOrCreateSpecieResponse))
				specie = findOrCreateSpecieResponse[0];
			else specie = findOrCreateSpecieResponse;

			const petInfos: UpdatePetInfosModelProps = {
				gender: gender,
				size: size,
				specieId: specie.id,

				microship: pet.microship,
				name: pet.name,
				ownerId: pet.ownerID,
				photo: pet.photo,
				birthDate: birthDate,
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
