import Message from '../messages/message';
import UserModel from '../model/userModel';
import ValidateUserInfosProps from "../utils/validateUserInfosProps";
import {
	CreateUserInfosProps,
	UpdateUserInfosProps,
	UpdateSpecialities,
} from '../lib/userInfosProps';
import {
	VetInfos,
	AnimalTypes,
	Address,
	User,
} from '@prisma/client';
import prisma from '../lib/prisma';
import SpecialtiesModel from '../model/specialtiesModel';

const userModel = new UserModel();
const message = new Message();
const userValidation = new ValidateUserInfosProps();

class UserController {
	async createUser(userInfos: CreateUserInfosProps) {
		try {
			const createdUser = await userModel.createUser(userInfos);

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
			const userInfos = await userModel.findUserById(userID);

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
			const userInfos = await userModel.findUserByEmail(userEmail);

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
			const getUsers = await userModel.findAllUsers();

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
			let vetInfosUpdate: VetInfos;

			if (userInfos.isVet && userInfos.vetInfosId && userInfos.vetInfos) {
				vetInfosUpdate = await userModel.updateVetInfos(
					userInfos.vetInfosId,
					userInfos.vetInfos
				);
				if (!vetInfosUpdate)
					return {
						statusCode: 400,
						message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
					};
			}
			const updatedUser = await userModel.updateUser(userID, userInfos);
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
			const user = await userModel.findUserById(userID);
			if (user) {
				const userDelete = await userModel.deleteUser(userID);
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
	async getSpecialtiesUser(vetInfosId: number) {

		try {
			const userInfos = await userModel.getSpecialities(vetInfosId);

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
}

export default new UserController();
