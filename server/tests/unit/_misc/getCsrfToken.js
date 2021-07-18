/**
 * Demande à l'Api un jeton CSRF
 *
 * @param {Object} request
 * @returns {String}
 */
module.exports = async (request) => {
  let csrf_header = await request
    .get('/csrf/generate')
    .set({ 'csrf-token': '' })
    .then((response) => response.body.csrf_token)
  if (!csrf_header) csrf_header = ''

  return csrf_header
}
