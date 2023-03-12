type CreateUserInfosProps = {
	personName: string;
	userName: string;
	cpf: string;
	rg: string;
	profilePhoto?: string;
	profileBannerPhoto?: string;
	email: string;
	password: string;
	isVet: boolean;
	cep: string;
	street: string;
	complement?: string;
	number: string;
	neighborhood: string;
	cityId: number;
	cityInitials: string;
	cityName: string;
	stateId: number;
	vetInfos?: {
		occupationArea: string;
		formation: string;
		institution: string;
		crmv: string;
		animalTypes: { name: string }[];
		specialities: { name: string }[];
	};
	phoneNumber: {
		number: string;
	}[];
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
