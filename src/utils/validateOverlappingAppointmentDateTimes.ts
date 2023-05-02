import { isEqual } from 'date-fns';
import appointmentModel from '../model/appointmentModel';

export async function veterinaryAppointmentsOverlaps(
	appointmentInfos: AppointmentInfos
): Promise<Boolean> {
	const veterinaryAppointments =
		await appointmentModel.getVeterinaryAppointments(
			appointmentInfos.veterinaryId
		);

	const sameDateAppointment = veterinaryAppointments?.filter((appointment) =>
		isEqual(appointment.date, appointmentInfos.date)
	);

	if (sameDateAppointment) {
		const sameDateTimeAppointment = sameDateAppointment.find((appointment) => {
			const appointmentStartsAtTime = `${appointment.startsAt.getHours()}:${appointment.startsAt.getMinutes()}:${
				appointment.startsAt.getSeconds
			}`;
			const appointmentToCreateStartsAtTime = `${appointmentInfos.startsAt.getHours()}:${appointmentInfos.startsAt.getMinutes()}:${
				appointmentInfos.startsAt.getSeconds
			}`;
			return appointmentStartsAtTime === appointmentToCreateStartsAtTime;
		});
		console.log({ sameDateTimeAppointment });

		if (sameDateTimeAppointment) return true;
		return false;
	}
	return false;
}

export async function clientAppointmentsOverlaps(
	appointmentInfos: AppointmentInfos
): Promise<Boolean> {
	const clientAppointments = await appointmentModel.getClientAppointments(
		appointmentInfos.clientId
	);

	const sameDateAppointment = clientAppointments?.filter((appointment) =>
		isEqual(appointment.date, appointmentInfos.date)
	);

	if (sameDateAppointment) {
		const sameDateTimeAppointment = sameDateAppointment.find((appointment) => {
			const appointmentStartsAtTime = `${appointment.startsAt.getHours()}:${appointment.startsAt.getMinutes()}:${
				appointment.startsAt.getSeconds
			}`;
			const appointmentToCreateStartsAtTime = `${appointmentInfos.startsAt.getHours()}:${appointmentInfos.startsAt.getMinutes()}:${
				appointmentInfos.startsAt.getSeconds
			}`;
			return appointmentStartsAtTime === appointmentToCreateStartsAtTime;
		});
		console.log({ sameDateTimeAppointment });

		if (sameDateTimeAppointment) return true;
		return false;
	}
	return false;
}

export async function petAppointmentsOverlaps(
	appointmentInfos: AppointmentInfos
): Promise<Boolean> {
	const petAppointments = await appointmentModel.getPetAppointments(
		appointmentInfos.petId
	);

	const sameDateAppointment = petAppointments?.filter((appointment) =>
		isEqual(appointment.date, appointmentInfos.date)
	);

	if (sameDateAppointment) {
		const sameDateTimeAppointment = sameDateAppointment.find((appointment) => {
			const appointmentStartsAtTime = `${appointment.startsAt.getHours()}:${appointment.startsAt.getMinutes()}:${
				appointment.startsAt.getSeconds
			}`;
			const appointmentToCreateStartsAtTime = `${appointmentInfos.startsAt.getHours()}:${appointmentInfos.startsAt.getMinutes()}:${
				appointmentInfos.startsAt.getSeconds
			}`;
			return appointmentStartsAtTime === appointmentToCreateStartsAtTime;
		});
		console.log({ sameDateTimeAppointment });

		if (sameDateTimeAppointment) return true;
		return false;
	}
	return false;
}
