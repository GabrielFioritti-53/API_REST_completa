import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { Usuario } from "./usuarios.ts";
import { usuarios } from "../plugins/basedatos.ts";
import {
  usuarioDeleteSchema,
  usuarioGetSchema,
  usuarioPostSchema,
  usuarioPutSchema,
} from "../services/schema.ts";

let id_actual = usuarios.length + 1;

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
    "/",
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
  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear usuario",
        descrption: "Estas ruta permite crear un nuevo usuario. ",
        tags: ["usuarios"],
        querystring: Type.Object({
          nombre: Type.Optional(Type.String({ minLength: 2 })),
        }),
        body: usuarioPostSchema,
        response: {
          201: Usuario,
          400: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },

    async function (request, reply) {
      const { nombre, isAdmin } = request.body as Usuario;
      const usuario = { nombre, isAdmin, id_usuario: id_actual++ }; //Con una constante como id, unicamente subiendo, nos aseguramos que cada user tenga un id unico
      usuarios.push(usuario);
      reply.code(201);
      return usuario;
    } /* aca entra logger, si logger es =false se registra */
  );

  fastify.put(
    "/:id_usuario",
    {
      schema: {
        summary: "Modificar un usuario",
        description: "Esta ruta permite modificar un usuario",
        tags: ["usuarios"],
        body: usuarioPutSchema,
        params: Type.Object({
          id_usuario: Type.Number(),
        }),
        response: {
          204: Usuario,
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async function (request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };
      const { nombre } = request.body as { nombre: string };
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario); //Es importante buscar los user por su id pues es el unico elto que es unico por user.
      if (usuarioId === -1) {
        reply.code(404);
        return;
      } else {
        usuarios[usuarioId].nombre = nombre;
        reply.code(204);
      }
    }
  );
  //if admin or logeado true entonces lo pueden modificar
  //if es admin puede modificar cualquiera else solo su propio usuario

  fastify.delete(
    "/:id_usuario",
    {
      schema: {
        summary: "Eliminar un usuario",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        //body: usuarioDeleteSchema,
        params: Type.Object({
          id_usuario: Type.Number(),
        }),
        response: {
          204: Usuario,
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async function handler(request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario);
      if (usuarioId === -1) {
        reply.code(404);
        return;
        //if admin true puede borrar otos usuarios
      } else {
        usuarios.splice(usuarioId, 1);
        reply.code(204);
      }
    }
  );

  fastify.get(
    "/:id_usuario",
    {
      schema: {
        summary: "Obtener un usuario por ID",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        params: usuarioGetSchema,
        response: {
          200: Usuario,
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async function handler(request, reply) {
      const { id_usuario } = request.params as {
        id_usuario: string;
      };
      const idNumber = parseInt(id_usuario);
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === idNumber);
      if (usuarioId === -1) {
        reply.code(404);
        return;
        //if admin or logger true obtienen los id de los usuarios
      }
      reply.code(200);
      return usuarios[usuarioId];
    }
  );
};
