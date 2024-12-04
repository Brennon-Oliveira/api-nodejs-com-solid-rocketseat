import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  const [name, email, password] = ['John Doe', 'johndoe@example.com', '123456']

  await request(app.server).post('/users').send({
    name,
    email,
    password,
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
