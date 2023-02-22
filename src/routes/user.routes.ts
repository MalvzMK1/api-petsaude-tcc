import { FastifyInstance } from 'fastify';
import userController from '../controller/userController';
import { z } from 'zod';
import Message from '../messages/message';

const message = new Message();

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/user', async (req, res) => {
    const bodyParams = z.object({
      personName: z.string(),
      userName: z.string(),
      cpf: z.string(),
      rg: z.string(),
      profilePhoto: z.optional(z.string()),
      profileBannerPhoto: z.optional(z.string()),
      email: z.string(),
      password: z.string(),
      isVet: z.boolean(),
      cep: z.string(),
      street: z.string(),
      number: z.string(),
      complement: z.optional(z.string()),
      neighborhood: z.string(),
      cityId: z.number(),
      cityInitials: z.string(),
      cityName: z.string(),
      stateId: z.number(),
      vetInfos: z.optional(
        z.object({
          occupationArea: z.string(),
          formation: z.string(),
          institution: z.string(),
          crmv: z.string(),
        })
      ),
    });

    const body = bodyParams.parse(req.body);
    const createUser = await userController.createUser(body);

    res.status(createUser.statusCode).send(createUser.message);
  });

  fastify.get('/user', async (req, res) => {
    const queryParams = z.object({
      userID: z.string(),
    });

    const { userID } = queryParams.parse(req.query);

    if (!userID) res.status(400).send({ message: 'Required ID' });

    const userInfos = await userController.getUserById(parseInt(userID));

    res.status(userInfos.statusCode).send({ user: userInfos?.message });
  });

  fastify.get('/user/all', async (req, res) => {
    const allUsers = await userController.getAllUsers();

    res.status(allUsers.statusCode).send({ allUsers: allUsers?.message });
  });

  fastify.delete('/user', async (req, res) => {
    const queryParams = z.object({
      userID: z.string(),
    });

    const { userID } = queryParams.parse(req.query);

    if (!userID)
      res.status(400).send({
        message: message.MESSAGE_ERROR.REQUIRED_ID,
      });

    const result = await userController.deleteUser(parseInt(userID));

    res.status(result.statusCode).send(result.message);
  });
}
