type CreatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	size: EnumPetSize;
	gender: EnumPetGender;
	specieId: number;
	ownerId: number;
};

type PetInfosControllerProps = {
	name: string;
	birthDate: string;
	photo: string;
	microship: boolean;
	size: EnumPetSize;
	gender: EnumPetGender;
	specie: string;
	ownerID: number;
};

type UpdatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	size: EnumPetSize;
	gender: EnumPetGender;
	specieId: number;
	ownerId: number;
};

declare enum EnumPetSize {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	BIG = 'BIG',
}

declare enum EnumPetGender {
	FEMALE = 'F',
	MALE = 'M',
}
