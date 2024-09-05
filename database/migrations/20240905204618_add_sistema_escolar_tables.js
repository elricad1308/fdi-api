/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  try {
    await knex.schema.createTable('roles', table => {
      table.increments('id_rol').unsigned().primary()
      table.string('descripcion', 32)
      table.timestamps(false, true)
    })

    await knex.schema.createTable('materias', table => {
      table.increments('id_materia').unsigned().primary()
      table.string('descripcion', 128)
      table.integer('semestre').unsigned()
      table.integer('creditos').unsigned()
      table.timestamps(false, true)
    })

    await knex.schema.createTable('personas_escuela', table => {
      table.increments('id_persona').unsigned().primary()
      table.string('nombre', 64)
      table.string('apellido', 64)
      table.string('sexo', 1)
      table.date('fh_nac')
      table.integer('id_rol').unsigned()
      table.timestamps(false, true)

      table.foreign('id_rol').references('roles.id_rol')
    })

    await knex.schema.createTable('asignaciones', table => {
      table.increments('id_asignacion').unsigned().primary()
      table.integer('id_materia').unsigned()
      table.integer('id_profesor').unsigned()
      table.string('periodo', 20)
      table.timestamps(false, true)

      table.unique(['id_materia', 'id_profesor', 'periodo']);

      table.foreign('id_materia').references('materias.id_materia')
      table.foreign('id_profesor').references('personas_escuela.id_persona')
    })

    await knex.schema.createTable('inscripciones', table => {
      table.increments('id_inscripcion').unsigned().primary()
      table.integer('id_materia').unsigned()
      table.integer('id_estudiante').unsigned()
      table.integer('calificacion').unsigned()
      table.timestamps(false, true)

      table.unique(['id_materia', 'id_estudiante']);

      table.foreign('id_estudiante').references('personas_escuela.id_persona')
      table.foreign('id_materia').references('materias.id_materia')
    })

    await knex.schema.createTable('asistencias', table => {
      table.increments('id_asistencia').unsigned().primary()
      table.integer('id_inscripcion').unsigned()
      table.date('fecha')      
      table.timestamps(false, true)

      table.foreign('id_inscripcion').references('inscripciones.id_inscripcion')
    })

    await knex.insert([
      { id_rol: 1, descripcion: 'Estudiante' },
      { id_rol: 2, descripcion: 'Profesor' },
      { id_rol: 3, descripcion: 'Directivo' },
      { id_rol: 4, descripcion: 'Administrativo' }
    ]).into('roles')
  } catch (err) {
    console.error('Database migration error: ' + err)
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTable('asistencias')
  await knex.schema.dropTable('inscripciones')
  await knex.schema.dropTable('asignaciones')
  await knex.schema.dropTable('personas_escuela')
  await knex.schema.dropTable('materias')
  await knex.schema.dropTable('roles')
}
