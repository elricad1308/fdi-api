import knex from '../database/knex.js'

const tableName = 'WD_FinalTest'

class WDFinalTestModel {
  async findByMatricula (matricula) {
    const datos = await knex(tableName)
      .select([
        { id: 'idFinalTest' },
        { nombre: 'nombre' },
        { apellido: 'apellido' }
      ])
      .where('matricula', matricula)

    return datos[0]
  }

  async insert (data) {
    const registro = {
      nombre: data.nombre,
      apellido: data.apellido,
      matricula: data.matricula
    }

    const ids = await knex(tableName).insert(registro)
    return ids[0]
  }
}

export default WDFinalTestModel
