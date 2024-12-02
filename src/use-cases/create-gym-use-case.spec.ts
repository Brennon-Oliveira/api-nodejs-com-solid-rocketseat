import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -25.0658585,
      longitude: -50.1071969,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
