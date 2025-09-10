import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import fastify from "fastify";
import swagger from "./src/plugins/swagger.ts";
import { roots } from "./src/routes/root.ts";
import { auth } from "./src/plugins/auth.ts";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || "trace",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

const server = fastify({
  logger: loggerOptions,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(autoLoad, {
  dir: path.join(__dirname, "src", "plugins"),
});

server.register(autoLoad, {
  dir: path.join(__dirname, "src", "routes"),
});

await server.register(swagger);
await server.register(roots);
await server.register(auth);
await server.listen({ port: parseInt(process.env.PORT || "3000") });
