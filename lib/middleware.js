// Local
const log = require('./log-error.js')

// API
module.exports = {
	handleByMethod,
	handleErrors
}

/**
 * Middleware that calls a handler based on the HTTP method. It looks for a
 * method, accounting for http method spoofing and calls the handler that
 * corresponds to that method.
 *
 * The `methods` parameter is an object where each key is callable, named
 * after a http method (eg get, post, put, delete, ...). This function is the
 * final implementation of the lambda function and gets passed HTTP Request
 * and Response parameters:
 *
 * {
 *   get(req, res) {
 *   	// handle GET request
 *   }
 * }
 *
 * @param  {Object} methods
 * @return {Promise}
 */
function handleByMethod(methods = {}) {
	return async (req, res) => {
		const method = getMethod(req)
		const handler = methods[method]
		if (handler) {
			if (typeof handler !== 'function') {
				throw Error('Routing by httpmethod middleware expects a function')
			}
			return handler(req, res)
		} else {
			methodNotAllowed(res, method)
		}
	}
}

/**
 * Find the desired http method including spoofed methods, by looking at a
 * hidden `_method` field in the request body, a custom header, or the actual
 * request.method, and returns it lowercase
 *
 * @param  {HTTP Request Object} req
 * @return {String}
 */
function getMethod(req) {
	return (
		req.body && req.body._method ||
		req.headers['x-http-method-override'] ||
		req.method
	).toLowerCase()
}

/**
 * Middleware that handles errors. It returns a request-response handler that
 * sets headers and status codes and returns a JSON response.
 *
 * @param  {Function} handler
 * @return {Function}
 */
function handleErrors(handler) {
	if (typeof handler !== 'function') {
		throw Error('Error handling middleware expects a function')
	}
	return async (req, res) => {
		try {
			await handler(req, res)
		} catch(error) {
			log(error)
			serverError(res, error)
		}
	}
}

/**
 * Sends a 405 Method not allowed status code and JSON object to the client.
 * Also provides feedback on a possible derived method thru http method spoofing
 *
 * @param {HTTP Response Object} res
 * @param {String} method
 */
function methodNotAllowed(res, method) {
	res.status(405)
	res.send({ status: 405, statusText: 'Method not allowed', description: `No ${method.toUpperCase()} method implemented` })
}

/**
 * Sends a 500 Internal server error status and JSON object to the client,
 * including the error text
 *
 * @param {HTTP Response Object} res
 * @param {Error} error
 */
function serverError(res, error) {
	res.status(500)
	res.send({ status: 500, statusText: 'Internal server error', description: error.message })
}
