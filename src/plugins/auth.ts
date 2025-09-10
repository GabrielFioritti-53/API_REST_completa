import { loginSchema } from "../services/schema.ts";
import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";

export const auth: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Logger",
        description: "Loggear suario",
        tags: ["Logger"],
        body: loginSchema,
        response: {
          200: Type.String(),
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { usuario, contrasena } = request.body as {
        usuario: string;
        contrasena: string;
      }; //Si da error intentamos con any en vez de loginSchema
      const token = Buffer.from(JSON.stringify(usuario)).toString("base64");
      return { token };
    }
  );
};
