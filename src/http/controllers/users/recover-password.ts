import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeEmailService } from "@/services/factories/make-check-code-service copy";
import { SendMail } from "@/utils/sendEmail";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function recoverPassword(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = authenticateBodySchema.parse(request.body)

  try {
    const checkEmailService = makeEmailService()

    await checkEmailService.execute({
      email,
    })

    const token = await reply.jwtSign({
      email
    })

    await SendMail(email, null, token)

    return reply.status(200).send()

  } catch (error) {

    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

}