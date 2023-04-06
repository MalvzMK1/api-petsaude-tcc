import Message from '../messages/message';
import VeterinaryModel from '../model/veterinaryModel';
import ClientModel from '../model/clientModel';

const clientModel = new ClientModel();
const veterinaryModel = new VeterinaryModel();
const messages = new Message();

class VeterinaryController {
	async createVeterinary(infos: createVeterinaryController) {
		try {
			// TODO: VALIDAR O EMAIL EM USO
			const veterinarysWithSameCrmv =
				await veterinaryModel.findVeterinarysByCrmv(infos.crmv);
			if (veterinarysWithSameCrmv && veterinarysWithSameCrmv.length > 0)
				return {
					statusCode: 400,
					message: {
						error: 'CRMV já está em uso',
					},
				};

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
					number: infos.address.number,
				},
				crmv: infos.crmv,
				formation: infos.formation,
				institution: infos.institution,
				occupationArea: infos.occupationArea,
				formationDate: new Date(infos.formationDate),
				startActingDate: new Date(infos.startActingDate),
			};
			const userInfos = await veterinaryModel.createVeterinary(veterinary);

			return {
				statusCode: 200,
				message: userInfos,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: {
						error: err.message,
					},
				};
			return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}

export default new VeterinaryController();
