import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
import veterinaryController from '../controller/veterinaryController';
import { Client, Veterinary } from '@prisma/client';
import bcrypt from '../lib/bcrypt';

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/auth', { onRequest: [authenticate] }, (req) => {
		return { user: req.user };
	});

	fastify.post('/signup', async (request, reply) => {
		try {
			const bodyParams = z.object({
				email: z.string(),
				password: z.string(),
			});

			const body = bodyParams.parse(request.body);
			if (body.email === '' || body.password === '')
				reply.status(400).send({ response: 'Campos vazios' });
			if (!body.email.includes('@'))
				reply.status(400).send({ response: 'E-mail inválido' });

			const foundClient = await userController.getUserByEmail(body.email);
			const foundVeterinary = await veterinaryController.getVeterinaryByEmail(
				body.email
			);
			let user: Client | Veterinary | undefined;

			if (foundClient.user) {
				user = foundClient.user;
			}
			if (foundVeterinary.veterinary) {
				user = foundVeterinary.veterinary;
			}

			if (user) {
				if (await bcrypt.compare(body.password, user.password)) {
					const payload: JwtSignUser = {
						id: user.id,
						email: user.email,
						isVet: user.isVet,
						profileBannerPhoto: user.profileBannerPhoto,
						profilePhoto: user.profilePhoto,
						userName: user.userName,
					};
					const token = fastify.jwt.sign(
						{
							...payload,
							createdAt: new Date(),
						},
						{
							expiresIn: '7 days',
						}
					);
					reply.status(200).send({ token });
				}
				reply.status(404).send({ response: 'E-mail ou senha incorretos' });
			}
			reply
				.status(404)
				.send({ response: 'Nenhum registro encontrado no banco' });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: err });
		}
	});
}
