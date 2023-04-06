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
};
