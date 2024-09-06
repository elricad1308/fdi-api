import knex from '../database/knex.js'

const tableName = 'asistencias'

class AsistenciaModel {
  insert (data) {
    const asistencia = {
      id_inscripcion: data.id_inscripcion,
      fecha: data.fecha,
    }

    return knex(tableName)
      .insert(asistencia)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(`${tableName} AS a`)
      .join('inscripciones AS i', 'a.id_inscripcion', 'i.id_inscripcion')
      .join('personas_escuela AS p', 'i.id_estudiante', 'p.id_persona')
      .join('materias AS m', 'm.id_materia', 'i.id_materia')
      .select([
        { id: 'a.id_asistencia' },
        { id_inscripcion: 'a.id_inscripcion' },
        { id_estudiante: 'i.id_estudiante' },
        { estudiante: knex.raw("CONCAT(p.nombre, ' ', p.apellido)") },
        { id_materia: 'i.id_materia'},
        { materia: 'm.descripcion' },
        { fecha: 'a.fecha' }
      ])
      .orderBy('i.id_estudiante', 'i.id_materia', 'a.fecha')
      .then(asistencias => {
        return asistencias.map(asistencia => {

          const fecha = asistencia.fecha ?? new Date()

          return {
            id: asistencia.id,
            id_inscripcion: asistencia.id_inscripcion,
            id_estudiante: asistencia.id_estudiante,
            estudiante: asistencia.estudiante,
            id_materia: asistencia.id_materia,
            materia: asistencia.materia,
            fecha: fecha.split('T')[0] 
          }
        })
      })
  }
}

export default AsistenciaModel
