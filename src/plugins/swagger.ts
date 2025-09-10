import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default async function (fastify: FastifyInstance) {
// Configurar Swagger
    await fastify.register(swagger, {
    swagger: {
        info: {
        title: 'Fastify API',
        description: 'API',
        version: '1.0.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
        { name: 'root', description: 'Root endpoints' }
        ]
    }
    });
// Configurar Swagger UI
    await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    }
    });
    console.log('Swagger plugin loaded');
}