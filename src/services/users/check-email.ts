import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface CheckEmailServiceRequest {
  email: string;
}

export class CheckEmailService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email }: CheckEmailServiceRequest) {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

  }
}