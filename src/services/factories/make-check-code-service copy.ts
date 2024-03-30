import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { CheckEmailService } from "../users/check-email"

export function makeEmailService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const checkEmailService = new CheckEmailService(prismaUsersRepository)

  return checkEmailService
}