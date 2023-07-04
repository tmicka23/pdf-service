import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
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
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      const template = await Template.create({ ...request.only(['name']), userId: currentUser.id })

      const file = request.file('templateFile', {
        size: '2mb',
        extnames: ['doc', 'docx', 'odt'],
      })
      if (file) {
        template.file = Attachment.fromFile(file)
        template.save()
      }

      response.status(201).json(template)
    } catch (error) {
            if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
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
            if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async update({ params, response, request, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      await currentUser.load('templates')
      const template = await Template.query().where('userId', currentUser.id).where('id', params.id).first()

      const file = request.file('templateFile', {
        size: '2mb',
        extnames: ['doc', 'docx', 'odt'],
      })
      if (file) {
        template.file = Attachment.fromFile(file)
      }

      await template.merge({ ...request.only(['name']) }).save()

      response.status(200).json(template)
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      const template = await Template.query().where('userId', currentUser.id).where('id', params.id).first()
      await template.delete()

      response.status(204)
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }
}
