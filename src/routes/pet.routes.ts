import {FastifyInstance} from 'fastify';
import authenticate from '../middlewares/authenticate';
import {z} from 'zod';
import PetController from '../controller/petController';

const petController = new PetController();

export default async function petRoutes(fastify: FastifyInstance) {
	fastify.get('/pet', async (request, reply) => {
		try {
			const queryParams = z.object({
				petID: z.string(),
			});

			const {petID} = queryParams.parse(request.query);
			const controllerResponse = await petController.getPetById(
				parseInt(petID)
			);

			reply
				.status(controllerResponse.statusCode)
				.send({message: controllerResponse});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({message: JSON.parse(err.message)});
			reply.status(400).send({message: err});
		}
	});

	fastify.get('/pet/all', async (request, reply) => {
		try {
			const queryParams = z.object({
				userID: z.string(),
			});
			const {userID} = queryParams.parse(request.query);

			const controllerResponse = await petController.getAllPets(
				parseInt(userID)
			);

			reply
				.status(controllerResponse.statusCode)
				.send({message: controllerResponse});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({message: JSON.parse(err.message)});
			reply.status(400).send({message: err});
		}
	});

	fastify.post('/pet', {onRequest: authenticate}, async (request, reply) => {
		try {
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
			const {userID} = queryParams.parse(request.query);

			const createPetInfos: PetInfosControllerProps = {
				...body,
				ownerID: parseInt(userID),
			};

			const controllerResponse = await petController.createPet(createPetInfos);

			reply
				.status(controllerResponse.statusCode)
				.send({response: controllerResponse});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({message: err.message});
			reply.status(400).send({message: err});
		}
	});

	fastify.delete(
		'/pet',
		{onRequest: authenticate},
		async (request, reply) => {
			try {
				const queryParams = z.object({
					petID: z.string(),
				});

				const {petID} = queryParams.parse(request.query);
				const controllerResponse = await petController.deletePet(
					parseInt(petID)
				);

				reply.status(200).send({response: controllerResponse});
			} catch (err) {
				if (err instanceof Error)
					reply.status(400).send({message: err.message});
				reply.status(400).send({message: err});
			}
		}
	);

	fastify.put('/pet', {onRequest: authenticate}, async (request, reply) => {
		try {
			const bodyParams = z.object({
				name: z.string(),
				birthDate: z.string(),
				photo: z.string(),
				microship: z.boolean(),
				size: z.string(),
				gender: z.string(),
				specie: z.string(),
				ownerID: z.number(),
			});
			const queryParams = z.object({
				petID: z.string(),
			});

			const {petID} = queryParams.parse(request.query);
			const petInfos = bodyParams.parse(request.body);

			const controllerResponse = await petController.updatePet(
				parseInt(petID),
				petInfos
			);

			if (controllerResponse.pet)
				reply.status(controllerResponse.statusCode).send({
					pet: controllerResponse.pet,
					message: controllerResponse.message,
				});
			reply
				.status(controllerResponse.statusCode)
				.send({message: controllerResponse.message});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({message: err.message});
			reply.status(400).send({message: err});
		}
	});
}
