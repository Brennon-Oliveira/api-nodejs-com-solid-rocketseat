import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh tokens', async () => {
    const [email, password] = ['johndoe@example.com', '123456']

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email,
      password,
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    const cookies = authResponse.get('Set-Cookie')

    console.log(cookies)

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies ?? [])
      .send()

    console.log(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
