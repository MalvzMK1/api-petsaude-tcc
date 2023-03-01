import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const fastify = Fastify();

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

fastify.register(cors, {
  origin: true,
});

fastify.register(jwt, {
  secret: 'Secret',
});

fastify.register(userRoutes);
fastify.register(authRoutes);

fastify.listen({ port: 3333 });

export default fastify;
