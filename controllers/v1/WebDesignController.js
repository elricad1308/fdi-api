import WDFinalTestModel from '../../models/wd_finaltest.model.js'

const modelo = new WDFinalTestModel()

class WebDesignController {
  finalTestGet (_, res) {
    res.status(405)
      .type('text/plain')
      .send('Debes hacer la solicitud por POST!')
  }

  async finalTest (req, res) {
    try {
      const data = req.body
      const id = await modelo.insert(data)

      res.status(200)
        .type('application/json')
        .send({
          code: 200,
          status: 'ok',
          message: `¡Hola ${data.nombre} ${data.apellido}! Eres el estudiante #${id} en terminar el examen. ¡Bien hecho! :D`
        })
    } catch (error) {
      if (error.message.includes('Duplicate entry')) {
        const datos = await modelo.findByMatricula(req.body.matricula)

        res.status(200)
          .type('application/json')
          .send({
            code: 200,
            status: 'ya registrado',
            message: `¡Hola ${datos.nombre} ${datos.apellido}! Ya habías completado tu examen antes. Tu registro es el #${datos.id}`
          })
      } else {
        console.error('[WebDesignController:finalTest] error : ' + error)
        res.status(500)
          .type('text/plain')
          .send('Error interno del servidor: ' + error)
      }
    }
  }
}

const controller = new WebDesignController()

export const { finalTest, finalTestGet } = controller

export default WebDesignController
