import { FastifyInstance } from 'fastify';
import { unknown, z } from 'zod';
import SpecialtiesController from '../controller/specialtiesController';
import SpecialtiesPetController from '../controller/specialtiesPetsController';
import Messages from '../messages/message';
import validateEmptyBody from '../utils/validateBody';

export default async function specialitiesRoutes(fastify: FastifyInstance) {
	fastify.post('/specialities', async (request, reply) => {
		try {
			const bodyParams = z.object({
				specialities: z.array(
					z.object({
						name: z.string(),
					})
				),
			});

			//@ts-ignore
			if (!validateEmptyBody(request.body))
				reply
					.status(400)
					.send({ response: new Messages().MESSAGE_ERROR.EMPTY_BODY });

			const body = bodyParams.parse(request.body);

			const headerContentType = request.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const createdSpecialities =
						await SpecialtiesController.createSpecialties(body.specialities);
					reply.send(createdSpecialities);
				} else reply.status(404).send('the body cannot be empty');
			} else
				reply.status(415).send('The request header has no valid content-type!');
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});
	fastify.post('/attended-animals', async (request, reply) => {
		try {
			const bodyParams = z.object({
				attendedAnimals: z.array(
					z.object({
						name: z.string(),
					})
				),
			});

			//@ts-ignore
			if (!validateEmptyBody(request.body))
				reply
					.status(400)
					.send({ response: new Messages().MESSAGE_ERROR.EMPTY_BODY });

			const body = bodyParams.parse(request.body);
			const headerContentType = request.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const createdAttendedAnimals =
						await SpecialtiesPetController.createPetSpecialties(
							body.attendedAnimals
						);
					reply
						.status(createdAttendedAnimals.statusCode)
						.send({ message: createdAttendedAnimals.message });
				} else reply.status(404).send('the body cannot be empty');
			} else
				reply.status(415).send('The request header has no valid content-type!');
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});
}
