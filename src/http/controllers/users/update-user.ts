import { makeUpdateUserService } from "@/services/factories/make-update-user-service copy";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    password: z.string().min(6),
  })

  const { password } = authenticateBodySchema.parse(request.body)

  const email = request.user.email

  const updateUserService = makeUpdateUserService()

  const { user } = await updateUserService.execute({
    email,
    password,
  })

  return reply.status(201).send(user)

}