import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import authenticate from '../middlewares/authenticate';
import userController from '../controller/userController';
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
}
