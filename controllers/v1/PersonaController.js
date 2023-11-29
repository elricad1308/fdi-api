import PersonaModel from '../../models/persona.model.js'

const modelo = new PersonaModel()

class PersonaController {
  async create (req, res) {
    try {
      const data = req.body

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[PersonaModel:create] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async del (_, res) {
    try {
      const id = res.locals.oas.params.id

      if (id) {
        const data = await modelo.delete(id)

        res.status(200)
          .type('application/json')
          .send(data)
      } else {
        res.status(400)
          .type('text/plain')
          .send('Se requiere el ID de la persona')
      }
    } catch (err) {
      console.error(`[PersonaModel:fetch] error: ${err}`)

      res.status(500)
        .type('text/plain')
        .send(err.message)
    }
  }

  async fetch (_, res) {
    try {
      const id = res.locals.oas.params.id

      if (id) {
        const data = await modelo.fetch(id)

        res.status(200)
          .type('application/json')
          .send(data)
      } else {
        res.status(400)
          .type('text/plain')
          .send('Se requiere el ID de la persona')
      }
    } catch (err) {
      console.error(`[PersonaModel:fetch] error: ${err}`)

      res.status(500)
        .type('text/plain')
        .send(err.message)
    }
  }

  async list (req, res) {
    try {
      const rows = await modelo.list()

      res.status(200)
        .type('application/json')
        .send(rows)
    } catch (err) {
      console.error(`[PersonaModel:list] error: ${err}`)

      res.status(500)
        .type('text/plain')
        .send(err.message)
    }
  }

  async update (req, res) {
    try {
      const data = req.body
      const id = data.idPersona

      if (id) {
        const rows = await modelo.update(id, data)

        res.status(200)
          .type('application/json')
          .send(rows)
      } else {
        res.status(400)
          .type('text/plain')
          .send('Se requiere el ID de la persona')
      }
    } catch (err) {
      console.error(`[PersonaModel:update] error: ${err}`)

      res.status(500)
        .type('text/plain')
        .send(err.message)
    }
  }
}

const controller = new PersonaController()

export const { create, del, fetch, list, update } = controller

export default PersonaController
