import prisma from "../lib/prisma";

class AppointmentModel {
	async createAppointment(infos: Appointment) {
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

		}
	}
}

export default new AppointmentModel()
