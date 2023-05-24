type AppointmentInfos = {
	description: string;
	clientId: number;
	veterinaryId: number;
	petId: number;
	date: Date;
	startsAt: Date;
}

type AppointmentInfosToBeParsed = {
	description: string;
	clientId: number;
	veterinaryId: number;
	petId: number;
	date: string;
	startsAt: string;
}

enum EnumUserRole {
	COMMON = 'COMMON',
	VETERINARY = 'VETERINARY',
}

type UserRole = keyof typeof EnumUserRole;

