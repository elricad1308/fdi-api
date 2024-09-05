import knex from '../database/knex.js'

const tableName = 'asignaciones'

class AsignacionModel {
  insert (data) {
    const asignacion = {
      id_materia: data.id_materia,
      id_profesor: data.id_profesor,
      periodo: data.periodo
    }

    return knex(tableName)
      .insert(asignacion)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(`${tableName} AS a`)
      .join('materias AS m', 'a.id_materia', 'm.id_materia')
      .join('personas_escuela AS p', 'a.id_profesor', 'p.id_persona')
      .select([
        { id: 'a.id_asignacion' },
        { id_materia: 'a.id_materia' },
        { materia: 'm.descripcion' },
        { id_profesor: 'a.id_profesor' },
        { profesor: knex.raw("CONCAT(p.nombre, ' ', p.apellido)") },
        { periodo: 'a.periodo' }
      ])
      .orderBy('a.id_asignacion')
  }
}

export default AsignacionModel