import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { CheckCodeService } from "../users/check-code"

export function makeCheckCodeService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const checkCodeService = new CheckCodeService(prismaUsersRepository)

  return checkCodeService
}