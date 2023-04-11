import ClientModel from '../model/clientModel';
import VeterinaryModel from '../model/veterinaryModel';

const clientModel = new ClientModel();
const veterinaryModel = new VeterinaryModel();

export default async function validateSameCpfBetweenClientsAndVeterinarians(
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

		const usersWithSameCpf = [
			...clientsWithSameCpf,
			...veterinariansWithSameCpf,
		];

		return usersWithSameCpf;
	}
}
