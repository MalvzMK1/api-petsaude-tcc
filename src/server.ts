import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { z } from 'zod'; //verifica que tipo vai chegar: boolean, string, number

const fastify = Fastify();

import userRoutes from './routes/user.routes';

fastify.register(cors, {
  origin: true,
});

fastify.register(jwt, {
  secret: 'Secret',
});

fastify.register(userRoutes);

fastify.listen({ port: 3333 });

export default fastify;
