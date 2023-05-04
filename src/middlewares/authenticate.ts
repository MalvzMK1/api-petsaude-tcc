import {FastifyRequest} from 'fastify';

export default async function authenticate(request: FastifyRequest) {
	request.user = await request.jwtVerify()
}
