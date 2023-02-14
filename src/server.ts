import fastify from 'fastify';

const app = fastify();

app.get('/', (req, rep) => {
  rep.status(200).send({ message: 'Hello World!!' });
});

app.listen({ port: 3333 });

export default app;
