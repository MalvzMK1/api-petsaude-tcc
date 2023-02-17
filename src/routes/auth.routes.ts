import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/auth', { onRequest: [authenticate] }, (req) => {
    return { user: req.user };
  });
}
