import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
import SpecialtiesController from '../controller/specialtiesController';
import { User } from '@prisma/client';
import fastifyJwt = require('@fastify/jwt');

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

		if (foundUser.statusCode !== 404) {
			if (body.password === foundUser.message.password) {
				const { message } = foundUser;
				const token = fastify.jwt.sign(
					{
						email: message.email,
						profilePhoto: message.profilePhoto,
						profileBannerPhoto: message.profileBannerPhoto,
						isVet: message.isVet,
						createdAt: new Date(),
					},
					{
						expiresIn: '7days',
					}
				);

				res.status(foundUser.statusCode).send({ token });
			}
			res.status(400).send({ message: 'Incorrect password' });
		}
		res.status(foundUser.statusCode).send({ message: foundUser.message });
	});
	fastify.post('/specialties', async (req, res) => {
		const bodyParams = z.object({
			name: z.string(),
		});

		const body = bodyParams.parse(req.body);

		let headerContentType = req.headers['content-type'];

		if (headerContentType == 'application/json') {
			if (JSON.stringify(body) != '{}') {
				const foundSpecialties = await SpecialtiesController.createSpecialties(
					body.name
				);
				res
					.status(foundSpecialties.statusCode)
					.send({ message: foundSpecialties.message });
			} else res.status(404).send('the body cannot be empty');
		} else
			res.status(415).send('The request header has no valid content-type!');
	});
	fastify.post('/pet/specialties', async (req, res) => {
		const bodyParams = z.object({
			name: z.string(),
		});

		const body = bodyParams.parse(req.body);

		let headerContentType = req.headers['content-type'];

		if (headerContentType == 'application/json') {
			if (JSON.stringify(body) != '{}') {
				const foundSpecialties = await SpecialtiesController.createSpecialties(
					body.name
				);
				res
					.status(foundSpecialties.statusCode)
					.send({ message: foundSpecialties.message });
			} else res.status(404).send('the body cannot be empty');
		} else
			res.status(415).send('The request header has no valid content-type!');
	});
}
