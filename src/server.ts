import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import petRoutes from './routes/pet.routes';
import addressRoutes from './routes/address.routes';
import veterinaryRoutes from './routes/veterinary.routes';
import specialitiesRoutes from "./routes/specialities.routes";
import appointmentRoutes from "./routes/appointment.routes";

const fastify = Fastify({
	logger: true
});

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
fastify.register(veterinaryRoutes);
fastify.register(specialitiesRoutes);
fastify.register(appointmentRoutes);

const port = process.env.PORT || 8080;

// @ts-ignore
fastify.listen({port});
