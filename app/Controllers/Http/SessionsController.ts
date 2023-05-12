import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async login({auth, request, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      response.status(201).json({ token })
    } catch(error) {
      response.status(error.status).send(error)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      response.status(200).json({ revoked: true })
    } catch (error){
      response.status(error.status).send(error)
    }
  }
}
