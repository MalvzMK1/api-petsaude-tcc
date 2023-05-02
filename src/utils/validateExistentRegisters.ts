import ClientModel from "../model/clientModel";
import VeterinaryModel from "../model/veterinaryModel";
import PetModel from "../model/petModel";

const clientModel = new ClientModel()
const veterinaryModel = new VeterinaryModel()
const petModel = new PetModel()

export async function validateIfClientExists(clientId: number): Promise<boolean> {
	try {
		const client = await clientModel.findClientById(clientId)
		return !!client;

	} catch (err) {
		return false
	}
}

export async function validateIfVeterinaryExists(veterinaryId: number): Promise<boolean> {
	try {
		const veterinary = await veterinaryModel.findVeterinaryById(veterinaryId)
		return !!veterinary;

	} catch (err) {
		return false
	}
}

export async function validateIfPetExists(petId: number): Promise<boolean> {
	try {
		const pet = await petModel.findPet(petId)
		return !!pet;

	} catch (err) {
		return false
	}
}

export async function validateSameRgBetweenClientsAndVeterinarians(
	rg: string
) {
	const clients = await clientModel.findAllClients();
	const veterinarians = await veterinaryModel.getAllVeterinarys();

	if (clients && veterinarians) {
		const clientsWithSameRg = clients.filter((user) => {
			return user.rg === rg;
		});
		const veterinariansWithSameRg = veterinarians.filter((veterinary) => {
			return veterinary.rg === rg;
		});

		const usersWithSameRg = [...clientsWithSameRg, ...veterinariansWithSameRg];

		return usersWithSameRg;
	}
}

export async function validateSameEmailBetweenClientsAndVeterinarians(
	email: string
) {
	const clients = await clientModel.findAllClients();
	const veterinarians = await veterinaryModel.getAllVeterinarys();

	if (clients && veterinarians) {
		const clientsWithSameEmail = clients.filter((user) => {
			return user.email === email;
		});
		const veterinariansWithSameEmail = veterinarians.filter((veterinary) => {
			return veterinary.email === email;
		});

		return [
			...clientsWithSameEmail,
			...veterinariansWithSameEmail,
		];
	}
}

export async function validateSameCpfBetweenClientsAndVeterinarians(
	cpf: string
) {
	const clients = await clientModel.findAllClients();
	const veterinarians = await veterinaryModel.getAllVeterinarys();

	if (clients && veterinarians) {
		const clientsWithSameCpf = clients.filter((user) => {
			return user.cpf === cpf;
		});
		const veterinariansWithSameCpf = veterinarians.filter((veterinary) => {
			return veterinary.cpf === cpf;
		});

		return [
			...clientsWithSameCpf,
			...veterinariansWithSameCpf,
		];
	}
}
