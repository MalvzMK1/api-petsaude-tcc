type CreateUserInfosProps = {
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
};

type CreateUserInfosModelProps = {
	personName: string;
	cpf: string;
	email: string;
	password: string;
	cellphoneNumber: string;
	phoneNumber: string;
	address: {
		zipCode: string;
		number: string;
		complement: string;
	};
};

type UpdateClientPersonalInfosProps = {
	personName: string;
	cpf: string;
	rg: string | null;
	cellphoneNumber: string;
	phoneNumber: string | null;
	bio: string | null;
};

type UpdateClientProfileInfosProps = {
	userName: string;
	profilePhoto: string;
	profileBannerPhoto: string;
	email: string;
	password: string;
}

type JwtSignUser = {
	id: number;
	userName: string;
	email: string;
	profilePhoto: string | null;
	profileBannerPhoto: string | null;
	isVet: boolean;
};
