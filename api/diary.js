// Local
const { handleByMethod, handleErrors } = require('../lib/middleware')
const knex = require('../lib/knex-instance')

// Endpoint handler
module.exports = handleErrors(handleByMethod({ get, post, del }))

/**
 * Get diary for today. For convenience, all foods and portions are sent back
 * to the client as well.
 *
 * @param  {HTTP Request Object} req
 * @param  {HTTP Response Object} res
 */
async function get(req, res) {
	const diary = await knex('diary')
		.join('portions', 'portions.id', '=', 'diary.portion_id')
		.join('foods', 'foods.id', '=', 'portions.food_id')
		.select(['diary.id as diary_id', '*'])
		.where('date', '=', new Date())
	const portions = await knex('portions')
		.join('foods', 'foods.id', '=', 'portions.food_id')
		.select(['portions.id as portion_id', '*'])
	const foods = await knex('foods')
		.select('*')
	res.end(JSON.stringify({ diary, portions, foods }))
}

/**
 * Insert diary entry in database. Expects the request body to be the portion
 * id and inserts the current date as timestamp for the new diary entry.
 * Responds with the database’s response
 *
 * @param  {HTTP Request Object} req
 * @param  {HTTP Response Object} res
 */
async function post(req, res) {
	const response = await knex('diary')
		.insert({
			portion_id: JSON.parse(req.body),
			date: knex.raw('CURRENT_TIMESTAMP'),
		})
	res.end(JSON.stringify(response))
}

/**
 * Delete diary entry from database. Expects an `id` parameter in the body.
 * Redirects to the site home page after deletion
 *
 * @param  {HTTP Request Object} req
 * @param  {HTTP Response Object} res
 */
async function del(req, res) {
	await knex('diary')
		.where('id', req.body.id)
		.del()
	res.writeHead(303, { location: '/' })
	res.end()
}
