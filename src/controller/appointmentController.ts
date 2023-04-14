import ClientModel from "../model/clientModel";
import VeterinaryModel from "../model/veterinaryModel";
import appointmentModel from "../model/appointmentModel";
import {parse} from "date-fns";
import transformDateTimeStringIntoDate from "../utils/transformDateTimeStringIntoDate";
import {Appointment} from "@prisma/client";

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
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy HH:mm:ss',
							path: 'startsAt'
						}
					}
				}

			if (parse(infos.endsAt, 'dd-MM-yyyy HH:mm:ss', new Date()).toString().toLowerCase() === 'invalid date')
				return {
					statusCode: 400,
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy HH:mm:ss',
							path: 'endsAt'
						}
					}
				}

			const appointmentStartsAt = transformDateTimeStringIntoDate(infos.startsAt)
			const appointmentEndsAt = transformDateTimeStringIntoDate(infos.endsAt)

			// return {statusCode: 400, message: appointmentDate}

			if (appointmentStartsAt < new Date() || appointmentDate < new Date() || appointmentEndsAt < new Date())
				return {statusCode: 400, message: 'A data não pode ser anterior à atual'}

			const appointmentInfos: AppointmentInfos = {
				date: appointmentDate,
				startsAt: appointmentStartsAt,
				endsAt: appointmentEndsAt,
				veterinaryId: infos.veterinaryId,
				clientId: infos.clientId,
				description: infos.description,
			}

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

	async getAllAppointments(): Promise<{ statusCode: number, message: string | Appointment[] | Error }> {
		try {
			const allAppointments = await appointmentModel.getAllAppointments()
			if (allAppointments.length > 0)
				return {statusCode: 200, message: allAppointments}
			return {statusCode: 404, message: 'Nenhuma consulta foi achada no banco de dados'}
		} catch (err) {
			if (err instanceof Error) return {statusCode: 500, message: err}
			return {statusCode: 500, message: `Unkown error \n ${err}`}
		}
	}

	async getAppointmentById(id: number): Promise<{ statusCode: number, message: string | Appointment | Error }> {
		try {
			const appointment = await appointmentModel.findAppointmentById(id)
			if (appointment)
				return {statusCode: 200, message: appointment}
			return {statusCode: 404, message: 'Nenhuma conculsta foi achada no banco de dados'}
		} catch (err) {
			if (err instanceof Error) return {statusCode: 500, message: err}
			return {statusCode: 500, message: `Unkown error \n ${err}`}
		}
	}

	async deleteAppointment(id: number): Promise<{ statusCode: number, message: string | Appointment | Error }> {
		try {
			const deletedAppointment = await appointmentModel.deleteAppointment(id)
			if (deletedAppointment)
				return {statusCode: 200, message: deletedAppointment}
			return {statusCode: 404, message: 'Não foi possível realizar a exclusão'}
		} catch (err) {
			if (err instanceof Error) return {statusCode: 500, message: err}
			return {statusCode: 500, message: `Unkown error \n ${err}`}
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

export default new AppointmentController()
