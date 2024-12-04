import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { ROLE, User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const usersWithSameEmail = await this.usersRepository.findByEmail(email)

    if (usersWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      role: ROLE.MEMBER,
      password_hash,
    })

    return {
      user,
    }
  }
}
