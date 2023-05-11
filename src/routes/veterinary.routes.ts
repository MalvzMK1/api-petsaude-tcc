import {FastifyInstance} from 'fastify';
import {z} from 'zod';
import Messages from '../messages/message';
import authenticate from '../middlewares/authenticate';
import specialtiesPetsController from '../controller/specialtiesPetsController';
import veterinaryController from '../controller/veterinaryController';

export default async function veterinaryRoutes(fastify: FastifyInstance) {
	fastify.get('/veterinary', async (request, reply) => {
		try {
			const queryParams = z.object({
				userName: z.optional(z.string()),
				speciality: z.optional(z.string()),
				animal: z.optional(z.string()),
			});

			const {userName, speciality, animal} = queryParams.parse(request.query);
			const response = await veterinaryController.getAllVeterinarys({
				userName,
				speciality,
				animal,
			});

			if (response.veterinarys)
				reply
					.status(response.statusCode)
					.send({response: response.veterinarys});
			else
				reply.status(response.statusCode).send({response: response.message});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)});
			reply.status(400).send({response: 'Unknown error'});
		}
	});

	fastify.get('/id/veterinary', async (request, reply) => {
		try {
			const queryParams = z.object({
				userID: z.string(),
			});
	
			const { userID } = queryParams.parse(request.query);
	
			if (!userID) reply.status(400).send({ message: 'Required ID' });
	
			const userInfos = await veterinaryController.getVeterinaryById(parseInt(userID));
	
			reply
				.status(userInfos.statusCode)
				.send({ response: { user: userInfos?.message } });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});

	fastify.post('/veterinary', async (request, reply) => {
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
				crmv: z.string(),
				occupationArea: z.string(),
				formation: z.string(),
				institution: z.string(),
				startActingDate: z.string(),
				formationDate: z.string(),
			});
			const rawBody = request.body;
			if (JSON.stringify(rawBody) === '{}')
				reply.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

			const body = bodyParams.parse(request.body);

			const formationDate = new Date(body.formationDate);
			const startActingDate = new Date(body.startActingDate);

			if (
				formationDate.toString() === 'Invalid Date' ||
				startActingDate.toString() === 'Invalid Date'
			)
				reply
					.status(400)
					.send({message: 'Wrong date format, expected YYYY-MM-DD'});

			const result = await veterinaryController.createVeterinary(body);

			reply.status(result.statusCode).send({response: result.message});
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)});
			reply.status(400).send({response: 'Unknown error'});
		}
	});

	fastify.put(
		'/veterinary/professional/:id',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const bodyParams = z.object({
					occupationArea: z.string(),
					formation: z.string(),
					institution: z.string(),
					crmv: z.string(),
					startActingDate: z.string(),
					formationDate: z.string(),
				});

				const queryParams = z.object({id: z.string()});

				const body = bodyParams.parse(req.body);
				const {id} = queryParams.parse(req.params);

				if (id != null && id != undefined) {
					const updateVeterinary =
						await veterinaryController.updateVeterinaryProfessionalInfos(
							parseInt(id),
							body
						);

					res.status(200).send(updateVeterinary.message);
				} else res.status(400).send(new Messages().MESSAGE_ERROR.REQUIRED_ID);
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: err.message});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.put('/veterinary/profile-infos', {onRequest: authenticate}, async (request, reply) => {
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
					const updatedUser = await veterinaryController.updateVeterinaryProfileInfos(decodedJwt.id, body)
				}
			}

		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({response: JSON.parse(err.message)})
			reply.status(400).send({response: 'Unknown error'});
		}
	})

	fastify.put(
		'/veterinary/personal-infos',
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
						const updateUser = await veterinaryController.updateVeterinaryPersonalInfos(
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
	fastify.put(
		'/veterinarian/attended-animals',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const bodyParams = z.object({
					AnimalTypesVetInfos: z.array(
						z.object({
							veterinaryId: z.number(),
							animalTypesId: z.number(),
						})
					),
				});

				const body = bodyParams.parse(req.body);

				const updateUser =
					await specialtiesPetsController.updateSpecialitiesPet(
						body.AnimalTypesVetInfos
					);

				res.status(updateUser.statusCode).send({message: updateUser.message});
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: JSON.parse(err.message)});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.put(
		'/veterinarian/user/',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const bodyParams = z.object({
					VeterinaryEspecialities: z.array(
						z.object({
							id: z.number(),
							vetInfosId: z.number(),
							specialtiesId: z.number(),
						})
					),
				});
				const body = bodyParams.parse(req.body);

				// const updateUser = await specialtiesController.updateSpecialities(
				// 	body.VeterinaryEspecialities
				// );

				// res.status(updateUser.statusCode).send(updateUser.message);
				res.status(500).send({
					response: {
						message: 'Feature in progress',
					},
				});
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: JSON.parse(err.message)});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.delete(
		'/veterinary/:id',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const queryParams = z.object({id: z.string()});

				const {id} = queryParams.parse(req.params);

				if (!id)
					res
						.status(400)
						.send({message: new Messages().MESSAGE_ERROR.REQUIRED_ID});
				else {
					const response = await veterinaryController.deleteVeterinary(
						parseInt(id)
					);
					res.status(response.statusCode).send(response.message);
				}
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: JSON.parse(err.message)});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.delete(
		'/veterinarian/user/pet',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const bodyParams = z.object({
					AnimalTypesVetInfos: z.array(
						z.object({
							id: z.number(),
							veterinaryId: z.number(),
							animalTypesId: z.number(),
						})
					),
				});

				const body = bodyParams.parse(req.body);

				const updateUser =
					await specialtiesPetsController.deleteSpecialitiesPet(
						body.AnimalTypesVetInfos
					);

				res.status(updateUser.statusCode).send(updateUser.message);
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: JSON.parse(err.message)});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);

	fastify.delete(
		'/veterinarian/user',
		{onRequest: authenticate},
		async (req, res) => {
			try {
				const bodyParams = z.object({
					VeterinaryEspecialities: z.array(
						z.object({
							id: z.number(),
							vetInfosId: z.number(),
							specialtiesId: z.number(),
						})
					),
				});

				const body = bodyParams.parse(req.body);

				// const updateUser = await specialtiesController.deleteSpecialities(
				// 	body.VeterinaryEspecialities
				// );

				// res.status(updateUser.statusCode).send(updateUser.message);
				res.status(500).send({
					response: {
						message: 'Feature in progress',
					},
				});
			} catch (err) {
				if (err instanceof Error)
					res.status(400).send({response: JSON.parse(err.message)});
				res.status(400).send({response: 'Unknown error'});
			}
		}
	);
}
