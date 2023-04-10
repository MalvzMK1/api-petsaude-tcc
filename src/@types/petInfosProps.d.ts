import { PetGenderEnum, PetSizeEnum } from '@prisma/client';

type CreatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	size: PetSizeEnum;
	gender: PetGenderEnum;
	specieId: number;
	ownerId: number;
};

type PetInfosControllerProps = {
	name: string;
	birthDate: string;
	photo: string;
	microship: boolean;
	size: PetSizeEnum;
	gender: PetGenderEnum;
	specie: string;
	ownerID: number;
};

type UpdatePetInfosModelProps = {
	name: string;
	birthDate: Date;
	photo: string;
	microship: boolean;
	size: PetSizeEnum;
	gender: PetGenderEnum;
	specieId: number;
	ownerId: number;
};
