/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'category_ecommerce',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations',
  },
};

export default config;
