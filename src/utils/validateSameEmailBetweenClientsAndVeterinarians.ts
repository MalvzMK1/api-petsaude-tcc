import ClientModel from '../model/clientModel';
import VeterinaryModel from '../model/veterinaryModel';

const clientModel = new ClientModel();
const veterinaryModel = new VeterinaryModel();

export default async function validateSameEmailBetweenClientsAndVeterinarians(
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

		const usersWithSameEmail = [
			...clientsWithSameEmail,
			...veterinariansWithSameEmail,
		];

		return usersWithSameEmail;
	}
}
