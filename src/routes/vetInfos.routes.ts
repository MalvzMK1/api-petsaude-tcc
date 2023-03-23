import {FastifyInstance} from "fastify";
import {z} from "zod";
import Messages from "../messages/message";
import userController from "../controller/userController";

export default async function vetInfosRoutes(fastify: FastifyInstance) {
	fastify.post('/veterinarian/user', async (req, res) => {
		const bodyParams = z.object ({
			crmv: z.string(),
			occupationArea: z.string(),
			formation: z.string(),
			institution: z.string(),
			startActingDate: z.string(),
			formationDate: z.string(),
		})

		const queryParams = z.object({userId:z.string()})

		const rawBody = req.body;
		if (JSON.stringify(rawBody) === '{}')
			res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);

		const body = bodyParams.parse(req.body)

		const formationDate = new Date(body.formationDate)
		const startActingDate = new Date(body.startActingDate)

		if (formationDate.toString() === 'Invalid Date' || startActingDate.toString() === 'Invalid Date')
			res.status(400).send({message: 'Wrong date format, expected YYYY-MM-DD'})

		const { userId } = queryParams.parse(req.query);
		const result = await userController.createVetInfos(parseInt(userId), body)


		res.status(result.statusCode).send(result.message);
	})
}
