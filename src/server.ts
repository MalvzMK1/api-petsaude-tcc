import fastify from 'fastify';
// import fastifyCors from 'fastify-cors';
import cors from '@fastify/cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ClientController from './controller/clientController';

const app = fastify();
app.register(cors);

const clientController = new ClientController();

// CRUD CLIENTE

app.get('/me', async (req, res) => {
  const queryParams = z.object({
    userID: z.string(),
  });

  const { userID } = queryParams.parse(req.query);
  const userInfos = await clientController.selectClientById(parseInt(userID));

  res.send({ userInfos });
});

// CRUD VETERINÁRIO

app.get('/veterinario', async (req, res) => {
  const queryParams = z.object({
    userID: z.string(),
  });

  const { userID } = queryParams.parse(req.query);

  // res.send({ userInfos });
});

// app.get('/', (req, rep) => {
//   const requestQuery = z.object({
//     teste: z.stri\ng(),
//   });

//   const { teste } = requestQuery.parse(req.query);

//   rep.status(200).send({ message: `Hello ${teste}!!` });
// });

app.listen({ port: 3333 });

export default app;
