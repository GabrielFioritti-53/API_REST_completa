import { loginSchema } from "../services/schema.ts";
import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";

const auth: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
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
      };
      const token = Buffer.from(JSON.stringify(contrasena)).toString("base64");
      reply.code(200);
      return { token };
    }
  );
};

export default auth;
