import knex from '../database/knex.js'

const tableName = 'personas_escuela'

class PersonaEscuelaModel {
  delete (id) {
    return knex(tableName)
      .where('id_persona', id)
      .del()
  }

  fetch (id) {
    return knex(`${tableName} AS p`)
      .join('roles AS r', 'p.id_rol', 'r.id_rol')
      .where('id_persona', id)
      .select([
        { id_persona: 'p.id_persona' },
        { nombre: 'p.nombre' },
        { apellido: 'p.apellido' },
        { sexo: 'p.sexo' },
        { fh_nac: 'p.fh_nac' },
        { id_rol: 'p.id_rol' },
        { rol: 'r.descripcion' }
      ])
      .then(rows => {
        return rows && rows[0] ? rows[0] : null
      })
  }

  insert (data) {
    const persona = {
      nombre: data.nombre,
      apellido: data.apellido,
      sexo: data.sexo,
      fh_nac: data.fh_nac,
      id_rol: data.id_rol
    }

    return knex(tableName)
      .insert(persona)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(`${tableName} AS p`)
      .join('roles AS r', 'p.id_rol', 'r.id_rol')
      .select([
        { id: 'p.id_persona' },
        { nombre: 'p.nombre' },
        { apellido: 'p.apellido' },
        { sexo: 'p.sexo' },
        { fh_nac: 'p.fh_nac' },
        { id_rol: 'p.id_rol' },
        { rol: 'r.descripcion' }
      ])
      .orderBy('p.id_persona')
      .then(rows => {
        return rows.map(row => {
          const fecha = row.fh_nac ?? new Date()

          return {
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            sexo: row.sexo,
            fh_nac: fecha.toISOString().split('T')[0],
            rol: row.rol
          }
        })
      })
  }

  async update (id, data) {
    console.log(id, data)
    const persona = await knex(tableName)
      .where({ id_persona: id })
      .first()

    return knex(tableName)
      .where({ id_persona: id })
      .update(data)
  }
}

export default PersonaEscuelaModel
