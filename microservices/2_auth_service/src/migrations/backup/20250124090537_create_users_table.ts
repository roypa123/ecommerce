import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('user_id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.bigInteger('created_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
    table.bigInteger('updated_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

