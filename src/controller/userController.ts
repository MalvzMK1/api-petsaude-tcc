import Message from '../messages/message';
import { AddressComplements } from '../model/address.model';
import UserModel from '../model/userModel';
import ValidateUserInfosProps from '../utils/validateUserInfosProps';
import { VetInfos } from '@prisma/client';

const userModel = new UserModel();
const message = new Message();
const userValidation = new ValidateUserInfosProps();
const addressController = new AddressComplements();

class UserController {
	async createUser(userInfos: CreateUserInfosProps) {
		try {
			const city = await addressController.getCityByName(
				userInfos.address.city
			);
			const state = await addressController.getStateByName(
				userInfos.address.state
			);

			if (city === null)
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.CITY_NOT_FOUND,
				};
			if (state === null)
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.STATE_NOT_FOUND,
				};

			const userInfosToCreate: CreateUserInfosModelProps = {
				personName: userInfos.personName,
				cellphoneNumber: userInfos.cellphoneNumber,
				phoneNumber: userInfos.phoneNumber,
				cpf: userInfos.cpf,
				email: userInfos.email,
				password: userInfos.password,
				address: {
					cep: userInfos.address.zipCode,
					cityID: city.id,
					stateID: state.id,
					complement: userInfos.address.complement,
					neighborhood: userInfos.address.neighborhood,
					number: userInfos.address.number,
					street: userInfos.address.street,
				},
			};
			const createdUser = await userModel.createUser(userInfosToCreate);
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

	async createVetInfos(userId: number, infos: createVeterinaryController){
		try {
			const vetInfos: createVeterinaryModel = {
				crmv: infos.crmv,
				formation: infos.formation,
				institution: infos.institution,
				occupationArea: infos.occupationArea,
				formationDate: new Date(infos.formationDate),
				startActingDate: new Date(infos.startActingDate)
			}
			await userModel.updateIsVet(userId, true)
			const userInfos = await userModel.createVeterinary(userId, vetInfos)

			if(userInfos) {
				return {
					statusCode: 200,
					message: userInfos
				}
			} else {
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB
				}
			}

		} catch (err) {
			console.log(err)
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB
			}
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
}

export default new UserController();
