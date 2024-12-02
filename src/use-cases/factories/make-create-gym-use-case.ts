import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym-use-case'

export const makeCreateGymUseCase = () => {
  const prismaGymRespository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymRespository)

  return createGymUseCase
}
