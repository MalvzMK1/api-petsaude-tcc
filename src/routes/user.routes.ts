import { FastifyInstance } from 'fastify';
import userController from '../controller/userController';
import { z } from 'zod';
import prisma from '../lib/prisma';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/me', async (req, res) => {
    const queryParams = z.object({
      userID: z.string(),
    });

    const { userID } = queryParams.parse(req.query);

    if (!userID) res.status(400).send({ message: 'Required ID' });

    const userInfos = await userController.getUserById(parseInt(userID));

    res.status(userInfos.statusCode).send({ user: userInfos?.message });
  });

  fastify.get('/all/user', async (req, res) => {
    const allUsers = await userController.getAllUsers();

    res.send({ allUsers });
  });
}
