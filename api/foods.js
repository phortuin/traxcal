// Local
const { handleByMethod, handleErrors } = require('../lib/middleware')
const knex = require('../lib/knex-instance')

// Endpoint handler
module.exports = handleErrors(handleByMethod({ post }))

/**
 * Save new food in database. Expects a JSON object with properties:
 * - food
 * - calories
 * - carb
 * - protein
 * - fat
 *
 * @param  {HTTP Request Object} req
 * @param  {HTTP Response Object} res
 */
async function post(req, res) {
	const { food, calories, carb, protein, fat } = JSON.parse(req.body)
	const response = await knex('foods')
		.insert({
			food,
			calories,
			carb,
			protein,
			fat,
		})
	res.end(JSON.stringify(response))
}
