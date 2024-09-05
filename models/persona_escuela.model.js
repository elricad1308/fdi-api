import knex from '../database/knex.js'

const tableName = 'personas_escuela'


class PersonaEscuelaModel {
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
          return {
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            sexo: row.sexo,
            fh_nac: row.fh_nac.toISOString().split('T')[0],
            rol: row.rol
          }
        })
      })
  }
}

export default PersonaEscuelaModel