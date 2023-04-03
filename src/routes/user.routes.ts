import { FastifyInstance } from 'fastify';
import userController from '../controller/userController';
import specialtiesPetsController from '../controller/specialtiesPetsController';
import PhoneNumberController from '../controller/phoneNumberController';
import specialtiesController from '../controller/specialtiesController';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Message from '../messages/message';
import Messages from '../messages/message';
import validateEmptyBody from '../utils/validateBody';

const message = new Message();
const phoneNumber = new PhoneNumberController();

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.post('/user', async (req, res) => {
		const bodyParams = z.object({
			personName: z.string(),
			cpf: z.string(),
			email: z.string(),
			password: z.string(),
			cellphoneNumber: z.string(),
			phoneNumber: z.string().nullable(),
			address: z.object({
				zipCode: z.string(),
				complement: z.string(),
				street: z.string(),
				city: z.string(),
				state: z.string(),
				neighborhood: z.string(),
				number: z.string(),
			}),
		});

		const rawBody = req.body;
		if (JSON.stringify(rawBody) === '{}')
			res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

		const body = bodyParams.parse(req.body);
		console.log(body);

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

			const userInfos = await phoneNumber.createPhoneNumber(
				parseInt(userID),
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
			addressId: z.number(),
			vetInfosId: z.optional(z.number()),
			vetInfos: z.optional(
				z.object({
					occupationArea: z.string(),
					formation: z.string(),
					institution: z.string(),
					crmv: z.string(),
				})
			),
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
				.status(400)
				.send({ message: message.MESSAGE_ERROR.TYPES_DOESNT_MATCH });
		}

		const body: UpdateUserInfosProps = bodyParams.parse(request.body);
		const { userID } = queryParams.parse(request.query);

		const updateUser = await userController.updateUser(parseInt(userID), body);

		reply.status(updateUser.statusCode).send(updateUser.message);
	});

	fastify.put(
		'/veterinarian/user/pet/:id',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				AnimalTypesVetInfos: z.array(
					z.object({
						id: z.number(),
						vetInfosId: z.number(),
						animalTypesId: z.number(),
					})
				),
			});

			const queryParams = z.object({
				vetInfosId: z.string(),
			});

			const { vetInfosId } = queryParams.parse(req.query);

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesPetsController.updateSpecialitiesPet(
				parseInt(vetInfosId),
				body.AnimalTypesVetInfos
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.put(
		'/veterinarian/user/',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				VeterinaryEspecialities: z.array(
					z.object({
						id: z.number(),
						vetInfosId: z.number(),
						specialtiesId: z.number(),
					})
				),
			});

			const queryParams = z.object({
				vetInfosId: z.string(),
			});

			const { vetInfosId } = queryParams.parse(req.query);

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesController.updateSpecialities(
				parseInt(vetInfosId),
				body.VeterinaryEspecialities
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.delete(
		'/veterinarian/user/pet/:id',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				AnimalTypesVetInfos: z.array(
					z.object({
						id: z.number(),
						vetInfosId: z.number(),
						animalTypesId: z.number(),
					})
				),
			});

			const queryParams = z.object({
				vetInfosId: z.string(),
			});

			const { vetInfosId } = queryParams.parse(req.query);

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesPetsController.deleteSpecialitiesPet(
				parseInt(vetInfosId),
				body.AnimalTypesVetInfos
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.delete(
		'/veterinarian/user/:id',
		{ onRequest: authenticate },
		async (req, res) => {
			const bodyParams = z.object({
				VeterinaryEspecialities: z.array(
					z.object({
						id: z.number(),
						vetInfosId: z.number(),
						specialtiesId: z.number(),
					})
				),
			});

			const queryParams = z.object({
				vetInfosId: z.string(),
			});

			const { vetInfosId } = queryParams.parse(req.query);

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesController.deleteSpecialities(
				parseInt(vetInfosId),
				body.VeterinaryEspecialities
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

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
