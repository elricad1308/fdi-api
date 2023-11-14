import 'dotenv/config'

import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import oasTools from '@oas-tools/core'
import oasConfig from './api/oastools.config.js'

const appHost = process.env.APP_HOST
const appPort = process.env.APP_PORT
const app = express()

app.use(cors())
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

oasTools.initialize(app, oasConfig).then(() => {
  http.createServer(app).listen(appPort, () => {
    console.log(`its5a-api-public running (port ${appPort}`)
    console.log('==============================================================')
    console.log(`API docs (Swagger UI) available on ${appHost}:${appPort}/docs`)
    console.log('==============================================================')
  })
})
