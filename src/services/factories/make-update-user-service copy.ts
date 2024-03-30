import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UpdateUserService } from "../users/update-user"

export function makeUpdateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const updateUserService = new UpdateUserService(prismaUsersRepository)

  return updateUserService
}