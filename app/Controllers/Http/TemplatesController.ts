import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'

export default class TemplatessController {

  public async index({ response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      await currentUser.load('templates')
      const templates = currentUser.templates

      response.status(200).json(templates)
    } catch (error) {
      response.send(error)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      const template = await Template.create({ ...request.only(['name']), userId: currentUser.id })

      response.status(201).json(template)
    } catch (error) {
      response.send(error)
    }
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      await currentUser.load('templates')
      const templates = currentUser.templates
      const template = await templates.findOrFail(params.id)

      response.status(200).json(template)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async update({ params, response, request, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      await currentUser.load('templates')
      const templates = currentUser.templates
      const template = await templates.findOrFail(params.id)
      await template.merge({ ...request.only(['name']) }).save()

      response.status(200).json(template)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      await currentUser.load('templates')
      const templates = currentUser.templates
      const template = await templates.findOrFail(params.id)
      await template.delete()

      response.status(204)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }
}
