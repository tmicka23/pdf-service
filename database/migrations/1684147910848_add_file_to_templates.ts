import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'templates'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('file')
    })
  }

  public async down () {
    console.log('Irreversible migration')
  }
}
