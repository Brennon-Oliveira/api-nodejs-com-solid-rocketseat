import { prisma } from '@/lib/prisma'
import { ROLE } from '@prisma/client'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  role: ROLE = ROLE.MEMBER,
) => {
  const [name, email, password] = ['John Doe', 'johndoe@example.com', '123456']

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: await hash(password, 6),
      role,
      created_at: new Date(),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return {
    token,
    name,
    email,
    password,
  }
}
