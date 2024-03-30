import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { InvalidConfirmationError } from "../errors/invalid-confirmation";

interface CheckCodeServiceRequest {
  email: string;
  code: string;
}

interface CheckCodeServiceResponse {
  user: User;
}

export class CheckCodeService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, code }: CheckCodeServiceRequest): Promise<CheckCodeServiceResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    if (user.is_confirmed !== code) {
      throw new InvalidConfirmationError()
    }

    await this.usersRepository.deleteCode(email)

    return {
      user,
    }
  }
}