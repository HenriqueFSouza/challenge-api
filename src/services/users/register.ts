import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
  is_confirmed: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password, is_confirmed }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      is_confirmed
    })

    return {
      user,
    }
  }
}