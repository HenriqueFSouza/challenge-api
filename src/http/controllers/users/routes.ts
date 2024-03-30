import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./athenticate";
import { checkCode } from "./check-code";
import { recoverPassword } from "./recover-password";
import { updateUser } from "./update-user";
import { verifyJWT } from "@/http/middlewares/auth";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/check-code', checkCode)
  app.post('/recover-password', recoverPassword)
  app.post('/update-user', { onRequest: [verifyJWT] }, updateUser)
}