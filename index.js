import 'dotenv/config'

import http from 'http'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import oasTools from '@oas-tools/core'
import oasConfig from './api/oastools.config.js'

import { fileURLToPath } from 'url'

import * as OpenApiValidator from 'express-openapi-validator'

const appHost = process.env.APP_HOST
const appPort = process.env.APP_PORT
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Instala el validator de OpenAPI
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*app.use(OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, 'api', 'oas-file.yaml'),
    validateRequests: true,
    validateResponses: true
  })
)*/

oasTools.initialize(app, oasConfig).then(() => {
  http.createServer(app).listen(appPort, () => {
    console.log(`its5a-api-public running (port ${appPort})`)
    console.log('==============================================================')
    console.log(`API docs (Swagger UI) available on ${appHost}:${appPort}/docs`)
    console.log('==============================================================')
  })
})

