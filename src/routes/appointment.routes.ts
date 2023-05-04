import {FastifyInstance} from 'fastify';
import authenticate from '../middlewares/authenticate';
import {z, ZodError} from 'zod';
import appointmentController from '../controller/appointmentController';
import validateIfIsVet from "../utils/validateIfIsVet";

export default async function appointmentRoutes(fastify: FastifyInstance) {
	fastify.post(
		'/appointment',
		{onRequest: authenticate},
		async (request, reply) => {
			try {
				const token: string | undefined = request.headers.authorization;
				if (token?.split(' ')[1]) {
					const bodyParams = z.object({
						date: z.string(),
						startsAt: z.string(),
						endsAt: z.string(),
						description: z.string(),
						veterinaryId: z.number(),
						petId: z.number(),
					});
					const jwt: JwtSignUser | null = fastify.jwt.decode(
						token.split(' ')[1]
					);
					const infos = bodyParams.parse(request.body);

					if (jwt !== null) {
						if (!jwt.isVet) {
							const response = await appointmentController.createAppointment({
								...infos,
								clientId: jwt.id,
							});
							reply.status(response.statusCode).send({response});
						}
						reply.status(400).send({
							response:
								'Apenas usuários que não são veterinários podem agendar consultas',
						});
					}
					reply.status(400).send({response: 'Token JWT nulo'});
				}
				reply.status(401).send({response: 'Token JWT não recebido'});
			} catch (err) {
				if (err instanceof ZodError) reply.status(400).send({response: err})
				if (err instanceof Error) reply.status(500).send({response: JSON.parse(err.message)})
				reply.status(500).send({response: err})
			}
		}
	);
	fastify.get('/appointment/all', async (request, reply) => {
		try {
			const response = await appointmentController.getAllAppointments();
			reply.status(response.statusCode).send(response.message);
		} catch (err) {
			if (err instanceof ZodError) reply.status(400).send({response: err})
			if (err instanceof Error) reply.status(500).send({response: JSON.parse(err.message)})
			reply.status(500).send({response: err})
		}
	});

	fastify.get('/appointment', async (request, reply) => {
		try {
			console.log(request.user)
			const queryParams = z.object({
				appointmentId: z.string(),
			});
			const {appointmentId} = queryParams.parse(request.query);

			const response = await appointmentController.getAppointmentById(
				Number(appointmentId)
			);
			reply.status(response.statusCode).send({response: response.message});
		} catch (err) {
			if (err instanceof ZodError) reply.status(400).send({response: err})
			if (err instanceof Error) reply.status(500).send({response: JSON.parse(err.message)})
			reply.status(500).send({response: err})
		}
	});

	fastify.delete(
		'/appointment',
		{onRequest: authenticate},
		async (request, reply) => {
			try {
				const jwt = request.headers.authorization;
				const token = jwt?.split(' ')[1];

				const queryParams = z.object({
					appointmentId: z.string(),
				});
				const {appointmentId} = queryParams.parse(request.query);

				if (token) {
					const decodedToken: JwtSignUser | null = fastify.jwt.decode(token);
					if (decodedToken) {
						const response = await appointmentController.deleteAppointment(
							Number(appointmentId)
						);
						reply
							.status(response.statusCode)
							.send({response: response.message});
					}
				}
			} catch (err) {
				if (err instanceof ZodError) reply.status(400).send({response: err})
				if (err instanceof Error) reply.status(500).send({response: JSON.parse(err.message)})
				reply.status(500).send({response: err})
			}
		}
	);

	fastify.put('/appointment/:appointmentId/validate', {onRequest: [authenticate]}, async (request, reply) => {
		try {
			const urlParams = z.object({
				appointmentId: z.string()
			})
			const queryParams = z.object({
				status: z.string()
			})
			const token: string | undefined = request.headers.authorization;
			if (token?.split(' ')[1]) {
				const jwt: JwtSignUser | null = fastify.jwt.decode(
					token.split(' ')[1]
				);
				if (jwt) {
					const {status} = queryParams.parse(request.query)
					if (status !== 'SCHEDULED' && status !== 'DECLINED') reply.status(400).send({
						response: {
							error: 'Invalid status type',
							options: ['SCHEDULED', 'DECLINED']
						}
					})
					if (!validateIfIsVet(jwt))
						reply.status(401).send({
							response: {
								error: 'Você não tem permissão para fazer essa alteração'
							}
						})

					const {appointmentId} = urlParams.parse(request.params)
					const controllerResponse = await appointmentController.acceptOrDeclineWaitingConfirmationAppointment(Number(appointmentId), status, jwt.id)

					if (controllerResponse.updatedAppointment)
						reply.status(controllerResponse.statusCode).send({
							response: {
								updatedAppointment: controllerResponse.updatedAppointment,
								message: controllerResponse.message
							}
						})
					reply.status(controllerResponse.statusCode).send({response: controllerResponse.message})
				}
			}

			// const updatedAppointment = await appointmentController.updateAppointmentStatus()

		} catch (err) {
			if (err instanceof Error) reply.status(400).send({response: JSON.parse(err.message)})
			reply.status(400).send({response: err})
		}
	})

	fastify.put('/appointment/:appointmentId/status/:status', {onRequest: authenticate}, async (request, reply) => {
		try {
			const urlParams = z.object({
				appointmentId: z.string(),
				status: z.string()
			})

			const {appointmentId, status} = urlParams.parse(request.params)
			// @ts-ignore
			const user: JwtSignUser = request.user

			const response = await appointmentController.changeAppointmentStatus(Number(appointmentId), {
				isVet: user.isVet,
				userId: user.id
			}, status)

			if (response.options)
				reply.status(response.statusCode).send({response: {message: response.message, options: response.options}})
			reply.status(response.statusCode).send({response: {message: response.message}})
		} catch (err) {
			if (err instanceof ZodError) reply.status(400).send({response: err})
			if (err instanceof Error) reply.status(500).send({response: JSON.parse(err.message)})
			reply.status(500).send({response: err})
		}
	})
}
