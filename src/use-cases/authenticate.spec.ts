import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with worng password', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password: '321456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
