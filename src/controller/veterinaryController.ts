import Message from '../messages/message';
import VeterinaryModel from '../model/veterinaryModel';
import ClientModel from '../model/clientModel';

const clientModel = new ClientModel();
const veterinaryModel = new VeterinaryModel();
const messages = new Message();

class VeterinaryController {
	async getAllVeterinarys(filters: {
		name: string | null | undefined;
		speciality: string | null | undefined;
		animal: string | null | undefined;
	}) {
		try {
			const allVeterinarys = await veterinaryModel.getAllVeterinarys();
			if (allVeterinarys) {
				let response = allVeterinarys;

				if (filters.name) {
					const name = filters.name;
					response = response.filter((veterinary) => {
						if (veterinary.personName.includes(name)) return veterinary;
					});
				}
				if (filters.speciality) {
					const speciality = filters.speciality;
					response = response.filter((veterinary) => {
						veterinary.VeterinaryEspecialities.forEach((speciality) => {
							if (speciality.specialitiesId === 1) return veterinary;
						});
					});
				}
				if (filters.animal) {
					const animal = filters.animal;
					response = response.filter((veterinary) => {
						veterinary.AnimalTypesVetInfos.forEach((animalType) => {
							if (animalType.animalTypesId === 1) return veterinary;
						});
					});
				}

				return {
					statusCode: 200,
					veterinarys: response,
				};
			}
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: {
						error: err.message,
					},
				};
			return {
				statusCode: 500,
				message: {
					error: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
				},
			};
		}
	}

	async createVeterinary(infos: createVeterinaryController) {
		try {
			// TODO: VALIDAR O EMAIL EM USO
			const veterinarysWithSameCrmv =
				await veterinaryModel.findVeterinarysByCrmv(infos.crmv);
			if (veterinarysWithSameCrmv && veterinarysWithSameCrmv.length > 0)
				return {
					statusCode: 400,
					message: {
						error: 'CRMV já está em uso',
					},
				};

			const veterinary: createVeterinaryModel = {
				personName: infos.personName,
				cellphoneNumber: infos.cellphoneNumber,
				phoneNumber: infos.phoneNumber,
				cpf: infos.cpf,
				email: infos.email,
				password: infos.password,
				address: {
					zipCode: infos.address.zipCode,
					complement: infos.address.complement,
					number: infos.address.number,
				},
				crmv: infos.crmv,
				formation: infos.formation,
				institution: infos.institution,
				occupationArea: infos.occupationArea,
				formationDate: new Date(infos.formationDate),
				startActingDate: new Date(infos.startActingDate),
			};
			const userInfos = await veterinaryModel.createVeterinary(veterinary);

			return {
				statusCode: 200,
				message: userInfos,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: {
						error: err.message,
					},
				};
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}

export default new VeterinaryController();
