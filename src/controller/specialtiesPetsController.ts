import Message from '../messages/message';
import SpecialtiesPetModel from '../model/specialtiesPetsModel';

const specialtiesPetModel = new SpecialtiesPetModel();
const message = new Message();

class SpecialtiesPetController {
	async createPetSpecialties(specialtiesPet: string) {
		try {
			const createPetSpecialties =
				await specialtiesPetModel.createPetSpecialties(specialtiesPet);
			if (createPetSpecialties)
				return {
					statusCode: 201,
					message: createPetSpecialties,
				};
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
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
