exports.up = function(knex) {
  return knex.schema.table('requests', table => {
    table.timestamp('posted').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.table('requests', table => {
    table.dropColumn('posted');
  });
};
