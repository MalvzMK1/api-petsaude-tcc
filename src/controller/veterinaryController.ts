import Message from "../messages/message";
import VeterinaryModel from "../model/veterinaryModel";

const veterinaryModel = new VeterinaryModel()
const messages = new Message()

export default class VeterinaryController {
	async createVetInfos(userId: number, infos: createVeterinaryController) {
		try {
			const veterinary: createVeterinaryModel = {
				personName: infos.personName,
				cellphoneNumber: infos.cellphoneNumber,
				phoneNumber: infos.phoneNumber,
				cpf: infos.cpf,
				email: infos.email,
				password: infos.password,
				address: {
					zipCode: infos.address.zipCode,
					complement: infos.address.complement,
					number: infos.address.number
				},
				crmv: infos.crmv,
				formation: infos.formation,
				institution: infos.institution,
				occupationArea: infos.occupationArea,
				formationDate: new Date(infos.formationDate),
				startActingDate: new Date(infos.startActingDate),
			};
			const userInfos = await veterinaryModel.createVeterinary(userId, veterinary);

			if (userInfos) {
				return {
					statusCode: 200,
					message: userInfos,
				};
			} else {
				return {
					statusCode: 400,
					message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
				};
			}
		} catch (err) {
			console.log(err);
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}

}
