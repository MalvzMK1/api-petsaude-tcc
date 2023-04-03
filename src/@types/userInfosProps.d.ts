type CreateUserInfosProps = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string | null;
	address: {
		zipCode: string;
		neighborhood: string;
		city: string;
		state: string;
		street: string;
		number: string;
		complement: string;
	};
};

type CreateUserInfosModelProps = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string;
	address: {
		cep: string;
		neighborhood: string;
		cityID: number;
		stateID: number;
		street: string;
		number: string;
		complement: string;
	};
};

type UpdateUserInfosProps = {
	personName: string;
	userName: string;
	cpf: string;
	rg: string;
	profilePhoto?: string;
	profileBannerPhoto?: string;
	email: string;
	isVet: boolean;
	addressId: number;
	vetInfosId?: number;
	vetInfos?: {
		occupationArea: string;
		formation: string;
		institution: string;
		crmv: string;
	};
};

type createVeterinaryController = {
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
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	startActingDate: Date;
	formationDate: Date;
	animalTypes?: { id: number; name: string }[];
	specialities?: { id: number; name: string }[];
};

type UpdateVetInfosProps = {
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	animalTypes?: { id: number; name: string }[];
	specialities?: { id: number; name: string }[];
};

type UpdateSpecialities = {
	id: number;
	name: string;
};

type postPhoneUser = {
	userId: number;
	number: string;
};

type jwtSignUser = {
	userName: string;
	email: string;
	profilePhoto: string;
	profileBannerPhoto: string;
	isVet: boolean;
};
