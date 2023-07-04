import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import {
  attachment,
  AttachmentContract
} from '@ioc:Adonis/Addons/AttachmentLite'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public name: string

  @column({})
  public userId: string

  @attachment({ disk: 'local', preComputeUrl: true, folder: 'templates' })
  public file: AttachmentContract

  @computed()
  public get fileUrl(): string {
    return this.file ? this.file.url : ''
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
