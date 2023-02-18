import Message from '../messages/message';
import UserModel from '../model/userModel';

const userModel = new UserModel();
const message = new Message();

class UserController {
  async getUserById(userID: number) {
    try {
      const userInfos = await userModel.selectClientById(userID);

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
      const getUsers = await userModel.selectAllUser();

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
    }
  }
  async deleteUser(userID: number) {
    try {
      const userDelete = await userModel.DeletUser(userID);

      if (!userDelete) {
        return {
          statusCode: 404,
          message: message.MESSAGE_ERROR.NOT_FOUND_DB,
        };
      } else {
        return {
          statusCode: 200,
          message: message.MESSAGE_SUCESS.DELETE_ITEM,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
      };
    }
  }
}

export default new UserController();
