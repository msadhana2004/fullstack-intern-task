exports.up = function (knex) {
    return knex.schema.createTable('favorites', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned()
            .references('id').inTable('users')
            .onDelete('CASCADE');
        table.integer('template_id').unsigned()
            .references('id').inTable('templates')
            .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('favorites');
};