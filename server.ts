import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import fastify from "fastify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify();

app.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

app.listen({ port: 3000 });
