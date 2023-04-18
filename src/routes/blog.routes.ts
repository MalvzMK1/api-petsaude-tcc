import { FastifyInstance } from 'fastify';
import authenticate from '../middlewares/authenticate';
import { z } from 'zod';
import Messages from '../messages/message';
import blogController from '../controller/blogController';
import { parse } from 'path';

export default async function postRoutes(fastify: FastifyInstance) {

    fastify.post(
        '/post',
        { onRequest: authenticate },
        async (req, res) => {
            try {
                const bodyParams = z.object({
                    title: z.string(),
                    text: z.string(),
                    image: z.string(),
                })
                const queryParams = z.object({
                    userID: z.string(),
                });

                const rawBody = req.body;
                if (JSON.stringify(rawBody) === '{}')
                    res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);
                const body = bodyParams.parse(req.body);

                const { userID } = queryParams.parse(req.query);
                if (!userID) res.status(400).send({ message: 'Required ID' });

                const createUser = await blogController.createPost(parseInt(userID), body);
                res.status(createUser.statusCode).send({ response: createUser.message });

            } catch (err) {
                if (err instanceof Error)
                    res.status(400).send({ response: JSON.parse(err.message) });
                res.status(400).send({ response: 'Unknown error' });
            }
        });

    fastify.put(
        '/post',
        { onRequest: authenticate },
        async (req, res) => {
            try {
                const bodyParams = z.object({
                    title: z.string(),
                    text: z.string(),
                    image: z.string(),
                });

                const queryParams = z.object({ id: z.string() });

                const rawBody = req.body;

                if (JSON.stringify(rawBody) === '{}')
                    res.status(400).send(new Messages().MESSAGE_ERROR.EMPTY_BODY);


                const body = bodyParams.parse(req.body);
                const { id } = queryParams.parse(req.query);

                const updatePost = await blogController.updatePost(parseInt(id), body);
                res.status(200).send(updatePost.message);


            } catch (err) {
                if (err instanceof Error)
                    res.status(400).send({ response: JSON.parse(err.message) });
                res.status(400).send({ response: 'Unknown error' });
            }
        });

    fastify.get(
        "/posts",
        { onRequest: authenticate },
        async (req, res) => {
            try {

                const userInfos = await blogController.getAllPosts();
                res.status(userInfos.statusCode).send({ user: userInfos?.message });

            } catch (err) {
                if (err instanceof Error)
                    res.status(400).send({ response: JSON.parse(err.message) });
                res.status(400).send({ response: 'Unknown error' });
            }
        });
    fastify.delete(
        "/post/:id",
        { onRequest: authenticate },
        async (req, res) => {
            try {

                const queryParams = z.object({ id: z.string()});

				const { id } = queryParams.parse(req.params);
                if (!id) res.status(400).send({message: 'Required ID'});

                const deletePost = await blogController.deletePost(parseInt(id))

                res.status(deletePost.statusCode).send(deletePost.message)

            } catch (err) {
                if (err instanceof Error)
                    res.status(400).send({ response: JSON.parse(err.message) });
                res.status(400).send({ response: 'Unknown error' });
            }
        })


}