import {FastifyInstance} from "fastify";
import authenticate from "../middlewares/authenticate";
import {z, ZodError} from "zod";
import ratingController from "../controller/ratingController";

export default async function ratingRoutes(fastify: FastifyInstance) {
	fastify.post('/rating', {onRequest: authenticate}, async (request, reply) => {
		try {
			// @ts-ignore
			const user: JwtSignUser = request.user

			const bodyParams = z.object({
				score: z.number(),
				description: z.string(),
				clientId: z.number(),
				veterinaryId: z.number()
			})

			const infos: RatingInfos = bodyParams.parse(request.body)

			const createdRating = await ratingController.createRating(infos, user)
			// @ts-ignore
			reply.status(createdRating.statusCode).send(createdRating.createdRating ? {response: {createdRating: createdRating.createdRating}} : {response: createdRating.error})
		} catch (error) {
			if (error instanceof Error) reply.status(400).send({response: {error}})
			if (error instanceof ZodError) reply.status(400).send({response: {error}})
			reply.status(500).send({response: {error}})
		}
	});

	fastify.get('/rating/veterinary/:id', async (request, reply) => {
		try {
			const urlParams = z.object({
				id: z.string()
			})
			const {id} = urlParams.parse(request.params)
			if (isNaN(Number(id)) || id === '') reply.status(400).send({response: {error: 'Não foi passado um id de veterinário válido'}})
			const ratings = await ratingController.getVeterinaryRatings(Number(id))
			// @ts-ignore
			reply.status(ratings.statusCode).send(ratings.ratings ? {response: {ratings: ratings.ratings}} : {response: {error: ratings.error}})
		} catch (error) {
			if (error instanceof Error) reply.status(400).send({response: {error}})
			if (error instanceof ZodError) reply.status(400).send({response: {error}})
			reply.status(500).send({response: {error}})
		}
	})

	fastify.delete('/rating/:id', {onRequest: authenticate}, async (request, reply) => {
		try {
			const urlParams = z.object({
				id: z.string()
			})
			// @ts-ignore
			const user: JwtSignUser = request.user
			const {id} = urlParams.parse(request.params)
			if (isNaN(Number(id))) reply.status(400).send({response: {error: 'Não foi passado um id de avaliação válido'}})

			const deletedRating = await ratingController.deleteRating(Number(id), {
				id: user.id,
				userType: user.isVet ? 'VETERINARY' : 'COMMON'
			})

			// @ts-ignore
			reply.status(deletedRating.statusCode).send(deletedRating.deletedRating ? {response: {deletedRating: deletedRating.deletedRating}} : {response: {error: deletedRating.error}})
		} catch (error) {
			if (error instanceof Error) reply.status(400).send({response: {error}})
			if (error instanceof ZodError) reply.status(400).send({response: {error}})
			reply.status(500).send({response: {error}})
		}
	})
}
