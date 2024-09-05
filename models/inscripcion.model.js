import knex from '../database/knex.js'

const tableName = 'inscripciones'

class InscripcionModel {
  insert (data) {
    const inscripcion = {
      id_estudiante: data.id_estudiante,
      id_materia: data.id_materia,
      calificacion: data.calificacion ?? null,
    }

    return knex(tableName)
      .insert(inscripcion)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(`${tableName} AS i`)
      .join('personas_escuela AS p', 'i.id_estudiante', 'p.id_persona')
      .join('materias AS m', 'm.id_materia', 'i.id_materia')
      .select([
        { id: 'i.id_inscripcion' },
        { id_estudiante: 'i.id_estudiante' },
        { estudiante: knex.raw("CONCAT(p.nombre, ' ', p.apellido)") },
        { id_materia: 'i.id_materia' },
        { materia: 'm.descripcion' },
        { calificacion: 'i.calificacion' }
      ])
      .orderBy('i.id_inscripcion')
  }
}

export default InscripcionModel