import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(201).send()
}
