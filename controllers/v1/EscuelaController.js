import AsignacionModel from "../../models/asignacion.model.js";
import AsistenciaModel from "../../models/asistencia.model.js";
import InscripcionModel from "../../models/inscripcion.model.js";
import MateriaModel from "../../models/materia.model.js";
import PersonaEscuelaModel from "../../models/persona_escuela.model.js";

class EscuelaController {
  async createAsignacion (req, res) {
    try {
      const data = req.body
      const modelo = new AsignacionModel()

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[AsignacionModel:create] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async createAsistencia (req, res) {
    try {
      const data = req.body
      const modelo = new AsistenciaModel()

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[AsistenciaModel:create] error: ${err}`)
      res.status(500).type('application/json').send(err.message)
    }
  }


  async createInscripcion (req, res) {
    try {
      const data = req.body
      const modelo = new InscripcionModel()

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[InscripcionModel:create] error: ${err}`)
      res.status(500).type('application/json').send(err.message)
    }
  }

  async createPersona (req, res) {
    try {
      const data = req.body
      const modelo = new PersonaEscuelaModel()

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[PersonaModel:create] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async createMateria (req, res) {
    try {
      const data = req.body
      const modelo = new MateriaModel()

      const id = await modelo.insert(data)

      res.status(200).type('application/json').send(id)
    } catch (err) {
      console.error(`[MateriaModel:create] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async listAsignacion (_, res) {
    try {
      const modelo = new AsignacionModel()
      const data = await modelo.list()

      res.status(200).type('application/json').send(data)
    } catch (err) {
      console.error(`[AsignacionModel:list] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async listAsistencia (_, res) {
    try {
      const modelo = new AsistenciaModel()
      const data = await modelo.list()

      res.status(200).type('application/json').send(data)
    } catch (err) {
      console.error(`[AsistenciaModel:list] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async listInscripcion (_, res) {
    try {
      const modelo = new InscripcionModel()
      const data = await modelo.list()

      res.status(200).type('application/json').send(data)
    } catch (err) {
      console.error(`[InscripcionModel:list] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async listMateria (_, res) {
    try {
      const modelo = new MateriaModel()
      const data = await modelo.list()

      res.status(200).type('application/json').send(data)
    } catch (err) {
      console.error(`[MateriaModel:list] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }

  async listPersonaEscuela (_, res) {
    try {
      const modelo = new PersonaEscuelaModel()
      const data = await modelo.list()

      res.status(200).type('application/json').send(data)
    } catch (err) {
      console.error(`[PersonaModel:list] error: ${err}`)

      res.status(500).type('application/json').send(err.message)
    }
  }
}

const controller = new EscuelaController()

export const { 
  createAsignacion,
  createAsistencia,
  createInscripcion,
  createMateria,
  createPersona,
  listAsignacion,
  listAsistencia,
  listInscripcion,
  listMateria,
  listPersonaEscuela
} = controller

export default EscuelaController