import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { ROLE } from '@prisma/client'

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId', create)
  app.get('/history', history)
  app.get('/metrics', metrics)

  app.patch(
    '/:checkInId/validate',
    {
      onRequest: [verifyUserRole(ROLE.ADMIN)],
    },
    validate,
  )
}
