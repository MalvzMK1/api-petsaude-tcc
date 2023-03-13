import Messages from '../messages/message';
import Address, { AddressComplements } from '../model/address.model';

const messages = new Messages();
const addressModel = new Address();
const addressComplementsModel = new AddressComplements();

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

			const city = await addressComplementsModel.getCityByName(address.city);

			if (!city)
				return {
					statusCode: 404,
					message: messages.MESSAGE_ERROR.CITY_NOT_FOUND,
				};

			const addressInfos: AddressUpdateModelProps = {
				cep: address.cep,
				complement: address.complement,
				neighborhood: address.neighborhood,
				number: address.number,
				street: address.street,
				cityID: city.id,
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
