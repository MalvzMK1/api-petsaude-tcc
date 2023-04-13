import ClientModel from "../model/clientModel";
import VeterinaryModel from "../model/veterinaryModel";
import appointmentModel from "../model/appointmentModel";
import {parse} from "date-fns";

const timeZone = 'America/Sao_Paulo'

class AppointmentController {
	async createAppointment(infos: AppointmentInfosToBeParsed) {
		try {
			if (!await validateIfClientExists(infos.clientId))
				return {statusCode: 404, message: 'O cliente não existe'}
			if (!await validateIfVeterinaryExists(infos.veterinaryId))
				return {statusCode: 404, message: 'O veterinário não existe'}

			const appointmentDate = parse(infos.date, 'dd-MM-yyyy', new Date())
			if (appointmentDate.toString().toLowerCase() === 'invalid date')
				return {
					statusCode: 400,
					message: 'Formato de data incorreto, espera-se um formato dd-MM-yyyy'
				}

			if (parse(infos.startsAt, 'dd-MM-yyyy HH:mm:ss', new Date()).toString().toLowerCase() === 'invalid date')
				return {
					statusCode: 400,
					message: 'Formato de data incorreto, espera-se um formato dd-MM-yyyy HH:mm:ss'
				}

			if (parse(infos.endsAt, 'dd-MM-yyyy HH:mm:ss', new Date()).toString().toLowerCase() === 'invalid date')
				return {
					statusCode: 400,
					message: 'Formato de data incorreto, espera-se um formato dd-MM-yyyy HH:mm:ss'
				}

			const appointmentStartsAt = transformDateTimeStringIntoDate(infos.startsAt)

			return {statusCode: 400, message: appointmentStartsAt}

			const appointmentInfos: Appointment = {
				date: appointmentDate,
				startsAt: appointmentStartsAt,
				endsAt: new Date(),
				veterinaryId: infos.veterinaryId,
				clientId: infos.clientId,
				description: infos.description
			}

			console.log(appointmentInfos)

			const createdAppointment = await appointmentModel.createAppointment(appointmentInfos)
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

function transformDateTimeStringIntoDate(dateTime: string): Date {
	const [date, time] = dateTime.split(' ')
	const [day, month, year] = date.split('-').map(Number)
	const [hours, minutes, seconds] = time.split(':').map(Number)
	return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds))
}

export default new AppointmentController()
