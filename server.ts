import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import fastify from "fastify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify();

server.register(autoLoad, {
  dir: path.join(__dirname, "routes"),
});

server.listen({ port: 3000 });
