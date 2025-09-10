import { Type } from "@sinclair/typebox";

export const usuarioPostSchema = {
    type: "object",
    properties: {
    nombre: { type: "string", minLength: 2 },
    isAdmin: { type: "boolean" },
    },
    required: ["nombre", "isAdmin"],
    additionalProperties: false,
};

export const usuarioPutSchema = {
    type: "object",
    properties: {
    nombre: { type: "string", minLength: 2 },
    },
    required: ["nombre"],
    additionalProperties: false,
};

export const usuarioParamsSchema = {
    type: "object",
    properties: {
    id_usuario: { type: "number" },
    },
    required: ["id_usuario"],
};

export const usuarioDeleteSchema = {
    type: "object",
    properties: {
    id_usuario: { type: "number" },
    },
    required: ["id_usuario"],
    additionalProperties: false,
};
export const usuarioGetSchema = {
    type: "object",
    properties: {
    id_usuario: { type: "number" },
    },
    required: ["id_usuario"],
    additionalProperties: false,
};
export const loginSchema = Type.Object({
    usuario: Type.String(),
    contrasena: Type.String(),
});