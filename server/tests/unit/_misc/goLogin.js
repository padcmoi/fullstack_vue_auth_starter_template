const getCsrfToken = require('./getCsrfToken')

/**
 * Login
 *
 * @param {Object} request
 * @param {String} user
 * @param {String} password
 *
 * @returns {Object}
 */
module.exports = async (request, user, password) => {
  const csrf_header = await getCsrfToken(request)

  const response = await request
    .post('/account/login')
    .set('csrf-token', csrf_header)
    .send({
      params: { user, password },
    })
    .then((response) => response.body)

  return response
}
