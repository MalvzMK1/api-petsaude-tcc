import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const fastify = Fastify();

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import petRoutes from './routes/pet.routes';
import addressRoutes from './routes/address.routes';
import phoneNumberRoutes from './routes/phone.routes';

fastify.register(cors, {
	origin: true,
});

fastify.register(jwt, {
	secret: 'Secret',
});

fastify.register(userRoutes);
fastify.register(authRoutes);
fastify.register(petRoutes);
fastify.register(addressRoutes);
fastify.register(phoneNumberRoutes);

fastify.listen({ port: 3333 });

export default fastify;
