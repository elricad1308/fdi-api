import knex from '../database/knex.js'

const tableName = 'Persona'

class PersonaModel {
  delete (id) {
    return knex(tableName)
      .where('idPersona', id)
      .del()
  }

  fetch (id) {
    return knex(`${tableName} AS p`)
      .join('Estado AS e', 'p.estado', 'e.idEstado')
      .where('idPersona', id)
      .select([
        { nombre: 'p.nombre' },
        { apellidoPaterno: 'p.apellidoPaterno' },
        { apellidoMaterno: 'p.apellidoMaterno' },
        { sexo: 'p.sexo' },
        { sexo_otro: 'p.sexo_otro' },
        { estado: 'p.estado' },
        { nombreEstado: 'e.nombre' }
      ])
      .then(rows => {
        return rows && rows[0] ? rows[0] : null
      })
  }

  insert (data) {
    const persona = {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      sexo: data.sexo,
      estado: data.estado,
      sexo_otro: data.sexo_otro
    }

    return knex(tableName)
      .insert(persona)
      .then(ids => {
        return ids[0]
      })
  }

  list () {
    return knex(`${tableName} AS p`)
      .join('Estado AS e', 'p.estado', 'e.idEstado')
      .select([
	      { id: 'p.idPersona' },
        { nombre: 'p.nombre' },
        { apellidoPaterno: 'p.apellidoPaterno' },
        { apellidoMaterno: 'p.apellidoMaterno' },
        { sexo: 'p.sexo' },
        { sexo_otro: 'p.sexo_otro' },
        { estado: 'p.estado' },
        { nombreEstado: 'e.nombre' }
      ])
      .orderBy('p.idPersona')
      
  }

  update (id, data) {
    const persona = {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      sexo: data.sexo,
      estado: data.estado,
      sexo_otro: data.sexo_otro
    }

    return knex(tableName)
      .where('idPersona', id)
      .update(persona)
  }
}

export default PersonaModel
