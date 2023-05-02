import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Messages from '../messages/message';
import postController from '../controller/postController';

export default async function postRoutes(fastify: FastifyInstance) {
	fastify.post('/post', { onRequest: authenticate }, async (request, reply) => {
		try {
			const bodyParams = z.object({
				title: z.string(),
				text: z.string(),
				image: z.string(),
			});
			const queryParams = z.object({
				userID: z.string(),
			});

			const rawBody = request.body;
			if (JSON.stringify(rawBody) === '{}')
				reply.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);
			const body = bodyParams.parse(request.body);

			const { userID } = queryParams.parse(request.query);
			if (!userID) reply.status(400).send({ response: 'Required ID' });

			const createUser = await postController.createPost(
				parseInt(userID),
				body
			);
			reply
				.status(createUser.statusCode)
				.send({ response: createUser.message });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});

	fastify.put('/post', { onRequest: authenticate }, async (request, reply) => {
		try {
			const bodyParams = z.object({
				title: z.string(),
				text: z.string(),
				image: z.string(),
			});

			const queryParams = z.object({ id: z.string() });

			const body = bodyParams.parse(request.body);
			const { id } = queryParams.parse(request.query);

			const updatePost = await postController.updatePost(parseInt(id), body);
			reply.status(200).send({ response: updatePost.message });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});

	fastify.get('/posts', { onRequest: authenticate }, async (req, reply) => {
		try {
			const posts = await postController.getAllPosts();
			reply
				.status(posts.statusCode)
				.send({ response: { user: posts?.message } });
		} catch (err) {
			if (err instanceof Error)
				reply.status(400).send({ response: JSON.parse(err.message) });
			reply.status(400).send({ response: 'Unknown error' });
		}
	});
	fastify.delete(
		'/post/:id',
		{ onRequest: authenticate },
		async (request, reply) => {
			try {
				const queryParams = z.object({ id: z.string() });

				const { id } = queryParams.parse(request.params);
				if (!id) reply.status(400).send({ response: 'Required ID' });

				const deletePost = await postController.deletePost(parseInt(id));

				reply
					.status(deletePost.statusCode)
					.send({ response: deletePost.message });
			} catch (err) {
				if (err instanceof Error)
					reply.status(400).send({ response: JSON.parse(err.message) });
				reply.status(400).send({ response: 'Unknown error' });
			}
		}
	);
}
