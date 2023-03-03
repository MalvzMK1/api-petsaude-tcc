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

export interface CreatePetInfosControllerProps {
	name: string;
	birthDate: string;
	photo: string;
	microship: boolean;
	size: string;
	gender: string;
	specie: string;
	ownerId: number;
}
