import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Metrics of Check-Ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

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
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(1)
  })
})