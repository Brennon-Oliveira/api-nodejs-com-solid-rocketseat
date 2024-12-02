import { GymsRepository } from '@/repositories/gyms-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRespository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRespository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRespository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch nearby gyms', async () => {
    vi.setSystemTime(new Date(2022, 6, 20, 8, 0, 0))
    await gymsRespository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -25.0658585,
      longitude: -50.1071969,
    })
    await gymsRespository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -25.3758494,
      longitude: -51.4565383,
    })

    const { gyms } = await sut.execute({
      userLatitude: -25.0658585,
      userLongitude: -50.1071969,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
