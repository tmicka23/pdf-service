import { test } from '@japa/runner'


test.group('POST /login', (_) => {

  test('it returns a 201', async ({ client }) => {
    const request = client.post('/login')

    request.json({
      email: 'mickael@kinoba.fr',
      password: 'password'
    })

    const response = await request.send()

    response.assertStatus(201)
  })

  test('it returns a token', async ({ client, assert }) => {
    const request = client.post('/login')

    request.json({
      email: 'mickael@kinoba.fr',
      password: 'password'
    })

    const response = await request.send()

    assert.isTrue(response.body().hasOwnProperty('token'))
  })
})
