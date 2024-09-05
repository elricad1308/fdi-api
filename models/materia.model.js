import knex from '../database/knex.js'

const tableName = 'materias'

class MateriaModel {
  insert (data) {
    const materia = {
      descripcion: data.descripcion,
      semestre: data.semestre,
      creditos: data.creditos
    }

    return knex(tableName)
      .insert(materia)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(tableName)
      .select([
        { id: 'id_materia' },
        { descripcion: 'descripcion' },
        { semestre: 'semestre' },
        { creditos: 'creditos' }
      ])
      .orderBy('id_materia')
  }
}

export default MateriaModel