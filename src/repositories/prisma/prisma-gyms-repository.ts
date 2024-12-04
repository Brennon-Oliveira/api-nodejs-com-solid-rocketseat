import { Gym, Prisma } from '@prisma/client'
import {
  GymsRepository,
  GymsRepositoryFindManyNearbyParams,
} from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({
    latitude,
    longitude,
  }: GymsRepositoryFindManyNearbyParams): Promise<Gym[]> {
    console.log(longitude, latitude)
    console.log(`
SELECT * from gyms
WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `)
    const gyms = await prisma.$queryRaw<Gym[]>`
SELECT * from gyms
WHERE (${latitude} = latitude AND ${longitude} = longitude) OR (( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10)
    `

    return gyms
  }
}
