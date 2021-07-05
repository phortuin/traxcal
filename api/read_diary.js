const knex = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})

module.exports = async (request, response) => {
	try {
		const res = await knex('diary')
			.join('portions', 'portions.id', '=', 'diary.portion_id')
			.join('foods', 'foods.id', '=', 'portions.food_id')
			.select(['diary.id as diary_id', '*'])
			.where('date', '=', new Date())
		const res2 = await knex('portions')
			.select('*')
		const res3 = await knex('foods')
			.select('*')
		response.end(JSON.stringify({ diary: res, portions: res2, foods: res3 }))
	} catch(error) {
		console.error(error)
		response.status(500)
		response.end(error.statusText)
	}
}
