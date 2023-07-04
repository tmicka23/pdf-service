import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import carbone from 'carbone'
import Drive from '@ioc:Adonis/Core/Drive'
import Template from 'App/Models/Template'
import Application from '@ioc:Adonis/Core/Application'


export default class RendersController {
  public async render({ request, auth, response }: HttpContextContract): Promise<void> {
    try {
      const currentUser = auth.use('api').user
      const data = request.input('data')
      const template = await Template.query().where('userId', currentUser.id).where('id', request.input('templateId')).first()
      const report = await this.renderReport(data, Application.tmpPath(template.fileUrl))

      response.status(201).send(report)
    } catch (error) {
      if (error.status) {
        return response.status(error.status).send(error)
      }
      response.status(400).send(error)
    }
  }


  private async renderReport(data, templateUrl): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      carbone.render(templateUrl, data, { convertTo: 'pdf' }, async (error, result) => {
        if (error) {
          return reject(error)
        }

        /* Only for course needs */
        const fileName = `render-${Date.now()}`
        await Drive.put(`renders/render-${fileName}.pdf`, result)
        /* Only for course needs */

        return resolve(result)
      });
    })
  }
}
