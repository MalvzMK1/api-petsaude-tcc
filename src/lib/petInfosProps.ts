export interface CreatePetInfosModelProps {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	sizeId: number;
	genderId: number;
	specieId: number;
	ownerId: number;
}

export interface PetInfosControllerProps {
	name: string;
	birthDate: string;
	photo: string;
	microship: boolean;
	size: string;
	gender: string;
	specie: string;
	ownerID: number;
}

export interface UpdatePetInfosModelProps {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	sizeId: number;
	genderId: number;
	specieId: number;
	ownerId: number;
}
