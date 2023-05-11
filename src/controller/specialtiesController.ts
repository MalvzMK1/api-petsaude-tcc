import Message from '../messages/message';
import SpecialitiesModel from '../model/specialitiesModel';
import removeDuplicates from '../utils/removeDuplicates';

const specialitiesModel = new SpecialitiesModel();
const message = new Message();

class SpecialtiesController {
	async createSpecialties(specialities: { name: string }[]) {
		try {
			const specialitiesArray: { name: string }[] =
				removeDuplicates(specialities);
			const existentSpecialities =
				await specialitiesModel.findAllSpecialities();
			const nonExistentSpecialities = specialitiesArray.filter((speciality) => {
				return !existentSpecialities.find((existentSpeciality) => {
					return (
						existentSpeciality.name.toLowerCase() ===
						speciality.name.toLowerCase()
					);
				});
			});

			if (nonExistentSpecialities.length > 0) {
				const createSpecialties = await specialitiesModel.createSpecialties(
					nonExistentSpecialities
				);
				if (createSpecialties)
					return {
						statusCode: 201,
						message: {
							response: createSpecialties,
							createdSpecialities: nonExistentSpecialities,
						},
					};
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
				};
			}
			return {
				statusCode: 400,
				message: 'As especialidades já existem no banco de dados',
			};
		} catch (err) {
			console.log(err);
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: {
						message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
						error: err.message,
					},
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async updateSpecialities(
		specialties: Array<{
			specialtiesId: number;
			veterinaryId: number;
		}>
	) {
		try {
			const updatedSpecialities = await specialitiesModel.updateSpecialtiesInfos(
				specialties
			);

			if (updatedSpecialities)
				return {
					statusCode: 200,
					message: updatedSpecialities,
				};
			return {
				statusCode: 500,
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

	async deleteSpecialities(
		specialties: Array<{
			specialtiesId: number;
			veterinaryId: number;
		}>
	) {
		try {
			const deleteSpecialitiesPet = await specialitiesModel.DeleteSpecialtiesInfos(
				specialties
			);
			if (deleteSpecialitiesPet)
				return {
					statusCode: 204,
					message: deleteSpecialitiesPet,
				};
			return {
				statusCode: 500,
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

	async getSpecialities() {
		try {
			const response = await specialitiesModel.findAllSpecialities()

			if (response)
				return {
					statusCode: 200,
					message: response,
				};
			return {
				statusCode: 404,
				message: message.MESSAGE_ERROR.NOT_FOUND_DB,
			};

		}catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: new Message().MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}

	}

	async getSpecialityById(id: number) {
		try {
			const response = await specialitiesModel.findSpecialityById(id);
			if (response) return response;
			return null;
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

	async findSpecialtiesVeterinary(id: number) {
		try {
			const response = await specialitiesModel.findSpecialitiesVeterinary(id);
			if (response)
				return { statusCode: 200, message: response };
			return null;
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

export default new SpecialtiesController();
