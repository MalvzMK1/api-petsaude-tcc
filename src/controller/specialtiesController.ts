import Message from '../messages/message';
import SpecialitiesModel from '../model/specialitiesModel';

const specialitiesModel = new SpecialitiesModel();
const message = new Message();

class SpecialtiesController {
	async createSpecialties(specialities: {name: string}[]) {
		try {
			const existentSpecialities = await specialitiesModel.findAllSpecialities();
			const nonExistentSpecialities = specialities.filter((speciality) => {
				return !existentSpecialities.find((existentSpeciality) => {
					return existentSpeciality.name.toLowerCase() === speciality.name.toLowerCase();
				});
			});

			if (nonExistentSpecialities.length > 0) {
				const createSpecialties = await specialitiesModel.createSpecialties(
					nonExistentSpecialities
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
}

export default new SpecialtiesController();
