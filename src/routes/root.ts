import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get(
    "/",
    {
      schema: {
        description: "Root endpoint",
        tags: ["root"],
        response: {
          200: {
            type: "object",
            properties: {
              ping: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return { ping: "ok" };
    }
  );
}
