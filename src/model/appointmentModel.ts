import prisma from "../lib/prisma";
import {Appointment} from "@prisma/client";

class AppointmentModel {
	async createAppointment(infos: AppointmentInfos): Promise<Appointment> {
		try {
			return await prisma.appointment.create({
				data: {
					description: infos.description,
					date: infos.date,
					startsAt: infos.startsAt,
					endsAt: infos.endsAt,
					clientId: infos.clientId,
					veterinaryId: infos.veterinaryId,
				}
			})
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`)
			throw new Error(`${err}`)
		}
	}

	async getAllAppointments(): Promise<Appointment[]> {
		try {
			return await prisma.appointment.findMany()
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`)
			throw new Error(`${err}`)
		}
	}

	async findAppointmentById(id: number): Promise<Appointment | null> {
		try {
			return await prisma.appointment.findUnique({
				where: {
					id
				}
			})
		} catch (err) {
			if (err instanceof Error) throw new Error(`${err.message}`)
			throw new Error(`${err}`)
		}
	}

	async deleteAppointment(id: number): Promise<Appointment | null> {
		try {
			return prisma.appointment.delete({
				where: {
					id
				}
			});
		} catch (err) {
			console.log(err)
			return null
		}
	}
}

export default new AppointmentModel()
