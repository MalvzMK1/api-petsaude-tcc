import {FastifyInstance} from "fastify";
import authenticate from "../middlewares/authenticate";
import {z} from "zod";
import appointmentController from "../controller/appointmentController";

export default async function appointmentRoutes(fastify: FastifyInstance) {
	fastify.post('/appointment', {onRequest: authenticate}, async (request, reply) => {
		try {
			const token: string | undefined = request.headers.authorization
			if (token?.split(' ')[1]) {
				const bodyParams = z.object({
					date: z.string(),
					startsAt: z.string(),
					endsAt: z.string(),
					description: z.string(),
					veterinaryId: z.number(),
				})
				const jwt: JwtSignUser | null = fastify.jwt.decode(token.split(' ')[1])
				const infos = bodyParams.parse(request.body)

				if (jwt !== null) {
					if (!jwt.isVet) {
						const response = await appointmentController.createAppointment({
							...infos,
							clientId: jwt.id
						})
						reply.status(response.statusCode).send({response})
					}
					reply.status(400).send({message: 'Apenas usuários que não são veterinários podem agendar consultas'})
				}
				reply.status(400).send({message: 'Token JWT nulo'})
			}
			reply.status(401).send({message: 'Token JWT não recebido'})

		} catch (err) {
			if (err instanceof Error) reply.status(404).send({message: JSON.parse(err.message)})
			else reply.status(404).send({message: 'Campos inválidos'})
		}
	})
	fastify.get('/appointment/all', async (request, reply) => {
		try {
			const response = await appointmentController.getAllAppointments()
			reply.status(response.statusCode).send(response.message)
		} catch (err) {
			if (err instanceof Error) reply.status(500).send({message: JSON.parse(err.message)})
			reply.status(500).send({message: err})
		}
	})
	fastify.get('/appointment', async (request, reply) => {
		try {
			const queryParams = z.object({
				appointmentId: z.string()
			})
			const {appointmentId} = queryParams.parse(request.query)

			const response = await appointmentController.getAppointmentById(Number(appointmentId))
			reply.status(response.statusCode).send(response.message)

		} catch (err) {
			if (err instanceof Error) reply.status(400).send({message: JSON.parse(err.message)})
			reply.status(400).send({message: err})
		}
	})
	fastify.delete('/appointment', {onRequest: authenticate}, async (request, reply) => {
		try {
			const queryParams = z.object({
				appointmentId: z.string()
			})
			const {appointmentId} = queryParams.parse(request.query)

			const response = await appointmentController.deleteAppointment(Number(appointmentId))

			reply.status(response.statusCode).send({response: response.message})
		} catch (err) {
			if (err instanceof Error) reply.status(400).send({message: JSON.parse(err.message)})
			reply.status(400).send({message: err})
		}
	})
}
