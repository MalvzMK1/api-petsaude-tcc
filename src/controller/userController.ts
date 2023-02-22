import { Address, User } from '@prisma/client';
import Message from '../messages/message';
import UserModel from '../model/userModel';
import UserInfosProps from '../lib/userInfosProps';

const userModel = new UserModel();
const message = new Message();

class UserController {
  async createUser(userInfos: UserInfosProps) {
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
