const knex = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})

module.exports = async (request, response) => {
	try {
		const res = await knex('diary')
			.where('id', request.query.id)
			.del()
		response.writeHead(303, { location: '/' })
		response.end()
	} catch(error) {
		console.error(error)
		response.status(500)
		response.end(error.statusText)
	}
}
