import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async store({request, response}: HttpContextContract) {
    try {
      const user = await User.create({ ...request.only(['email', 'password']) })

      response.status(201).json(user);
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async show({params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user

      if (currentUser.id === parseInt(params.id)) {
        response.status(200).json(currentUser);
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async update({params, response, request, auth}: HttpContextContract) {
    try {

      const currentUser = auth.use('api').user

      if (currentUser.id === parseInt(params.id)) {
        await currentUser.merge({ ...request.only(['email', 'password']) }).save()
        response.status(200).json(currentUser);
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async destroy({params, response, auth}: HttpContextContract) {
    try {

      const currentUser = auth.use('api').user

      if (currentUser.id === parseInt(params.id)) {
        await currentUser.delete();
        response.status(204)
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }
}
