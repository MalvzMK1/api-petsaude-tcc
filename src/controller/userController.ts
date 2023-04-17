import Message from '../messages/message';
import ClientModel from '../model/clientModel';
import validateSameCpfBetweenClientsAndVeterinarians from '../utils/validateSameCpfBetweenClientsAndVeterinarians';
import validateSameEmailBetweenClientsAndVeterinarians from '../utils/validateSameEmailBetweenClientsAndVeterinarians';

const clientModel = new ClientModel();
const message = new Message();

class ClientController {
	async createUser(userInfos: CreateUserInfosProps) {
		try {
			const phoneNumber = userInfos.phoneNumber ? userInfos.phoneNumber : '';
			const complement = userInfos.address.complement
				? userInfos.address.complement
				: '';

			console.log(userInfos.cpf);

			const usersWithSameEmail =
				await validateSameEmailBetweenClientsAndVeterinarians(userInfos.email);
			if (usersWithSameEmail !== undefined && usersWithSameEmail.length > 0)
				return {
					statusCode: 400,
					message: 'E-mail já está em uso',
				};

			const usersWithSameCpf =
				await validateSameCpfBetweenClientsAndVeterinarians(userInfos.cpf);
			if (usersWithSameCpf !== undefined && usersWithSameCpf.length > 0)
				return {
					statusCode: 400,
					message: 'CPF já está em uso',
				};

			console.log(usersWithSameEmail);

			const userInfosToCreate: CreateUserInfosModelProps = {
				personName: userInfos.personName,
				cellphoneNumber: userInfos.cellphoneNumber,
				phoneNumber: phoneNumber,
				cpf: userInfos.cpf,
				email: userInfos.email,
				password: userInfos.password,
				address: {
					zipCode: userInfos.address.zipCode,
					complement: complement,
					number: userInfos.address.number,
				},
			};

			const createdUser = await clientModel.createClient(userInfosToCreate);
			if (createdUser)
				return {
					statusCode: 201,
					message: createdUser,
				};
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
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

	async getUserById(userID: number) {
		try {
			const userInfos = await clientModel.findClientById(userID);

			if (!userInfos) {
				return {
					statusCode: 404,
					message: message.MESSAGE_ERROR.NOT_FOUND_DB,
				};
			}

			return {
				statusCode: 200,
				message: userInfos,
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

	async getUserByEmail(userEmail: string) {
		try {
			const userInfos = await clientModel.findClientByEmail(userEmail);

			if (userInfos.length > 0)
				return {
					statusCode: 200,
					user: userInfos[0],
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

	async getAllUsers() {
		try {
			const getUsers = await clientModel.findAllClients();

			if (!getUsers) {
				return {
					statusCode: 404,
					message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
				};
			} else
				return {
					statusCode: 200,
					message: getUsers,
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

	async updateUser(userID: number, userInfos: UpdateUserInfosProps) {
		try {
			const updatedUser = await clientModel.updateClient(userID, userInfos);
			if (updatedUser)
				return {
					statusCode: 204,
					message: message.MESSAGE_SUCESS.UPDATE_ITEM,
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

	async deleteUser(userID: number) {
		try {
			const user = await clientModel.findClientById(userID);
			if (user) {
				const userDelete = await clientModel.deleteClient(userID);
				if (!userDelete) {
					return {
						statusCode: 500,
						message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
					};
				} else {
					return {
						statusCode: 200,
						message: message.MESSAGE_SUCESS.DELETE_ITEM,
					};
				}
			}
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
}

export default new ClientController();
