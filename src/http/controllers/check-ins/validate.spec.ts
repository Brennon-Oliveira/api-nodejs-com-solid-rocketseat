import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check in', async () => {
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

    const { body: gymBody } = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Javas',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    await request(app.server)
      .post(`/check-ins/gyms/${gymBody.gyms[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -25.0658585,
        longitude: -50.1071969,
      })

    const { body: checkInsBody } = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .patch(`/check-ins/${checkInsBody.checkIns[0].id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -25.0658585,
        longitude: -50.1071969,
      })

    expect(response.statusCode).toEqual(201)
    expect(checkInsBody.checkIns[0].validated_at).toEqual(null)

    const { body: validatedCheckInsBody } = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(new Date(validatedCheckInsBody.checkIns[0].validated_at)).toEqual(
      expect.any(Date),
    )
  })
})
