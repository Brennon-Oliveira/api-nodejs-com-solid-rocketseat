import { FetchMemberCheckInsHistoryUseCase } from '../fetch-member-check-ins-history-use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export const makeFetchMemberCheckInsHistoryUseCase = () => {
  const prismaCheckInsRespository = new PrismaCheckInsRepository()
  const createGymUseCase = new FetchMemberCheckInsHistoryUseCase(
    prismaCheckInsRespository,
  )

  return createGymUseCase
}
