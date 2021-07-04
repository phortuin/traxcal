// Decimal type with precision 6 and scale 2 => 1234.12
exports.up = knex => {
	return knex.schema
		.createTable('foods', table => {
			table.increments()
			table.string('food')
			table.integer('calories')
			table.decimal('carb', 6, 2)
			table.decimal('protein', 6, 2)
			table.decimal('fat', 6, 2)
			table.text('notes')
		})
		.createTable('portions', table => {
			table.increments()
			table.foreign('id').references('id').inTable('foods').onDelete('CASCADE')
			table.string('portion')
			table.integer('size')
		})
}

exports.down = knex => {
	return knex.schema
		.dropTableIfExists('portions')
		.dropTableIfExists('foods')
}
