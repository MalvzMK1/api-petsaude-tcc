import Message from '../messages/message';
import VeterinaryModel from '../model/veterinaryModel';
import validateSameEmailBetweenClientsAndVeterinarians from '../utils/validateSameEmailBetweenClientsAndVeterinarians';
import {Prisma} from "@prisma/client";

const veterinaryModel = new VeterinaryModel();
const messages = new Message();

class VeterinaryController {

	async getAllVeterinarys(filters: {
		userName: string | null | undefined;
		speciality: string | null | undefined;
		animal: string | null | undefined;
	}) {
		try {
			const allVeterinarys = await veterinaryModel.getAllVeterinarys();
			if (allVeterinarys) {
				let response = allVeterinarys;

				if (filters.userName) {
					const name = filters.userName.toLowerCase();
					response = response.filter((veterinary) => {
						if (veterinary.userName.toLowerCase().includes(name))
							return veterinary;
					});
				}
				if (filters.speciality) {
					const speciality = filters.speciality.toLowerCase();
					// @ts-ignore
					let filteredVeterinarians = []
					response.forEach((veterinary) => {
						veterinary.VeterinaryEspecialities.forEach(veterinarySpeciality => {
							if (veterinarySpeciality.specialities.name.toLowerCase().includes(speciality.toLowerCase()))
								filteredVeterinarians.push(veterinary)
							// return veterinary
						})
					})
					// @ts-ignore
					response = filteredVeterinarians
				}
				if (filters.animal) {
					const animal = filters.animal.toLowerCase();
					// @ts-ignore
					let filteredVeterinarians = []
					response.forEach((veterinary) => {
						veterinary.PetSpecieVeterinary.forEach((petSpecie) => {
							if (petSpecie.PetSpecie?.name.toLowerCase().includes(animal.toLowerCase()))
								filteredVeterinarians.push(veterinary)
						});
					});
					// @ts-ignore
					response = filteredVeterinarians
				}

				if (response.length > 0)
					return {
						statusCode: 200,
						veterinarys: response,
					};
				return {
					statusCode: 404,
					message: 'Nenhum veterinário atende aos filtros de pesquisa'
				}
			}
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError)
				return {
					statusCode: 400,
					message: err
				}
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

	async getVeterinaryByEmail(email: string) {
		try {
			if (email === '')
				return {
					statusCode: 400,
					message: messages.MESSAGE_ERROR.REQUIRED_FIELDS,
				};
			const foundVeterinary = await veterinaryModel.findVeterinarysByEmail(
				email
			);
			if (foundVeterinary)
				return {
					statusCode: 200,
					veterinary: foundVeterinary,
				};
			return {
				statusCode: 404,
				message: messages.MESSAGE_ERROR.NOT_FOUND_DB,
			};
		} catch (err) {
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

	async createVeterinary(infos: createVeterinaryController) {
		try {
			const veterinarysWithSameCrmv =
				await veterinaryModel.findVeterinarysByCrmv(infos.crmv);
			if (veterinarysWithSameCrmv && veterinarysWithSameCrmv.length > 0)
				return {
					statusCode: 400,
					message: {
						error: 'CRMV já está em uso',
					},
				};

			const usersWithSameEmail =
				await validateSameEmailBetweenClientsAndVeterinarians(infos.email);

			if (usersWithSameEmail !== undefined && usersWithSameEmail.length > 0)
				return {
					statusCode: 400,
					message: 'E-mail já está em uso',
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

	async updateVeterinaryProfessionalInfos(id: number, body: UpdateVeterinaryProfessionalInfos) {
		try {

			const response = await veterinaryModel.updateVeterinaryProfessionalInfos(id, body)

			if (response)
				return {message: response, statusCode: 200}
			else
				return {statusCode: 404, message: new Message().MESSAGE_ERROR.NOT_FOUND_DB}


		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			else
				return {
					statusCode: 500,
					message: new Message().MESSAGE_ERROR.INTERNAL_ERROR_DB,
				};
		}
	}

	async updateVeterinaryPersonalInfos(id: number, body: UpdateVeterinaryPersonalInfos) {
		try {

			const response = await veterinaryModel.updateVeterinaryPersonalInfos(id, body)

			if (response)
				return {message: response, statusCode: 200}
			else
				return {statusCode: 404, message: new Message().MESSAGE_ERROR.NOT_FOUND_DB}


		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			else
				return {
					statusCode: 500,
					message: new Message().MESSAGE_ERROR.INTERNAL_ERROR_DB,
				};
		}
	}

	async deleteVeterinary(id: number) {
		try {

			const response = await veterinaryModel.deleteVeterinary(id)

			if (response)
				return {message: messages.MESSAGE_SUCESS.DELETE_ITEM, statusCode: 200}
			else
				return {statusCode: 404, message: new Message().MESSAGE_ERROR.NOT_FOUND_DB}

		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			else
				return {
					statusCode: 500,
					message: new Message().MESSAGE_ERROR.INTERNAL_ERROR_DB,
				};
		}
	}
}

export default new VeterinaryController();
