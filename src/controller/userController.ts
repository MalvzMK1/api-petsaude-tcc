import UserModel from '../model/userModel';
const userModel = new UserModel();

export default class UserController {
  async getUserById(userID: number) {
    try {
      const userInfos = await userModel.selectClientById(userID);

      if (!userInfos) {
        return {
          statusCode: 404,
          message: 'Didn`t found any register in the database',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: `${err}`,
      };
    }
  }
  async getAllUsers() {
    try {
      const getUsers = await userModel.selectAllUser();

      if (!getUsers) {
        return {
          statusCode: 404,
          message: 'Unexpecter error in the database',
        };
      } else {
        return getUsers;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

// Testing branch
