import { FastifyInstance } from 'fastify';
import fastify = require('fastify');
import { z } from 'zod';
import specialtiesController from '../controller/specialtiesController';
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

			const createdSpecialities = await SpecialtiesController.createSpecialties(
				body.specialities
			);
			reply.send(createdSpecialities);
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

			const createdAttendedAnimals =
				await SpecialtiesPetController.createPetSpecialties(
					body.attendedAnimals
				);
			reply
				.status(createdAttendedAnimals.statusCode)
				.send({ message: createdAttendedAnimals.message });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});

	fastify.get('/specialities/:id', async (req, res) => {
		try {
			const queryParams = z.object({ id: z.string() })

			const { id } = queryParams.parse(req.params);

			if (!id) res.status(400).send({ message: 'Required ID' });

			const response = await specialtiesController.findSpecialtiesVeterinary(parseInt(id));

			if (response) {
				res
					.status(response.statusCode)
					.send({ response: response?.message });
			}

		} catch (err) {
			if (err instanceof Error)
				res.status(400).send({ response: JSON.parse(err.message) });
			res.status(400).send({ response: 'Unknown error' });
		}
	})
	fastify.get('/specialities', async (req, res) => {
		try {
			const response = await specialtiesController.getSpecialities();

			if (response) {
				res
					.status(response.statusCode)
					.send({ response: response?.message });
			}
		} catch (err) {
			if (err instanceof Error)
				res.status(400).send({ response: JSON.parse(err.message) });
			res.status(400).send({ response: 'Unknown error' });
		}
	})

}
