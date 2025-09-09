import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import path from "path";

const app = fastify();

app.register(fastifyAutoload, {
  dir: path.join(__dirname, "plugins"),
});

app.listen({ port: 3000 });
