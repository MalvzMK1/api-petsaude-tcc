import { FastifyInstance } from 'fastify';
import userController from '../controller/user.controller';
import PhoneNumberController from '../controller/phoneNumber.controller';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Message from '../messages/message';
import Messages from '../messages/message';
import validateEmptyBody from '../utils/validateBody';
import { UpdateUserInfosProps } from '../lib/userInfosProps';

const message = new Message();

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post('/user', async (req, res) => {
		const bodyParams = z.object({
			personName: z.string(),
			userName: z.string(),
			cpf: z.string(),
			rg: z.string(),
			profilePhoto: z.optional(z.string()),
			profileBannerPhoto: z.optional(z.string()),
			email: z.string(),
			password: z.string(),
			isVet: z.boolean(),
			cep: z.string(),
			street: z.string(),
			number: z.string(),
			complement: z.optional(z.string()),
			neighborhood: z.string(),
			cityId: z.number(),
			cityInitials: z.string(),
			cityName: z.string(),
			stateId: z.number(),
			vetInfos: z.optional(
				z.object({
					occupationArea: z.string(),
					formation: z.string(),
					institution: z.string(),
					crmv: z.string(),
					animalTypes: z.array(
						z.object({
							name: z.string(),
						})
					),
					specialities: z.array(
						z.object({
							name: z.string(),
						})
					),
				})
			),
			phoneNumber: z.array(
				z.object({
					number: z.string(),
				})
			),
		});
		const rawBody = req.body;
		if (JSON.stringify(rawBody) === '{}')
			res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

		const body = bodyParams.parse(req.body);
		const createUser = await userController.createUser(body);

		res.status(createUser.statusCode).send(createUser.message);
	});

	fastify.post(
		'/user/phone/:id',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				number: z.string(),
			});

			const queryParams = z.object({
				userID: z.string(),
			});

			const { userID } = queryParams.parse(req.query);
			const { number } = bodyParams.parse(req.body);

			if (!userID) res.status(400).send({ message: 'Required ID' });

			const userInfos = await PhoneNumberController.createPhoneNumber(
				-parseInt(userID),
				number
			);

			res.status(userInfos.statusCode).send({ user: userInfos?.message });
		}
	);

	fastify.get('/user', { onRequest: authenticate }, async (req, res) => {
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

	fastify.put('/user', { onRequest: authenticate }, async (request, reply) => {
		const bodyParams = z.object({
			personName: z.string(),
			userName: z.string(),
			cpf: z.string(),
			rg: z.string(),
			profilePhoto: z.optional(z.string()),
			profileBannerPhoto: z.optional(z.string()),
			email: z.string(),
			isVet: z.boolean(),
		});
		const queryParams = z.object({
			userID: z.string(),
		});

		const rawBody: object = request.body!!;
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
				.status(400)
				.send({ message: message.MESSAGE_ERROR.TYPES_DOESNT_MATCH });
		}

		const body: UpdateUserInfosProps = bodyParams.parse(request.body);
		const { userID } = queryParams.parse(request.query);

		const updateUser = await userController.updateUser(parseInt(userID), body);

		reply.status(updateUser.statusCode).send(updateUser.message);
	});

	fastify.put(
		'/veterinarian/user/:id',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				VeterinaryEspecialities: z.array(
					z.object({
						id: z.number(),
						vetInfosId: z.number(),
						specialitiesId: z.number(),
						specialities: z.object({
							id: z.number(),
							name: z.string(),
						}),
					})
				),
			});

			const queryParams = z.object({
				vetInfosSpecialities: z.string(),
			});

			const body = bodyParams.parse(req.body);

			const { vetInfosSpecialities } = queryParams.parse(req.query);

			const updateUser = await userController.updateSpecialities(
				parseInt(vetInfosSpecialities),
				body
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	// fastify.put('/veterinarian/user/animal/:id', async (req, res) => {

	// 	const bodyParams = z.object({
	// 		nome:
	// 	});

	// 	const queryParams = z.object({
	// 		userID: z.string(),
	// 	});

	// 	const body = bodyParams.parse(req.body);
	// 	const { userID } = queryParams.parse(req.query);

	// 	const updateUser = await userController.updateUser(parseInt(userID), body);

	// 	res.status(updateUser.statusCode).send(updateUser.message);

	// });

	fastify.delete('/user/:id', { onRequest: authenticate }, async (req, res) => {
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
}
