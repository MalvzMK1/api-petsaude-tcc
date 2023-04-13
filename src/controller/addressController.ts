import Messages from '../messages/message';
import Address from '../model/addressModel';

const messages = new Messages();
const addressModel = new Address();

export default class AddressController {
	async updateAddress(
		addressID: number,
		address: AddressUpdateControllerProps
	) {
		try {
			if (addressID === null || addressID === undefined)
				return {
					statusCode: 400,
					message: messages.MESSAGE_ERROR.REQUIRED_ID,
				};
			// TODO: VALIDATE ADDRESS PROPS

			const addressInfos: AddressUpdateModelProps = {
				zipCode: address.zipCode,
				complement: address.complement,
				number: address.number,
			};

			const updatedAddress = await addressModel.updateAddress(
				addressID,
				addressInfos
			);

			if (updatedAddress)
				return {
					statusCode: 200,
					message: messages.MESSAGE_SUCESS.UPDATE_ITEM,
				};
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		} catch (error) {
			console.log(error);
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}
