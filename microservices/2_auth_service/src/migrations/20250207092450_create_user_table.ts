import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
        table.bigIncrements("user_id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("profile_image");
        table.string("role").defaultTo("USER");
        table.string("access_token");
        table.string("refresh_token");
        table.integer("status").defaultTo(0);
        table.bigInteger('created_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
        table.bigInteger('updated_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

