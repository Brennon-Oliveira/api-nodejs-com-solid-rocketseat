import { GetUserProfileUseCase } from '../get-user-profile'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export const makeGetUserProfileUseCase = () => {
  const prismaUsersRespository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(
    prismaUsersRespository,
  )

  return getUserProfileUseCase
}
