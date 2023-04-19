import {FastifyInstance} from 'fastify';
import {z} from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
import veterinaryController from '../controller/veterinaryController';
import {Client, Veterinary} from '@prisma/client';
import bcrypt from "../lib/bcrypt";

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/auth', {onRequest: [authenticate]}, (req) => {
		return {user: req.user};
	});

	fastify.post('/signup', async (request, reply) => {
		try {
			const bodyParams = z.object({
				email: z.string(),
				password: z.string(),
			});

			const body = bodyParams.parse(request.body);
			if (body.email === '' || body.password === '')
				reply.status(400).send({message: 'Campos vazios'});
			if (!body.email.includes('@'))
				reply.status(400).send({message: 'E-mail inválido'});

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
					reply.status(200).send({token});
				}
				reply.status(404).send({message: 'E-mail ou senha incorretos'});
			}
			reply
				.status(404)
				.send({message: 'Nenhum registro encontrado no banco'});

			if (body.password === user?.password)
				if (foundClient.user) {
					if (body.password === foundClient.user.password) {
						const user: JwtSignUser = {
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
						reply.status(foundClient.statusCode).send({token});
					}

					if (foundVeterinary.veterinary) {
						if (body.password === foundVeterinary.veterinary.password) {
							const user: JwtSignUser = {
								id: foundVeterinary.veterinary.id,
								email: foundVeterinary.veterinary.email,
								userName: foundVeterinary.veterinary.userName,
								profileBannerPhoto: foundVeterinary.veterinary
									.profileBannerPhoto
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
							reply.status(foundClient.statusCode).send({token});
						}

						reply.status(400).send({message: 'E-mail ou senha incorretos'});
					}
					reply
						.status(foundClient.statusCode)
						.send({message: 'E-mail ou senha incorretos'});
				}
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({message: JSON.parse(err.message)});
			reply.status(400).send({message: err});
		}
	});
}
