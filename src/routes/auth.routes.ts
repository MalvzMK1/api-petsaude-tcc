import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';

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
					id: foundUser.user.id,
					email: foundUser.user.email,
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
						id: user.id,
						email: user.email,
						profilePhoto: user.profilePhoto,
						profileBannerPhoto: user.profileBannerPhoto,
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
}
