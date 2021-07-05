const knex = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})

module.exports = async (request, response) => {
	const { food, calories, carb, protein, fat } = JSON.parse(request.body)
	try {
		const res = await knex('foods')
			.insert({
				food,
				calories,
				carb,
				protein,
				fat,
			})
		response.end(res)
	} catch(error) {
		console.error(error)
		response.status(500)
		response.end(error.statusText)
	}
}
