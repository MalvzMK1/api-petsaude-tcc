import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Messages from '../messages/message';
import AddressController from '../controller/addressController';

const messages = new Messages();
const addressController = new AddressController();

export default async function addressRoutes(fastify: FastifyInstance) {
	fastify.put(
		'/address',
		{ onRequest: authenticate },
		async (request, reply) => {
			const bodyParams = z.object({
				cep: z.string(),
				street: z.string(),
				complement: z.string(),
				number: z.string(),
				neighborhood: z.string(),
				city: z.string(),
			});
			const queryParams = z.object({
				addressID: z.string(),
			});
			const rawBody = request.body;
			if (JSON.stringify(rawBody) === '{}')
				reply.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

			try {
				bodyParams.parse(request.body);
			} catch (error) {
				reply
					.status(400)
					.send({ message: messages.MESSAGE_ERROR.TYPES_DOESNT_MATCH });
			}

			const body: AddressUpdateControllerProps = bodyParams.parse(request.body);
			const { addressID } = queryParams.parse(request.query);

			const updatedAddress = await addressController.updateAddress(
				parseInt(addressID),
				body
			);

			reply
				.status(updatedAddress.statusCode)
				.send({ message: updatedAddress.message });
		}
	);
}
