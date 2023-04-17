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

type UpdateVeterinaryPersonalInfos = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	rg: string;
	phoneNumber: string | null;
	profilePhoto: string | null;
	profileBannerPhoto: string | null;
}

type UpdateVeterinaryProfessionalInfos = {
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	startActingDate: string;
	formationDate: string;
}

type UpdateSpecialities = {
	id: number;
	name: string;
};

type VeterinaryApiResponse = {
	personName: string;
	userName: string;
	cpf: string;
	rg: string;
	cellphoneNumber: string;
	phoneNumber: string;
	address: {
		id: number;
		zipCode: string;
		number: string;
		complement: string;
	};
	professionalInfos: {
		occupationArea: string;
		formation: string;
		formationDate: string;
		institution: string;
		startActingDate: string;
		specialities: string[];
		specializedAnimals: string[];
	};
};
