const knex = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})

module.exports = async (request, response) => {
	try {
		const res = await knex('diary')
			.insert({
				portion_id: JSON.parse(request.body),
				date: knex.raw('CURRENT_TIMESTAMP'),
			})
		response.end(res)
	} catch(error) {
		console.error(error)
		response.status(500)
		response.end(error.statusText)
	}
}
