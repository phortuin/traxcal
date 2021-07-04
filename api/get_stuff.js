const knex = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})

module.exports = async (request, response) => {
	try {
		const res = await knex.raw('select * from food').then(responsibo => {
			return JSON.stringify(responsibo.rows)
		})
		response.end(res)
	} catch(error) {
		console.error(error)
		response.status(500)
		response.end(error.statusText)
	}
}
