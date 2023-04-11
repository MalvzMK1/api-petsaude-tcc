import ClientModel from '../model/clientModel';
import VeterinaryModel from '../model/veterinaryModel';

const clientModel = new ClientModel();
const veterinaryModel = new VeterinaryModel();

export default async function validateSameEmailBetweenClientsAndVeterinarians(
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
