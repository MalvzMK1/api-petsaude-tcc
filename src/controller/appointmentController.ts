import ClientModel from "../model/clientModel";
import VeterinaryModel from "../model/veterinaryModel";
import appointmentModel from "../model/appointmentModel";

class AppointmentController {
	async createAppointment(infos: Appointment) {
		try {
			if (!await validateIfClientExists(infos.clientId))
				return {statusCode: 404, message: 'O cliente não existe'}
			if (!await validateIfVeterinaryExists(infos.veterinaryId))
				return {statusCode: 404, message: 'O veterinário não existe'}

			const createdAppointment = await appointmentModel.createAppointment(infos)
			if (createdAppointment) return {
				statusCode: 201,
				response: {message: 'Consulta criada com sucesso', createdAppointment}
			}
			return {statusCode: 400, message: 'Não foi possível criar a consulta'}

		} catch (err) {
			if (err instanceof Error) return {statusCode: 500, message: {error: JSON.parse(err.message)}}
			return {statusCode: 500, message: {error: `Unknown error \n ${err}`}}
		}
	}
}

async function validateIfClientExists(clientId: number): Promise<boolean> {
	try {
		const client = await new ClientModel().findClientById(clientId)
		return !!client;

	} catch (err) {
		return false
	}
}

async function validateIfVeterinaryExists(veterinaryId: number): Promise<boolean> {
	try {
		const veterinary = await new VeterinaryModel().findVeterinaryById(veterinaryId)
		return !!veterinary;

	} catch (err) {
		return false
	}
}
