import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface UpdateUserServiceRequest {
  email: string;
  password: string;
}

interface UpdateUserServiceResponse {
  user: User;
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.updateUser(email, { password_hash })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}