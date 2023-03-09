export interface CreateUserInfosProps {
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
}

export interface UpdateUserInfosProps {
	personName: string;
	userName: string;
	cpf: string;
	rg: string;
	profilePhoto?: string;
	profileBannerPhoto?: string;
	email: string;
	isVet: boolean;
}

export interface UpdateVetInfosProps {
	occupationArea: string;
	formation: string;
	institution: string;
	crmv: string;
	animalTypes?: { id: number; name: String }[];
	specialities?: { id: number; name: String }[];
}

export interface UpdateSpecialities {
	id: number;
	name: string;
}

export interface postPhoneUser {
	userId: number;
	number: string;
}

export interface jwtSignUser {
	userName: string;
	email: string;
	profilePhoto: string;
	profileBannerPhoto: string;
	isVet: boolean;
}
