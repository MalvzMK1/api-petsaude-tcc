import { FastifyInstance } from 'fastify';
import userController from '../controller/userController';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Message from '../messages/message';
import Messages from '../messages/message';
import validateEmptyBody from '../utils/validateBody';

const message = new Message();

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post('/user', async (request, reply) => {
		try {
			const bodyParams = z.object({
				personName: z.string(),
				cpf: z.string(),
				email: z.string(),
				password: z.string(),
				cellphoneNumber: z.string(),
				phoneNumber: z.string().nullable(),
				address: z.object({
					zipCode: z.string(),
					complement: z.string().nullable(),
					number: z.string(),
				}),
			});

			console.log(request.body);

			const rawBody = request.body;
			if (JSON.stringify(rawBody) === '{}')
				reply.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

			const body = bodyParams.parse(request.body);

			console.log(body);
			const createUser = await userController.createUser(body);

			reply
				.status(createUser.statusCode)
				.send({ response: createUser.message });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});

	fastify.get('/user', async (req, res) => {
		const queryParams = z.object({
			userID: z.string(),
		});

		const { userID } = queryParams.parse(req.query);

		if (!userID) res.status(400).send({ message: 'Required ID' });

		const userInfos = await userController.getUserById(parseInt(userID));

		res.status(userInfos.statusCode).send({ user: userInfos?.message });
	});

	fastify.get('/user/all', async (req, reply) => {
		const allUsers = await userController.getAllUsers();

		reply.status(allUsers.statusCode).send(allUsers.message);
	});

	fastify.put(
		'/user/personal-infos',
		{ onRequest: authenticate },
		async (request, reply) => {
			const bodyParams = z.object({
				personName: z.string(),
				cpf: z.string(),
				rg: z.string(),
				phoneNumber: z.string(),
				cellphoneNumber: z.string(),
				bio: z.string(),
			});

			const queryParams = z.object({
				userID: z.string(),
			});

			const rawBody = bodyParams.parse(request.body);

			if (!validateEmptyBody(rawBody)) {
				reply
					.status(400)
					.send({ message: new Messages().MESSAGE_ERROR.EMPTY_BODY });
			}
			try {
				bodyParams.parse(request.body);
			} catch (error) {
				console.log(error);
				reply
					.status(422)
					.send({ message: message.MESSAGE_ERROR.TYPES_DOESNT_MATCH });
			}

			const body: UpdateUserInfosProps = bodyParams.parse(request.body);
			const { userID } = queryParams.parse(request.query);

			const updateUser = await userController.updateUser(
				parseInt(userID),
				body
			);

			reply.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.delete('/user', { onRequest: authenticate }, async (req, res) => {
		const queryParams = z.object({
			userID: z.string(),
		});

		const { userID } = queryParams.parse(req.query);

		if (!userID)
			res.status(400).send({
				message: message.MESSAGE_ERROR.REQUIRED_ID,
			});

		const result = await userController.deleteUser(parseInt(userID));

		res.status(result.statusCode).send({ allUsers: result?.message });
	});

	fastify.get('/user/:id', { onRequest: authenticate }, async (req, res) => {
		const queryParams = z.object({
			userID: z.string(),
		});

		const { userID } = queryParams.parse(req.query);

		if (!userID)
			res.status(400).send({
				message: message.MESSAGE_ERROR.REQUIRED_ID,
			});

		const result = await userController.getUserById(parseInt(userID));

		res.status(result.statusCode).send(result.message);
	});
}
