import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  deleteCode(email: string): Promise<void>;
  updateUser(email: string, data: Prisma.UserUpdateInput): Promise<User>;
}