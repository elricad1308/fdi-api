import path from 'path'

export default {
  oasFile: path.join(process.cwd(), 'api', 'oas-file.yaml'),
  level: 'debug',
  middleware: {
    router: {
      controllers: path.join(process.cwd(), 'controllers', 'v1')
    }/*,
    security: {
      disable: false,
      auth: {
        ApiKeyAuth: async (token) => {
          return { id: 1 }
        }
      }
    }*/
  }
}