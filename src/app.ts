import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import cors from '@fastify/cors'
import { healthRoutes } from './http/controllers/routes';

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  }
})

app.register(cors, {
  origin: 'https://challenge-interface.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})

app.register(healthRoutes) // This is the health check route

app.register(usersRoutes)


app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', error: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
    // Use a external tool to log errors in production
  }

  return reply.status(500).send({ message: 'Internal server error' })
})