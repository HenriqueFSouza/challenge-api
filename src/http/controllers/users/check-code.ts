import { InvalidConfirmationError } from "@/services/errors/invalid-confirmation";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeCheckCodeService } from "@/services/factories/make-check-code-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function checkCode(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    code: z.string().min(6),
  })

  const { email, code } = authenticateBodySchema.parse(request.body)

  try {
    const checkCodeService = makeCheckCodeService()

    await checkCodeService.execute({
      email,
      code,
    })

    return reply.status(201).send()

  } catch (error) {

    if (error instanceof InvalidConfirmationError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }


}