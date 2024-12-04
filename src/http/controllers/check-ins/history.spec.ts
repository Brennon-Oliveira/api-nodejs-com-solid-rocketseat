import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { ROLE } from '@prisma/client'

describe('History of Check-Ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app, ROLE.ADMIN)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'My description',
        phone: '42999017838',
        latitude: -25.0658585,
        longitude: -50.1071969,
      })

    const { body } = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Javas',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    await request(app.server)
      .post(`/check-ins/gyms/${body.gyms[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -25.0658585,
        longitude: -50.1071969,
      })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: expect.any(String),
      }),
    ])
  })
})
