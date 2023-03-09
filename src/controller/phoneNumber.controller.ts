import PhoneNumberModel from '../model/phoneNumberModel';
import Message from '../messages/message';

const message = new Message();
const phoneNumberModel = new PhoneNumberModel();

export default class PhoneNumberController {
	async createPhoneNumber(userID: number, PhoneNumber: string) {
		try {
			const addPhone = await phoneNumberModel.createPhone(userID, PhoneNumber);

			if (addPhone) {
				return {
					statusCode: 201,
					message: addPhone,
				};
			} else {
				return {
					statusCode: 400,
					message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
				};
			}
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async updatePhoneNumber(phoneNumberID: number, phoneNumber: string) {
		try {
			const updatedPhone = await phoneNumberModel.updatePhone(
				phoneNumberID,
				phoneNumber
			);
			console.log(updatedPhone);

			return {
				statusCode: 200,
				message: message.MESSAGE_SUCESS.UPDATE_ITEM,
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
