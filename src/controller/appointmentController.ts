import appointmentModel from '../model/appointmentModel';
import { parse, isEqual, isSameMinute } from 'date-fns';
import transformDateTimeStringIntoDate, {
	transformDateStringIntoDate,
} from '../utils/transformDateTimeStringIntoDate';
import { Appointment, Prisma, Status } from '@prisma/client';
import {
	validateIfClientExists,
	validateIfPetExists,
	validateIfVeterinaryExists,
} from '../utils/validateExistentRegisters';
import {
	clientAppointmentsOverlaps,
	petAppointmentsOverlaps,
	veterinaryAppointmentsOverlaps,
} from '../utils/validateOverlappingAppointmentDateTimes';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

class AppointmentController {
	async createAppointment(infos: AppointmentInfosToBeParsed) {
		try {
			if (!(await validateIfClientExists(infos.clientId)))
				return { statusCode: 404, message: 'O cliente não existe' };
			if (!(await validateIfVeterinaryExists(infos.veterinaryId)))
				return { statusCode: 404, message: 'O veterinário não existe' };
			if (!(await validateIfPetExists(infos.petId)))
				return { statusCode: 404, message: 'O pet não existe' };

			if (
				parse(infos.date, 'dd-MM-yyyy', new Date()).toString().toLowerCase() ===
				'invalid date'
			)
				return {
					statusCode: 400,
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy',
							path: 'date',
						},
					},
				};

			if (
				parse(infos.startsAt, 'dd-MM-yyyy HH:mm:ss', new Date())
					.toString()
					.toLowerCase() === 'invalid date'
			)
				return {
					statusCode: 400,
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy HH:mm:ss',
							path: 'startsAt',
						},
					},
				};

			if (
				parse(infos.endsAt, 'dd-MM-yyyy HH:mm:ss', new Date())
					.toString()
					.toLowerCase() === 'invalid date'
			)
				return {
					statusCode: 400,
					message: {
						error: {
							title: 'Formato de data incorreto',
							fix: 'Espera-se um formato dd-MM-yyyy HH:mm:ss',
							path: 'endsAt',
						},
					},
				};

			const appointmentStartsAt = transformDateTimeStringIntoDate(
				infos.startsAt
			);
			const appointmentEndsAt = transformDateTimeStringIntoDate(infos.endsAt);
			const appointmentDate = transformDateStringIntoDate(infos.date);

			if (
				appointmentStartsAt < new Date() ||
				appointmentDate < new Date() ||
				appointmentEndsAt < new Date()
			)
				return {
					statusCode: 400,
					message: 'A data não pode ser anterior a atual',
				};
			else if (appointmentEndsAt < appointmentStartsAt)
				return {
					statusCode: 400,
					message: 'A data de término não pode ser anterior à data de início',
				};

			const appointmentInfos: AppointmentInfos = {
				date: appointmentDate,
				startsAt: appointmentStartsAt,
				endsAt: appointmentEndsAt,
				veterinaryId: infos.veterinaryId,
				clientId: infos.clientId,
				description: infos.description,
				petId: infos.petId,
			};

			if (await veterinaryAppointmentsOverlaps(appointmentInfos))
				return {
					statusCode: 400,
					message:
						'Já existe uma consulta agendada para o Veterinário nesse horário',
				};

			if (await clientAppointmentsOverlaps(appointmentInfos))
				return {
					statusCode: 400,
					message:
						'Já existe uma consulta agendada para o Cliente nesse horário',
				};

			if (await petAppointmentsOverlaps(appointmentInfos))
				return {
					statusCode: 400,
					message: 'Já existe uma consulta agendada para o Pet nesse horário',
				};

			const createdAppointment = await appointmentModel.createAppointment(
				appointmentInfos
			);
			if (createdAppointment)
				return {
					statusCode: 201,
					response: {
						message: 'Consulta criada com sucesso',
						createdAppointment,
					},
				};
			return { statusCode: 400, message: 'Não foi possível criar a consulta' };
		} catch (err) {
			if (err instanceof Error)
				return { statusCode: 500, message: { error: JSON.parse(err.message) } };
			return { statusCode: 500, message: { error: `Unknown error \n ${err}` } };
		}
	}

	async getAllAppointments(): Promise<{
		statusCode: number;
		message: string | Appointment[] | Error;
	}> {
		try {
			const allAppointments = await appointmentModel.getAllAppointments();
			if (allAppointments.length > 0)
				return { statusCode: 200, message: allAppointments };
			return {
				statusCode: 404,
				message: 'Nenhuma consulta foi achada no banco de dados',
			};
		} catch (err) {
			if (err instanceof Error) return { statusCode: 500, message: err };
			return { statusCode: 500, message: `Unkown error \n ${err}` };
		}
	}

	async getAppointmentById(
		id: number
	): Promise<{ statusCode: number; message: string | Appointment | Error }> {
		try {
			const appointment = await appointmentModel.findAppointmentById(id);
			if (appointment) return { statusCode: 200, message: appointment };
			return {
				statusCode: 404,
				message: 'Nenhuma conculsta foi achada no banco de dados',
			};
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError)
				return { statusCode: 400, message: err };
			if (err instanceof Error) return { statusCode: 500, message: err };
			return { statusCode: 500, message: `Unkown error \n ${err}` };
		}
	}

	async deleteAppointment(
		id: number
	): Promise<{ statusCode: number; message: string | Appointment | Error }> {
		try {
			const deletedAppointment = await appointmentModel.deleteAppointment(id);
			if (deletedAppointment)
				return { statusCode: 200, message: deletedAppointment };
			return {
				statusCode: 404,
				message: 'Não foi possível realizar a exclusão',
			};
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2025') return { statusCode: 400, message: err };
				return { statusCode: 400, message: err };
			}
			return { statusCode: 500, message: `Unkown error \n ${err}` };
		}
	}

	async updateAppointmentStatus(appointmentId: number, status: string) {
		try {
			let parsedStatus: Status;
			switch (status) {
				case 'WAITING_CONFIRMATION':
					status = 'WAITING_CONFIRMATION';
					break;
				case 'CANCELED':
					status = 'CANCELED';
					break;
				case 'CONCLUDED':
					status = 'CONCLUDED';
					break;
				default:
					return {
						statusCode: 400,
						message: 'Tipos de tamanho incorretos',
						options: ['SMALL', 'MEDIUM', 'BIG'],
					};
			}
		} catch (err) {
			if (err instanceof Error)
				return { statusCode: 400, message: JSON.parse(err.message) };
			if (err instanceof PrismaClientKnownRequestError)
				return { statusCode: 500, message: err };
			return { statusCode: 500, message: { unknown_error: err } };
		}
	}
}

export default new AppointmentController();
