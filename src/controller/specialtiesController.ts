import Message from '../messages/message';
import SpecialitiesModel from '../model/specialitiesModel';

const specialitiesModel = new SpecialitiesModel();
const message = new Message();

function removeDuplicates(
	array: Array<{ name: string }>
): Array<{ name: string }> {
	const unique: Array<{ name: string }> = [];
	array.forEach((element) => {
		console.log(!unique.includes(element));
		if (!unique.includes(element)) unique.push(element);
	});
	console.log('depois', unique);
}

class SpecialtiesController {
	async createSpecialties(specialities: { name: string }[]) {
		try {
			const specialitiesArray: { name: string }[] =
				removeDuplicates(specialities);
			const existentSpecialities =
				await specialitiesModel.findAllSpecialities();
			const nonExistentSpecialities = specialities.filter((speciality) => {
				return !existentSpecialities.find((existentSpeciality) => {
					return (
						existentSpeciality.name.toLowerCase() ===
						speciality.name.toLowerCase()
					);
				});
			});

			return {
				statusCode: 200,
				message: { nonDuplicated: specialitiesArray },
			};

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
				message: 'As especialidades já existem no banco de dados',
			};
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async getSpecialityById(id: number) {
		try {
			const response = await specialitiesModel.findSpecialityById(id);
			if (response) return response;
			return null;
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}

export default new SpecialtiesController();
