import Message from '../messages/message';
import SpecialtiesModel from '../model/specialtiesModel';

const specialtiesModel = new SpecialtiesModel();
const message = new Message();

class SpecialtiesController {
	async createSpecialties(specialties: string) {
		try {
			const createSpecialties = await specialtiesModel.createSpecialties(
				specialties
			);
			if (createSpecialties)
				return {
					statusCode: 201,
					message: createSpecialties,
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
	async updateSpecialities(vetInfosId: number, specialitiesIDs: Array<{ id: number, specialtiesId: number, vetInfosId: number }>) {
		try {

			const updatedUser = await specialtiesModel.updateSpecialtiesInfos(vetInfosId, specialitiesIDs);

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

	async deleteSpecialities(vetInfosId: number, specialitiesIDs: Array<{ id: number, specialtiesId: number, vetInfosId: number }>) {
		try {

			const deleteUser = await specialtiesModel.DeleteSpecialtiesInfos(vetInfosId, specialitiesIDs);
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

export default new SpecialtiesController();
