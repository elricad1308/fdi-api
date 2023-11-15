/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  try {
    await knex.schema.createTable('Estado', function (table) {
      table.integer('idEstado').unsigned().primary()
      table.string('nombre', 64)
    })

    await knex.schema.createTable('Persona', function (table) {
      table.increments('idPersona').unsigned()
      table.string('nombre', 128)
      table.string('apellidoPaterno', 128)
      table.string('apellidoMaterno', 128)
      table.string('sexo', 1)
      table.string('sexo_otro', 64)
      table.integer('estado').unsigned()

      table.foreign('estado')
        .references('Estado.idEstado')
    })

    await knex.insert([
      { idEstado: 1, nombre: 'Aguascalientes' },
      { idEstado: 2, nombre: 'Baja California' },
      { idEstado: 3, nombre: 'Baja California Sur' },
      { idEstado: 4, nombre: 'Campeche' },
      { idEstado: 5, nombre: 'Chiapas' },
      { idEstado: 6, nombre: 'Chihuahua' },
      { idEstado: 7, nombre: 'Ciudad de México' },
      { idEstado: 8, nombre: 'Coahuila' },
      { idEstado: 9, nombre: 'Colima' },
      { idEstado: 10, nombre: 'Durango' },
      { idEstado: 11, nombre: 'Estado de México' },
      { idEstado: 12, nombre: 'Guanajuato' },
      { idEstado: 13, nombre: 'Guerrero' },
      { idEstado: 14, nombre: 'Hidalgo' },
      { idEstado: 15, nombre: 'Jalisco' },
      { idEstado: 16, nombre: 'Michoacán' },
      { idEstado: 17, nombre: 'Morelos' },
      { idEstado: 18, nombre: 'Nayarit' },
      { idEstado: 19, nombre: 'Nuevo León' },
      { idEstado: 20, nombre: 'Oaxaca' },
      { idEstado: 21, nombre: 'Puebla' },
      { idEstado: 22, nombre: 'Querétaro' },
      { idEstado: 23, nombre: 'Quintana Roo' },
      { idEstado: 24, nombre: 'San Luis Potosí' },
      { idEstado: 25, nombre: 'Sinaloa' },
      { idEstado: 26, nombre: 'Sonora' },
      { idEstado: 27, nombre: 'Tabasco' },
      { idEstado: 28, nombre: 'Tamaulipas' },
      { idEstado: 29, nombre: 'Tlaxcala' },
      { idEstado: 30, nombre: 'Veracruz' },
      { idEstado: 31, nombre: 'Yucatán' },
      { idEstado: 32, nombre: 'Zacatecas' }
    ]).into('Estado')

    return true
  } catch (err) {
    console.error(`Database migration error: ${err}`)
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTable('Persona')
  await knex.schema.dropTable('Estado')
};
