import {FastifyInstance} from "fastify";
import {z} from "zod";
import SpecialtiesController from "../controller/specialtiesController";
import authenticate from "../middlewares/authenticate";
import SpecialtiesPetController from "../controller/specialtiesPetsController";
import specialtiesPetsController from "../controller/specialtiesPetsController";

export default async function specialitiesRoutes(fastify: FastifyInstance) {
	fastify.post(
		'/specialities',
		async (request, reply) => {
			const bodyParams = z.object({
				specialities: z.array(z.object({
					name: z.string()
				})),
			});

			const body = bodyParams.parse(request.body);

			const headerContentType = request.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const foundSpecialties =
						await SpecialtiesController.createSpecialties(body.specialities);
					// reply
					// 	.status(foundSpecialties.statusCode)
					// 	.send({ response: foundSpecialties.message });
					reply.send(foundSpecialties)
				} else reply.status(404).send('the body cannot be empty');
			} else
				reply.status(415).send('The request header has no valid content-type!');
		}
	);
	fastify.post(
		'/attended-animals',
		async (request, reply) => {
			const bodyParams = z.object({
				attendedAnimals: z.array(z.object({
					name: z.string()
				})),
			});

			const body = bodyParams.parse(request.body);

			const headerContentType = request.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const foundSpecialties =
						await SpecialtiesPetController.createPetSpecialties(body.attendedAnimals);
					reply
						.status(foundSpecialties.statusCode)
						.send({ message: foundSpecialties.message });
				} else reply.status(404).send('the body cannot be empty');
			} else
				reply.status(415).send('The request header has no valid content-type!');
		}
	);
}
