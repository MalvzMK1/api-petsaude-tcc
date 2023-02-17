import fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod'; //verifica que tipo vai chegar: boolean, string, number
import UserController from './controller/userController';

const app = fastify();
app.register(cors);

const userController = new UserController();

// CRUD USUÁRIO

app.get('/me', async (req, res) => {
  const queryParams = z.object({
    userID: z.string(),
  });

  const { userID } = queryParams.parse(req.query);

  if (!userID) res.status(400).send({ message: 'Required ID' });

  const userInfos = await userController.getUserById(parseInt(userID));

  if (userInfos)
    res.status(userInfos.statusCode).send({ payload: userInfos?.message });
});

app.get('/all/user', async (req, res) => {
  const allUsers = await userController.getAllUsers();

  res.send({ allUsers });
});

app.listen({ port: 3333 });

export default app;
