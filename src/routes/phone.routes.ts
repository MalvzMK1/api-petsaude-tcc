import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';

export default async function phoneRoutes(fastify: FastifyInstance) {
	fastify.put('/phone', { onRequest: authenticate }, async (request, reply) => {
		const queryParams = z.object({
			phoneNumberID: z.string(),
		});
		const bodyParams = z.object({
			phoneNumber: z.string(),
		});
	});
}
