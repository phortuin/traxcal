// Local
const { handleByMethod, handleErrors } = require('../lib/middleware')
const knex = require('../lib/knex-instance')

// Endpoint handler
module.exports = handleErrors(handleByMethod({ post }))

/**
 * Save new portion in database. Expects a JSON object with properties:
 * - portion
 * - size
 * - food_id
 *
 * @param  {HTTP Request Object} req
 * @param  {HTTP Response Object} res
 */
async function post(req, res) {
	const { portion, size, food_id } = JSON.parse(req.body)
	const response = await knex('portions')
		.insert({
			portion,
			size,
			food_id
		})
	res.end(JSON.stringify(response))
}
