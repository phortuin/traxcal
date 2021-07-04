exports.up = knex => {
	return knex.schema.createTable('food', table => {
		table.increments()
		table.text('food', 128).notNullable()
	})
}

exports.down = knex => {
	return knex.schema.dropTableIfExists('food')
}
