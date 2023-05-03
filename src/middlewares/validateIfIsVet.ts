import {FastifyReply, FastifyRequest} from "fastify";

export default async function validateIfIsVet(request: FastifyRequest, reply: FastifyReply) {
	// const teste = await request.jwtDecode((token) => )
	reply.status(300).send({teste})
}
