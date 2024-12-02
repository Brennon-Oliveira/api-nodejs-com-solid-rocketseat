import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export const makeFetchNearbyGymsUseCase = () => {
  const prismaGymRespository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
    prismaGymRespository,
  )

  return fetchNearbyGymsUseCase
}
