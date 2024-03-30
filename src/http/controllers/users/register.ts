import { env } from "@/env";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { generateCode } from "@/utils/generateCode";
import { SendMail, transporter } from "@/utils/sendEmail";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),

  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const code = generateCode()

  try {
    const registerService = makeRegisterService()

    const user = await registerService.execute({
      name,
      email,
      password,
      is_confirmed: code,
    })

    await SendMail(email, code, null)

    reply.status(201).send(user)
  } catch (error) {

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}