import knex from 'knex'
import knexconfig from '../knexfile.js'

const myKnex = knex(knexconfig[process.env.NODE_ENV ?? 'production'])

export default myKnex
