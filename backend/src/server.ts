import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

import products from "./mock-products.json";

const server: FastifyInstance = Fastify({ logger: true });

server.register(cors, {});

server.get("/products", async (request, reply) => {
  try {
    return reply.code(200).send({
      message: "OK!",
      ...products,
    });
  } catch (e) {
    return reply.code(500).send({
      message: "INTERNAL SERVER ERROR!",
    });
  }
});

const start = async () => {
  try {
    server.listen({ host: "0.0.0.0", port: 3333 }, (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }

      // eslint-disable-next-line no-console
      console.log(`Server listening at 3333`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
