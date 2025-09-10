import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";

export const usuariosRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  options: object
) {
  fastify.get(
    "/",
    {
      schema: {
        summary: "ok",
        description: "",
        tags: ["ok"],
        querystring: Type.Object({}),
        response: {
          200: {
            type: "object",
            properties: {
              ping: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return { ping: "ok" };
    }
  );
};
