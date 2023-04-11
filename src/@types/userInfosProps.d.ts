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

type UpdateUserInfosProps = {
	personName: string;
	cpf: string;
	rg: string;
	cellphoneNumber: string;
	phoneNumber: string;
	bio: string;
};

type postPhoneUser = {
	userId: number;
	number: string;
};

type jwtSignUser = {
	id: number;
	userName: string;
	email: string;
	profilePhoto: string;
	profileBannerPhoto: string;
	isVet: boolean;
};
