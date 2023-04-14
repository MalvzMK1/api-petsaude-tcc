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

enum EnumPetSize {
	BIG = "BIG",
	MEDIUM = "MEDIUM",
	SMALL = "SMALL",
}

type PetSize = keyof typeof EnumPetSize

enum EnumPetGender {
	FEMALE = 'F',
	MALE = 'M',
}

type PetGender = keyof typeof EnumPetGender
