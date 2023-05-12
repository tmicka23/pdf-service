import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'

export default class TemplatessController {

  public async index({ response }: HttpContextContract) {
    try {
      const templates = await Template.all()

      response.status(200).json(templates)
    } catch (error) {
      response.send(error)
    }
  }

  public async store({request, response }: HttpContextContract) {
    try {
      const template = await Template.create({ ...request.only(['name']) })

      response.status(201).json(template)
    } catch (error) {
      response.send(error)
    }
  }

  public async show({params, response }: HttpContextContract) {
    try {
      const template = await Template.findOrFail(params.id)

      response.status(200).json(template)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async update({params, response, request }: HttpContextContract) {
    try {
      const template = await Template.findOrFail(params.id)
      await template.merge({ ...request.only(['name']) }).save()

      response.status(200).json(template)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async destroy({params, response }: HttpContextContract) {
    try {
      const template = await Template.findOrFail(params.id)
      await template.delete()

      response.status(204)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }
}
