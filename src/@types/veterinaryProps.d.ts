type createVeterinaryController = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string | null;
	address: {
		zipCode: string;
		number: string;
		complement: string | null;
	};
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	startActingDate: string;
	formationDate: string;
	animalTypes?: { id: number; name: string }[];
	specialities?: { id: number; name: string }[];
};

type createVeterinaryModel = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string | null;
	address: {
		zipCode: string;
		number: string;
		complement: string | null;
	};
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	startActingDate: Date;
	formationDate: Date;
	animalTypes?: { id: number; name: string }[];
	specialities?: { id: number; name: string }[];
};

type UpdateVeterinaryProps = {
	personName: string;
	cpf: string;
	rg: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string | null;
	address: {
		zipCode: string;
		number: string;
		complement: string | null;
	};
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	animalTypes?: { id: number; name: string }[];
	specialities?: { id: number; name: string }[];
	bio: string;
};

type UpdateSpecialities = {
	id: number;
	name: string;
};
