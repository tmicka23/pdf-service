import { configure, processCliArgs } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'

configure({
  ...processCliArgs(process.argv.slice(2)),
  ...{
    files: ['tests/**/*.spec.js'],
    plugins: [apiClient('https://localhost:3333'), assert()]
  }
})
