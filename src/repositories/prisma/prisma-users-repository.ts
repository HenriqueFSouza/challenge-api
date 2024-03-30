import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async updateUser(email: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data
    })

    return user
  }

  async deleteCode(email: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        is_confirmed: null,
      }
    })
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }
}