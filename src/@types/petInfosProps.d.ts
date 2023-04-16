type CreatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	size: PetSize;
	gender: PetGender;
	specieId: number;
	ownerId: number;
};

type PetInfosControllerProps = {
	name: string;
	birthDate: string;
	photo: string;
	microship: boolean;
	size: string;
	gender: string;
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

enum EnumPetSize {
	BIG = 'BIG',
	MEDIUM = 'MEDIUM',
	SMALL = 'SMALL',
}

type PetSize = keyof typeof EnumPetSize;

enum EnumPetGender {
	F = 'F',
	M = 'M',
}

type PetGender = keyof typeof EnumPetGender;
