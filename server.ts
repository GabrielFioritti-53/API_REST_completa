import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import fastify from "fastify";
import swagger from "./src/plugins/swagger.ts";
import { roots } from "./src/routes/root.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify();

/* server.register(autoLoad, {
  dir: path.join(__dirname, "src", "routes"),
}); */
await server.register(swagger);
await server.register(roots);
await server.listen({ port: parseInt(process.env.PORT || "3000") });
