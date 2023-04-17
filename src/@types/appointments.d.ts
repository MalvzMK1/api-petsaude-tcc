type AppointmentInfos = {
	description: string;
	clientId: number;
	veterinaryId: number;
	petId: number;
	date: Date;
	startsAt: Date;
	endsAt: Date;
}

type AppointmentInfosToBeParsed = {
	description: string;
	clientId: number;
	veterinaryId: number;
	petId: number;
	date: string;
	startsAt: string;
	endsAt: string;
}
