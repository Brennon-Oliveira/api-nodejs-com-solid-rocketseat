import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -25.0658585,
      longitude: -50.1071969,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -25.0658585,
      longitude: -50.1071969,
    })

    await gymsRepository.create({
      title: 'Python Gym',
      description: null,
      phone: null,
      latitude: -25.0658585,
      longitude: -50.1071969,
    })

    const { gyms } = await sut.execute({
      query: 'script',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
      expect.objectContaining({ title: 'Typescript Gym' }),
    ])
  })
})
