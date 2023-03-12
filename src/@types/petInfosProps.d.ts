type CreatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	sizeId: number;
	genderId: number;
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
	sizeId: number;
	genderId: number;
	specieId: number;
	ownerId: number;
};
