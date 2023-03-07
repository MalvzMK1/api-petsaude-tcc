import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import { CreatePetInfosControllerProps } from '../lib/petInfosProps';
import PetController from '../controller/pet.controller';

const petController = new PetController();

export default async function petRoutes(fastify: FastifyInstance) {
	fastify.get('/pet', async (request, reply) => {
		const queryParams = z.object({
			petID: z.string(),
		});

		const { petID } = queryParams.parse(request.query);
		const controllerResponse = await petController.getPetById(parseInt(petID));

		reply
			.status(controllerResponse.statusCode)
			.send({ message: controllerResponse });
	});
	fastify.get('/pet/all', async (request, reply) => {
		const queryParams = z.object({
			userID: z.string(),
		});
		const { userID } = queryParams.parse(request.query);

		const controllerResponse = await petController.getAllPets(parseInt(userID));

		reply
			.status(controllerResponse.statusCode)
			.send({ message: controllerResponse });
	});
	fastify.post('/pet', { onRequest: authenticate }, async (request, reply) => {
		const bodyParams = z.object({
			name: z.string(),
			birthDate: z.string(),
			photo: z.string(),
			microship: z.boolean(),
			size: z.string(),
			gender: z.string(),
			specie: z.string(),
		});
		const queryParams = z.object({
			userID: z.string(),
		});

		const body = bodyParams.parse(request.body);
		const { userID } = queryParams.parse(request.query);

		const createPetInfos: CreatePetInfosControllerProps = {
			...body,
			ownerId: parseInt(userID),
		};

		const controllerResponse = await petController.createPet(createPetInfos);

		reply.send({ response: controllerResponse });
	});
	fastify.delete(
		'/pet',
		{ onRequest: authenticate },
		async (request, reply) => {
			const queryParams = z.object({
				petID: z.string(),
			});

			const { petID } = queryParams.parse(request.query);
			const controllerResponse = await petController.deletePet(parseInt(petID));

			reply.status(200).send({ response: controllerResponse });
		}
	);
}
