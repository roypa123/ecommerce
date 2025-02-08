import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable('categories', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable().unique();
    table.string('category_image').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('subcategories', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.bigInteger('category_id').notNullable().references('id').inTable('categories').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('types', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.bigInteger('subcategory_id').notNullable().references('id').inTable('subcategories').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTableIfExists('types')
  .dropTableIfExists('subcategories')
  .dropTableIfExists('categories');
}

