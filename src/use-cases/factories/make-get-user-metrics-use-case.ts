import { GetUserMetricsUseCase } from '../get-user-metrics-use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export const makeGetUserMetricsUseCase = () => {
  const prismaCheckInsRespository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRespository,
  )

  return getUserMetricsUseCase
}
