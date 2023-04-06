import Message from '../messages/message';
import ClientModel from '../model/clientModel';

const userModel = new ClientModel();
const message = new Message();

class UserController {
	async createUser(userInfos: CreateUserInfosProps) {
		try {
			const phoneNumber = userInfos.phoneNumber ? userInfos.phoneNumber : '';
			const complement = userInfos.address.complement
				? userInfos.address.complement
				: '';
			const users = await userModel.findAllClients();

			if (users) {
				const usersWithSameEmail = users.filter((user) => {
					return user.email === userInfos.email;
				});
				if (usersWithSameEmail.length > 0)
					return {
						statusCode: 400,
						message: {
							error: 'E-mail já está em uso',
						},
					};
				const usersWithSameCpf = users.filter((user) => {
					return user.cpf === userInfos.cpf;
				});
				if (usersWithSameCpf.length > 0)
					return {
						statusCode: 400,
						message: {
							error: 'O CPF já está em uso',
						},
					};
			}

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
			const createdUser = await userModel.createClient(userInfosToCreate);
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
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async getUserById(userID: number) {
		try {
			const userInfos = await userModel.findClientById(userID);

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
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async getUserByEmail(userEmail: string) {
		try {
			const userInfos = await userModel.findClientByEmail(userEmail);

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
			return {
				statusCode: 500,
				message: `${err}`,
			};
		}
	}

	async getAllUsers() {
		try {
			const getUsers = await userModel.findAllClients();

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
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async updateUser(userID: number, userInfos: UpdateUserInfosProps) {
		try {
			const updatedUser = await userModel.updateClient(userID, userInfos);
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
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

	async deleteUser(userID: number) {
		try {
			const user = await userModel.findClientById(userID);
			if (user) {
				const userDelete = await userModel.deleteClient(userID);
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
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}

export default new UserController();
