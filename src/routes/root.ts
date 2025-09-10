import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { Usuario } from "./usuarios";
import { usuarios } from "../plugins/basedatos";

export const roots: FastifyPluginAsyncTypebox = async function (
  fastify,
  options: object
) {
/*   fastify.get(
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
  ); */

fastify.get(
    "/", //en vez de params ahora usa querystring *1
    {
      schema: {
        summary: "Obtener todos los usuarios",
        description: "Retorna la lista de usuarios",
        tags: ["listaUsuarios"],
        querystring: Type.Object({
          nombre: Type.Optional(Type.String({ minLength: 2 })),
        }),
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
    async function (request) {
      const query = request.query as { isAdmin: boolean };
      if (query.isAdmin) {
        return usuarios;
      }
    }
  );
};
