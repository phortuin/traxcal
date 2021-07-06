// NPM
const knex = require('knex')

// Export Knex instance w/Postgres database
module.exports = knex({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
})
