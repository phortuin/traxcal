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
			table.integer('food_id').unsigned()
			table.foreign('food_id')
				.references('foods.id')
				.onDelete('cascade')
			table.string('portion')
			table.integer('size')
		})
		.createTable('diary', table => {
			table.increments()
			table.integer('portion_id').unsigned()
			table.foreign('portion_id')
				.references('portions.id')
				.onDelete('cascade')
			table.date('date')
		})
}

exports.down = knex => {
	return knex.schema
		.dropTableIfExists('diary')
		.dropTableIfExists('portions')
		.dropTableIfExists('foods')
}
