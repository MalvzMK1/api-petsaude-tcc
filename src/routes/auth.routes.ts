import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
import SpecialtiesController from '../controller/specialtiesController';
import SpecialtiesPetController from '../controller/specialtiesPetsController';

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/auth', { onRequest: [authenticate] }, (req) => {
		return { user: req.user };
	});

	fastify.post('/signup', async (req, res) => {
		const bodyParams = z.object({
			email: z.string(),
			password: z.string(),
		});

		const body = bodyParams.parse(req.body);

		const foundUser = await userController.getUserByEmail(body.email);

		if (foundUser.user) {
			if (body.password === foundUser.user.password) {
				const user: jwtSignUser = {
					email: foundUser.user.email,
					isVet: foundUser.user.isVet,
					userName: foundUser.user.userName,
					profileBannerPhoto: foundUser.user.profileBannerPhoto
						? foundUser.user.profileBannerPhoto
						: '',
					profilePhoto: foundUser.user.profilePhoto
						? foundUser.user.profilePhoto
						: '',
				};
				const token = fastify.jwt.sign(
					{
						email: user.email,
						profilePhoto: user.profilePhoto,
						profileBannerPhoto: user.profileBannerPhoto,
						isVet: user.isVet,
						createdAt: new Date(),
					},
					{
						expiresIn: '7days',
					}
				);

				res.status(foundUser.statusCode).send({ token });
			}
			res.status(400).send({ message: 'Incorrect email or password' });
		}
		res
			.status(foundUser.statusCode)
			.send({ message: 'Incorrect email or password' });
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
}
