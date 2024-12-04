import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)
  const userId = request.user.sub

  const fetchMemberCheckInsHistoryUseCase =
    makeFetchMemberCheckInsHistoryUseCase()

  const { checkIns } = await fetchMemberCheckInsHistoryUseCase.execute({
    page,
    userId,
  })

  return reply.status(200).send({ checkIns })
}