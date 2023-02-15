import fastify from 'fastify';
import { z } from 'zod';

const app = fastify();

app.get('/', (req, rep) => {
  const requestQuery = z.object({
    teste: z.string(),
  });

  const { teste } = requestQuery.parse(req.query);

  rep.status(200).send({ message: `Hello ${teste}!!` });
});

app.listen({ port: 3333 });

export default app;
