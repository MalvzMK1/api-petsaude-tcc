type Appointment = {
	description: string;
	clientId: number;
	veterinaryId: number;
	date: Date;
	startsAt: Date;
	endsAt: Date;
}

type AppointmentInfosToBeParsed = {
	description: string;
	clientId: number;
	veterinaryId: number;
	date: string;
	startsAt: string;
	endsAt: string;
}
