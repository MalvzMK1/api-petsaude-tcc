import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
import veterinaryController from '../controller/veterinaryController';

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/auth', { onRequest: [authenticate] }, (req) => {
		return { user: req.user };
	});

	fastify.post('/signup', async (request, reply) => {
		const bodyParams = z.object({
			email: z.string(),
			password: z.string(),
		});

		const body = bodyParams.parse(request.body);

		console.log(body.email);

		const foundClient = await userController.getUserByEmail(body.email);
		const foundVeterinary = await veterinaryController.getVeterinaryByEmail(
			body.email
		);
		let user;

		if (foundClient.user) {
			user = foundClient.user;
		}
		if (foundVeterinary.veterinary) {
			user = foundVeterinary.veterinary;
		}

		if (user) {
			if (body.password === user.password) {
				const payload: jwtSignUser = {
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
			reply.status(404).send({ message: 'Incorrect email or password' });
		}
		reply.status(404).send({ message: 'not found db' });

		if (body.password === user?.password)
			if (foundClient.user) {
				if (body.password === foundClient.user.password) {
					const user: jwtSignUser = {
						id: foundClient.user.id,
						email: foundClient.user.email,
						userName: foundClient.user.userName,
						profileBannerPhoto: foundClient.user.profileBannerPhoto
							? foundClient.user.profileBannerPhoto
							: '',
						profilePhoto: foundClient.user.profilePhoto
							? foundClient.user.profilePhoto
							: '',
						isVet: foundClient.user.isVet,
					};
					const token = fastify.jwt.sign(
						{
							id: user.id,
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
					reply.status(foundClient.statusCode).send({ token });
				}

				if (foundVeterinary.veterinary) {
					if (body.password === foundVeterinary.veterinary.password) {
						const user: jwtSignUser = {
							id: foundVeterinary.veterinary.id,
							email: foundVeterinary.veterinary.email,
							userName: foundVeterinary.veterinary.userName,
							profileBannerPhoto: foundVeterinary.veterinary.profileBannerPhoto
								? foundVeterinary.veterinary.profileBannerPhoto
								: '',
							profilePhoto: foundVeterinary.veterinary.profilePhoto
								? foundVeterinary.veterinary.profilePhoto
								: '',
							isVet: foundVeterinary.veterinary.isVet,
						};
						const token = fastify.jwt.sign(
							{
								id: user.id,
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
						reply.status(foundClient.statusCode).send({ token });
					}

					reply.status(400).send({ message: 'Incorrect email or password' });
				}
				reply
					.status(foundClient.statusCode)
					.send({ message: 'Incorrect email or password' });
			}
	});
}
