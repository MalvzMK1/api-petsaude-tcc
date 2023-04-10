import Message from '../messages/message';
import SpecialtiesPetModel from '../model/specialtiesPetsModel';

const specialtiesPetModel = new SpecialtiesPetModel();
const message = new Message();

class SpecialtiesPetController {
	async createPetSpecialties(petSpeciality: {name: string}[]) {
		try {
			const existentPetSpecialities = await specialtiesPetModel.getAllSpecialities()
			const nonExistentPetSpecialities = petSpeciality.filter(petSpeciality => {
				return !existentPetSpecialities.find(existentPetSpeciality => {
					return existentPetSpeciality.name.toLowerCase() === petSpeciality.name.toLowerCase()
				})
			})

			console.log(existentPetSpecialities)

			if (nonExistentPetSpecialities.length > 0) {
				const createPetSpecialties =
					await specialtiesPetModel.createPetSpecialties(nonExistentPetSpecialities);
				if (createPetSpecialties)
					return {
						statusCode: 201,
						message: createPetSpecialties,
					};
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
				};
			}
			return {
				statusCode: 400,
				message: 'As especialidades já existem no banco de dados'
			}
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async updateSpecialitiesPet(specialitiesPet: Array<{ id: number, animalTypesId: number, vetInfosId: number }>) {
		try {
			const updatedUser = await specialtiesPetModel.updatePetSpecialtiesInfos(specialitiesPet);
			if (updatedUser)
				return {
					statusCode: 204,
					message: updatedUser,
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async deleteSpecialitiesPet(specialtiesPetID: Array<{ id: number, animalTypesId: number, vetInfosId: number }>) {
		try {
			const deleteUser = await specialtiesPetModel.DeleteSpecialtiesPet(specialtiesPetID);
			if (deleteUser)
				return {
					statusCode: 204,
					message: deleteUser,
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}

export default new SpecialtiesPetController();
