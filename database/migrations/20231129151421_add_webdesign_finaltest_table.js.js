/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  try {
    await knex.schema.createTable('WD_FinalTest', function (table) {
      table.increments('idFinalTest').unsigned()
      table.string('nombre', 128)
      table.string('apellido', 128)
      table.integer('matricula').unsigned().unique()
      table.timestamps(false, true)
    })
  } catch (err) {
    console.error('Database migration error: ' + err)
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTable('WD_FinalTest')
}
