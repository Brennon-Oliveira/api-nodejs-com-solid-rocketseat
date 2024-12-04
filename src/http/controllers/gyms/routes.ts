import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { ROLE } from '@prisma/client'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.get('/search', search)
  app.get('/nearby', nearby)

  app.post(
    '/',
    {
      onRequest: [verifyUserRole(ROLE.ADMIN)],
    },
    create,
  )
}
