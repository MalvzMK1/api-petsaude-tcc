import ClientModel from "../model/clientModel";
import VeterinaryModel from "../model/veterinaryModel";
import PetModel from "../model/petModel";

export async function validateIfClientExists(clientId: number): Promise<boolean> {
	try {
		const client = await new ClientModel().findClientById(clientId)
		return !!client;

	} catch (err) {
		return false
	}
}

export async function validateIfVeterinaryExists(veterinaryId: number): Promise<boolean> {
	try {
		const veterinary = await new VeterinaryModel().findVeterinaryById(veterinaryId)
		return !!veterinary;

	} catch (err) {
		return false
	}
}

export async function validateIfPetExists(petId: number): Promise<boolean> {
	try {
		const pet = await new PetModel().findPet(petId)
		return !!pet;

	} catch (err) {
		return false
	}
}
