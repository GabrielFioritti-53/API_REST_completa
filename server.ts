import type { FastifyInstance, FastifyListenOptions } from "fastify";
import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

const fastifyOptions = {
  logger: loggerOptions,
  ignoreTrailingSlash: true,
  bodyLimit: 1048576,
  pluginTimeout: 10000,
  maxParamLength: 100,
  disableRequestLoggin: false,
  caseSensitive: true,
};

const fastifyListenOptions: FastifyListenOptions = {
  port: 3000,
  host: "::",
};

const fastify: FastifyInstance =
  Fastify(fastifyOptions).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(autoLoad, {
  dir: join(__dirname, "src", "plugins"),
});

fastify.register(autoLoad, {
  dir: join(__dirname, "src", "routes"),
});

try {
  await fastify.listen(fastifyListenOptions);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
