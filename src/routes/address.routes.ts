import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import AddressController from '../controller/addressController';

const addressController = new AddressController();

export default async function addressRoutes(fastify: FastifyInstance) {
	fastify.put(
		'/address',
		{ onRequest: authenticate },
		async (request, reply) => {
			try {
				const bodyParams = z.object({
					zipCode: z.string(),
					complement: z.string(),
					number: z.string(),
				});
				const queryParams = z.object({
					addressID: z.string(),
				});

				const body: AddressUpdateControllerProps = bodyParams.parse(
					request.body
				);
				const { addressID } = queryParams.parse(request.query);

				const updatedAddress = await addressController.updateAddress(
					parseInt(addressID),
					body
				);

				reply
					.status(updatedAddress.statusCode)
					.send({ response: updatedAddress.message });
			} catch (err) {
				if (err instanceof Error)
					reply.status(404).send({ response: JSON.parse(err.message) });
				else reply.status(404).send({ response: 'Campos inválidos' });
			}
		}
	);
}
