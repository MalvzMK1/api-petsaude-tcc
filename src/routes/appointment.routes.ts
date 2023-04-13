import {FastifyInstance} from "fastify";
import authenticate from "../middlewares/authenticate";
import {z} from "zod";
import appointmentController from "../controller/appointmentController";

export default async function appointmentRoutes(fastify: FastifyInstance) {
	fastify.post('/appointment', {onRequest: authenticate}, async (request, reply) => {
		try {
			const bodyParams = z.object({
				date: z.string(),
				startsAt: z.string(),
				endsAt: z.string(),
				description: z.string(),
				clientId: z.number(),
				veterinaryId: z.number(),
			})

			const infos = bodyParams.parse(request.body)

			const response = await appointmentController.createAppointment(infos)

			reply.status(response.statusCode).send(response.message)
		} catch (err) {
			if (err instanceof Error) reply.status(404).send({message: JSON.parse(err.message)})
			reply.status(404).send({message: 'Campos inválidos'})
		}
	})
}
