import {FastifyInstance} from 'fastify';
import userController from '../controller/userController';
import authenticate from '../middlewares/authenticate';
import {z} from 'zod';
import Messages from '../messages/message';


export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post('/client', async (request, reply) => {
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
				.send({response: createUser.message});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)});
			reply.status(400).send({response: 'Unknown error'});
		}
	});

	fastify.get('/client', async (request, reply) => {
		try {
			const queryParams = z.object({
				userID: z.string(),
			});

			const {userID} = queryParams.parse(request.query);

			if (!userID) reply.status(400).send({message: 'Required ID'});

			const userInfos = await userController.getUserById(parseInt(userID));

			reply.status(userInfos.statusCode).send({user: userInfos?.message});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)});
			reply.status(400).send({response: 'Unknown error'});
		}
	});

	fastify.get('/client/all', async (req, reply) => {
		try {
			const allUsers = await userController.getAllUsers();

			reply.status(allUsers.statusCode).send(allUsers.message);
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)});
			reply.status(400).send({response: 'Unknown error'});
		}
	});

	fastify.put('/client/profile-infos', {onRequest: authenticate}, async (request, reply) => {
		try {
			const jwt = request.headers.authorization
			const token = jwt?.split(' ')[1]

			const bodyParams = z.object({
				userName: z.string(),
				profilePhoto: z.string(),
				profileBannerPhoto: z.string(),
				email: z.string(),
				password: z.string()
			})

			const body = bodyParams.parse(request.body)
			if (token) {
				const decodedJwt: JwtSignUser | null = fastify.jwt.decode(token)
				if (decodedJwt) {
					const updatedUser = await userController.updateClientProfileInfos(decodedJwt.id, body)
				}
			}

		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)})
			reply.status(400).send({response: 'Unknown error'});
		}
	})

	fastify.put(
		'/client/personal-infos',
		{onRequest: authenticate},
		async (request, reply) => {
			try {
				const jwt = request.headers.authorization
				const token = jwt?.split(' ')[1]

				const bodyParams = z.object({
					personName: z.string(),
					cpf: z.string(),
					rg: z.string(),
					phoneNumber: z.string(),
					cellphoneNumber: z.string(),
					bio: z.string(),
				});

				const body: UpdateClientPersonalInfosProps = bodyParams.parse(request.body);
				if (token) {
					const decodedJwt: JwtSignUser | null = fastify.jwt.decode(token)

					if (decodedJwt) {
						const updateUser = await userController.updateClientPersonalInfos(
							decodedJwt.id,
							body
						);
						reply.status(updateUser.statusCode).send({message: updateUser.message});
					}
					reply.status(401).send({message: 'Token inválido'})
				}
				reply.status(401).send({message: 'Token inválido'})
			} catch (err) {
				if (err instanceof Error)
					reply.status(400).send({response: JSON.parse(err.message)});
				reply.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.delete(
		'/client',
		{onRequest: authenticate},
		async (request, reply) => {
			try {
				const jwt = request.headers.authorization
				const token = jwt?.split(' ')[1]

				if (token) {
					const decodedToken: JwtSignUser | null = fastify.jwt.decode(token)
					if (decodedToken) {
						const result = await userController.deleteUser(decodedToken.id);

						reply.status(result.statusCode).send({message: result.message});
					}
					reply.status(401).send({message: 'Token inválido'})
				}
				reply.status(401).send({message: 'Token inválido'})
			} catch (err) {
				if (err instanceof Error)
					reply.status(400).send({response: JSON.parse(err.message)});
				reply.status(400).send({response: 'Unknown error'});
			}
		}
	);
}
