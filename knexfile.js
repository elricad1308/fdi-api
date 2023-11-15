import dotenv from 'dotenv/config'

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN_CONNECTIONS),
      max: parseInt(process.env.DB_POOL_MAX_CONNECTIONS)
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    debug: true
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN_CONNECTIONS),
      max: parseInt(process.env.DB_POOL_MAX_CONNECTIONS)
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    debug: false
  }
}