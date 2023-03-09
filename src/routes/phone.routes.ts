import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import validateEmptyBody from '../utils/validateBody';
import Messages from '../messages/message';
import PhoneNumberController from '../controller/phoneNumber.controller';

const messages = new Messages();
const phoneNumberController = new PhoneNumberController();

export default async function phoneRoutes(fastify: FastifyInstance) {
	fastify.put('/phone', { onRequest: authenticate }, async (request, reply) => {
		const queryParams = z.object({
			phoneNumberID: z.string(),
		});
		const bodyParams = z.object({
			phoneNumber: z.string(),
		});

		const rawBody: object = request.body!!;
		if (!validateEmptyBody(rawBody)) {
			reply.status(400).send({ message: messages.MESSAGE_ERROR.EMPTY_BODY });
		}

		const { phoneNumberID } = queryParams.parse(request.query);
		const { phoneNumber } = bodyParams.parse(request.body);

		const updatedPhone = await phoneNumberController.updatePhoneNumber(
			parseInt(phoneNumberID),
			phoneNumber
		);

		reply
			.status(updatedPhone.statusCode)
			.send({ message: messages.MESSAGE_SUCESS.UPDATE_ITEM });
	});
}
