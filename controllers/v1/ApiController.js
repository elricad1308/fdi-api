import { spawn } from 'child_process'
import path from 'path'

class ApiController {
  chat (req, res) {
    let data
    let response = ''
    let errResponse = ''

    try {
      data = req.body

      if (!data.prompt) {
        return res.status(400)
          .type('application/json')
          .send('El atributo PROMPT es requerido')
      }

      let prompt = data.prompt.replace(/["\n]/g, '')

      const python = spawn(
        process.env.PYTHON_PATH,
        [
          process.cwd() + path.sep + 'gemini.py',
          `"${prompt}"`
        ]
      )

      python.stdout.on('data', (data) => {
        response += data
      })

      python.stderr.on('data', (data) => {
        response += data
      })

      python.on('close', (code) => {
        const result = {
          status: code,
          text: response,
          error: errResponse
        }

        res
          .status(200)
          .type('application/json')
          .send(result)
      })
    } catch (err) {
      console.error(`[ApiController:chat] error: ${err}`)

      res
        .status(500)
        .type('application/json')
        .send(err.message)
    }

  }

  ping (req, res) {
    res.status(200)
      .type('text/plain')
      .send('Hello from ITS-Api-Public')
  }
}

const controller = new ApiController()

export const { chat, ping } = controller

export default ApiController
