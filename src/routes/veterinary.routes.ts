import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import Messages from '../messages/message';
import authenticate from '../middlewares/authenticate';
import SpecialtiesController from '../controller/specialtiesController';
import specialtiesController from '../controller/specialtiesController';
import SpecialtiesPetController from '../controller/specialtiesPetsController';
import specialtiesPetsController from '../controller/specialtiesPetsController';

export default async function veterinaryRoutes(fastify: FastifyInstance) {
	fastify.post('/veterinarian/user', async (req, res) => {
		const bodyParams = z.object({
			crmv: z.string(),
			occupationArea: z.string(),
			formation: z.string(),
			institution: z.string(),
			startActingDate: z.string(),
			formationDate: z.string(),
		});

		const queryParams = z.object({ userId: z.string() });

		const rawBody = req.body;
		if (JSON.stringify(rawBody) === '{}')
			res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

		const body = bodyParams.parse(req.body);

		const formationDate = new Date(body.formationDate);
		const startActingDate = new Date(body.startActingDate);

		if (
			formationDate.toString() === 'Invalid Date' ||
			startActingDate.toString() === 'Invalid Date'
		)
			res
				.status(400)
				.send({ message: 'Wrong date format, expected YYYY-MM-DD' });

		const { userId } = queryParams.parse(req.query);
		// const result = await userController.createUser(parseInt(userId), body)

		// res.status(result.statusCode).send(result.message);
	});
	fastify.post(
		'/specialties',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const bodyParams = z.object({
				name: z.string(),
			});

			const body = bodyParams.parse(req.body);

			const headerContentType = req.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const foundSpecialties =
						await SpecialtiesController.createSpecialties(body.name);
					res
						.status(foundSpecialties.statusCode)
						.send({ message: foundSpecialties.message });
				} else res.status(404).send('the body cannot be empty');
			} else
				res.status(415).send('The request header has no valid content-type!');
		}
	);
	fastify.post(
		'/pet/specialties',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const bodyParams = z.object({
				name: z.string(),
			});

			const body = bodyParams.parse(req.body);

			const headerContentType = req.headers['content-type'];

			if (headerContentType == 'application/json') {
				if (JSON.stringify(body) != '{}') {
					const foundSpecialties =
						await SpecialtiesPetController.createPetSpecialties(body.name);
					res
						.status(foundSpecialties.statusCode)
						.send({ message: foundSpecialties.message });
				} else res.status(404).send('the body cannot be empty');
			} else
				res.status(415).send('The request header has no valid content-type!');
		}
	);
	fastify.put(
		'/veterinarian/user/pet',
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

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesPetsController.updateSpecialitiesPet(
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
			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesController.updateSpecialities(
				body.VeterinaryEspecialities
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.delete(
		'/veterinarian/user/pet',
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

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesPetsController.deleteSpecialitiesPet(
				body.AnimalTypesVetInfos
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);

	fastify.delete(
		'/veterinarian/user',
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

			const body = bodyParams.parse(req.body);

			const updateUser = await specialtiesController.deleteSpecialities(
				body.VeterinaryEspecialities
			);

			res.status(updateUser.statusCode).send(updateUser.message);
		}
	);
}
