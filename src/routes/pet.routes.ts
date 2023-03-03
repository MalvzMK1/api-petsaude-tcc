import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import { CreatePetInfosControllerProps } from '../lib/petInfosProps';

export default async function petRoutes(fastify: FastifyInstance) {
	fastify.post('/pet', { onRequest: authenticate }, async (request, reply) => {
		const bodyParams = z.object({
			birthDate: z.string(),
			photo: z.string(),
			microship: z.boolean(),
			size: z.string(),
			gender: z.string(),
			specie: z.string(),
		});
		const queryParams = z.object({
			ownerId: z.number(),
		});

		const body = bodyParams.parse(request.body);
		const { ownerId } = queryParams.parse(request.query);

		reply.send(ownerId);
	});
}
