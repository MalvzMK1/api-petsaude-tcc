export interface AddressUpdateControllerProps {
	cep: string;
	street: string;
	complement: string;
	number: string;
	neighborhood: string;
	city: string;
}

export interface AddressUpdateModelProps {
	cep: string;
	street: string;
	complement: string;
	number: string;
	neighborhood: string;
	cityID: number;
}
